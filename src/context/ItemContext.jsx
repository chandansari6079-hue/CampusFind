import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured, uploadItemImage, deleteItemImage } from '../lib/supabase';
import { useAuth } from './AuthContext';

const ItemContext = createContext(null);

// Initial campus items for instant visual preview before live Supabase DB is connected
const SEED_ITEMS = [
  {
    id: 'seed-1',
    user_id: 'seed-user-1',
    user_name: 'Alex Rivera',
    user_email: 'alex.rivera@campus.edu',
    title: 'Space Gray MacBook Air M2 (13-inch)',
    description: 'Left on the 2nd floor silent study area near the window tables. Has a GitHub Octocat sticker and a slight scratch on the bottom right corner.',
    category: 'Electronics',
    location: 'Central Library',
    date: '2026-11-13',
    item_type: 'lost',
    image_url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    image_path: null,
    status: 'active',
    contact_info: 'alex.rivera@campus.edu or text (555) 234-5678',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: 'seed-2',
    user_id: 'seed-user-2',
    user_name: 'Sarah Chen',
    user_email: 'sarah.c@campus.edu',
    title: 'University Student ID Card & Lanyard',
    description: 'Blue university lanyard holding a student ID badge belonging to Marcus Wright (ID ending in 4921) with a dorm access key attached.',
    category: 'ID & Cards',
    location: 'Student Center Food Court',
    date: '2026-11-14',
    item_type: 'found',
    image_url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    image_path: null,
    status: 'active',
    contact_info: 'Handed to Student Center Front Desk (or email sarah.c@campus.edu)',
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
  },
  {
    id: 'seed-3',
    user_id: 'seed-user-3',
    user_name: 'David Kim',
    user_email: 'd.kim@campus.edu',
    title: 'AirPods Pro Gen 2 in Matte Black Case',
    description: 'Found inside the charging case on the bench outside Gym Court B. Case has a small carabiner attached.',
    category: 'Electronics',
    location: 'Sports & Recreation Complex',
    date: '2026-11-14',
    item_type: 'found',
    image_url: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    image_path: null,
    status: 'active',
    contact_info: 'd.kim@campus.edu - please identify device name to claim',
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'seed-4',
    user_id: 'seed-user-4',
    user_name: 'Elena Rostova',
    user_email: 'elena.r@campus.edu',
    title: 'Organic Chemistry 4th Edition + Spiral Notebook',
    description: 'Hardcover textbook by David Klein with detailed handwritten lecture notes inside the front cover. Very urgent as midterms are next week!',
    category: 'Books & Stationery',
    location: 'Science Quad - Hall 301',
    date: '2026-11-12',
    item_type: 'lost',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    image_path: null,
    status: 'active',
    contact_info: 'elena.r@campus.edu | reward offered!',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: 'seed-5',
    user_id: 'seed-user-5',
    user_name: 'Marcus Brody',
    user_email: 'm.brody@campus.edu',
    title: 'Toyota Car Key with Leather Keychain',
    description: 'Black electronic key fob with a tan leather strap and a brass apartment key. Lost between Parking Lot C and Engineering Wing.',
    category: 'Keys',
    location: 'Engineering Block - West Parking',
    date: '2026-11-11',
    item_type: 'lost',
    image_url: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=800&q=80',
    image_path: null,
    status: 'resolved',
    contact_info: 'm.brody@campus.edu',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
  },
  {
    id: 'seed-6',
    user_id: 'seed-user-6',
    user_name: 'Priya Patel',
    user_email: 'priya.p@campus.edu',
    title: 'Navy Herschel Backpack with Laptop Sleeve',
    description: 'Found under a table in the Main Dining Hall. Contains notebooks, water bottle, and a calculator. Given to campus security lost & found office.',
    category: 'Bags & Wallets',
    location: 'Campus Dining Hall',
    date: '2026-11-13',
    item_type: 'found',
    image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    image_path: null,
    status: 'active',
    contact_info: 'Campus Security Office #104 or priya.p@campus.edu',
    created_at: new Date(Date.now() - 3600000 * 20).toISOString(),
  }
];

export function ItemProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load items from Supabase or local storage fallback
  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured) {
      // Use local storage / seed items for preview
      const localData = localStorage.getItem('campusfind_items');
      if (localData) {
        try {
          setItems(JSON.parse(localData));
        } catch {
          setItems(SEED_ITEMS);
          localStorage.setItem('campusfind_items', JSON.stringify(SEED_ITEMS));
        }
      } else {
        setItems(SEED_ITEMS);
        localStorage.setItem('campusfind_items', JSON.stringify(SEED_ITEMS));
      }
      setLoading(false);
      return;
    }

    try {
      const { data, error: sbError } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (sbError) throw sbError;
      setItems(data || []);
    } catch (err) {
      console.error('Error fetching items from Supabase:', err);
      setError(err.message);
      // Fallback to local storage if network or table issue
      const localData = localStorage.getItem('campusfind_items');
      if (localData) {
        setItems(JSON.parse(localData));
      } else {
        setItems(SEED_ITEMS);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  // Add Item
  const addItem = async (itemData, imageFile) => {
    let imageUrl = itemData.image_url || '';
    let imagePath = null;

    if (imageFile && isSupabaseConfigured) {
      try {
        const uploadRes = await uploadItemImage(imageFile, user?.id);
        imageUrl = uploadRes.publicUrl;
        imagePath = uploadRes.path;
      } catch (uploadErr) {
        console.error('Image upload failed, continuing with record:', uploadErr);
      }
    } else if (imageFile && !isSupabaseConfigured) {
      // Create local preview blob URL for instant display
      imageUrl = URL.createObjectURL(imageFile);
    }

    const newItemRecord = {
      user_id: user?.id || 'guest-user',
      user_name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Campus Student',
      user_email: user?.email || 'student@campus.edu',
      title: itemData.title,
      description: itemData.description,
      category: itemData.category,
      location: itemData.location,
      date: itemData.date || new Date().toISOString().split('T')[0],
      item_type: itemData.item_type,
      image_url: imageUrl || 'https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?auto=format&fit=crop&w=800&q=80',
      image_path: imagePath,
      status: 'active',
      contact_info: itemData.contact_info || user?.email || '',
    };

    if (!isSupabaseConfigured) {
      const fullItem = {
        ...newItemRecord,
        id: 'local-' + Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      const updated = [fullItem, ...items];
      setItems(updated);
      localStorage.setItem('campusfind_items', JSON.stringify(updated));
      return fullItem;
    }

    const { data, error } = await supabase
      .from('items')
      .insert([newItemRecord])
      .select()
      .single();

    if (error) {
      console.error('Error inserting item to Supabase:', error);
      throw error;
    }

    setItems((prev) => [data, ...prev]);
    return data;
  };

  // Update Item
  const updateItem = async (id, updatedFields, newImageFile) => {
    let imageUrl = updatedFields.image_url;
    let imagePath = updatedFields.image_path;

    if (newImageFile && isSupabaseConfigured) {
      try {
        if (imagePath) {
          await deleteItemImage(imagePath);
        }
        const uploadRes = await uploadItemImage(newImageFile, user?.id);
        imageUrl = uploadRes.publicUrl;
        imagePath = uploadRes.path;
      } catch (uploadErr) {
        console.error('Image update failed:', uploadErr);
      }
    } else if (newImageFile && !isSupabaseConfigured) {
      imageUrl = URL.createObjectURL(newImageFile);
    }

    const updates = {
      ...updatedFields,
      image_url: imageUrl,
      image_path: imagePath,
      updated_at: new Date().toISOString(),
    };

    if (!isSupabaseConfigured) {
      const updated = items.map((item) => (item.id === id ? { ...item, ...updates } : item));
      setItems(updated);
      localStorage.setItem('campusfind_items', JSON.stringify(updated));
      return { ...items.find((i) => i.id === id), ...updates };
    }

    const { data, error } = await supabase
      .from('items')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating item in Supabase:', error);
      throw error;
    }

    setItems((prev) => prev.map((item) => (item.id === id ? data : item)));
    return data;
  };

  // Delete Item
  const deleteItem = async (id, imagePath) => {
    if (imagePath && isSupabaseConfigured) {
      await deleteItemImage(imagePath);
    }

    if (!isSupabaseConfigured) {
      const updated = items.filter((item) => item.id !== id);
      setItems(updated);
      localStorage.setItem('campusfind_items', JSON.stringify(updated));
      return true;
    }

    const { error } = await supabase.from('items').delete().eq('id', id);
    if (error) {
      console.error('Error deleting item from Supabase:', error);
      throw error;
    }

    setItems((prev) => prev.filter((item) => item.id !== id));
    return true;
  };

  // Toggle item resolved/active status
  const toggleResolved = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'resolved' ? 'active' : 'resolved';
    return updateItem(id, { status: nextStatus });
  };

  const value = {
    items,
    loading,
    error,
    fetchItems,
    addItem,
    updateItem,
    deleteItem,
    toggleResolved,
  };

  return <ItemContext.Provider value={value}>{children}</ItemContext.Provider>;
}

export function useItems() {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItems must be used within an ItemProvider');
  }
  return context;
}
