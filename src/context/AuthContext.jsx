import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      // Check for locally cached demo session if Supabase is pending setup
      const localUser = localStorage.getItem('campusfind_demo_user');
      if (localUser) {
        try {
          setUser(JSON.parse(localUser));
        } catch (e) {
          console.error(e);
        }
      }
      setLoading(false);
      return;
    }

    // 1. Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    }).catch(err => {
      console.error('Error fetching initial session:', err);
      setLoading(false);
    });

    // 2. Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  // Sign up with student credentials
  const signUp = async ({ email, password, fullName, studentId, department, phone }) => {
    if (!isSupabaseConfigured) {
      // Offline fallback for preview before user configures keys
      const demoUser = {
        id: 'demo-student-' + Math.random().toString(36).substring(2, 7),
        email,
        user_metadata: {
          full_name: fullName,
          student_id: studentId,
          department,
          phone,
        },
      };
      localStorage.setItem('campusfind_demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      return { user: demoUser, session: null };
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          student_id: studentId,
          department,
          phone,
        },
      },
    });

    if (error) throw error;
    return data;
  };

  // Sign in with email and password
  const signIn = async ({ email, password }) => {
    if (!isSupabaseConfigured) {
      const demoUser = {
        id: 'demo-student-user',
        email,
        user_metadata: {
          full_name: email.split('@')[0].toUpperCase(),
          student_id: 'CS-2024-88',
          department: 'Computer Science',
        },
      };
      localStorage.setItem('campusfind_demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
      return { user: demoUser, session: null };
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  // Sign out
  const signOut = async () => {
    if (!isSupabaseConfigured) {
      localStorage.removeItem('campusfind_demo_user');
      setUser(null);
      setSession(null);
      return;
    }

    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSession(null);
  };

  const value = {
    user,
    session,
    loading,
    isConfigured: isSupabaseConfigured,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
