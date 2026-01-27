import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Store, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function VendorLogin() {
  const navigate = useNavigate();
  const { login, register, currentUser } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    shopName: '',
  });

  // Redirect if already logged in
  if (currentUser) {
    navigate('/vendor/dashboard');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        await login(formData.email, formData.password);
        toast.success('Welcome back!');
        navigate('/vendor/dashboard');
      } else {
        // Register
        if (formData.password !== formData.confirmPassword) {
          toast.error('Passwords do not match');
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          toast.error('Password must be at least 6 characters');
          setIsLoading(false);
          return;
        }
        
        await register(formData.email, formData.password);
        toast.success('Account created successfully!');
        navigate('/vendor/dashboard');
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      toast.error(error.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
            Vendor Dashboard
          </p>
        </div>

        {/* Form Card */}
        <div className="paper-card p-8">
          <h1 className="text-2xl font-bold text-[#111111] mb-2 text-center">
            {isLogin ? 'Welcome Back' : 'Join GulPlaza'}
          </h1>
          <p className="text-[#6E6A63] text-center mb-6">
            {isLogin 
              ? 'Sign in to manage your shop' 
              : 'Create an account to start selling'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
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
                    required={!isLogin}
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
                  required
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
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6E6A63] hover:text-[#111111]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {!isLogin && (
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
                    required={!isLogin}
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
                  {isLogin ? 'Sign In' : 'Create Account'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#D93A3A] hover:text-[#C43333] text-sm font-medium"
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>

          {isLogin && (
            <div className="mt-4 text-center">
              <button className="text-[#6E6A63] hover:text-[#111111] text-sm">
                Forgot password?
              </button>
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-[#6E6A63] hover:text-[#111111] text-sm">
            ← Back to GulPlaza
          </Link>
        </div>

        {/* Demo Credentials */}
        <div className="mt-8 p-4 bg-[#111111]/5 rounded-xl">
          <p className="text-xs text-[#6E6A63] text-center">
            <strong>Demo:</strong> Use any email and password (min 6 chars) to login. 
            Firebase authentication will be set up separately.
          </p>
        </div>
      </div>
    </div>
  );
}
