// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User as FirebaseUser 
} from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import type { UserProfile } from '@/types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  userRole: 'vendor' | 'admin' | 'customer' | null;
  shopId: string | null;
  loading: boolean;
  isAuthenticated: boolean;
  isVendor: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const fetchUserProfile = useCallback(async (user: FirebaseUser) => {
    try {
      const profileDoc = await getDoc(doc(db, 'users', user.uid));
      if (profileDoc.exists()) {
        const profile = profileDoc.data() as UserProfile;
        setUserProfile(profile);
        return profile;
      } else {
        // Create default profile if doesn't exist
        const newProfile: Omit<UserProfile, 'uid'> = {
          email: user.email || '',
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          role: 'customer',
          createdAt: new Date().toISOString()
        };
        await setDoc(doc(db, 'users', user.uid), {
          ...newProfile,
          updatedAt: serverTimestamp()
        });
        setUserProfile({ uid: user.uid, ...newProfile });
        return { uid: user.uid, ...newProfile };
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const initAuth = () => {
      unsubscribe = onAuthStateChanged(auth, async (user) => {
        setCurrentUser(user);
        
        if (user) {
          await fetchUserProfile(user);
        } else {
          setUserProfile(null);
        }
        
        setLoading(false);
        setIsInitialized(true);
      });
    };

    initAuth();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [fetchUserProfile]);

  const login = useCallback(async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const register = useCallback(async (email: string, password: string, displayName?: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName) {
      await updateProfile(user, { displayName });
    }
    
    const userProfile: Omit<UserProfile, 'uid'> = {
      email: user.email || '',
      displayName: displayName || user.email?.split('@')[0] || 'User',
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    
    await setDoc(doc(db, 'users', user.uid), {
      ...userProfile,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  }, []);

  const logout = useCallback(async () => {
    await firebaseSignOut(auth);
    setUserProfile(null);
  }, []);

  const refreshProfile = useCallback(async () => {
    if (currentUser) {
      await fetchUserProfile(currentUser);
    }
  }, [currentUser, fetchUserProfile]);

  const value: AuthContextType = {
    currentUser,
    userProfile,
    userRole: userProfile?.role || null,
    shopId: userProfile?.shopId || null,
    loading,
    isAuthenticated: !!currentUser,
    isVendor: userProfile?.role === 'vendor',
    isAdmin: userProfile?.role === 'admin',
    login,
    register,
    logout,
    refreshProfile
  };

  // Prevent flash of content while loading
  if (!isInitialized && loading) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center">
        <div className="animate-pulse text-[#D93A3A] text-xl font-bold">GulPlaza</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
