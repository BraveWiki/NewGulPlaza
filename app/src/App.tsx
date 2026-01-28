import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { Toaster } from '@/components/ui/sonner';

// Public Pages
import AdminPage from '@/pages/AdminPage';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import StoriesPage from '@/pages/StoriesPage';
import DonatePage from '@/pages/DonatePage';
import AllShopsPage from '@/pages/AllShopsPage';

// Vendor Dashboard Pages
import VendorLogin from '@/pages/vendor/VendorLogin';
import VendorDashboard from '@/pages/vendor/VendorDashboard';
import VendorProducts from '@/pages/vendor/VendorProducts';
import VendorOrders from '@/pages/vendor/VendorOrders';
import VendorProfile from '@/pages/vendor/VendorProfile';

// Components
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#F4EFE6]">
          {/* Grain Overlay */}
          <div className="grain-overlay" />
          
          {/* Navigation */}
          <Navbar />
          
          {/* Main Content */}
          <main>
            <Routes>
              {/* Public Routes */}
            
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/shops" element={<AllShopsPage />} />
              <Route path="/shop/:shopId" element={<ShopPage />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/stories" element={<StoriesPage />} />
              <Route path="/donate" element={<DonatePage />} />
              
              {/* Vendor Routes */}
              <Route path="/vendor/login" element={<VendorLogin />} />
              <Route path="/vendor/dashboard" element={
                <ProtectedRoute>
                  <VendorDashboard />
                </ProtectedRoute>
              } />
              <Route path="/vendor/products" element={
                <ProtectedRoute>
                  <VendorProducts />
                </ProtectedRoute>
              } />
              <Route path="/vendor/orders" element={
                <ProtectedRoute>
                  <VendorOrders />
                </ProtectedRoute>
              } />
              <Route path="/vendor/profile" element={
                <ProtectedRoute>
                  <VendorProfile />
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          
          {/* Footer */}
          <Footer />
          
          {/* Toast Notifications */}
          <Toaster position="top-center" />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
