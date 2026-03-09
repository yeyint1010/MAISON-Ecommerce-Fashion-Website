/**
 * HomePage.tsx - ပင်မ Landing Page
 * 
 * Website ရဲ့ ပထမဆုံး ပြတဲ့ စာမျက်နှာ။
 * 
 * အပိုင်းများ:
 * 1. Sticky Navigation Bar - scroll လုပ်လည်း အမြဲမြင်ရတဲ့ menu bar
 * 2. Hero Section - မျက်နှာဖုံးပုံကြီး (Spring-Summer 2026)
 * 3. Category Grid - Product category ပုံတွေ (Handbags, Wallets, RTW, Accessories)
 * 4. Full-width Banner - Campaign ပုံကြီး (Video ထည့်ချင်ရင် comment ပြောင်းပါ)
 * 5. Featured Items - Gift ပေးဖို့ ကောင်းတဲ့ item များ
 * 6. Footer - Company info, links, social media
 */

import { Menu, Search, Heart, User, X, ShoppingBag, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import heroHome from "@/assets/hero-home.jpg";
import homeBannerFull from "@/assets/home-banner-full.jpg";
import productHandbag from "@/assets/product-handbag.jpg";
import productWallet from "@/assets/product-wallet.jpg";
import productReadytowear from "@/assets/product-readytowear.jpg";
import productAccessories from "@/assets/product-accessories.jpg";
import productFeatured1 from "@/assets/product-featured-1.jpg";
import productFeatured2 from "@/assets/product-featured-2.jpg";
import productFeatured3 from "@/assets/product-featured-3.jpg";
import productFeatured4 from "@/assets/product-featured-4.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SlideMenu from "./SlideMenu";
import SearchOverlay from "./SearchOverlay";

/** "Explore a Selection" section မှာ ပြမယ့် category ပုံတွေနဲ့ label တွေ */
const categories = [
  { image: productHandbag, label: "Women's Handbags" },
  { image: productWallet, label: "Wallets & Small Leather Goods" },
  { image: productReadytowear, label: "Women's Ready-To-Wear" },
  { image: productAccessories, label: "Women's Accessories" },
];

/** "Gifts for Every Occasion" section မှာ ပြမယ့် featured product တွေ */
const featuredItems = [
  { image: productFeatured1, label: "Voyager Briefcase", price: "$2,450" },
  { image: productFeatured2, label: "Cashmere Écharpe", price: "$890" },
  { image: productFeatured3, label: "Chain d'Or Necklace", price: "$3,200" },
  { image: productFeatured4, label: "Solaire Sunglasses", price: "$680" },
];

const HomePage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  

  /** Scroll event listener - 50px ကျော်ရင် navbar background ပြောင်းတယ် */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Menu ဖွင့်ထားရင် body scroll ကို ပိတ်ထားတယ် (background scroll မလုပ်နိုင်အောင်) */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <div className="w-full">
      {/* ==================== NAVIGATION BAR ==================== */}
      {/* Sticky header - scroll လုပ်ရင် glass effect (blur) ပြတယ် */}
      {/* Menu ဖွင့်ထားရင် solid background, scroll လုပ်ရင် blur background, ပုံမှန် transparent */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 md:py-5 transition-all duration-300 ${
          menuOpen
            ? "bg-background border-b border-border"
            : scrolled
              ? "backdrop-blur-xl bg-white/60 border-b border-border shadow-sm"
              : "bg-transparent"
        }`}
      >
        {/* ဘယ်ဘက် - Menu button နဲ့ Search button */}
        <div className={`flex items-center gap-4 ${menuOpen || scrolled ? "text-foreground" : "text-white"}`}>
          {menuOpen ? (
            /* Menu ဖွင့်ထားရင် Close (X) button ပြတယ် */
            <button
              onClick={() => { setMenuOpen(false); }}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <X size={20} />
              <span className="hidden md:inline font-body text-sm tracking-wider">Close</span>
            </button>
          ) : (
            /* Menu ပိတ်ထားရင် Hamburger menu button ပြတယ် */
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <Menu size={20} />
              <span className="hidden md:inline font-body text-sm tracking-wider">Menu</span>
            </button>
          )}
          {/* Search button - နှိပ်ရင် SearchOverlay ဖွင့်တယ် */}
          <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <Search size={20} />
            <span className="hidden md:inline font-body text-sm tracking-wider">Search</span>
          </button>
        </div>

        {/* အလယ် - Brand name "MAISON" */}
        <h1 className={`font-heading text-xl md:text-2xl font-semibold tracking-[0.3em] uppercase ${menuOpen || scrolled ? "text-foreground" : "text-white"}`}>
          MAISON
        </h1>

        {/* ညာဘက် - Shopping bag, Wishlist, User/Logout icons */}
        <div className={`flex items-center gap-3 md:gap-4 ${menuOpen || scrolled ? "text-foreground" : "text-white"}`}>
          <button className="hover:opacity-70 transition-opacity">
            <ShoppingBag size={20} />
          </button>
          <button className="hidden md:block hover:opacity-70 transition-opacity">
            <Heart size={20} />
          </button>
          {user ? (
            <>
              <Link to="/profile" className="hover:opacity-70 transition-opacity">
                <User size={20} />
              </Link>
              <button onClick={() => signOut()} className="hidden md:block hover:opacity-70 transition-opacity">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:opacity-70 transition-opacity">
              <User size={20} />
            </Link>
          )}
        </div>
      </nav>

      {/* ==================== SLIDE MENU & SEARCH ==================== */}
      {/* SlideMenu - ဘယ်ဘက်ကနေ ဖွင့်ပြတဲ့ navigation menu (Men, Women, Teenage...) */}
      <SlideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      {/* SearchOverlay - Product search လုပ်တဲ့ fullscreen overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ==================== HERO SECTION ==================== */}
      {/* Full screen hero image - "Spring-Summer 2026" collection ပြတယ် */}
      <section className="relative w-full h-screen overflow-hidden">
        <img
          src={heroHome}
          alt="Spring-Summer 2026 Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay - ပုံအောက်ပိုင်း မှောင်အောင် */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10" />

        {/* Hero text - ပုံအောက်ပိုင်းမှာ ပြတယ် */}
        <div className="absolute bottom-16 md:bottom-20 left-0 right-0 text-center text-white">
          <p className="font-body text-xs md:text-sm tracking-[0.35em] uppercase mb-3">
            Women
          </p>
          <h2 className="font-heading text-3xl md:text-5xl font-light tracking-tight mb-5">
            Spring-Summer 2026
          </h2>
          <a
            href="#"
            className="inline-block font-body text-sm tracking-wider underline underline-offset-4 hover:opacity-70 transition-opacity"
          >
            Discover the Collection
          </a>
        </div>
      </section>

      {/* ==================== CATEGORY GRID SECTION ==================== */}
      {/* "Explore a Selection" - 4 category ပုံတွေ grid layout နဲ့ ပြတယ် */}
      <section className="bg-background py-16 md:py-24 px-6 md:px-10">
        <h2 className="font-heading text-2xl md:text-4xl font-light text-center text-foreground mb-12 md:mb-16">
          Explore a Selection of the Maison's
          <br />
          Creations
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-[1400px] mx-auto">
          {categories.map((cat) => (
            <a
              key={cat.label}
              href="#"
              className="group flex flex-col items-center gap-4"
            >
              {/* Category ပုံ - hover လုပ်ရင် zoom in effect */}
              <div className="w-full aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="font-body text-xs md:text-sm text-foreground tracking-wider text-center">
                {cat.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ==================== FULL-WIDTH BANNER ==================== */}
      {/* Campaign banner ပုံကြီး (Video ထည့်ချင်ရင် <img> tag ကို comment လုပ်ပြီး <video> tag ကို uncomment လုပ်ပါ) */}
      <section className="w-full">
        <img
          src={homeBannerFull}
          alt="Maison Campaign"
          className="w-full h-auto block"
        />

        {/* Video ထည့်ချင်ရင် အောက်က code ကို uncomment လုပ်ပြီး အပေါ်က <img> tag ကို comment လုပ်ပါ */}
        {/*
        <video
          className="w-full h-auto block"
          src="YOUR_VIDEO_URL_HERE"
          autoPlay
          muted
          loop
          playsInline
        />
        */}
      </section>

      {/* ==================== FEATURED ITEMS SECTION ==================== */}
      {/* "Gifts for Every Occasion" - Featured product 4 ခု ပြတယ် */}
      <section className="bg-background py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto text-center mb-12 md:mb-16">
          <p className="font-body text-xs md:text-sm tracking-[0.35em] uppercase text-muted-foreground mb-4">
            The Art of Gifting
          </p>
          <h2 className="font-heading text-2xl md:text-4xl font-light text-foreground mb-4">
            Gifts for Every Occasion
          </h2>
          <p className="font-body text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover a curated selection of the Maison's most iconic pieces — timeless creations
            crafted with exceptional savoir-faire, perfect for those who appreciate the finest things.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-[1400px] mx-auto">
          {featuredItems.map((item) => (
            <a
              key={item.label}
              href="#"
              className="group flex flex-col items-center gap-3"
            >
              <div className="w-full aspect-[4/5] overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <span className="font-body text-xs md:text-sm text-foreground tracking-wider text-center">
                {item.label}
              </span>
              <span className="font-body text-xs text-muted-foreground tracking-wider">
                {item.price}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      {/* Footer - 4 column layout (The Maison, Client Services, Legal, Follow Us) */}
      <footer className="bg-foreground text-background">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 mb-16">
            {/* Column 1 - Company info links */}
            <div>
              <h4 className="font-body text-xs tracking-[0.25em] uppercase mb-6 opacity-60">The Maison</h4>
              <ul className="space-y-3">
                {["Our Story", "Craftsmanship", "Sustainability", "Careers"].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-body text-sm opacity-80 hover:opacity-100 transition-opacity">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Column 2 - Customer service links */}
            <div>
              <h4 className="font-body text-xs tracking-[0.25em] uppercase mb-6 opacity-60">Client Services</h4>
              <ul className="space-y-3">
                {["Contact Us", "FAQs", "Shipping & Returns", "Size Guide"].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-body text-sm opacity-80 hover:opacity-100 transition-opacity">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Column 3 - Legal links */}
            <div>
              <h4 className="font-body text-xs tracking-[0.25em] uppercase mb-6 opacity-60">Legal</h4>
              <ul className="space-y-3">
                {["Privacy Policy", "Terms of Use", "Cookie Settings", "Accessibility"].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-body text-sm opacity-80 hover:opacity-100 transition-opacity">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            {/* Column 4 - Social media links */}
            <div>
              <h4 className="font-body text-xs tracking-[0.25em] uppercase mb-6 opacity-60">Follow Us</h4>
              <ul className="space-y-3">
                {["Instagram", "Facebook", "Pinterest", "YouTube"].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-body text-sm opacity-80 hover:opacity-100 transition-opacity">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer bottom bar - Brand name နဲ့ copyright */}
          <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-heading text-lg tracking-[0.3em] uppercase">MAISON</span>
            <p className="font-body text-xs opacity-50 tracking-wider">
              © 2026 Maison. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
