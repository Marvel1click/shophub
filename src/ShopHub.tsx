import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BriefcaseBusiness,
  Check,
  CircleQuestionMark,
  CreditCard,
  Eye,
  Facebook,
  File,
  Filter,
  Flame,
  Headset,
  Heart,
  Info,
  Instagram,
  LockKeyhole,
  Menu,
  Minus,
  Pen,
  Plus,
  Reply,
  Search,
  Share,
  ShieldHalf,
  ShoppingCart,
  Star,
  ThumbsUp,
  Trash,
  Truck,
  Twitter,
  Undo2,
  User,
  X,
} from "lucide-react";
import { Laptop, Shirt, Footprints, ShoppingBag, Home, Dumbbell } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcAmex, faCcApplePay, faCcDiscover, faCcMastercard, faCcPaypal, faCcVisa, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons"
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  color: string;
  size: string[];
  inStock: boolean;
  isNew?: boolean;
  onSale?: boolean;
}
interface CartItem extends Product {
  quantity: number;
}
interface Review {
  id: number;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}
const ShopHub: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchFocused, setSearchFocused] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePayment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const button = e.currentTarget;
    button.disabled = true;
    button.innerHTML = 'Processing...';
    setTimeout(() => {
      setPaymentSuccess(true);
    }, 2000);
  };

  const resetCheckout = () => {
    setIsProcessing(false);
    setPaymentSuccess(false);
    setCartItems([]);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  const products: Product[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: 299,
      originalPrice: 399,
      image:
        "https://readdy.ai/api/search-image?query=premium%20wireless%20headphones%20with%20sleek%20black%20design%20on%20minimal%20white%20background%2C%20modern%20technology%20product%20photography%2C%20studio%20lighting%2C%20high-end%20audio%20equipment%20showcase&width=400&height=400&seq=1&orientation=squarish",
      rating: 4.8,
      reviews: 124,
      category: "Electronics",
      color: "Black",
      size: ["One Size"],
      inStock: true,
      onSale: true,
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199,
      image:
        "https://readdy.ai/api/search-image?query=modern%20smart%20fitness%20watch%20with%20digital%20display%20on%20minimal%20white%20background%2C%20sleek%20wearable%20technology%2C%20contemporary%20design%20showcase%2C%20product%20photography&width=400&height=400&seq=2&orientation=squarish",
      rating: 4.6,
      reviews: 89,
      category: "Electronics",
      color: "Silver",
      size: ["S", "M", "L"],
      inStock: true,
      isNew: true,
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 29,
      image:
        "https://readdy.ai/api/search-image?query=organic%20cotton%20t-shirt%20in%20navy%20blue%20color%20on%20minimal%20white%20background%2C%20comfortable%20casual%20wear%2C%20sustainable%20fashion%20photography%2C%20clean%20clothing%20display&width=400&height=400&seq=3&orientation=squarish",
      rating: 4.4,
      reviews: 156,
      category: "Clothing",
      color: "Navy",
      size: ["XS", "S", "M", "L", "XL"],
      inStock: true,
    },
    {
      id: 4,
      name: "Leather Laptop Bag",
      price: 149,
      image:
        "https://readdy.ai/api/search-image?query=premium%20brown%20leather%20laptop%20bag%20with%20professional%20design%20on%20minimal%20white%20background%2C%20business%20accessories%20photography%2C%20elegant%20briefcase%20showcase%2C%20studio%20lighting&width=400&height=400&seq=4&orientation=squarish",
      rating: 4.7,
      reviews: 67,
      category: "Accessories",
      color: "Brown",
      size: ["One Size"],
      inStock: true,
    },
    {
      id: 5,
      name: "Wireless Bluetooth Speaker",
      price: 79,
      originalPrice: 99,
      image:
        "https://readdy.ai/api/search-image?query=compact%20wireless%20bluetooth%20speaker%20in%20white%20color%20on%20minimal%20background%2C%20portable%20audio%20device%2C%20modern%20technology%20product%20photography%2C%20clean%20design%20showcase&width=400&height=400&seq=5&orientation=squarish",
      rating: 4.3,
      reviews: 203,
      category: "Electronics",
      color: "White",
      size: ["One Size"],
      inStock: true,
      onSale: true,
    },
    {
      id: 6,
      name: "Running Sneakers",
      price: 129,
      image:
        "https://readdy.ai/api/search-image?query=modern%20running%20sneakers%20in%20white%20and%20blue%20colors%20on%20minimal%20white%20background%2C%20athletic%20footwear%20photography%2C%20sports%20shoe%20showcase%2C%20clean%20product%20display&width=400&height=400&seq=6&orientation=squarish",
      rating: 4.5,
      reviews: 178,
      category: "Footwear",
      color: "White",
      size: ["7", "8", "9", "10", "11"],
      inStock: true,
    },
  ];

  const reviews: Review[] = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20woman%20with%20friendly%20smile%2C%20clean%20portrait%20photography%20on%20white%20background%2C%20business%20headshot%20style%2C%20modern%20professional%20appearance&width=80&height=80&seq=7&orientation=squarish",
      rating: 5,
      comment:
        "Absolutely love these headphones! The sound quality is exceptional and they're so comfortable to wear for hours.",
      date: "2024-01-15",
      verified: true,
      helpful: 12,
    },
    {
      id: 2,
      user: "Mike Chen",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20man%20with%20confident%20expression%2C%20clean%20portrait%20photography%20on%20white%20background%2C%20business%20headshot%20style%2C%20modern%20professional%20appearance&width=80&height=80&seq=8&orientation=squarish",
      rating: 4,
      comment:
        "Great value for money. The build quality is solid and the battery life is impressive.",
      date: "2024-01-10",
      verified: true,
      helpful: 8,
    },
    {
      id: 3,
      user: "Emma Wilson",
      avatar:
        "https://readdy.ai/api/search-image?query=young%20woman%20with%20warm%20smile%2C%20clean%20portrait%20photography%20on%20white%20background%2C%20friendly%20professional%20headshot%2C%20modern%20appearance&width=80&height=80&seq=9&orientation=squarish",
      rating: 5,
      comment:
        "Perfect for my daily workouts. The noise cancellation feature works wonderfully.",
      date: "2024-01-08",
      verified: true,
      helpful: 15,
    },
  ];

  const categories = [
    { name: "Electronics", icon: Laptop, count: 156 },
    { name: "Clothing", icon: Shirt, count: 234 },
    { name: "Footwear", icon: Footprints, count: 89 },
    { name: "Accessories", icon: ShoppingBag, count: 67 },
    { name: "Home & Garden", icon: Home, count: 123 },
    { name: "Sports", icon: Dumbbell, count: 78 },
  ];
  const colors = [
    "Black",
    "White",
    "Navy",
    "Brown",
    "Red",
    "Blue",
    "Green",
    "Gray",
  ];
  const addToCart = (product: Product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };
  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  };
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };
  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  };
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartItemCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesColor =
      selectedColors.length === 0 || selectedColors.includes(product.color);
    const matchesPrice =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesColor && matchesPrice;
  });
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "newest":
        return a.isNew ? -1 : 1;
      case "rating":
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews;
    }
  });
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4 animate-pulse">
            <ShoppingBag className="text-white text-2xl"/>
          </div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">ShopHub</h2>
          <p className="text-gray-600">Loading your shopping experience...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <style>
        {`
@keyframes slideInDown {
from {
transform: translateY(-100%);
opacity: 0;
}
to {
transform: translateY(0);
opacity: 1;
}
}
@keyframes slideInUp {
from {
transform: translateY(100%);
opacity: 0;
}
to {
transform: translateY(0);
opacity: 1;
}
}
@keyframes fadeInScale {
from {
transform: scale(0.8);
opacity: 0;
}
to {
transform: scale(1);
opacity: 1;
}
}
@keyframes shimmer {
0% {
transform: translateX(-100%);
}
100% {
transform: translateX(100%);
}
}
.animate-slide-in-down {
animation: slideInDown 0.6s ease-out;
}
.animate-slide-in-up {
animation: slideInUp 0.6s ease-out;
}
.animate-fade-in-scale {
animation: fadeInScale 0.4s ease-out;
}
.shimmer {
position: relative;
overflow: hidden;
}
.shimmer::after {
content: '';
position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
transform: translateX(-100%);
animation: shimmer 1.5s infinite;
}
.backdrop-blur-glass {
backdrop-filter: blur(20px) saturate(180%);
background: rgba(255, 255, 255, 0.8);
border: 1px solid rgba(255, 255, 255, 0.3);
}
.gradient-border {
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
padding: 2px;
border-radius: 12px;
}
.gradient-border-inner {
background: white;
border-radius: 10px;
}
.product-card {
transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
transform-style: preserve-3d;
}
.product-card:hover {
transform: translateY(-8px) scale(1.02);
box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}
.glass-morphism {
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
}
.neon-glow {
box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
}
.pulse-animation {
animation: pulse 2s infinite;
}
@keyframes pulse {
0%, 100% {
transform: scale(1);
}
50% {
transform: scale(1.05);
}
}
.search-focus-glow {
box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1), 0 0 20px rgba(59, 130, 246, 0.2);
}
.floating-element {
animation: float 6s ease-in-out infinite;
}
@keyframes float {
0%, 100% {
transform: translateY(0px);
}
50% {
transform: translateY(-10px);
}
}
.slide-in-stagger {
animation: slideInUp 0.6s ease-out forwards;
}
.slide-in-stagger:nth-child(1) { animation-delay: 0.1s; }
.slide-in-stagger:nth-child(2) { animation-delay: 0.2s; }
.slide-in-stagger:nth-child(3) { animation-delay: 0.3s; }
.slide-in-stagger:nth-child(4) { animation-delay: 0.4s; }
.slide-in-stagger:nth-child(5) { animation-delay: 0.5s; }
.slide-in-stagger:nth-child(6) { animation-delay: 0.6s; }
`}
      </style>
      {/* Responsive Header */}
      <header className="sticky top-0 z-50 backdrop-blur-glass border-b border-white/20 animate-slide-in-down">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-1.5">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 floating-element">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="text-white text-lg" />
                  </div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ShopHub
                  </h1>
                </div>
              </div>
            </div>
            {/* Desktop Search */}
            <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
              <div
                className={`relative w-full transition-all duration-300 ${
                  searchFocused ? "search-focus-glow" : ""
                }`}
              >
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search
                    className={` text-gray-400 transition-all duration-300 ${
                      searchFocused ? "text-blue-500 scale-110" : ""
                    }`}
                  />
                </div>
                <Input
                  type="text"
                  placeholder="Search for products, brands, categories..."
                  className="pl-12 pr-4 py-4 w-full border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-sm bg-white/80 backdrop-blur-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="!rounded-button whitespace-nowrap cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="text-gray-400" />
                  </Button>
                )}
              </div>
            </div>
            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Link to="/user-account">
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap cursor-pointer relative group p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                >
                  <User className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300" />
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Account
                  </span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="!rounded-button whitespace-nowrap cursor-pointer relative group p-3 rounded-xl hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all duration-300"
              >
                <Heart className="text-gray-600 group-hover:text-red-500 transition-colors duration-300" />
                {wishlist.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 border-2 border-white animate-pulse">
                    {wishlist.length}
                  </Badge>
                )}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Wishlist
                </span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="!rounded-button whitespace-nowrap cursor-pointer relative group p-3 rounded-xl hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 transition-all duration-300"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="text-gray-600 group-hover:text-green-600 transition-colors duration-300" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-green-500 to-emerald-500 border-2 border-white animate-bounce">
                    {cartItemCount}
                  </Badge>
                )}
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Cart
                </span>
              </Button>
            </div>
            {/* Mobile Menu Button */}
            <div className="lg:hidden relative">
              <Button
                variant="ghost"
                size="sm"
                className="!rounded-button whitespace-nowrap cursor-pointer p-3 rounded-xl hover:bg-gray-100 transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="text-gray-600" />
              </Button>
              {cartItemCount > 0 && (
                <Badge className="absolute top-1 right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-green-500 to-emerald-500 border-2 border-white pointer-events-none animate-bounce">
                  {cartItemCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden lg:block border-t border-white/20 bg-white/60 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1 overflow-x-auto py-4">
              {categories.map((category) => (
                <Button
                  key={category.name}
                  variant="ghost"
                  className={`!rounded-button whitespace-nowrap cursor-pointer flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 slide-in-stagger ${
                    selectedCategories.includes(category.name)
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg neon-glow"
                      : "text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600"
                  }`}
                  onClick={() => {
                    if (selectedCategories.includes(category.name)) {
                      setSelectedCategories([]);
                    } else {
                      setSelectedCategories([category.name]);
                    }
                  }}
                >
                  <category.icon className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">{category.name}</span>
                  <Badge
                    variant="secondary"
                    className="ml-2 text-xs bg-white/20"
                  >
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>
          </div>
        </nav>
      </header>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in-scale">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 h-full w-80 bg-white/95 backdrop-blur-xl shadow-2xl animate-slide-in-down">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="text-white text-sm" />
                  </div>
                  <h2 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Menu
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap cursor-pointer p-2 rounded-lg hover:bg-red-50 transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="text-red-500" />
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="p-6">
                  <div className="relative mb-4">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="text-gray-400" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Search..."
                      className="pl-12 pr-4 py-3 w-full border-2 border-gray-200 rounded-xl"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category.name}
                        variant="ghost"
                        className="!rounded-button whitespace-nowrap cursor-pointer w-full justify-start text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600 transition-all duration-300 p-4 rounded-xl"
                        onClick={() => {
                          setSelectedCategories([category.name]);
                          setIsMobileMenuOpen(false);
                        }}
                      >
                        <category.icon className="w-4 h-4 mr-3 text-blue-500" />
                        <span className="font-medium">{category.name}</span>
                        <Badge variant="secondary" className="ml-auto">
                          {category.count}
                        </Badge>
                      </Button>
                    ))}
                  </div>
                  <div className="border-t mt-6 pt-6 space-y-2">
                    <Link to="/user-account" className="flex items-center p-4 rounded-xl hover:bg-gray-100">
                      <User className="mr-3" />
                      Account
                    </Link>
                    <div className="flex items-center p-4 rounded-xl hover:bg-gray-100">
                      <Heart className="mr-3" />
                      Wishlist
                    </div>
                    <div className="flex items-center p-4 rounded-xl hover:bg-gray-100 relative" onClick={() => { setIsMobileMenuOpen(false); setIsCartOpen(true); }}>
                      <ShoppingCart className="mr-3" />
                      Cart
                      {cartItemCount > 0 && (
                        <Badge variant="secondary" className="ml-auto bg-green-100 text-green-700">
                          {cartItemCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      )}
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="backdrop-blur-glass rounded-2xl shadow-xl p-8 sticky top-32">
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-8">
                Filters
              </h3>
              {/* Price Range */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Price Range
                </h4>
                <div className="gradient-border mb-4">
                  <div className="gradient-border-inner p-4">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      step={10}
                      className="mb-4"
                    />
                    <div className="flex justify-between text-sm font-medium text-gray-700">
                      <span className="bg-blue-50 px-3 py-1 rounded-full">
                        ${priceRange[0]}
                      </span>
                      <span className="bg-blue-50 px-3 py-1 rounded-full">
                        ${priceRange[1]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Categories */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Categories
                </h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300"
                    >
                      <Checkbox
                        id={category.name}
                        checked={selectedCategories.includes(category.name)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedCategories([
                              ...selectedCategories,
                              category.name,
                            ]);
                          } else {
                            setSelectedCategories(
                              selectedCategories.filter(
                                (c) => c !== category.name
                              )
                            );
                          }
                        }}
                        className="rounded-lg"
                      />
                      <category.icon className="w-4 h-4 text-blue-500" />
                      <label
                        htmlFor={category.name}
                        className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                      >
                        {category.name}
                      </label>
                      <Badge variant="outline" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              {/* Colors */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Colors
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map((color) => (
                    <Button
                      key={color}
                      variant={
                        selectedColors.includes(color) ? "default" : "outline"
                      }
                      size="sm"
                      className={`!rounded-button whitespace-nowrap cursor-pointer h-12 text-xs font-medium transition-all duration-300 ${
                        selectedColors.includes(color)
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg neon-glow"
                          : "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300"
                      }`}
                      onClick={() => {
                        if (selectedColors.includes(color)) {
                          setSelectedColors(
                            selectedColors.filter((c) => c !== color)
                          );
                        } else {
                          setSelectedColors([...selectedColors, color]);
                        }
                      }}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </aside>
          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Filter Toggle (Mobile) */}
            <div className="flex items-center justify-between mb-8 p-4 backdrop-blur-glass rounded-2xl">
              <Button
                variant="outline"
                size="sm"
                className="!rounded-button whitespace-nowrap cursor-pointer lg:hidden px-6 py-3 rounded-xl border-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-300"
                onClick={() => setIsFiltersOpen(true)}
              >
                <Filter className="mr-2 text-blue-500"/>
                Filters
              </Button>
              <p className="hidden sm:block text-sm font-medium text-gray-700 bg-white/60 px-4 py-2 rounded-full">
                Showing{" "}
                <span className="font-bold text-blue-600">
                  {sortedProducts.length}
                </span>{" "}
                of <span className="font-bold">{products.length}</span>{" "}
                products
              </p>
              <div className="flex items-center space-x-3">
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  Sort by:
                </span>
                <div className="gradient-border">
                  <select
                    value={sortBy}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setSortBy(e.target.value)
                    }
                    className="gradient-border-inner px-4 py-2 text-sm font-medium focus:ring-4 focus:ring-blue-500/20 focus:outline-none cursor-pointer"
                  >
                    <option value="popularity">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest</option>
                    <option value="rating">Rating</option>
                  </select>
                </div>
              </div>
            </div>
            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
              {sortedProducts.map((product, index) => (
                <Card
                  key={product.id}
                  className="product-card backdrop-blur-glass border-2 border-white/30 rounded-2xl overflow-hidden animate-fade-in-scale"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden group">
                      <div className="shimmer">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 sm:h-56 object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {product.onSale && (
                          <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full animate-pulse">
                            <Flame className="mr-1"/>
                            Sale
                          </Badge>
                        )}
                        {product.isNew && (
                          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full">
                            <Star className="mr-1"/>
                            New
                          </Badge>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`!rounded-button whitespace-nowrap cursor-pointer absolute top-3 right-3 w-10 h-10 rounded-full backdrop-blur-md transition-all duration-300 ${
                          wishlist.includes(product.id)
                            ? "bg-red-500/20 text-red-500 scale-110"
                            : "bg-white/20 text-gray-600 hover:bg-red-50/80 hover:text-red-500"
                        }`}
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart className={`${wishlist.includes(product.id) ? "animate-pulse" : ""}`}/>
                      </Button>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                        <div className="flex gap-2">
                          <Button
                            variant="secondary"
                            size="sm"
                            className="!rounded-button whitespace-nowrap cursor-pointer backdrop-blur-md bg-white/90 hover:bg-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                          >
                            <Eye className="mr-2"/>
                            Quick View
                          </Button>
                          <Button
                            className="!rounded-button whitespace-nowrap cursor-pointer backdrop-blur-md bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                            onClick={() => addToCart(product)}
                            disabled={!product.inStock}
                          >
                            <Plus className="mr-2"/>
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-6">
                      <h3 className="font-bold text-gray-900 mb-3 text-base sm:text-lg line-clamp-2 hover:text-blue-600 transition-colors duration-300">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-3">
                        <div className="flex items-center mr-2">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className="text-yellow-400"
                              fill={
                                i < Math.floor(product.rating)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          ))}
                        </div>
                        <span className="text-xs sm:text-sm font-medium text-gray-600">
                          {product.rating} ({product.reviews} reviews)
                        </span>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through bg-gray-100 px-2 py-1 rounded-full">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <div
                          className={`hidden sm:flex text-xs font-medium px-3 py-1 rounded-full ${
                            product.inStock
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.inStock ? (
                            <>
                              <Check className="mr-1"/>
                              In Stock
                            </>
                          ) : (
                            <>
                              <X className="mr-1"/>
                              Out of Stock
                            </>
                          )}
                        </div>
                      </div>
                      <Button
                        className="!rounded-button whitespace-nowrap cursor-pointer w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingCart className="mr-2"/>
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Enhanced User Reviews Section */}
            <div
              className="mt-16 animate-slide-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
                  Customer Reviews
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  See what our customers are saying about their shopping
                  experience
                </p>
              </div>
              <div className="backdrop-blur-glass rounded-2xl shadow-xl p-4 sm:p-8 border-2 border-white/30">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full">
                    <div className="text-center flex-shrink-0">
                      <div className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                        4.6
                      </div>
                      <div className="flex items-center justify-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`${i < 4 ? "text-yellow-400" : "text-gray-300"}`} fill={i < 4 ? "currentColor" : "none"}/>
                        ))}
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        Based on 234 reviews
                      </p>
                    </div>
                    <div className="w-full flex-1">
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((star) => (
                          <div
                            key={star}
                            className="flex items-center space-x-2"
                          >
                            <span className="text-xs font-medium text-gray-600 w-2">
                              {star}
                            </span>
                            <Star className="text-xs text-yellow-400"/>
                            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
                                style={{
                                  width: `${
                                    star === 5
                                      ? "70"
                                      : star === 4
                                      ? "20"
                                      : star === 3
                                      ? "5"
                                      : star === 2
                                      ? "3"
                                      : "2"
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500 w-8 text-right">
                              {star === 5
                                ? "70%"
                                : star === 4
                                ? "20%"
                                : star === 3
                                ? "5%"
                                : star === 2
                                ? "3%"
                                : "2%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="!rounded-button whitespace-nowrap cursor-pointer w-full lg:w-auto px-6 py-3 border-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:border-blue-300 transition-all duration-300"
                  >
                    <Pen className="mr-2"/>
                    Write a Review
                  </Button>
                </div>
                <div className="space-y-8">
                  {reviews.map((review, index) => (
                    <div
                      key={review.id}
                      className="border-t border-gray-200/50 pt-8 first:border-t-0 first:pt-0 animate-fade-in-scale"
                      style={{ animationDelay: `${(index + 8) * 0.1}s` }}
                    >
                      <div className="flex flex-col sm:flex-row items-start gap-4">
                        <Avatar className="w-12 h-12 ring-2 ring-white shadow-lg flex-shrink-0">
                          <AvatarImage src={review.avatar} alt={review.user} />
                          <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white font-semibold">
                            {review.user.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3">
                            <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                              <h4 className="font-semibold text-gray-900">
                                {review.user}
                              </h4>
                              {review.verified && (
                                <Badge
                                  variant="secondary"
                                  className="text-xs bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200"
                                >
                                  <Check className="mr-1"/>
                                  Verified Purchase
                                </Badge>
                              )}
                            </div>
                            <span className="text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                              {review.date}
                            </span>
                          </div>
                          <div className="flex items-center mb-3">
                            <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-400 px-3 py-1 rounded-full mr-3">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="text-white"
                                  fill={i < review.rating ? "currentColor" : "rgba(255, 255, 255, 0.4)"}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium text-gray-600">
                              {review.rating}.0
                            </span>
                          </div>
                          <p className="text-gray-700 mb-4 leading-relaxed">
                            {review.comment}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 sm:space-x-4">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer text-xs hover:bg-green-50 hover:text-green-600 transition-colors duration-300"
                            >
                              <ThumbsUp className="mr-2 text-green-500"/>
                              Helpful ({review.helpful})
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer text-xs hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
                            >
                              <Reply className="mr-2 text-blue-500"/>
                              Reply
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer text-xs hover:bg-gray-50 hover:text-gray-600 transition-colors duration-300"
                            >
                              <Share className="mr-2 text-gray-500"/>
                              Share
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Mobile Filters Modal */}
      {isFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fade-in-scale">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsFiltersOpen(false)}
          ></div>
          <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl shadow-2xl rounded-t-3xl animate-slide-in-up">
            <div className="flex flex-col h-[85vh]">
              <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
                <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Filters
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap cursor-pointer p-2 rounded-lg hover:bg-red-50 transition-colors duration-300"
                  onClick={() => setIsFiltersOpen(false)}
                >
                  <X className="text-red-500" />
                </Button>
              </div>
              <ScrollArea className="flex-1 p-6">
                {/* Price Range */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Price Range
                  </h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={1000}
                    step={10}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span className="bg-blue-50 px-3 py-1 rounded-full">
                      ${priceRange[0]}
                    </span>
                    <span className="bg-blue-50 px-3 py-1 rounded-full">
                      ${priceRange[1]}
                    </span>
                  </div>
                </div>
                {/* Categories */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Categories
                  </h4>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-100"
                      >
                        <Checkbox
                          id={`mobile-${category.name}`}
                          checked={selectedCategories.includes(category.name)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedCategories([
                                ...selectedCategories,
                                category.name,
                              ]);
                            } else {
                              setSelectedCategories(
                                selectedCategories.filter(
                                  (c) => c !== category.name
                                )
                              );
                            }
                          }}
                        />
                        <label
                          htmlFor={`mobile-${category.name}`}
                          className="text-sm font-medium text-gray-700 cursor-pointer flex-1"
                        >
                          {category.name}
                        </label>
                        <Badge variant="secondary">{category.count}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Colors */}
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Colors
                  </h4>
                  <div className="grid grid-cols-4 gap-3">
                    {colors.map((color) => (
                      <Button
                        key={color}
                        variant={
                          selectedColors.includes(color)
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className={`!rounded-button whitespace-nowrap cursor-pointer h-12 text-xs font-medium ${
                          selectedColors.includes(color)
                            ? "bg-blue-600 text-white"
                            : ""
                        }`}
                        onClick={() => {
                          if (selectedColors.includes(color)) {
                            setSelectedColors(
                              selectedColors.filter((c) => c !== color)
                            );
                          } else {
                            setSelectedColors([...selectedColors, color]);
                          }
                        }}
                      >
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>
              </ScrollArea>
              <div className="p-6 border-t border-gray-200/50">
                <Button
                  className="!rounded-button whitespace-nowrap cursor-pointer w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg"
                  onClick={() => setIsFiltersOpen(false)}
                >
                  Show {filteredProducts.length} Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Shopping Cart Sidebar/Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in-scale">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="absolute right-0 top-0 h-full w-full sm:w-96 backdrop-blur-glass shadow-2xl border-l-2 border-white/20">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="text-white text-sm"/>
                  </div>
                  <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Shopping Cart
                  </h2>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap cursor-pointer p-2 rounded-lg hover:bg-red-50 transition-colors duration-300"
                  onClick={() => setIsCartOpen(false)}
                >
                  <X className="text-red-500"/>
                </Button>
              </div>
              <ScrollArea className="flex-1 p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                      <ShoppingCart className="text-4xl text-gray-400"/>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Your cart is empty
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Looks like you haven't added anything to your cart yet
                    </p>
                    <Button
                      className="!rounded-button whitespace-nowrap cursor-pointer px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg"
                      onClick={() => setIsCartOpen(false)}
                    >
                      <ShoppingBag className="mr-2"/>
                      Continue Shopping
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center space-x-4 p-4 backdrop-blur-sm bg-white/40 border-2 border-white/30 rounded-2xl animate-fade-in-scale"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover object-top rounded-xl shadow-md"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            ${item.price}
                          </p>
                          <div className="flex items-center space-x-2 mt-3">
                            <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer w-8 h-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus />
                            </Button>
                            <span className="font-bold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="!rounded-button whitespace-nowrap cursor-pointer w-8 h-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus />
                            </Button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="!rounded-button whitespace-nowrap cursor-pointer p-2 rounded-lg hover:bg-red-50 transition-colors duration-300"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash className=" text-red-500"/>
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
              {cartItems.length > 0 && (
                <div className="border-t border-white/20 p-6 backdrop-blur-sm">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-semibold">
                        ${cartTotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-semibold text-green-600">Free</span>
                    </div>
                    <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button
                    className="!rounded-button whitespace-nowrap cursor-pointer w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
                    onClick={(e) => {
                      const button = e.currentTarget;
                      button.classList.add("animate-pulse");
                      setIsCartOpen(false);
                      setIsProcessing(true);
                    }}
                  >
                    <CreditCard className="mr-3"/>
                    Proceed to Checkout
                  </Button>
                  <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                    <LockKeyhole className="mr-2"/>
                    Secure checkout powered by SSL encryption
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Checkout Modal */}
      {isProcessing && (
        <div className="fixed inset-0 z-50 overflow-y-auto flex items-start md:items-center justify-center animate-fade-in-scale">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={resetCheckout}></div>
          <div className="relative w-full max-w-4xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl animate-slide-in-up my-auto">
            {paymentSuccess ? (
              <div className="text-center p-8 sm:p-16">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-fade-in-scale">
                  <Check className="text-white w-12 h-12" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
                <p className="text-gray-600 mb-8">
                  Thank you for your purchase. Your order is being processed and you will receive a confirmation email shortly.
                </p>
                <div className="bg-slate-50/80 rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-bold mb-4">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-gray-600">{item.name} (x{item.quantity})</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4 flex justify-between font-bold">
                    <span>Total Paid</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="!rounded-button whitespace-nowrap cursor-pointer w-full sm:w-auto px-12 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg shadow-xl"
                  onClick={resetCheckout}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="p-4 sm:p-8">
                <div className="flex justify-end">
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-400 hover:bg-red-50 rounded-full" onClick={() => setIsProcessing(false)}><X /></Button>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                  {/* Left Section - Order Summary */}
                  <div className="flex-1 md:border-r md:border-gray-200/80 md:pr-8">
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Order Summary</h2>
                    <ScrollArea className="h-[300px] pr-4 -mr-4">
                      <div className="space-y-4">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-center space-x-4 p-4 bg-slate-50/70 rounded-2xl">
                            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover shadow-sm" />
                            <div className="flex-1">
                              <p className="font-semibold text-gray-800">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <div className="border-t border-gray-200/80 mt-6 pt-6 space-y-3">
                      <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-medium text-gray-800">${cartTotal.toFixed(2)}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-600">Shipping</span><span className="text-green-600 font-medium">Free</span></div>
                      <div className="flex justify-between font-bold text-lg"><span className="text-gray-800">Total</span><span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">${cartTotal.toFixed(2)}</span></div>
                    </div>
                  </div>
                  {/* Right Section - Payment Form */}
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Payment Details</h2>
                    <form className="space-y-5">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Card Number</label>
                        <div className="relative">
                          <Input type="text" placeholder="1234 5678 9012 3456" className="pl-12 py-6 bg-slate-100/80 border-2 border-transparent focus:bg-white focus:border-blue-400 rounded-xl" maxLength={19} onChange={(e) => { const v = e.target.value.replace(/\s/g, ""); e.target.value = v.replace(/(\d{4})/g, "$1 ").trim(); }} />
                          <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                          <Input type="text" placeholder="MM / YY" className="py-6 bg-slate-100/80 border-2 border-transparent focus:bg-white focus:border-blue-400 rounded-xl" maxLength={7} onChange={(e) => { let v = e.target.value.replace(/\D/g, "").slice(0, 4); if (v.length > 2) v = v.slice(0, 2) + " / " + v.slice(2); e.target.value = v; }} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">CVV</label>
                          <Input type="password" placeholder="•••" className="py-6 bg-slate-100/80 border-2 border-transparent focus:bg-white focus:border-blue-400 rounded-xl" maxLength={4} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Name on Card</label>
                        <Input type="text" placeholder="John Doe" className="py-6 bg-slate-100/80 border-2 border-transparent focus:bg-white focus:border-blue-400 rounded-xl" />
                      </div>
                      <Button className="!rounded-button whitespace-nowrap cursor-pointer w-full py-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300" onClick={handlePayment}>
                        <LockKeyhole className="mr-2" />
                        Pay ${cartTotal.toFixed(2)}
                      </Button>
                    </form>
                    <div className="mt-6 text-center">
                      <div className="flex items-center justify-center space-x-4 text-2xl text-gray-400">
                        <FontAwesomeIcon icon={faCcVisa} />
                        <FontAwesomeIcon icon={faCcMastercard} />
                        <FontAwesomeIcon icon={faCcAmex} />
                        <FontAwesomeIcon icon={faCcDiscover} />
                        <FontAwesomeIcon icon={faCcPaypal} />
                      </div>
                      <p className="text-xs text-gray-500 mt-4 flex items-center justify-center"><LockKeyhole className="w-3 h-3 mr-1.5 text-green-500" />Your payment is secure with SSL encryption</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {/* Enhanced Footer */}
      <footer
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white mt-20 animate-slide-in-up"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* About Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-white text-xl"/>
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  ShopHub
                </h3>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Your trusted online shopping destination for quality products at
                great prices. Experience the future of e-commerce today.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap cursor-pointer w-10 h-10 rounded-full bg-white/10 hover:bg-blue-500 transition-all duration-300"
                >
                  <Facebook className="text-white"/>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap cursor-pointer w-10 h-10 rounded-full bg-white/10 hover:bg-blue-400 transition-all duration-300"
                >
                  <Twitter className="text-white"/>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap cursor-pointer w-10 h-10 rounded-full bg-white/10 hover:bg-pink-500 transition-all duration-300"
                >
                  <Instagram className="text-white"/>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="!rounded-button whitespace-nowrap cursor-pointer w-10 h-10 rounded-full bg-white/10 hover:bg-green-500 transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faWhatsapp} className="text-white"/>
                </Button>
              </div>
            </div>
            {/* Customer Service Section */}
            <div>
              <h4 className="font-bold mb-6 text-lg">Customer Service</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center cursor-pointer"
                  >
                    <Headset className=" mr-2 text-blue-400"/>
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center cursor-pointer"
                  >
                    <CircleQuestionMark className="mr-2 text-green-400"/>
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center cursor-pointer"
                  >
                    <Truck className="mr-2 text-purple-400"/>
                    Shipping Info
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center cursor-pointer"
                  >
                    <Undo2 className="mr-2 text-orange-400"/>
                    Returns
                  </a>
                </li>
              </ul>
            </div>
            {/* Company Section */}
            <div>
              <h4 className="font-bold mb-6 text-lg">Company</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center cursor-pointer"
                  >
                    <Info className="mr-2 text-blue-400"/>
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center cursor-pointer"
                  >
                    <BriefcaseBusiness className=" mr-2 text-green-400"/>
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center cursor-pointer"
                  >
                    <ShieldHalf className="mr-2 text-purple-400"/>
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a

                    href="#"
                    className="text-gray-300 hover:text-white transition-colors duration-300 flex items-center cursor-pointer"
                  >
                    <File className="contract mr-2 text-orange-400"/>
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            {/* Newsletter Section */}
            <div>
              <h4 className="font-bold mb-6 text-lg">Newsletter</h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Subscribe to get special offers, exclusive deals, and the latest
                updates.
              </p>
              <div className="space-y-3">
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 mr-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-sm backdrop-blur-sm"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      e.preventDefault()
                    }
                  />
                  <Button className="!rounded-button whitespace-nowrap cursor-pointer px-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-300">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  Join 50,000+ subscribers and never miss an update
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-400 text-sm">
                © 2025 ShopHub. All rights reserved. Made with ❤️ for amazing
                shoppers
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <span className="text-gray-400 text-sm">We accept:</span>
                <div className="flex space-x-3">
                  <div key="visa" className="w-8 h-6 bg-white/10 rounded flex items-center justify-center">
                    <FontAwesomeIcon icon={faCcVisa} className="text-blue-400"/>
                  </div>
                  <div key="mastercard" className="w-8 h-6 bg-white/10 rounded flex items-center justify-center">
                    <FontAwesomeIcon icon={faCcMastercard} className="text-red-400"/>
                  </div>
                  <div key="paypal" className="w-8 h-6 bg-white/10 rounded flex items-center justify-center">
                    <FontAwesomeIcon icon={faCcPaypal} className="text-blue-400"/>
                  </div>
                  <div key="applepay" className="w-8 h-6 bg-white/10 rounded flex items-center justify-center">
                    <FontAwesomeIcon icon={faCcApplePay} className="text-white"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default ShopHub;