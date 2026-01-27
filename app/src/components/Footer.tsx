import { Link } from 'react-router-dom';
import { Store, Mail, Phone, Heart, Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    marketplace: [
      { label: 'All Shops', path: '/shops' },
      { label: 'Featured Products', path: '/shops' },
      { label: 'Categories', path: '/shops' },
    ],
    community: [
      { label: 'Shop Stories', path: '/stories' },
      { label: 'Donate', path: '/donate' },
      { label: 'How it Works', path: '/' },
    ],
    vendor: [
      { label: 'Vendor Login', path: '/vendor/login' },
      { label: 'Open Your Shop', path: '/vendor/login' },
      { label: 'Dashboard', path: '/vendor/dashboard' },
    ],
  };

  return (
    <footer className="bg-[#111111] text-[#F4EFE6] py-16 md:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#D93A3A] flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl tracking-tight">
                GulPlaza
              </span>
            </Link>
            <p className="text-[#F4EFE6]/70 text-sm leading-relaxed max-w-sm mb-6">
              Supporting local shopkeepers who lost their businesses in the fire. 
              Every purchase helps rebuild a dream. Together, we can make a difference.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#F4EFE6]/10 flex items-center justify-center hover:bg-[#D93A3A] transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#F4EFE6]/10 flex items-center justify-center hover:bg-[#D93A3A] transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#F4EFE6]/10 flex items-center justify-center hover:bg-[#D93A3A] transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Marketplace Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#F4EFE6]/50">
              Marketplace
            </h4>
            <ul className="space-y-3">
              {footerLinks.marketplace.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-[#F4EFE6]/70 hover:text-[#F4EFE6] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#F4EFE6]/50">
              Community
            </h4>
            <ul className="space-y-3">
              {footerLinks.community.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-[#F4EFE6]/70 hover:text-[#F4EFE6] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vendor Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-4 text-[#F4EFE6]/50">
              For Vendors
            </h4>
            <ul className="space-y-3">
              {footerLinks.vendor.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-[#F4EFE6]/70 hover:text-[#F4EFE6] transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="mt-12 pt-8 border-t border-[#F4EFE6]/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
              <a 
                href="mailto:gulplaza@support.local"
                className="flex items-center gap-2 text-[#F4EFE6]/70 hover:text-[#F4EFE6] transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                gulplaza@support.local
              </a>
              <a 
                href="tel:+923001234567"
                className="flex items-center gap-2 text-[#F4EFE6]/70 hover:text-[#F4EFE6] transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                +92-300-1234567
              </a>
            </div>
            <p className="text-[#F4EFE6]/50 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-[#D93A3A]" /> for GulPlaza Shopkeepers
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-[#F4EFE6]/10 text-center">
          <p className="text-[#F4EFE6]/40 text-xs">
            © {currentYear} GulPlaza Marketplace. Built to support local businesses. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
