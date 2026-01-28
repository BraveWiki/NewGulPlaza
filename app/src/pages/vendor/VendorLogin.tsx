// src/pages/vendor/VendorLogin.tsx
import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Store, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

type AuthMode = 'login' | 'register';

export default function VendorLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated, isVendor, loading: authLoading } = useAuth();
  
  const [mode, setMode] = useState<AuthMode>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    shopName: '',
  });

  // Redirect if already authenticated as vendor
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      if (isVendor) {
        const from = location.state?.from?.pathname || '/vendor/dashboard';
        navigate(from, { replace: true });
      } else {
        // User is authenticated but not a vendor - show message
        toast.info('Please complete your vendor profile setup');
      }
    }
  }, [isAuthenticated, isVendor, authLoading, navigate, location]);

  const validateForm = (): boolean => {
    setFormError(null);
    
    if (!formData.email.trim()) {
      setFormError('Email is required');
      return false;
    }
    
    if (!formData.password) {
      setFormError('Password is required');
      return false;
    }
    
    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters');
      return false;
    }
    
    if (mode === 'register') {
      if (!formData.shopName.trim()) {
        setFormError('Shop name is required');
        return false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        setFormError('Passwords do not match');
        return false;
      }
    }
    
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setFormError(null);

    try {
      if (mode === 'login') {
        await login(formData.email, formData.password);
        toast.success('Welcome back!');
      } else {
        await register(formData.email, formData.password, formData.shopName);
        toast.success('Account created! Please set up your shop profile.');
        navigate('/vendor/onboarding');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      const errorMessage = error.code === 'auth/user-not-found' 
        ? 'No account found with this email'
        : error.code === 'auth/wrong-password'
        ? 'Incorrect password'
        : error.code === 'auth/email-already-in-use'
        ? 'An account already exists with this email'
        : error.message || 'Authentication failed. Please try again.';
      setFormError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'register' : 'login');
    setFormError(null);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      shopName: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-full bg-[#D93A3A] flex items-center justify-center transition-transform group-hover:scale-105">
              <Store className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-[#111111]">
              GulPlaza
            </span>
          </Link>
          <p className="text-[#6E6A63] mt-2">
            Vendor Portal
          </p>
        </div>

        {/* Form Card */}
        <div className="paper-card p-8">
          <h1 className="text-2xl font-bold text-[#111111] mb-2 text-center">
            {mode === 'login' ? 'Welcome Back' : 'Become a Vendor'}
          </h1>
          <p className="text-[#6E6A63] text-center mb-6">
            {mode === 'login' 
              ? 'Sign in to manage your shop' 
              : 'Create an account to start selling'}
          </p>

          {formError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-sm text-[#6E6A63] mb-1 block">Shop Name</label>
                <div className="relative">
                  <Store className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
                  <Input
                    name="shopName"
                    type="text"
                    value={formData.shopName}
                    onChange={handleInputChange}
                    placeholder="Enter your shop name"
                    className="pl-12 py-6 bg-white border-[#111111]/10"
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm text-[#6E6A63] mb-1 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="pl-12 py-6 bg-white border-[#111111]/10"
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-[#6E6A63] mb-1 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-12 pr-12 py-6 bg-white border-[#111111]/10"
                  disabled={isLoading}
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6E6A63] hover:text-[#111111]"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="text-sm text-[#6E6A63] mb-1 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6A63]" />
                  <Input
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="pl-12 py-6 bg-white border-[#111111]/10"
                    disabled={isLoading}
                    autoComplete="new-password"
                  />
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full btn-primary gap-2 py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Please wait...
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={toggleMode}
              className="text-[#D93A3A] hover:text-[#C43333] text-sm font-medium"
              disabled={isLoading}
            >
              {mode === 'login' 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>

          {mode === 'login' && (
            <div className="mt-4 text-center">
              <Link 
                to="/forgot-password" 
                className="text-[#6E6A63] hover:text-[#111111] text-sm"
              >
                Forgot password?
              </Link>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-[#6E6A63] hover:text-[#111111] text-sm">
            ← Back to GulPlaza
          </Link>
        </div>
      </div>
    </div>
  );
}
