// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User as FirebaseUser 
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc } from 'firebase/firestore';
import type { UserProfile } from '@/types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userProfile: UserProfile | null;
  userRole: 'vendor' | 'admin' | 'customer' | null;
  shopId: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName?: string) => Promise<void>;
  logout: () => Promise<void>;
  isVendor: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<'vendor' | 'admin' | 'customer' | null>(null);
  const [shopId, setShopId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user profile from Firestore
        try {
          const profileDoc = await getDoc(doc(db, 'users', user.uid));
          if (profileDoc.exists()) {
            const profile = profileDoc.data() as UserProfile;
            setUserProfile(profile);
            setUserRole(profile.role);
            if (profile.role === 'vendor' && profile.shopId) {
              setShopId(profile.shopId);
            }
          } else {
            // Default to customer if no profile exists
            setUserRole('customer');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
          setUserRole('customer');
        }
      } else {
        setUserProfile(null);
        setUserRole(null);
        setShopId(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string, displayName?: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    
    if (displayName) {
      await updateProfile(user, { displayName });
    }
    
    // Create user profile in Firestore
    const userProfile: Omit<UserProfile, 'uid'> = {
      email: user.email || '',
      displayName: displayName || user.email?.split('@')[0] || 'User',
      role: 'customer',
      createdAt: new Date().toISOString()
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
  };

  const logout = async () => {
    await firebaseSignOut(auth);
    setShopId(null);
    setUserRole(null);
    setUserProfile(null);
  };

  const value = {
    currentUser,
    userProfile,
    userRole,
    shopId,
    loading,
    login,
    register,
    logout,
    isVendor: userRole === 'vendor',
    isAdmin: userRole === 'admin'
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Add missing import
import { setDoc } from 'firebase/firestore';
