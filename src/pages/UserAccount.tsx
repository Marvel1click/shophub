import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowLeftCircle,
  Bell,
  Building,
  Camera,
  Cog,
  DollarSign,
  Download,
  Edit,
  Home,
  LockKeyhole,
  MapPin,
  Plus,
  ShieldHalfIcon,
  ShoppingBag,
  Star,
  Trash2,
  UserCircle,
  UserX2,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
// import { Textarea } from "@/components/ui/textarea";
// import { ScrollArea } from "@/components/ui/scroll-area";

interface Order {
  id: string;
  date: string;
  status: "delivered" | "processing" | "shipped" | "cancelled";
  total: number;
  items: number;
  image: string;
}

interface Address {
  id: string;
  type: "home" | "work" | "other";
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

const UserAccountPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [activeSection, setActiveSection] = useState("profile");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [userProfile, setUserProfile] = useState({
    name: "Alex Thompson",
    email: "alex.thompson@email.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://readdy.ai/api/search-image?query=modern%20professional%20young%20adult%20with%20friendly%20smile%20in%20contemporary%20setting%2C%20clean%20minimalist%20portrait%20photography%2C%20soft%20natural%20lighting%20with%20subtle%20gradients%2C%20contemporary%20business%20casual%20style&width=120&height=120&seq=20&orientation=squarish",
    joinDate: "March 2024",
    totalOrders: 18,
    totalSpent: 2847.5,
  });

  const navigationItems = [
    {
      id: "profile",
      label: "Personal Information",
      mobileLabel: "Profile",
      icon: UserCircle,
    },
    {
      id: "orders",
      label: "Order History",
      mobileLabel: "Orders",
      icon: ShoppingBag,
    },
    {
      id: "addresses",
      label: "Saved Addresses",
      mobileLabel: "Addresses",
      icon: MapPin,
    },
    {
      id: "settings",
      label: "Account Settings",
      mobileLabel: "Settings",
      icon: Cog,
    },
  ];

  const orders: Order[] = [
    {
      id: "ORD-2024-015",
      date: "2024-01-25",
      status: "delivered",
      total: 429.99,
      items: 3,
      image:
        "https://readdy.ai/api/search-image?query=premium%20wireless%20earbuds%20in%20sleek%20charging%20case%20with%20modern%20minimalist%20design%20on%20gradient%20background%2C%20contemporary%20tech%20product%20photography%20with%20soft%20shadows%20and%20clean%20aesthetic&width=60&height=60&seq=21&orientation=squarish",
    },
    {
      id: "ORD-2024-016",
      date: "2024-01-23",
      status: "processing",
      total: 189.99,
      items: 1,
      image:
        "https://readdy.ai/api/search-image?query=modern%20smart%20fitness%20tracker%20with%20sleek%20design%20on%20gradient%20background%2C%20contemporary%20wearable%20technology%20photography%20with%20soft%20lighting%20and%20minimalist%20composition&width=60&height=60&seq=22&orientation=squarish",
    },
    {
      id: "ORD-2024-017",
      date: "2024-01-20",
      status: "shipped",
      total: 299.99,
      items: 2,
      image:
        "https://readdy.ai/api/search-image?query=premium%20portable%20bluetooth%20speaker%20with%20contemporary%20design%20on%20gradient%20background%2C%20modern%20audio%20device%20photography%20with%20clean%20aesthetic%20and%20soft%20shadows&width=60&height=60&seq=23&orientation=squarish",
    },
  ];

  const addresses: Address[] = [
    {
      id: "1",
      type: "home",
      name: "Home Address",
      street: "2847 Modern Ave, Unit 12A",
      city: "San Francisco",
      state: "CA",
      zip: "94102",
      isDefault: true,
    },
    {
      id: "2",
      type: "work",
      name: "Work Address",
      street: "1520 Innovation Drive, Floor 8",
      city: "San Francisco",
      state: "CA",
      zip: "94107",
      isDefault: false,
    },
  ];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "processing":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "shipped":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(registerData.password);
  const strengthLabels = ["Very Weak", "Weak", "Fair", "Good", "Strong"];
  const strengthColors = [
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-emerald-500",
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <Link
              to="/"
              data-readdy="true"
              className="inline-flex items-center text-sm text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors"
            >
              <ArrowLeft className="mr-2" />
              Back to ShopHub
            </Link>
          </div>

          <Card className="shadow-2xl border-0 backdrop-blur-sm bg-white/95">
            <CardHeader className="text-center pb-6">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center">
                  <ShoppingBag className="text-white text-xl" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ShopHub
                </h1>
                <p className="text-slate-600 mt-2">
                  Welcome to your shopping experience
                </p>
              </div>
              <div className="flex bg-slate-50 rounded-xl p-1.5 border">
                <Button
                  variant="ghost"
                  className={`!rounded-button whitespace-nowrap cursor-pointer flex-1 shadow-sm transition-colors duration-300 ${
                    isLoginForm
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                  onClick={() => setIsLoginForm(true)}
                >
                  Sign In
                </Button>
                <Button
                  variant="ghost"
                  className={`!rounded-button whitespace-nowrap cursor-pointer flex-1 shadow-sm transition-colors duration-300 ${
                    !isLoginForm
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                  onClick={() => setIsLoginForm(false)}
                >
                  Create Account
                </Button>
              </div>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              {isLoginForm ? (
                <form onSubmit={handleLogin} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="w-full pr-12 text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        value={loginData.password}
                        onChange={(e) =>
                          setLoginData({
                            ...loginData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="!rounded-button whitespace-nowrap cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="text-slate-500"
                        />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                          setRememberMe(checked as boolean)
                        }
                      />
                      <label
                        htmlFor="remember"
                        className="text-sm text-slate-700 cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                    <a
                      href="#"
                      className="text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <Button
                    type="submit"
                    className="!rounded-button whitespace-nowrap cursor-pointer w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg"
                  >
                    Sign In
                  </Button>
                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-slate-500">
                        Or continue with
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      className="!rounded-button whitespace-nowrap cursor-pointer h-12 border-slate-200 hover:bg-slate-50"
                    >
                      <FontAwesomeIcon
                        icon={faGoogle}
                        className="mr-2 text-red-500"
                      />
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="!rounded-button whitespace-nowrap cursor-pointer h-12 border-slate-200 hover:bg-slate-50"
                    >
                      <FontAwesomeIcon
                        icon={faFacebook}
                        className="mr-2 text-blue-600"
                      />
                      Facebook
                    </Button>
                  </div>

                  <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200/80 rounded-xl text-sm">
                    <p className="font-bold text-indigo-900 mb-2">
                      For Demo Purposes:
                    </p>
                    <div className="space-y-1 text-indigo-800/90">
                      <p>
                        <strong>Email:</strong>{" "}
                        <code className="bg-indigo-100 text-indigo-900 font-medium px-1.5 py-0.5 rounded-md">
                          alex.thompson@email.com
                        </code>
                      </p>
                      <p>
                        <strong>Password:</strong> Use any password you like.
                      </p>
                    </div>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegister} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Full Name
                    </label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                      value={registerData.fullName}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                      value={registerData.email}
                      onChange={(e) =>
                        setRegisterData({
                          ...registerData,
                          email: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className="w-full pr-12 text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="!rounded-button whitespace-nowrap cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="text-slate-500"
                        />
                      </Button>
                    </div>
                    {registerData.password && (
                      <div className="mt-3">
                        <div className="flex space-x-1 mb-2">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-1.5 flex-1 rounded-full ${
                                i < passwordStrength
                                  ? strengthColors[passwordStrength - 1]
                                  : "bg-slate-200"
                              }`}
                            ></div>
                          ))}
                        </div>
                        <p className="text-xs text-slate-600">
                          Password strength:{" "}
                          {strengthLabels[passwordStrength - 1] || "Very Weak"}
                        </p>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-3">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="w-full pr-12 text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            confirmPassword: e.target.value,
                          })
                        }
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="!rounded-button whitespace-nowrap cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-slate-100"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                          className="text-slate-500"
                        />
                      </Button>
                    </div>
                    {registerData.confirmPassword &&
                      registerData.password !==
                        registerData.confirmPassword && (
                        <p className="text-xs text-red-600 mt-2">
                          Passwords do not match
                        </p>
                      )}
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={acceptTerms}
                      onCheckedChange={(checked) =>
                        setAcceptTerms(checked as boolean)
                      }
                      className="mt-1"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm text-slate-700 cursor-pointer leading-relaxed"
                    >
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-800 font-medium"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                  <Button
                    type="submit"
                    className="!rounded-button whitespace-nowrap cursor-pointer w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg"
                    disabled={
                      !acceptTerms ||
                      registerData.password !== registerData.confirmPassword
                    }
                  >
                    Create Account
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="text-white text-sm" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  ShopHub
                </h1>
              </div>
              <Link
                to="/"
                data-readdy="true"
                className="text-sm text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors"
              >
                <ArrowLeft className="mr-2" />
                Back to Store
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Avatar className="w-9 h-9 ring-2 ring-indigo-100">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-semibold">
                  {userProfile.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-sm font-semibold text-slate-900">
                {userProfile.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="!rounded-button whitespace-nowrap cursor-pointer hover:bg-slate-100"
                onClick={() => setIsLoggedIn(false)}
              >
                <ArrowLeftCircle className=" text-slate-600" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation (LG and up) */}
          <div className="w-72 flex-shrink-0 hidden lg:block">
            <Card className="sticky top-24 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="p-6 border-b border-slate-100">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-14 h-14 ring-2 ring-indigo-100">
                      <AvatarImage
                        src={userProfile.avatar}
                        alt={userProfile.name}
                      />
                      <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-lg font-semibold">
                        {userProfile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-bold text-slate-900">
                        {userProfile.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        Member since {userProfile.joinDate}
                      </p>
                    </div>
                  </div>
                </div>
                <nav className="p-3">
                  {navigationItems.map((item) => (
                    <Button
                      key={item.id}
                      variant={activeSection === item.id ? "default" : "ghost"}
                      className={`!rounded-button whitespace-nowrap cursor-pointer w-full justify-start mb-2 h-11 font-medium ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                          : "hover:bg-slate-50 text-slate-700"
                      }`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      {item.label}
                    </Button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1">
            {/* Mobile Navigation (hidden on LG and up) */}
            <div className="lg:hidden mb-8">
              <div className="border-b border-slate-200">
                <nav className="-mb-px flex space-x-6 overflow-x-auto">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-sm flex items-center transition-colors duration-200 ${
                        activeSection === item.id
                          ? "border-indigo-600 text-indigo-600"
                          : "border-transparent text-slate-600 hover:border-slate-300 hover:text-slate-800"
                      }`}
                    >
                      <item.icon className="mr-2 h-5 w-5" />
                      {item.mobileLabel}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="mb-10">
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-3">
                Welcome back, {userProfile.name.split(" ")[0]}!
              </h1>
              <p className="text-slate-600 text-lg">
                Manage your account and view your activity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg">
                      <ShoppingBag className="text-white text-xl" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-slate-600">
                        Total Orders
                      </p>
                      <p className="text-3xl font-bold text-slate-900">
                        {userProfile.totalOrders}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-emerald-50 to-green-50 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl shadow-lg">
                      <DollarSign className="text-white text-xl" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-slate-600">
                        Total Spent
                      </p>
                      <p className="text-3xl font-bold text-slate-900">
                        ${userProfile.totalSpent.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-pink-50 hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
                      <Star className="text-white text-xl" />
                    </div>
                    <div className="ml-5">
                      <p className="text-sm font-medium text-slate-600">
                        Loyalty Points
                      </p>
                      <p className="text-3xl font-bold text-slate-900">2,847</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {activeSection === "profile" && (
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-xl">
                    <UserCircle className="mr-3 text-indigo-600" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-y-6 sm:space-y-0 sm:space-x-8">
                    <Avatar className="w-28 h-28 ring-4 ring-indigo-100">
                      <AvatarImage
                        src={userProfile.avatar}
                        alt={userProfile.name}
                      />
                      <AvatarFallback className="text-3xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold">
                        {userProfile.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button
                        variant="outline"
                        className="!rounded-button whitespace-nowrap cursor-pointer h-11 px-6 font-semibold border-slate-200 hover:bg-slate-50"
                      >
                        <Camera className="mr-2" />
                        Change Photo
                      </Button>
                      <p className="text-sm text-slate-600 mt-3">
                        JPG, GIF or PNG. 1MB max.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Full Name
                      </label>
                      <Input
                        type="text"
                        value={userProfile.name}
                        className="w-full text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        value={userProfile.email}
                        className="w-full text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={userProfile.phone}
                        className="w-full text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        onChange={(e) =>
                          setUserProfile({
                            ...userProfile,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-3">
                        Date of Birth
                      </label>
                      <Input
                        type="date"
                        className="w-full text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-4 pt-4">
                    <Button
                      variant="outline"
                      className="!rounded-button whitespace-nowrap cursor-pointer h-11 px-6 border-slate-200 hover:bg-slate-50"
                    >
                      Cancel
                    </Button>
                    <Button className="!rounded-button whitespace-nowrap cursor-pointer h-11 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg">
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "orders" && (
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center text-xl">
                      <ShoppingBag className="mr-3 text-indigo-600" />
                      Order History
                    </div>
                    <Button
                      variant="outline"
                      className="!rounded-button whitespace-nowrap cursor-pointer h-11 px-6 border-slate-200 hover:bg-slate-50 font-semibold"
                    >
                      <Download className="mr-2" />
                      Export
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="border border-slate-200 rounded-2xl p-4 sm:p-6 hover:shadow-lg transition-all bg-gradient-to-r from-white to-slate-50"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="flex items-center space-x-5">
                            <div className="w-16 h-16 rounded-xl overflow-hidden ring-2 ring-slate-100 flex-shrink-0">
                              <img
                                src={order.image}
                                alt="Order"
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <div>
                              <h4 className="font-bold text-slate-900 text-lg">
                                Order #{order.id}
                              </h4>
                              <p className="text-sm text-slate-600 mt-1">
                                {order.date} • {order.items} items
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-row sm:flex-col md:flex-row items-end sm:items-end md:items-center gap-x-6 gap-y-3 w-full sm:w-auto justify-between">
                            <Badge
                              className={`${getStatusColor(
                                order.status
                              )} border font-semibold px-3 py-1`}
                            >
                              {order.status.charAt(0).toUpperCase() +
                                order.status.slice(1)}
                            </Badge>
                            <div className="text-right">
                              <p className="font-bold text-slate-900 text-lg">
                                ${order.total.toFixed(2)}
                              </p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="!rounded-button whitespace-nowrap cursor-pointer text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-medium"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-8">
                    <Button
                      variant="outline"
                      className="!rounded-button whitespace-nowrap cursor-pointer h-11 px-8 border-slate-200 hover:bg-slate-50 font-semibold"
                    >
                      Load More Orders
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "addresses" && (
              <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center text-xl">
                      <MapPin className="mr-3 text-indigo-600" />
                      Saved Addresses
                    </div>
                    <Button className="!rounded-button whitespace-nowrap cursor-pointer h-11 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg">
                      <Plus className="mr-2" />
                      Add New Address
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {addresses.map((address) => {
                      const Icon =
                        address.type === "home"
                          ? Home
                          : address.type === "work"
                          ? Building
                          : MapPin;
                      return (
                        <div
                          key={address.id}
                          className="border border-slate-200 rounded-2xl p-6 relative bg-gradient-to-br from-white to-slate-50 hover:shadow-lg transition-shadow"
                        >
                          {address.isDefault && (
                            <Badge className="absolute top-4 right-4 bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold">
                              Default
                            </Badge>
                          )}
                          <div className="flex items-start space-x-4">
                            <div
                              className={`p-3 rounded-xl shadow-sm ${
                                address.type === "home"
                                  ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                                  : address.type === "work"
                                  ? "bg-gradient-to-br from-purple-500 to-pink-600"
                                  : "bg-gradient-to-br from-slate-500 to-gray-600"
                              }`}
                            >
                              <Icon className="text-white text-lg" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-bold text-slate-900 mb-2 text-lg">
                                {address.name}
                              </h4>
                              <p className="text-sm text-slate-600 leading-relaxed">
                                {address.street}
                                <br />
                                {address.city}, {address.state} {address.zip}
                              </p>
                              <div className="flex space-x-3 mt-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="!rounded-button whitespace-nowrap cursor-pointer text-xs text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 font-medium"
                                >
                                  <Edit className="mr-1" />
                                  Edit
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="!rounded-button whitespace-nowrap cursor-pointer text-xs text-red-600 hover:text-red-800 hover:bg-red-50 font-medium"
                                >
                                  <Trash2 className="mr-1" />
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            )}

            {activeSection === "settings" && (
              <div className="space-y-8">
                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <LockKeyhole className=" mr-3 text-indigo-600" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-bold text-slate-900 mb-4 text-lg">
                        Change Password
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Input
                          type="password"
                          placeholder="Current password"
                          className="text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <Input
                          type="password"
                          placeholder="New password"
                          className="text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                        <Input
                          type="password"
                          placeholder="Confirm new password"
                          className="text-sm h-12 border-slate-200 focus:border-indigo-500 focus:ring-indigo-500"
                        />
                      </div>
                      <Button className="!rounded-button whitespace-nowrap cursor-pointer mt-4 h-11 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold shadow-lg">
                        Update Password
                      </Button>
                    </div>
                    <div className="border-t border-slate-200 pt-6">
                      <h4 className="font-bold text-slate-900 mb-4 text-lg">
                        Two-Factor Authentication
                      </h4>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6">
                        <div>
                          <p className="text-sm text-slate-700 font-medium">
                            Add an extra layer of security to your account
                          </p>
                          <p className="text-xs text-slate-600 mt-1">
                            Secure your account with SMS or authenticator app
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          className="!rounded-button whitespace-nowrap cursor-pointer h-11 px-6 border-slate-200 hover:bg-white font-semibold flex-shrink-0"
                        >
                          Enable 2FA
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Bell className=" mr-3 text-indigo-600" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {[
                      {
                        id: "email-orders",
                        label: "Order updates via email",
                        description: "Get notified about order status changes",
                        checked: true,
                      },
                      {
                        id: "email-promotions",
                        label: "Promotional emails",
                        description: "Receive deals and special offers",
                        checked: false,
                      },
                      {
                        id: "sms-orders",
                        label: "Order updates via SMS",
                        description: "Text notifications for important updates",
                        checked: true,
                      },
                    ].map((notification) => (
                      <div key={notification.id} className="flex items-center justify-between">
                        <div>
                          <label htmlFor={notification.id} className="font-medium">
                            {notification.label}
                          </label>
                          <p className="text-sm text-slate-500">
                            {notification.description}
                          </p>
                        </div>
                        {/* You would replace this with a real switch/toggle component */}
                        <input
                          type="checkbox"
                          id={notification.id}
                          defaultChecked={notification.checked}
                          className="h-5 w-5"
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <ShieldHalfIcon className="mr-3 text-indigo-600" />
                      Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {[ // <-- Correct: Use square brackets to define an array
                      {
                        id: "profile-public",
                        label: "Make profile public",
                        description:
                          "Allow others to view your profile information",
                        checked: false,
                      },
                      {
                        id: "data-analytics",
                        label: "Allow data for analytics",
                        description: "Help us improve your shopping experience",
                        checked: true,
                      },
                      {
                        id: "third-party",
                        label: "Share data with partners",
                        description:
                          "Enable personalized recommendations from partners",
                        checked: false,
                      }
                    ].map((pref) => ( // <-- Now .map() works correctly on the array
                      <div
                        key={pref.id}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl"
                      >
                        <div>
                          <label
                            htmlFor={pref.id}
                            className="text-sm font-semibold text-slate-900 cursor-pointer"
                          >
                            {pref.label}
                          </label>
                          <p className="text-xs text-slate-600 mt-1">
                            {pref.description}
                          </p>
                        </div>
                        <Checkbox
                          id={pref.id}
                          defaultChecked={pref.checked}
                          className="self-start sm:self-center"
                        />
                      </div>
                    ))}
                    <div className="border-t border-slate-200 pt-6">
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-6">
                        <h5 className="font-bold text-slate-900 mb-2">
                          Danger Zone
                        </h5>
                        <p className="text-sm text-slate-600 mb-4">
                          Once you delete your account, there is no going back.
                          Please be certain.
                        </p>
                        <Button
                          variant="outline"
                          className="!rounded-button whitespace-nowrap cursor-pointer text-red-600 border-red-200 hover:bg-red-50 h-11 px-6 font-semibold"
                        >
                          <UserX2 className="mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountPage;
