import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, CheckCircle, Users, Package, TrendingUp, Shield, ArrowRight, Gift, Sparkles, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

const donationAmounts = [500, 1000, 2500, 5000, 10000];

const fundAllocation = [
  { label: 'Inventory & Stock', percentage: 45, icon: Package, color: '#D93A3A' },
  { label: 'Tools & Equipment', percentage: 30, icon: Sparkles, color: '#111111' },
  { label: 'Shop Repairs', percentage: 20, icon: TrendingUp, color: '#6E6A63' },
  { label: 'Platform Operations', percentage: 5, icon: Shield, color: '#D93A3A' },
];

const impactStories = [
  {
    amount: 'Rs 500',
    impact: 'Provides raw materials for a tailor for 3 days',
    beneficiary: 'Hina\'s Boutique',
  },
  {
    amount: 'Rs 1,000',
    impact: 'Helps buy essential repair tools for a technician',
    beneficiary: 'Ali Electronics',
  },
  {
    amount: 'Rs 2,500',
    impact: 'Restocks inventory for a small grocery shop',
    beneficiary: 'Noor Organics',
  },
  {
    amount: 'Rs 5,000',
    impact: 'Funds a month\'s rent for a shop space',
    beneficiary: 'Multiple shops',
  },
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    setShowForm(true);
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
    if (e.target.value) {
      setShowForm(true);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const finalAmount = selectedAmount || parseInt(customAmount);
    
    if (!finalAmount || finalAmount <= 0) {
      toast.error('Please select or enter a donation amount');
      return;
    }

    if (!isAnonymous && !formData.name) {
      toast.error('Please enter your name or choose to donate anonymously');
      return;
    }

    // In a real implementation, this would connect to a payment gateway
    // For now, we'll show a success message
    toast.success('Thank you for your generosity! Redirecting to payment...');
    
    // Simulate redirect to payment
    setTimeout(() => {
      toast.info('Payment integration coming soon!', {
        description: 'We are working with local payment providers to make donations seamless.',
      });
    }, 1500);
  };

  const finalAmount = selectedAmount || parseInt(customAmount) || 0;

  return (
    <div className="min-h-screen bg-[#F4EFE6] pt-24 pb-16">
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-[#D93A3A] flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-display font-bold text-[#111111] mb-6">
            Help Them Restock
          </h1>
          <p className="text-lg text-[#6E6A63] leading-relaxed max-w-2xl mx-auto">
            100% of your donation goes toward inventory, tools, and shop repairs. 
            No platform fees. Every rupee counts toward rebuilding a dream.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="paper-card p-6 text-center">
              <Users className="w-8 h-8 text-[#D93A3A] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#111111] mb-1">45+</p>
              <p className="text-sm text-[#6E6A63]">Shops Supported</p>
            </div>
            <div className="paper-card p-6 text-center">
              <Gift className="w-8 h-8 text-[#D93A3A] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#111111] mb-1">Rs 500K+</p>
              <p className="text-sm text-[#6E6A63]">Donations Received</p>
            </div>
            <div className="paper-card p-6 text-center">
              <TrendingUp className="w-8 h-8 text-[#D93A3A] mx-auto mb-3" />
              <p className="text-3xl font-bold text-[#111111] mb-1">100%</p>
              <p className="text-sm text-[#6E6A63]">Goes to Shopkeepers</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <div>
              <div className="paper-card p-8">
                <h2 className="text-title font-bold text-[#111111] mb-6">
                  Make a Donation
                </h2>

                {/* Amount Selection */}
                <div className="mb-6">
                  <label className="font-medium text-[#111111] mb-3 block">
                    Select Amount
                  </label>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    {donationAmounts.map((amount) => (
                      <button
                        key={amount}
                        onClick={() => handleAmountSelect(amount)}
                        className={`py-3 px-4 rounded-xl font-semibold transition-all ${
                          selectedAmount === amount
                            ? 'bg-[#D93A3A] text-white'
                            : 'bg-white border border-[#111111]/10 text-[#111111] hover:border-[#D93A3A]'
                        }`}
                      >
                        Rs {amount.toLocaleString()}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6E6A63]">Rs</span>
                    <Input
                      type="number"
                      placeholder="Enter custom amount"
                      value={customAmount}
                      onChange={handleCustomAmount}
                      className="pl-10 py-6 bg-white border-[#111111]/10"
                    />
                  </div>
                </div>

                {/* Donor Form */}
                {showForm && (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-3 p-4 bg-[#D93A3A]/5 rounded-xl mb-4">
                      <CheckCircle className="w-5 h-5 text-[#D93A3A]" />
                      <span className="text-[#111111] font-medium">
                        Donating: Rs {finalAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-4">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="w-4 h-4 rounded border-[#111111]/20"
                      />
                      <label htmlFor="anonymous" className="text-sm text-[#111111]">
                        Donate anonymously
                      </label>
                    </div>

                    {!isAnonymous && (
                      <div>
                        <label className="text-sm text-[#6E6A63] mb-1 block">Full Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="bg-white border-[#111111]/10"
                          required={!isAnonymous}
                        />
                      </div>
                    )}

                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">Email (Optional)</label>
                      <Input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="For donation receipt"
                        className="bg-white border-[#111111]/10"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">Message (Optional)</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Leave a message for the shopkeepers..."
                        className="bg-white border-[#111111]/10"
                      />
                    </div>

                    <Button type="submit" className="btn-accent w-full gap-2 py-6">
                      <Heart className="w-5 h-5" />
                      Complete Donation
                    </Button>

                    <p className="text-xs text-[#6E6A63] text-center">
                      Your donation will be securely processed. You will receive a confirmation via email.
                    </p>
                  </form>
                )}
              </div>

              {/* Impact Examples */}
              <div className="mt-6">
                <h3 className="font-semibold text-[#111111] mb-4">
                  Your Impact
                </h3>
                <div className="space-y-3">
                  {impactStories.map((story, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 bg-white rounded-xl">
                      <div className="w-10 h-10 rounded-full bg-[#D93A3A]/10 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-[#D93A3A]" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#111111]">{story.amount}</p>
                        <p className="text-sm text-[#6E6A63]">{story.impact}</p>
                        <p className="text-xs text-[#D93A3A] mt-1">{story.beneficiary}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Fund Allocation */}
            <div>
              <div className="paper-card p-8 mb-6">
                <h2 className="text-title font-bold text-[#111111] mb-6">
                  How Funds Are Used
                </h2>
                <p className="text-[#6E6A63] mb-8">
                  We believe in complete transparency. Here's how your donations are allocated 
                  to help shopkeepers rebuild their businesses.
                </p>

                <div className="space-y-6">
                  {fundAllocation.map((item, index) => (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${item.color}15` }}
                          >
                            <item.icon className="w-5 h-5" style={{ color: item.color }} />
                          </div>
                          <span className="font-medium text-[#111111]">{item.label}</span>
                        </div>
                        <span className="font-bold text-[#111111]">{item.percentage}%</span>
                      </div>
                      <div className="h-2 bg-[#111111]/10 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${item.percentage}%`,
                            backgroundColor: item.color 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-[#D93A3A]/5 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-[#D93A3A] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#111111] mb-1">100% Transparent</p>
                      <p className="text-sm text-[#6E6A63]">
                        We publish monthly reports showing exactly how donations are used. 
                        No hidden fees, no administrative costs taken from your donation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonial */}
              <div className="accent-card p-8">
                <Quote className="w-8 h-8 text-white/40 mb-4" />
                <blockquote className="text-white text-lg italic leading-relaxed mb-6">
                  "The donations we received through GulPlaza helped us buy new equipment 
                  and restock our inventory. We are forever grateful to the community 
                  that stood by us."
                </blockquote>
                <div className="flex items-center gap-4">
                  <img 
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80"
                    alt="Hina Yousuf"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-white">Hina Yousuf</p>
                    <p className="text-white/70 text-sm">Hina's Boutique</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-title font-bold text-[#111111] mb-4">
            Want to Do More?
          </h2>
          <p className="text-[#6E6A63] mb-8">
            Browse our shopkeepers and support them by purchasing their products.
          </p>
          <Link to="/shops">
            <Button className="btn-primary gap-2">
              Browse Shops
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
