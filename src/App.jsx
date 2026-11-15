import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ItemProvider, useItems } from './context/ItemContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ItemDetailModal from './components/ItemDetailModal';
import EditItemModal from './components/EditItemModal';
import SetupNotice from './components/SetupNotice';

import Home from './pages/Home';
import LostItems from './pages/LostItems';
import FoundItems from './pages/FoundItems';
import AddItem from './pages/AddItem';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals
  const [detailItem, setDetailItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [isSetupNoticeOpen, setIsSetupNoticeOpen] = useState(false);

  const { isConfigured } = useAuth();
  const { toggleResolved, deleteItem } = useItems();

  const handleSelectItem = (item) => {
    setDetailItem(item);
  };

  const handleEditItem = (item) => {
    setDetailItem(null);
    setEditingItem(item);
  };

  const handleToggleResolved = async (item) => {
    await toggleResolved(item.id, item.status);
    if (detailItem && detailItem.id === item.id) {
      setDetailItem(prev => ({
        ...prev,
        status: prev.status === 'resolved' ? 'active' : 'resolved'
      }));
    }
  };

  const handleDeleteItem = async (id, imagePath) => {
    await deleteItem(id, imagePath);
    setDetailItem(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 selection:bg-brand-purple/30 selection:text-white">
      {/* Top Banner Notice if Supabase credentials are pending */}
      {!isConfigured && (
        <div className="bg-gradient-to-r from-navy-900 via-brand-purple/20 to-navy-900 border-b border-brand-purple/30 px-4 py-2 text-center text-xs text-slate-300 flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>CampusFind is running in demo mode with sample campus records.</span>
          <button
            onClick={() => setIsSetupNoticeOpen(true)}
            className="text-brand-purple-light hover:text-white font-bold underline ml-1 cursor-pointer"
          >
            Connect your live Supabase database →
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        onOpenSetupModal={() => setIsSetupNoticeOpen(true)} 
      />

      {/* Main Page Router */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <Home 
            setCurrentPage={setCurrentPage}
            setSelectedCategory={setSelectedCategory}
            setSearchQuery={setSearchQuery}
            onSelectItem={handleSelectItem}
            onEditItem={handleEditItem}
            onToggleResolved={handleToggleResolved}
          />
        )}

        {currentPage === 'lost' && (
          <LostItems 
            setCurrentPage={setCurrentPage}
            initialSearch={searchQuery}
            initialCategory={selectedCategory}
            onSelectItem={handleSelectItem}
            onEditItem={handleEditItem}
            onToggleResolved={handleToggleResolved}
          />
        )}

        {currentPage === 'found' && (
          <FoundItems 
            setCurrentPage={setCurrentPage}
            initialSearch={searchQuery}
            initialCategory={selectedCategory}
            onSelectItem={handleSelectItem}
            onEditItem={handleEditItem}
            onToggleResolved={handleToggleResolved}
          />
        )}

        {currentPage === 'add' && (
          <AddItem 
            setCurrentPage={setCurrentPage}
            onSelectItem={handleSelectItem}
          />
        )}

        {currentPage === 'dashboard' && (
          <Dashboard 
            setCurrentPage={setCurrentPage}
            onSelectItem={handleSelectItem}
            onEditItem={handleEditItem}
            onToggleResolved={handleToggleResolved}
          />
        )}

        {currentPage === 'about' && (
          <About 
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'login' && (
          <Login 
            setCurrentPage={setCurrentPage}
          />
        )}

        {currentPage === 'signup' && (
          <Signup 
            setCurrentPage={setCurrentPage}
          />
        )}
      </main>

      {/* Global Modals */}
      {detailItem && (
        <ItemDetailModal
          item={detailItem}
          onClose={() => setDetailItem(null)}
          onEdit={handleEditItem}
          onDelete={handleDeleteItem}
          onToggleResolved={handleToggleResolved}
        />
      )}

      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onUpdated={() => {}}
        />
      )}

      <SetupNotice 
        isOpen={isSetupNoticeOpen}
        onClose={() => setIsSetupNoticeOpen(false)}
      />

      {/* Footer */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ItemProvider>
        <AppContent />
      </ItemProvider>
    </AuthProvider>
  );
}
