import { Link } from 'react-router-dom';
import { ArrowRight, Quote, Store, Heart, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock stories data
const stories = [
  {
    id: '1',
    ownerName: 'Hina Yousuf',
    shopName: "Hina's Boutique",
    category: 'Fashion',
    city: 'Lahore',
    quote: 'I started with one sewing machine. After the fire, I thought it was over. But the community kept showing up.',
    fullStory: `Hina started her boutique five years ago with just one sewing machine in her mother's garage. She built a loyal customer base through word of mouth and her reputation for quality work.

When the fire destroyed GulPlaza, Hina lost not just her inventory but also years of hard work and dreams. "I remember standing there, watching the smoke rise. I thought everything was over," she recalls.

But the community response was overwhelming. Friends, family, and even strangers came forward to help. Through the GulPlaza Marketplace, Hina has been able to reach new customers and slowly rebuild her business.

Today, she has three sewing machines and employs two other women from the community. "Every order I receive reminds me that people care. It's not just about the money—it's about the trust they place in me."`,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80',
    shopImage: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80',
    productsCount: 24,
    ordersCompleted: 156,
    impact: 'Employs 2 women from the community',
  },
  {
    id: '2',
    ownerName: 'Rashid Ahmed',
    shopName: 'Rashid Mobile Corner',
    category: 'Electronics',
    city: 'Lahore',
    quote: 'Every repair I complete is a step toward rebuilding what we lost. Your trust keeps me going.',
    fullStory: `Rashid has been repairing mobile phones for over a decade. His small corner shop in GulPlaza was known for honest service and fair prices. "I never charged more than what was fair," he says.

The fire took everything—his tools, his spare parts inventory, and his repair station. But it couldn't take his skills and reputation. Within days of the disaster, his customers started calling, asking when he would be back.

With support from the community and the GulPlaza Marketplace, Rashid was able to purchase new tools and restock essential parts. He now offers pickup and delivery services, reaching even more customers than before.

"Every phone I fix is a promise kept. My customers trusted me to come back, and I won't let them down."`,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    shopImage: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80',
    productsCount: 32,
    ordersCompleted: 289,
    impact: 'Serves 50+ customers monthly',
  },
  {
    id: '3',
    ownerName: 'Sara Khan',
    shopName: 'Home Bakes',
    category: 'Food',
    city: 'Islamabad',
    quote: 'Baking was my passion. Now, with every order, I feel like I am rising again too.',
    fullStory: `Sara turned her passion for baking into a business two years ago. What started as baking for family and friends quickly grew into a small home-based business. Her specialty cakes and cookies became popular in her neighborhood.

The fire affected her community deeply, and Sara wanted to help. She started offering special discounts for families who had lost their homes and businesses. "Food brings comfort," she says. "I wanted to bring a little sweetness during a difficult time."

Through the GulPlaza Marketplace, Sara has been able to expand her reach beyond her immediate neighborhood. She now takes orders from across the city and has hired an assistant to help with the growing demand.

"Every cake I bake is made with love. When customers tell me it made their day special, that's my biggest reward."`,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80',
    shopImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
    productsCount: 18,
    ordersCompleted: 203,
    impact: 'Hired 1 assistant, expanded city-wide',
  },
  {
    id: '4',
    ownerName: 'Ali Hassan',
    shopName: 'Ali Electronics',
    category: 'Electronics',
    city: 'Karachi',
    quote: 'Repairs you can trust—delivered in 48 hours. This is my promise to every customer.',
    fullStory: `Ali learned electronics repair from his father, who ran a small repair shop for thirty years. When his father retired, Ali took over and brought the business online.

The fire was devastating. Ali lost his entire workshop and inventory of spare parts. But he was determined to rebuild—not just for himself, but for his father's legacy.

With community support and the GulPlaza Marketplace, Ali has rebuilt his workshop better than before. He now offers a 48-hour repair guarantee and home pickup services.

"My father taught me that honesty is the best business policy. I honor his memory with every repair I complete."`,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80',
    shopImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80',
    productsCount: 15,
    ordersCompleted: 178,
    impact: '48-hour repair guarantee',
  },
  {
    id: '5',
    ownerName: 'Fatima Zahra',
    shopName: 'Noor Organics',
    category: 'Groceries',
    city: 'Lahore',
    quote: 'Organic farming is my passion. Every spice packet carries the love of our land.',
    fullStory: `Fatima comes from a family of farmers. She started Noor Organics to bring pure, organic spices and dry fruits directly from farms to consumers.

The fire destroyed her packaging unit and warehouse. But her network of farmers stood by her, offering credit and support until she could get back on her feet.

Through the GulPlaza Marketplace, Fatima has been able to tell her story and connect with customers who value organic, ethically-sourced products. She now works with over twenty farming families across Punjab.

"When you buy from Noor Organics, you're not just getting pure products—you're supporting an entire ecosystem of farmers and their families."`,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80',
    shopImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
    productsCount: 67,
    ordersCompleted: 412,
    impact: 'Supports 20+ farming families',
  },
  {
    id: '6',
    ownerName: 'Muhammad Karim',
    shopName: 'Karim Book Center',
    category: 'Books',
    city: 'Lahore',
    quote: 'Books are knowledge, and knowledge should be accessible to everyone.',
    fullStory: `Karim has been selling books for over twenty years. His shop in GulPlaza was a gathering place for students, teachers, and book lovers.

The fire destroyed thousands of books—his entire inventory. But the community rallied around him. Students who had bought books from him over the years started a crowdfunding campaign.

With the funds raised and support from the GulPlaza Marketplace, Karim has been able to restock his store. He now also offers a book exchange program and study space for students.

"A bookshop is more than a business—it's a community resource. I'm grateful to be able to serve my community again."`,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80',
    shopImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    productsCount: 150,
    ordersCompleted: 567,
    impact: 'Free study space for students',
  },
];

const impactStats = [
  { label: 'Shopkeepers Supported', value: '45+', icon: Store },
  { label: 'Orders Completed', value: '1,800+', icon: TrendingUp },
  { label: 'Community Jobs Created', value: '120+', icon: Heart },
];

export default function StoriesPage() {
  return (
    <div className="min-h-screen bg-[#F4EFE6] pt-24 pb-16">
      {/* Hero Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="tag mb-4 inline-block">Stories of Resilience</span>
          <h1 className="text-display font-bold text-[#111111] mb-6">
            Meet the Shopkeepers
          </h1>
          <p className="text-lg text-[#6E6A63] leading-relaxed max-w-2xl mx-auto">
            Behind every shop is a story of hope, resilience, and the dream to rebuild. 
            Read their journeys and be part of their comeback.
          </p>
        </div>
      </div>

      {/* Impact Stats */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-16">
        <div className="max-w-4xl mx-auto">
          <div className="paper-card p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              {impactStats.map((stat, index) => (
                <div key={index}>
                  <stat.icon className="w-8 h-8 text-[#D93A3A] mx-auto mb-3" />
                  <p className="text-3xl font-bold text-[#111111] mb-1">{stat.value}</p>
                  <p className="text-sm text-[#6E6A63]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Story */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mb-16">
        <div className="max-w-6xl mx-auto">
          <div className="paper-card overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <img 
                  src={stories[0].image} 
                  alt={stories[0].ownerName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white/80 text-sm mb-1">{stories[0].city}</p>
                  <p className="text-white text-2xl font-bold">{stories[0].ownerName}</p>
                  <p className="text-white/80">{stories[0].shopName}</p>
                </div>
              </div>
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <Quote className="w-10 h-10 text-[#D93A3A]/30 mb-4" />
                <blockquote className="text-xl text-[#111111] italic leading-relaxed mb-6">
                  "{stories[0].quote}"
                </blockquote>
                <p className="text-[#111111]/80 leading-relaxed mb-6">
                  {stories[0].fullStory.split('\n\n')[0]}
                </p>
                <div className="flex items-center gap-4 mb-6">
                  <span className="tag">{stories[0].category}</span>
                  <span className="text-sm text-[#6E6A63]">{stories[0].impact}</span>
                </div>
                <Link to={`/shop/${stories[0].id}`}>
                  <Button className="btn-primary gap-2 w-fit">
                    Visit Shop
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* All Stories Grid */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-title font-bold text-[#111111] mb-8">
            More Stories of Hope
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.slice(1).map((story, index) => (
              <div 
                key={story.id}
                className="paper-card overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
                style={{ transform: `rotate(${index % 2 === 0 ? '-0.5' : '0.5'}deg)` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.ownerName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-lg">{story.ownerName}</p>
                    <p className="text-white/80 text-sm">{story.shopName}</p>
                  </div>
                </div>
                <div className="p-6">
                  <Quote className="w-6 h-6 text-[#D93A3A]/30 mb-3" />
                  <blockquote className="text-[#111111]/80 italic mb-4 line-clamp-3">
                    "{story.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="tag text-xs">{story.category}</span>
                    <span className="text-xs text-[#6E6A63]">{story.city}</span>
                  </div>
                  <Link to={`/shop/${story.id}`}>
                    <Button variant="ghost" className="p-0 h-auto text-[#D93A3A] hover:text-[#C43333] gap-2">
                      Read Full Story
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 mt-16">
        <div className="max-w-4xl mx-auto">
          <div className="accent-card p-8 md:p-12 text-center">
            <Heart className="w-12 h-12 text-white/80 mx-auto mb-6" />
            <h2 className="text-headline font-bold text-white mb-4">
              Be Part of Their Story
            </h2>
            <p className="text-white/80 max-w-lg mx-auto mb-8">
              Every purchase you make helps these shopkeepers rebuild their lives. 
              Browse their shops and support local businesses today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/shops">
                <Button className="bg-white text-[#D93A3A] hover:bg-white/90 gap-2">
                  <Store className="w-4 h-4" />
                  Browse All Shops
                </Button>
              </Link>
              <Link to="/donate">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 gap-2">
                  <Heart className="w-4 h-4" />
                  Make a Donation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
