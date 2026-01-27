import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  ArrowLeft, 
  Store, 
  MapPin, 
  Phone, 
  Mail, 
  Camera,
  Save,
  CheckCircle,
  Link as LinkIcon,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Mock profile data
const initialProfile = {
  shopName: "Hina's Boutique",
  shopNameUrdu: 'حینا باؤٹیک',
  ownerName: 'Hina Yousuf',
  email: 'hina.boutique@example.com',
  phone: '+92-300-1234567',
  whatsapp: '+92-300-1234567',
  address: 'Shop #45, GulPlaza Market',
  city: 'Lahore',
  category: 'Fashion',
  description: 'Hina\'s Boutique offers handpicked fabrics and traditional wear at honest prices. Every piece is crafted with care and attention to detail.',
  story: 'I started with one sewing machine in my mother\'s garage. After the fire, I thought it was over. But the community kept showing up. Today, I am stitching again—stronger and more determined than ever.',
  shopUrl: 'gulplaza.shop/hinas-boutique',
  isVerified: true,
  isFeatured: true,
  joinedDate: 'March 2024',
  logo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
  coverImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80',
};

const categories = ['Fashion', 'Electronics', 'Food', 'Beauty', 'Books', 'Groceries', 'Services'];

export default function VendorProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialProfile);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = () => {
    setProfile(formData);
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  const handleCancel = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  const copyShopUrl = () => {
    navigator.clipboard.writeText(`https://${profile.shopUrl}`);
    toast.success('Shop URL copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6]">
      {/* Header */}
      <div className="bg-[#111111] text-white p-4 lg:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/vendor/dashboard">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold">Shop Profile</h1>
              <p className="text-white/60 text-sm">Manage your shop details</p>
            </div>
          </div>
          {!isEditing ? (
            <Button 
              className="bg-[#D93A3A] hover:bg-[#C43333] gap-2"
              onClick={() => setIsEditing(true)}
            >
              <User className="w-4 h-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#D93A3A] hover:bg-[#C43333] gap-2"
                onClick={handleSave}
              >
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Cover Image */}
          <div className="paper-card overflow-hidden mb-6">
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img 
                src={profile.coverImage} 
                alt="Shop Cover"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {isEditing && (
                <button className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#111111] px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-colors">
                  <Camera className="w-4 h-4" />
                  Change Cover
                </button>
              )}

              {/* Logo */}
              <div className="absolute -bottom-12 left-6 md:left-10">
                <div className="relative">
                  <img 
                    src={profile.logo} 
                    alt="Shop Logo"
                    className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-[#F4EFE6] shadow-lg"
                  />
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#D93A3A] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-[#C43333] transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  )}
                  {profile.isVerified && (
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-16 pb-6 px-6 md:px-10">
              {!isEditing ? (
                <div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-[#111111]">
                        {profile.shopName}
                      </h2>
                      <p className="text-[#6E6A63] font-urdu text-lg">
                        {profile.shopNameUrdu}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="tag">{profile.category}</span>
                      {profile.isFeatured && (
                        <span className="tag-accent">Featured</span>
                      )}
                    </div>
                  </div>

                  {/* Shop URL */}
                  <div className="flex items-center gap-3 p-4 bg-[#111111]/5 rounded-xl mb-6">
                    <LinkIcon className="w-5 h-5 text-[#6E6A63]" />
                    <span className="text-[#111111] font-medium flex-1">
                      {profile.shopUrl}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="gap-1 text-[#D93A3A]"
                      onClick={copyShopUrl}
                    >
                      Copy
                    </Button>
                    <Link to={`/shop/1`} target="_blank">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="gap-1"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View
                      </Button>
                    </Link>
                  </div>

                  <p className="text-[#111111]/80 leading-relaxed mb-6">
                    {profile.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-[#111111] flex items-center gap-2">
                        <Store className="w-5 h-5 text-[#D93A3A]" />
                        Contact Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <p className="flex items-center gap-2 text-[#6E6A63]">
                          <User className="w-4 h-4" />
                          {profile.ownerName}
                        </p>
                        <p className="flex items-center gap-2 text-[#6E6A63]">
                          <Mail className="w-4 h-4" />
                          {profile.email}
                        </p>
                        <p className="flex items-center gap-2 text-[#6E6A63]">
                          <Phone className="w-4 h-4" />
                          {profile.phone}
                        </p>
                        <p className="flex items-center gap-2 text-[#6E6A63]">
                          <MapPin className="w-4 h-4" />
                          {profile.address}, {profile.city}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#111111] mb-3 flex items-center gap-2">
                        <User className="w-5 h-5 text-[#D93A3A]" />
                        Your Story
                      </h3>
                      <p className="text-sm text-[#111111]/80 leading-relaxed italic">
                        "{profile.story}"
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">Shop Name *</label>
                      <Input
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleInputChange}
                        className="bg-white border-[#111111]/10"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">Shop Name (Urdu)</label>
                      <Input
                        name="shopNameUrdu"
                        value={formData.shopNameUrdu}
                        onChange={handleInputChange}
                        className="bg-white border-[#111111]/10 font-urdu"
                        dir="rtl"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">Owner Name *</label>
                      <Input
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleInputChange}
                        className="bg-white border-[#111111]/10"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">Category *</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg border border-[#111111]/10 bg-white"
                      >
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-[#6E6A63] mb-1 block">Shop Description *</label>
                    <Textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="bg-white border-[#111111]/10"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#6E6A63] mb-1 block">Your Story *</label>
                    <Textarea
                      name="story"
                      value={formData.story}
                      onChange={handleInputChange}
                      rows={4}
                      className="bg-white border-[#111111]/10"
                      placeholder="Share your journey and how the fire affected your business..."
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">Email *</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-white border-[#111111]/10"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">Phone *</label>
                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="bg-white border-[#111111]/10"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">WhatsApp</label>
                      <Input
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="bg-white border-[#111111]/10"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">City *</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="bg-white border-[#111111]/10"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-[#6E6A63] mb-1 block">Shop Address *</label>
                    <Input
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="bg-white border-[#111111]/10"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-[#6E6A63] mb-1 block">Custom Shop URL</label>
                    <div className="flex items-center gap-2">
                      <span className="text-[#6E6A63]">gulplaza.shop/</span>
                      <Input
                        name="shopUrl"
                        value={formData.shopUrl.replace('gulplaza.shop/', '')}
                        onChange={(e) => setFormData(prev => ({ ...prev, shopUrl: `gulplaza.shop/${e.target.value}` }))}
                        className="bg-white border-[#111111]/10 flex-1"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tips Card */}
          <div className="paper-card p-6">
            <h3 className="font-semibold text-[#111111] mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#D93A3A]" />
              Tips for a Great Shop Profile
            </h3>
            <ul className="space-y-2 text-sm text-[#6E6A63]">
              <li className="flex items-start gap-2">
                <span className="text-[#D93A3A]">•</span>
                Use a clear, high-quality photo for your shop logo and cover image
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D93A3A]">•</span>
                Write a compelling story that connects with potential customers
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D93A3A]">•</span>
                Keep your contact information up to date for easy communication
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#D93A3A]">•</span>
                Share your shop URL on social media to attract more customers
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
