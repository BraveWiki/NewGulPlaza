import { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, MessageCircle, CheckCircle, ShoppingBag, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Mock product data
const productData = {
  id: '1',
  name: 'Hand-embroidered Kurta',
  description: 'Beautiful hand-embroidered cotton kurta with traditional patterns. Perfect for casual wear or special occasions. Made with high-quality fabric that is comfortable and durable.',
  price: 2400,
  originalPrice: 3200,
  image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
  stock: 5,
  category: 'Kurtas',
  shopId: '1',
  shopName: "Hina's Boutique",
  shopPhone: '+92-300-1234567',
  shopWhatsapp: '+92-300-1234567',
  shopCity: 'Lahore',
  images: [
    'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80',
    'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80',
    'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
  ],
  features: [
    '100% pure cotton fabric',
    'Hand-embroidered details',
    'Available in multiple sizes',
    'Machine washable',
  ],
};

// Mock related products
const relatedProducts = [
  {
    id: '2',
    name: 'Traditional Scarf',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80',
    shopName: "Hina's Boutique",
  },
  {
    id: '3',
    name: 'Stitched Cotton Suit',
    price: 3500,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80',
    shopName: "Hina's Boutique",
  },
];

export default function ProductPage() {
  const { productId: _productId } = useParams();
  const [searchParams] = useSearchParams();
  const shopId = searchParams.get('shop') || productData.shopId;
  
  const [quantity, setQuantity] = useState(1);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    notes: '',
  });

  const totalPrice = productData.price * quantity;

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= productData.stock) {
      setQuantity(newQuantity);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.phone || !formData.address || !formData.city) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Create order message for WhatsApp
    const message = `
*New Order from GulPlaza Marketplace*

*Product:* ${productData.name}
*Quantity:* ${quantity}
*Total:* Rs ${totalPrice.toLocaleString()}

*Customer Details:*
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}, ${formData.city}

*Notes:* ${formData.notes || 'None'}

*Payment Method:* Cash on Delivery
    `.trim();

    const whatsappUrl = `https://wa.me/${productData.shopWhatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast.success('Order details sent to seller via WhatsApp!');
    setShowOrderForm(false);
  };

  const handleWhatsAppClick = () => {
    const message = `Assalamualaikum! I'm interested in "${productData.name}" from your shop on GulPlaza. Can you provide more details?`;
    const whatsappUrl = `https://wa.me/${productData.shopWhatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F4EFE6] pt-20 pb-16">
      {/* Back Navigation */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-4">
        <Link to={`/shop/${shopId}`}>
          <Button variant="ghost" className="gap-2 text-[#6E6A63] hover:text-[#111111]">
            <ArrowLeft className="w-4 h-4" />
            Back to {productData.shopName}
          </Button>
        </Link>
      </div>

      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div>
              <div className="paper-card overflow-hidden mb-4">
                <div className="relative h-96 md:h-[500px] overflow-hidden">
                  <img 
                    src={productData.images[selectedImage]} 
                    alt={productData.name}
                    className="w-full h-full object-cover"
                  />
                  {productData.originalPrice && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#D93A3A] text-white px-3 py-1 rounded-full text-sm font-medium">
                        Sale
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="flex gap-3">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-[#D93A3A]' 
                        : 'border-transparent hover:border-[#111111]/20'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${productData.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <div className="mb-6">
                <Link to={`/shop/${shopId}`}>
                  <span className="text-sm text-[#D93A3A] font-medium hover:underline">
                    {productData.shopName}
                  </span>
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-[#111111] mt-2 mb-3">
                  {productData.name}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#6E6A63]" />
                  <span className="text-sm text-[#6E6A63]">{productData.shopCity}</span>
                  <span className="text-[#6E6A63]">•</span>
                  <span className="text-sm text-[#6E6A63]">{productData.category}</span>
                </div>
                
                {/* Price */}
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-[#111111]">
                    Rs {productData.price.toLocaleString()}
                  </span>
                  {productData.originalPrice && (
                    <span className="text-xl text-[#6E6A63] line-through">
                      Rs {productData.originalPrice.toLocaleString()}
                    </span>
                  )}
                  {productData.originalPrice && (
                    <span className="bg-[#D93A3A]/10 text-[#D93A3A] px-3 py-1 rounded-full text-sm font-medium">
                      Save Rs {(productData.originalPrice - productData.price).toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-[#111111]/80 leading-relaxed mb-6">
                  {productData.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="font-semibold text-[#111111] mb-3">Features</h3>
                  <ul className="space-y-2">
                    {productData.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-[#111111]/80">
                        <CheckCircle className="w-4 h-4 text-[#D93A3A]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stock Status */}
                <div className="mb-6">
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    productData.stock <= 3 
                      ? 'bg-[#D93A3A]/10 text-[#D93A3A]' 
                      : 'bg-green-100 text-green-700'
                  }`}>
                    <ShoppingBag className="w-4 h-4" />
                    {productData.stock <= 3 
                      ? `Only ${productData.stock} left in stock - Order soon!` 
                      : `${productData.stock} items in stock`}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              {!showOrderForm && (
                <div className="mb-6">
                  <label className="font-semibold text-[#111111] mb-3 block">Quantity</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-[#111111]/20 rounded-full">
                      <button 
                        onClick={() => handleQuantityChange(-1)}
                        className="w-10 h-10 flex items-center justify-center text-[#111111] hover:bg-[#111111]/5 rounded-l-full"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-12 text-center font-medium">{quantity}</span>
                      <button 
                        onClick={() => handleQuantityChange(1)}
                        className="w-10 h-10 flex items-center justify-center text-[#111111] hover:bg-[#111111]/5 rounded-r-full"
                        disabled={quantity >= productData.stock}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-lg font-semibold text-[#111111]">
                      Total: Rs {totalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Order Form */}
              {showOrderForm ? (
                <div className="paper-card p-6 mb-6">
                  <h3 className="font-semibold text-[#111111] mb-4 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#D93A3A]" />
                    Place Your Order
                  </h3>
                  <form onSubmit={handleSubmitOrder} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-[#6E6A63] mb-1 block">Full Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="bg-white border-[#111111]/10"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-sm text-[#6E6A63] mb-1 block">Phone Number *</label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="03XX-XXXXXXX"
                          className="bg-white border-[#111111]/10"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">Delivery Address *</label>
                      <Textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Enter your complete address"
                        className="bg-white border-[#111111]/10"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">City *</label>
                      <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Enter your city"
                        className="bg-white border-[#111111]/10"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm text-[#6E6A63] mb-1 block">Order Notes (Optional)</label>
                      <Textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="Any special instructions for the seller..."
                        className="bg-white border-[#111111]/10"
                      />
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button type="submit" className="btn-primary flex-1 gap-2">
                        <MessageCircle className="w-4 h-4" />
                        Send Order via WhatsApp
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowOrderForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="flex flex-wrap gap-3 mb-6">
                  <Button 
                    className="btn-primary gap-2 flex-1 md:flex-none"
                    onClick={() => setShowOrderForm(true)}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Order Now (COD)
                  </Button>
                  <Button 
                    className="btn-outline gap-2"
                    onClick={handleWhatsAppClick}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Ask Question
                  </Button>
                </div>
              )}

              {/* Trust Badges */}
              <div className="flex flex-wrap gap-4 text-sm text-[#6E6A63]">
                <span className="flex items-center gap-1">
                  <Truck className="w-4 h-4" />
                  Cash on Delivery
                </span>
                <span className="flex items-center gap-1">
                  <Shield className="w-4 h-4" />
                  Verified Seller
                </span>
                <span className="flex items-center gap-1">
                  <CheckCircle className="w-4 h-4" />
                  Quality Guaranteed
                </span>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-title font-bold text-[#111111] mb-6">
              More from {productData.shopName}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <Link 
                  key={product.id}
                  to={`/product/${product.id}?shop=${shopId}`}
                  className="group"
                >
                  <div className="paper-card overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-[#111111] group-hover:text-[#D93A3A] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-[#111111] font-semibold mt-1">
                        Rs {product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
