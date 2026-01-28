// src/pages/AdminPage.tsx
import { useState } from 'react';
import { SeedDatabaseButton } from '@/components/SeedDatabaseButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Shield, AlertTriangle } from 'lucide-react';

export default function AdminPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [adminKey, setAdminKey] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  // Simple admin verification (in production, use proper admin claims)
  const verifyAdmin = () => {
    if (adminKey === 'gulplaza-admin-2024') {
      setIsVerified(true);
    } else {
      alert('Invalid admin key');
    }
  };

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-[#F4EFE6] flex items-center justify-center p-4">
        <div className="max-w-md w-full paper-card p-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-8 h-8 text-[#D93A3A]" />
            <h1 className="text-2xl font-bold text-[#111111]">Admin Access</h1>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-[#6E6A63] mb-2 block">Admin Key</label>
              <Input
                type="password"
                value={adminKey}
                onChange={(e) => setAdminKey(e.target.value)}
                placeholder="Enter admin key"
                className="bg-white"
              />
            </div>
            <Button onClick={verifyAdmin} className="w-full btn-primary">
              Verify Access
            </Button>
          </div>

          <div className="mt-6 flex items-start gap-2 p-4 bg-amber-50 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              This area is restricted. Only authorized administrators can seed the database.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EFE6] pt-24 pb-16">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-display font-bold text-[#111111] mb-8">
            Database Administration
          </h1>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Seed Database Card */}
            <div className="paper-card p-6">
              <h2 className="text-title font-semibold text-[#111111] mb-4">
                Seed Database
              </h2>
              <p className="text-[#6E6A63] mb-6">
                Populate the database with sample data in Urdu (Arabic script). 
                This includes shops, products, stories, and sample orders.
              </p>
              <SeedDatabaseButton />
            </div>

            {/* Database Stats Card */}
            <div className="paper-card p-6">
              <h2 className="text-title font-semibold text-[#111111] mb-4">
                Data Preview
              </h2>
              <ul className="space-y-2 text-sm text-[#6E6A63]">
                <li>• 9 Sample Shops (Lahore, Karachi, Islamabad, etc.)</li>
                <li>• 15+ Products across multiple categories</li>
                <li>• 6 Inspirational Stories</li>
                <li>• Sample Orders with customer data</li>
                <li>• All content in Urdu (Arabic script)</li>
              </ul>
            </div>
          </div>

          {/* Content Preview */}
          <div className="mt-8 paper-card p-6">
            <h2 className="text-title font-semibold text-[#111111] mb-4">
              Sample Content Preview
            </h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-semibold text-[#111111] mb-2">Shop Names</h3>
                <p className="text-[#6E6A63]">حنا کی باؤٹیک</p>
                <p className="text-[#6E6A63]">علی الیکٹرانکس</p>
                <p className="text-[#6E6A63]">نور آرگینکس</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-semibold text-[#111111] mb-2">Categories</h3>
                <p className="text-[#6E6A63]">فیشن اور خیاطی</p>
                <p className="text-[#6E6A63]">الیکٹرانکس اور مرمت</p>
                <p className="text-[#6E6A63]">کریانہ اور مسالے</p>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h3 className="font-semibold text-[#111111] mb-2">Cities</h3>
                <p className="text-[#6E6A63]">لاہور</p>
                <p className="text-[#6E6A63]">کراچی</p>
                <p className="text-[#6E6A63]">اسلام آباد</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
