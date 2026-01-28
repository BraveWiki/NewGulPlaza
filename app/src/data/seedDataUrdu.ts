// src/data/seedDataUrdu.ts
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import type { Shop, Product, Story } from '@/types';

// Helper to create timestamps
const timestamp = () => serverTimestamp();

// Categories in Urdu
export const categoriesUrdu = [
  { id: 'fashion', name: 'فیشن اور خیاطی', nameEn: 'Fashion & Tailoring' },
  { id: 'electronics', name: 'الیکٹرانکس اور مرمت', nameEn: 'Electronics & Repair' },
  { id: 'food', name: 'گھر کا کھانا', nameEn: 'Home Food' },
  { id: 'beauty', name: 'خوبصورتی اور دیکھ بھال', nameEn: 'Beauty & Care' },
  { id: 'books', name: 'کتابیں اور سٹیشنری', nameEn: 'Books & Stationery' },
  { id: 'groceries', name: 'کریانہ اور مسالے', nameEn: 'Groceries & Spices' },
  { id: 'handicrafts', name: 'دستکاری', nameEn: 'Handicrafts' },
  { id: 'services', name: 'خدمات', nameEn: 'Services' }
];

// Cities in Urdu
export const citiesUrdu = [
  { name: 'لاہور', nameEn: 'Lahore' },
  { name: 'کراچی', nameEn: 'Karachi' },
  { name: 'اسلام آباد', nameEn: 'Islamabad' },
  { name: 'راولپنڈی', nameEn: 'Rawalpindi' },
  { name: 'فیصل آباد', nameEn: 'Faisalabad' },
  { name: 'ملتان', nameEn: 'Multan' },
  { name: 'پشاور', nameEn: 'Peshawar' },
  { name: 'کوئٹہ', nameEn: 'Quetta' }
];

// Sample Shops Data in Urdu
export const shopsData: Omit<Shop, 'id'>[] = [
  {
    name: "حنا کی باؤٹیک",
    shopNameUrdu: "حنا کی باؤٹیک",
    ownerName: "حنا یوسف",
    email: "hina.boutique@example.com",
    phone: "+92-300-1234567",
    whatsapp: "+92-300-1234567",
    address: "دکان نمبر 45، گل پلازہ مارکیٹ، مین بلیوارڈ",
    city: "لاہور",
    category: "فیشن اور خیاطی",
    description: "روایتی لباس اور روزمرہ کی خوبصورتی۔ چنے ہوئے کپڑے، ایماندار قیمتیں، اور ایک نئی شروعات۔ ہر آرڈر حنا کو دوبارہ اسٹاک خریدنے اور تعمیر نو میں مدد کرتا ہے۔",
    story: "میں نے اپنی ماں کے گیراج میں ایک سلائی مشین سے شروعات کی۔ آگ کے بعد، مجھے لگا کہ سب کچھ ختم ہو گیا ہے۔ لیکن لوگوں نے مجھے ہارنے نہیں دیا۔ آج میں پھر سلائی کر رہی ہوں — پہلے سے زیادہ مضبوط اور پرعزم۔",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    ownerImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    isVerified: true,
    isFeatured: true,
    joinedDate: "مارچ 2024",
    productsCount: 24,
    ordersCompleted: 156,
    rating: 4.8,
    userId: "user_hina_001",
    status: 'active'
  },
  {
    name: "علی الیکٹرانکس",
    shopNameUrdu: "علی الیکٹرانکس",
    ownerName: "علی حسن",
    email: "ali.electronics@example.com",
    phone: "+92-301-2345678",
    whatsapp: "+92-301-2345678",
    address: "دکان نمبر 12، گل پلازہ، لاہور",
    city: "لاہور",
    category: "الیکٹرانکس اور مرمت",
    description: "اعتماد کے قابل مرمت — 48 گھنٹوں میں ترسیل۔ موبائل، لیپ ٹاپ، اور گھریلو آلات کی مرمت۔",
    story: "میں نے اپنے والد سے الیکٹرانکس کی مرمت سیکھی۔ جب گل پلازہ میں آگ لگی تو میرا پورا ورکشاپ تباہ ہو گیا۔ لیکن میرے گاہکوں نے مجھے یاد دلایا کہ میرے پاس میرا حنر ہے۔ آج میں دوبارہ کام کر رہا ہوں — پہلے سے بہتر۔",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&q=80",
    ownerImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    isVerified: true,
    isFeatured: true,
    joinedDate: "فروری 2024",
    productsCount: 15,
    ordersCompleted: 289,
    rating: 4.7,
    userId: "user_ali_002",
    status: 'active'
  },
  {
    name: "راشد موبائل کارنر",
    shopNameUrdu: "راشد موبائل کارنر",
    ownerName: "راشد احمد",
    email: "rashid.mobile@example.com",
    phone: "+92-302-3456789",
    whatsapp: "+92-302-3456789",
    address: "دکان نمبر 8، گل پلازہ مارکیٹ",
    city: "لاہور",
    category: "الیکٹرانکس اور مرمت",
    description: "موبائل مرمت، اسیسریز، اور ماہر مشورہ۔ ہر مرمت ہمارے کھوئے ہوئے سامان کو دوبارہ بنانے کی طرف ایک قدم ہے۔",
    story: "میں دس سال سے موبائل ٹھیک کر رہا ہوں۔ آگ نے میرے تمام آلات اور اسپیئر پارٹس تباہ کر دیے۔ لیکن میرے گاہکوں کا پیار نہیں ملا۔ وہ فوراً واپس آ گئے۔",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80",
    ownerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    isVerified: true,
    isFeatured: false,
    joinedDate: "جنوری 2024",
    productsCount: 32,
    ordersCompleted: 412,
    rating: 4.9,
    userId: "user_rashid_003",
    status: 'active'
  },
  {
    name: "سارا کے ہوم بیکس",
    shopNameUrdu: "سارا کے ہوم بیکس",
    ownerName: "سارا خان",
    email: "sara.bakes@example.com",
    phone: "+92-303-4567890",
    whatsapp: "+92-303-4567890",
    address: "گھر نمبر 78، ڈی ایچ اے فیز 5",
    city: "اسلام آباد",
    category: "گھر کا کھانا",
    description: "محبت اور احتیاط سے بنایا گیا گھر کا بیک شدہ سامان۔ کیک، کوکیز، اور مٹھائیاں جو دل جیت لیں۔",
    story: "بیکنگ میرا شوق تھا۔ آگ نے میری کمیونٹی کو متاثر کیا، اور میں مدد کرنا چاہتی تھی۔ میں نے متاثرہ خاندانوں کے لیے خصوصی رعایتیں شروع کیں۔ آج میرے آرڈر پورے شہر سے آتے ہیں۔",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    ownerImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    isVerified: true,
    isFeatured: true,
    joinedDate: "اپریل 2024",
    productsCount: 18,
    ordersCompleted: 203,
    rating: 4.9,
    userId: "user_sara_004",
    status: 'active'
  },
  {
    name: "کریم بک سینٹر",
    shopNameUrdu: "کریم بک سینٹر",
    ownerName: "محمد کریم",
    email: "karim.books@example.com",
    phone: "+92-304-5678901",
    whatsapp: "+92-304-5678901",
    address: "دکان نمبر 23، گل پلازہ",
    city: "لاہور",
    category: "کتابیں اور سٹیشنری",
    description: "تعلیمی کتابیں، سٹیشنری، اور دفتری سامان۔ طلباء کے لیے ایک محفوظ جگہ۔",
    story: "میں بیس سال سے کتابیں بیچ رہا ہوں۔ آگ نے ہزاروں کتابیں تباہ کر دیں۔ لیکن میرے طلباء نے کراؤڈ فنڈنگ مہم شروع کی۔ آج میرے پاس کتابوں کا تبادلہ پروگرام بھی ہے۔",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    ownerImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    isVerified: false,
    isFeatured: false,
    joinedDate: "مئی 2024",
    productsCount: 150,
    ordersCompleted: 567,
    rating: 4.6,
    userId: "user_karim_005",
    status: 'active'
  },
  {
    name: "عائشہ بیوٹی پارلر",
    shopNameUrdu: "عائشہ بیوٹی پارلر",
    ownerName: "عائشہ بیگم",
    email: "ayesha.beauty@example.com",
    phone: "+92-305-6789012",
    whatsapp: "+92-305-6789012",
    address: "دکان نمبر 15، گل پلازہ",
    city: "کراچی",
    category: "خوبصورتی اور دیکھ بھال",
    description: "قدرتی خوبصورتی کی مصنوعات اور سکن کیئر ضروریات۔ ہر عورت کی خوبصورتی کا خیال رکھنا ہمارا مشن ہے۔",
    story: "میں نے گھر سے ہربل مصنوعات بنانا شروع کیں۔ آگ نے میرا سارا اسٹاک تباہ کر دیا۔ لیکن خواتین نے مجھے حوصلہ دیا۔ آج میں تین خواتین کو روزگار دے رہی ہوں۔",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    ownerImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    isVerified: true,
    isFeatured: false,
    joinedDate: "جون 2024",
    productsCount: 45,
    ordersCompleted: 178,
    rating: 4.7,
    userId: "user_ayesha_006",
    status: 'active'
  },
  {
    name: "فائزان ٹیک ریپئیر",
    shopNameUrdu: "فائزان ٹیک ریپئیر",
    ownerName: "فائزان احمد",
    email: "faizan.tech@example.com",
    phone: "+92-306-7890123",
    whatsapp: "+92-306-7890123",
    address: "دکان نمبر 34، گل پلازہ",
    city: "راولپنڈی",
    category: "الیکٹرانکس اور مرمت",
    description: "لیپ ٹاپ اور کمپیوٹر کی مرمت خدمات آپ کے دروازے پر۔ تیز، قابل اعتماد، اور معقول قیمت میں۔",
    story: "میں یونیورسٹی جاتے ہوئے کمپیوٹر رپیرنگ کرتا تھا۔ آگ نے میرا چھوٹا سا کاروبار تباہ کر دیا۔ لیکن اب میں گھر کی خدمات دے کر پہلے سے زیادہ کما رہا ہوں۔",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&q=80",
    ownerImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    isVerified: true,
    isFeatured: false,
    joinedDate: "جولائی 2024",
    productsCount: 8,
    ordersCompleted: 89,
    rating: 4.5,
    userId: "user_faizan_007",
    status: 'active'
  },
  {
    name: "نور آرگینکس",
    shopNameUrdu: "نور آرگینکس",
    ownerName: "فاطمہ زہرا",
    email: "noor.organic@example.com",
    phone: "+92-307-8901234",
    whatsapp: "+92-307-8901234",
    address: "دکان نمبر 56، گل پلازہ",
    city: "لاہور",
    category: "کریانہ اور مسالے",
    description: "نامیاتی مسالے، دالیں، اور خشک میوہ جات۔ براہ راست کسانوں سے آپ کے دسترخوان تک۔",
    story: "میرا تعلق کسانوں کے خاندان سے ہے۔ آگ نے میرے پیکیجنگ یونٹ کو تباہ کر دیا۔ لیکن میرے کسان ساتھیوں نے میرا ساتھ دیا۔ آج میں پنجاب بھر کے بیس کسان خاندانوں کے ساتھ کام کرتی ہوں۔",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
    ownerImage: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
    isVerified: true,
    isFeatured: true,
    joinedDate: "اگست 2024",
    productsCount: 67,
    ordersCompleted: 412,
    rating: 4.8,
    userId: "user_fatima_008",
    status: 'active'
  },
  {
    name: "زára اسٹیچنگ",
    shopNameUrdu: "زára اسٹیچنگ",
    ownerName: "زára بیگم",
    email: "zara.stitch@example.com",
    phone: "+92-308-9012345",
    whatsapp: "+92-308-9012345",
    address: "دکان نمبر 19، فیصل آباد مارکیٹ",
    city: "فیصل آباد",
    category: "فیشن اور خیاطی",
    description: "کسٹم اسٹیچنگ اور تبدیلیاں تمام مواقع کے لیے۔ ہر سلائی میں ہنر اور محنت۔",
    story: "میں نے سلائی سیکھی تاکہ گھر کا خرچ چلا سکوں۔ آگ نے میری مشینیں تباہ کر دیں۔ لیکن میرے شوہر نے مجھے نیا سامان خرید کر دیا۔ آج میں چار عورتوں کو تربیت دے رہی ہوں۔",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&q=80",
    ownerImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    isVerified: false,
    isFeatured: false,
    joinedDate: "ستمبر 2024",
    productsCount: 12,
    ordersCompleted: 45,
    rating: 4.4,
    userId: "user_zara_009",
    status: 'active'
  }
];

// Sample Products Data in Urdu
export const productsData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // حنا کی باؤٹیک products
  {
    name: "ہاتھ سے کڑھائی والا کرتا",
    description: "روایتی ڈیزائن کے ساتھ خوبصورت ہاتھ سے کڑھائی والا کپاس کا کرتا۔ آرام دہ اور پائیدار کپڑا۔",
    price: 2400,
    originalPrice: 3200,
    stock: 5,
    category: "کرتا",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80",
      "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&q=80"
    ],
    shopId: "shop_hina_001",
    shopName: "حنا کی باؤٹیک",
    isAvailable: true,
    views: 234,
    orders: 12,
    features: [
      "100% خالص کپاس کا کپڑا",
      "ہاتھ سے کڑھائی",
      "مختلف سائز میں دستیاب",
      "مشین سے دھلائی جا سکتی ہے"
    ]
  },
  {
    name: "روایتی دوپٹہ",
    description: "نفیس ڈیزائن کے ساتھ نرم ریشم کا دوپٹہ۔",
    price: 1200,
    stock: 12,
    category: "اسیسریز",
    image: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80",
    shopId: "shop_hina_001",
    shopName: "حنا کی باؤٹیک",
    isAvailable: true,
    views: 189,
    orders: 8
  },
  {
    name: "سلا ہوا کپاس کا سوٹ",
    description: "پہننے کے لیے تیار تین پیس کپاس کا سوٹ۔",
    price: 3500,
    originalPrice: 4500,
    stock: 3,
    category: "سوٹ",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    shopId: "shop_hina_001",
    shopName: "حنا کی باؤٹیک",
    isAvailable: true,
    views: 156,
    orders: 6
  },
  {
    name: "کڑھائی والا دوپٹہ",
    description: "خاص مواقع کے لیے بھاری کڑھائی والا دوپٹہ۔",
    price: 1800,
    stock: 8,
    category: "اسیسریز",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80",
    shopId: "shop_hina_001",
    shopName: "حنا کی باؤٹیک",
    isAvailable: true,
    views: 98,
    orders: 4
  },
  {
    name: "لان کولیکشن 2024",
    description: "ڈیجیٹل پرنٹس کے ساتھ پریمیم لان کپڑا۔",
    price: 2800,
    stock: 15,
    category: "کپڑا",
    image: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80",
    shopId: "shop_hina_001",
    shopName: "حنا کی باؤٹیک",
    isAvailable: true,
    views: 145,
    orders: 9
  },
  {
    name: "دلہن کا لہنگا",
    description: "بھاری کڑھائی کے ساتھ دلکش دلہن کا لہنگا۔",
    price: 15000,
    originalPrice: 22000,
    stock: 2,
    category: "دلہن",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    shopId: "shop_hina_001",
    shopName: "حنا کی باؤٹیک",
    isAvailable: true,
    views: 267,
    orders: 3
  },

  // علی الیکٹرانکس products
  {
    name: "موبائل ریپئیر سروس",
    description: "تمام برانڈز کی موبائل اسکرین کی مرمت اور بیٹری تبدیلی۔",
    price: 800,
    stock: 50,
    category: "سروس",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80",
    shopId: "shop_ali_002",
    shopName: "علی الیکٹرانکس",
    isAvailable: true,
    views: 312,
    orders: 45
  },
  {
    name: "لیپ ٹاپ ریپئیر",
    description: "لیپ ٹاپ سافٹ ویئر اور ہارڈویئر کی مرمت۔",
    price: 1500,
    stock: 30,
    category: "سروس",
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&q=80",
    shopId: "shop_ali_002",
    shopName: "علی الیکٹرانکس",
    isAvailable: true,
    views: 198,
    orders: 23
  },
  {
    name: "موبائل چارجر",
    description: "تیز چارجنگ والا اصلی موبائل چارجر۔",
    price: 450,
    originalPrice: 600,
    stock: 25,
    category: "اسیسریز",
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400&q=80",
    shopId: "shop_ali_002",
    shopName: "علی الیکٹرانکس",
    isAvailable: true,
    views: 156,
    orders: 18
  },

  // سارا کے ہوم بیکس products
  {
    name: "چاکلیٹ کیک",
    description: "گھریلو اجزاء سے بنا نرم چاکلیٹ کیک۔",
    price: 800,
    stock: 10,
    category: "کیک",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80",
    shopId: "shop_sara_004",
    shopName: "سارا کے ہوم بیکس",
    isAvailable: true,
    views: 234,
    orders: 15
  },
  {
    name: "بادام کے کوکیز",
    description: "تازہ باداموں سے بنے کرنچی کوکیز۔",
    price: 400,
    stock: 20,
    category: "کوکیز",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80",
    shopId: "shop_sara_004",
    shopName: "سارا کے ہوم بیکس",
    isAvailable: true,
    views: 178,
    orders: 12
  },
  {
    name: "کسٹم کیک",
    description: "اپنی پسند کے مطابق ڈیزائن والا خصوصی کیک۔",
    price: 1500,
    stock: 5,
    category: "کیک",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=80",
    shopId: "shop_sara_004",
    shopName: "سارا کے ہوم بیکس",
    isAvailable: true,
    views: 289,
    orders: 8
  },

  // نور آرگینکس products
  {
    name: "نامیاتی لال مرچ پاؤڈر",
    description: "براہ راست کسانوں سے خالص نامیاتی لال مرچ۔",
    price: 180,
    stock: 100,
    category: "مسالے",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80",
    shopId: "shop_fatima_008",
    shopName: "نور آرگینکس",
    isAvailable: true,
    views: 145,
    orders: 34
  },
  {
    name: "نامیاتی ہلدی",
    description: "قدرتی زرد رنگ والی خالص ہلدی۔",
    price: 220,
    stock: 80,
    category: "مسالے",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&q=80",
    shopId: "shop_fatima_008",
    shopName: "نور آرگینکس",
    isAvailable: true,
    views: 123,
    orders: 28
  },
  {
    name: "خشک میوہ جات پیک",
    description: "بادام، کاجو، اور پستہ کا ملا جلا پیک۔",
    price: 1200,
    originalPrice: 1500,
    stock: 25,
    category: "خشک میوہ جات",
    image: "https://images.unsplash.com/photo-1536591375315-196000ea3676?w=400&q=80",
    shopId: "shop_fatima_008",
    shopName: "نور آرگینکس",
    isAvailable: true,
    views: 198,
    orders: 19
  },
  {
    name: "نامیاتی دالیں سیٹ",
    description: "پانچ قسم کی نامیاتی دالوں کا سیٹ۔",
    price: 800,
    stock: 40,
    category: "دالیں",
    image: "https://images.unsplash.com/photo-1515543904379-3d757afe72e3?w=400&q=80",
    shopId: "shop_fatima_008",
    shopName: "نور آرگینکس",
    isAvailable: true,
    views: 167,
    orders: 22
  }
];

// Sample Stories Data in Urdu
export const storiesData: Omit<Story, 'id'>[] = [
  {
    ownerName: "حنا یوسف",
    shopName: "حنا کی باؤٹیک",
    category: "فیشن اور خیاطی",
    city: "لاہور",
    quote: "میں نے ایک سلائی مشین سے شروعات کی۔ آگ کے بعد، مجھے لگا کہ سب کتم ہو گیا ہے۔ لیکن لوگوں نے میرا ساتھ دیا۔",
    fullStory: `حنا نے پانچ سال قبل اپنی ماں کے گیراج میں صرف ایک سلائی مشین سے اپنی باؤٹیک شروع کی۔ وہ منہ کا ذائقہ اور معیاری کام کی وجہ سے تیزی سے مشہور ہوئیں۔

جب گل پلازہ میں آگ لگی تو حنا نے نہ صرف اپنا اسٹاک کھویا بلکہ سالوں کی محنت بھی۔ "میں وہاں کھڑی دیکھ رہی تھی، دھواں اٹھتا ہوا۔ مجھے لگا کہ سب کتم ہو گیا،" وہ یاد کرتی ہیں۔

لیکن کمیونٹی کا ردعمل حیرت انگیز تھا۔ دوست، خاندان، اور یہاں تک کہ اجنبی لوگ مدد کے لیے آگے آئے۔ گل پلازہ مارکیٹ پلیس کے ذریعے، حنا نئے گاہکوں تک پہنچنے میں کامیاب ہوئیں اور آہستہ آہستہ اپنا کاروبار دوبارہ تعمیر کیا۔

آج، اس کے پاس تین سلائی مشینیں ہیں اور وہ کمیونٹی کی دو دیگر خواتین کو روزگار فراہم کر رہی ہے۔ "میرے پاس آنے والا ہر آرڈر مجھے یاد دلاتا ہے کہ لوگ پرواہ کرتے ہیں۔ یہ صرف پیسے کی بات نہیں — یہ اعتماد کی بات ہے جو وہ مجھ پر ظاہر کرتے ہیں۔"`,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    shopImage: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&q=80",
    productsCount: 24,
    ordersCompleted: 156,
    impact: "کمیونٹی کی 2 خواتین کو روزگار",
    order: 1
  },
  {
    ownerName: "راشد احمد",
    shopName: "راشد موبائل کارنر",
    category: "الیکٹرانکس اور مرمت",
    city: "لاہور",
    quote: "میرے ہاتھ سے بنایا ہوا ہر فون میرے کھوئے ہوئے سامان کو دوبارہ بنانے کی طرف ایک قدم ہے۔",
    fullStory: `راشد دس سال سے موبائل فونز کی مرمت کر رہے ہیں۔ گل پلازہ میں ان کا چھوٹا سا کونر شاپ ایماندار خدمات اور مناسب قیمتوں کی وجہ سے مشہور تھا۔ "میں کبھی زیادہ نہیں لیتا تھا،" وہ کہتے ہیں۔

آگ نے سب کچھ لے لیا — ان کے آلات، اسپیئر پارٹس کا ذخیرہ، اور مرمت اسٹیشن۔ لیکن اس کی مہارت اور ساکھ نہیں لے سکی۔ تباہی کے چند دنوں کے اندر، ان کے گاہکوں نے فون کرنا شروع کر دیا، پوچھتے ہوئے کہ وہ کب واپس آ رہے ہیں۔

کمیونٹی کی حمایت اور گل پلازہ مارکیٹ پلیس کے ذریعے، راشد نئے آلات خریدنے اور ضروری پارٹس کا ذخیرہ کرنے میں کامیاب ہو گئے۔ وہ اب گھر کی ترسیل کی خدمات بھی پیش کرتے ہیں، جس سے پہلے سے زیادہ گاہک تک پہنچ بن گئی ہے۔

"میں جو فون بھی ٹھیک کرتا ہوں، وہ ایک وعدہ ہے۔ میرے گاہکوں نے مجھ پر بھروسہ کیا کہ میں واپس آؤں گا، اور میں انہیں مایوس نہیں کروں گا۔"`,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    shopImage: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=400&q=80",
    productsCount: 32,
    ordersCompleted: 289,
    impact: "ماہانہ 50+ گاہکوں کی خدمت",
    order: 2
  },
  {
    ownerName: "سارا خان",
    shopName: "سارا کے ہوم بیکس",
    category: "گھر کا کھانا",
    city: "اسلام آباد",
    quote: "بیکنگ میرا شوق تھا۔ اب، ہر آرڈر کے ساتھ، مجھے لگتا ہے کہ میں بھی دوبارہ اٹھ رہی ہوں۔",
    fullStory: `سارا نے اپنے بیکنگ کے شوق کو دو سال قبل ایک کاروبار میں تبدیل کیا۔ جو خاندان اور دوستوں کے لیے بیکنگ کے طور پر شروع ہوا، وہ جلد ہی ایک چھوٹے گھر پر مبنی کاروبار میں بدل گیا۔ ان کی خصوصی کیک اور کوکیز ان کے پڑوس میں مقبول ہو گئیں۔

آگ نے ان کی کمیونٹی کو گہرائی سے متاثر کیا، اور سارا مدد کرنا چاہتی تھیں۔ انہوں نے ان خاندانوں کے لیے خصوصی رعایتیں پیش کرنا شروع کیں جنہوں نے اپنے گھر اور کاروبار کھو دیے تھے۔ "کھانا تسلی دیتی ہے،" وہ کہتی ہیں۔ "میں مشکل وقت میں تھوڑی سی میٹھاس لانا چاہتی تھی۔"

گل پلازہ مارکیٹ پلیس کے ذریعے، سارا اپنے فوری پڑوس سے باہر تک پہنچنے میں کامیاب ہو گئی ہیں۔ وہ اب پورے شہر سے آرڈر لیتی ہیں اور بڑھتی مانگ سے نمٹنے کے لیے ایک اسسٹنٹ بھی رکھا ہے۔

"میں جو کیک بھی بناتی ہوں، وہ محبت سے بنتا ہے۔ جب گاہک مجھے بتاتے ہیں کہ اس نے ان کا دن خاص بنایا، یہ میرے لیے سب سے بڑا انعام ہے۔"`,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&q=80",
    shopImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    productsCount: 18,
    ordersCompleted: 203,
    impact: "1 اسسٹنٹ کی ملازمت، شہر بھر میں توسیع",
    order: 3
  },
  {
    ownerName: "علی حسن",
    shopName: "علی الیکٹرانکس",
    category: "الیکٹرانکس اور مرمت",
    city: "کراچی",
    quote: "اعتماد کے قابل مرمت — 48 گھنٹوں میں ترسیل۔ یہ میرا ہر گاہک سے وعدہ ہے۔",
    fullStory: `علی نے اپنے والد سے الیکٹرانکس کی مرمت سیکھی، جنہوں نے تیس سال تک ایک چھوٹی سی مرمت کی دکان چلائی۔ جب ان کے والد ریٹائر ہوئے، تو علی نے کاروبار سنبھالا اور اسے آن لائن لے گئے۔

آگ تباہ کن تھی۔ علی نے اپنا پورا ورکشاپ اور اسپیئر پارٹس کا ذخیرہ کھو دیا۔ لیکن وہ دوبارہ تعمیر کرنے کے لیے پرعزم تھے — نہ صرف اپنے لیے، بلکہ اپنے والد کی وراثت کے لیے۔

کمیونٹی کی حمایت اور گل پلازہ مارکیٹ پلیس کے ذریعے، علی نے اپنے ورکشاپ کو پہلے سے بہتر طریقے سے دوبارہ تعمیر کیا۔ وہ اب 48 گھنٹے کی مرمت گارنٹی اور گھر کی پک اپ سروس پیش کرتے ہیں۔

"میرے والد نے مجھے سکھایا کہ ایمانداری بہترین کاروباری پالیسی ہے۔ میں ہر مرمت کے ساتھ ان کی یاد کو زندہ رکھتا ہوں۔"`,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&q=80",
    shopImage: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=80",
    productsCount: 15,
    ordersCompleted: 178,
    impact: "48 گھنٹے کی مرمت گارنٹی",
    order: 4
  },
  {
    ownerName: "فاطمہ زہرا",
    shopName: "نور آرگینکس",
    category: "کریانہ اور مسالے",
    city: "لاہور",
    quote: "نامیاتی کھیتی میرا شوق ہے۔ ہر مسالے کا پیکٹ ہماری زمین کی محبت لے کر آتا ہے۔",
    fullStory: `فاطمہ کسانوں کے خاندان سے تعلق رکھتی ہیں۔ انہوں نے نور آرگینکس شروع کیا تاکہ خالص، نامیاتی مسالے اور خشک میوہ جات براہ راست کسانوں سے صارفین تک پہنچا سکیں۔

آگ نے ان کے پیکیجنگ یونٹ اور گودام کو تباہ کر دیا۔ لیکن کسانوں کے ان کے نیٹ ورک نے ان کا ساتھ دیا، کریڈٹ اور حمایت پیش کرتے ہوئے جب تک وہ دوبارہ کام کرنے کے قابل نہیں ہو گئیں۔

گل پلازہ مارکیٹ پلیس کے ذریعے، فاطمہ اپنی کہانی بیان کرنے اور ایسے گاہکوں سے جڑنے میں کامیاب ہو گئی ہیں جو نامیاتی، اخلاقی طور پر حاصل کی گئی مصنوعات کی قدر کرتے ہیں۔ وہ اب پنجاب بھر کے بیس سے زیادہ کسان خاندانوں کے ساتھ کام کرتی ہیں۔

"جب آپ نور آرگینکس سے خریدتے ہیں، تو آپ صرف خالص مصنوعات نہیں حاصل کر رہے — آپ کسانوں کے پورے نظام اور ان کے خاندانوں کی حمایت کر رہے ہیں۔"`,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    shopImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
    productsCount: 67,
    ordersCompleted: 412,
    impact: "20+ کسان خاندانوں کی حمایت",
    order: 5
  },
  {
    ownerName: "محمد کریم",
    shopName: "کریم بک سینٹر",
    category: "کتابیں اور سٹیشنری",
    city: "لاہور",
    quote: "کتابیں علم ہیں، اور علم سب کے لیے قابل رسائی ہونا چاہیے۔",
    fullStory: `کریم بیس سال سے کتابیں بیچ رہے ہیں۔ گل پلازہ میں ان کی دکان طلباء، اساتذہ، اور کتابوں کے شوقین افراد کے لیے ایک ملاقات کی جگہ تھی۔

آگ نے ہزاروں کتابیں — ان کا پورا اسٹاک تباہ کر دیا۔ لیکن کمیونٹی نے ان کے گرد گھیرا ڈالا۔ سالوں سے ان سے کتابیں خریدنے والے طلباء نے کراؤڈ فنڈنگ مہم شروع کی۔

اکٹھے کیے گئے فنڈز اور گل پلازہ مارکیٹ پلیس کی حمایت سے، کریم اپنی دکان دوبارہ بھرنے میں کامیاب ہو گئے۔ وہ اب کتابوں کا تبادلہ پروگرام اور طلباء کے لیے پڑھنے کی جگہ بھی پیش کرتے ہیں۔

"ایک کتابوں کی دکان صرف کاروبار نہیں — یہ کمیونٹی کا وسیلہ ہے۔ میں دوبارہ اپنی کمیونٹی کی خدمت کرنے کے قابل ہونے کا شکرگزار ہوں۔"`,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    shopImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    productsCount: 150,
    ordersCompleted: 567,
    impact: "طلباء کے لیے مفت پڑھنے کی جگہ",
    order: 6
  }
];

// Sample Orders Data in Urdu
export const ordersData = [
  {
    product: "ہاتھ سے کڑھائی والا کرتا",
    productImage: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80",
    customer: {
      name: "آمنہ رحمان",
      phone: "+92-300-1234567",
      address: "123 مین سٹریٹ، گلبرگ",
      city: "لاہور"
    },
    quantity: 2,
    amount: 4800,
    status: "pending",
    notes: "براہ کرم شام 5 بجے کے بعد ترسیل کریں"
  },
  {
    product: "روایتی دوپٹہ",
    productImage: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&q=80",
    customer: {
      name: "بلال قریشی",
      phone: "+92-301-2345678",
      address: "45 گارڈن ٹاؤن",
      city: "لاہور"
    },
    quantity: 1,
    amount: 1200,
    status: "confirmed",
    notes: ""
  },
  {
    product: "سلا ہوا کپاس کا سوٹ",
    productImage: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    customer: {
      name: "فاطمہ خان",
      phone: "+92-302-3456789",
      address: "78 ڈی ایچ اے فیز 5",
      city: "لاہور"
    },
    quantity: 1,
    amount: 3500,
    status: "shipped",
    notes: "براہ کرم تحفہ میں لپیٹیں"
  }
];

// Seed function to populate Firestore
export async function seedDatabase() {
  console.log("Starting database seeding with Urdu data...");
  
  try {
    // Seed shops
    console.log("Seeding shops...");
    const shopIds: { [key: string]: string } = {};
    
    for (const shop of shopsData) {
      const docRef = await addDoc(collection(db, "shops"), {
        ...shop,
        createdAt: timestamp(),
        updatedAt: timestamp()
      });
      shopIds[shop.userId] = docRef.id;
      console.log(`Created shop: ${shop.name} with ID: ${docRef.id}`);
    }

    // Seed products with correct shopIds
    console.log("Seeding products...");
    for (const product of productsData) {
      // Map old shopId to new Firestore ID
      const newShopId = shopIds[product.shopId] || product.shopId;
      
      await addDoc(collection(db, "products"), {
        ...product,
        shopId: newShopId,
        createdAt: timestamp(),
        updatedAt: timestamp()
      });
      console.log(`Created product: ${product.name}`);
    }

    // Seed stories
    console.log("Seeding stories...");
    for (const story of storiesData) {
      await addDoc(collection(db, "stories"), {
        ...story,
        createdAt: timestamp()
      });
      console.log(`Created story for: ${story.ownerName}`);
    }

    // Seed sample orders
    console.log("Seeding orders...");
    const shopId = shopIds["user_hina_001"]; // Use Hina's shop for sample orders
    
    for (const order of ordersData) {
      await addDoc(collection(db, "orders"), {
        ...order,
        shopId: shopId,
        date: new Date().toISOString(),
        createdAt: timestamp()
      });
      console.log(`Created order for: ${order.customer.name}`);
    }

    console.log("Database seeding completed successfully!");
    return { success: true, shopCount: shopsData.length, productCount: productsData.length };
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}

// Export individual seed functions for partial seeding
export async function seedShopsOnly() {
  for (const shop of shopsData) {
    await addDoc(collection(db, "shops"), {
      ...shop,
      createdAt: timestamp(),
      updatedAt: timestamp()
    });
  }
  console.log("Shops seeded successfully!");
}

export async function seedStoriesOnly() {
  for (const story of storiesData) {
    await addDoc(collection(db, "stories"), {
      ...story,
      createdAt: timestamp()
    });
  }
  console.log("Stories seeded successfully!");
}

export async function seedProductsOnly(shopIdMapping: { [key: string]: string }) {
  for (const product of productsData) {
    const newShopId = shopIdMapping[product.shopId] || product.shopId;
    
    await addDoc(collection(db, "products"), {
      ...product,
      shopId: newShopId,
      createdAt: timestamp(),
      updatedAt: timestamp()
    });
  }
  console.log("Products seeded successfully!");
}
