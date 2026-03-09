/**
 * CategoryPage.tsx - Product Category စာမျက်နှာ
 * 
 * URL path: /category/:gender/:category
 * ဥပမာ: /category/men/bags, /category/women/shoes
 * 
 * gender နဲ့ category parameter အလိုက် ဆိုင်ရာ product list ကို ပြတယ်။
 * 
 * အပိုင်းများ:
 * 1. Sticky Navigation Bar - Menu, Search, Brand, Icons
 * 2. Sub-header - Back button + Category title + Item count
 * 3. Hero Banner - Category ရဲ့ hero image ကြီး
 * 4. Product Grid - Masonry-style staggered layout (product.tall property အလိုက်)
 *    - Product card click → /product/:gender/:category/:productId
 */

import { Menu, Search, Heart, User, ArrowLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SlideMenu from "./SlideMenu";
import SearchOverlay from "./SearchOverlay";
import { getCategoryData } from "@/data/categoryData";

const CategoryPage = () => {
  // URL params ကနေ gender နဲ့ category ယူတယ်
  const { gender, category } = useParams();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Category data ရယူတယ် (hero image + products array)
  const genderKey = gender || "men";
  const categoryKey = category || "bags";
  const data = getCategoryData(genderKey, categoryKey);
  const title = `${category?.replace(/-/g, " ")} for ${gender}`; // ဥပမာ: "bags for men"
  const itemCount = data?.products.length || 0;

  /** Scroll listener - navbar style ပြောင်းဖို့ */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /** Menu ဖွင့်ထားရင် body scroll ပိတ်တယ် */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  // Category data မရှိရင် "Category not found" ပြတယ်
  if (!data) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">
      {/* ==================== NAVIGATION BAR ==================== */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 md:px-10 py-4 md:py-5 transition-all duration-300 ${
          menuOpen
            ? "bg-background border-b border-border"
            : scrolled
              ? "backdrop-blur-xl bg-background/80 border-b border-border shadow-sm"
              : "bg-background border-b border-border"
        }`}
      >
        {/* ဘယ်ဘက် - Menu + Search */}
        <div className="flex items-center gap-4 text-foreground">
          {menuOpen ? (
            <button
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <span className="font-body text-sm tracking-wider">✕</span>
              <span className="hidden md:inline font-body text-sm tracking-wider">Close</span>
            </button>
          ) : (
            <button
              onClick={() => setMenuOpen(true)}
              className="flex items-center gap-2 hover:opacity-70 transition-opacity"
            >
              <Menu size={20} />
              <span className="hidden md:inline font-body text-sm tracking-wider">Menu</span>
            </button>
          )}
          <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <Search size={20} />
            <span className="hidden md:inline font-body text-sm tracking-wider">Search</span>
          </button>
        </div>

        {/* အလယ် - Brand name (Home page link) */}
        <Link to="/" className="font-heading text-xl md:text-2xl font-semibold tracking-[0.3em] uppercase text-foreground">
          MAISON
        </Link>

        {/* ညာဘက် - Icons */}
        <div className="flex items-center gap-3 md:gap-4 text-foreground">
          <span className="hidden md:inline font-body text-sm tracking-wider hover:opacity-70 transition-opacity cursor-pointer">
            Call Us
          </span>
          <button className="hidden md:block hover:opacity-70 transition-opacity">
            <Heart size={20} />
          </button>
          <Link to="/login" className="hover:opacity-70 transition-opacity">
            <User size={20} />
          </Link>
        </div>
      </nav>

      {/* Slide Menu + Search Overlay */}
      <SlideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ==================== SUB-HEADER ==================== */}
      {/* Back arrow + Category title + Item count */}
      <div className="fixed top-[69px] left-0 right-0 z-40 bg-background border-b border-border px-6 md:px-10 py-3 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="hover:opacity-70 transition-opacity text-foreground"
        >
          <ArrowLeft size={18} />
        </button>
        <h2 className="font-heading text-sm md:text-base font-semibold tracking-[0.15em] uppercase text-foreground">
          {title}
        </h2>
        <span className="font-body text-xs md:text-sm text-muted-foreground ml-2">
          {itemCount} Items
        </span>
      </div>

      {/* ==================== HERO BANNER ==================== */}
      {/* Category ရဲ့ hero image ကြီး */}
      <section className="pt-[130px]">
        <div className="w-full h-[50vh] md:h-[70vh] overflow-hidden bg-muted">
          <img
            src={data.hero}
            alt={title}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </section>

      {/* ==================== PRODUCT GRID ==================== */}
      {/* Masonry-style layout - CSS columns သုံးထားတယ် */}
      {/* product.tall = true ဆိုရင် aspect-[3/4], false ဆိုရင် aspect-square */}
      <section className="px-4 md:px-8 lg:px-12 py-10 md:py-16 max-w-[1400px] mx-auto">
        <div className="columns-2 md:columns-3 gap-4 md:gap-6">
          {data.products.map((product) => (
            <Link
              key={product.id}
              to={`/product/${genderKey}/${categoryKey}/${product.id}`}
              className="group block mb-4 md:mb-6 break-inside-avoid"
            >
              {/* Product image - hover zoom effect */}
              <div
                className={`overflow-hidden bg-muted ${
                  product.tall ? "aspect-[3/4]" : "aspect-square"
                }`}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              {/* Product name + price */}
              <div className="mt-3 space-y-1">
                <h3 className="font-body text-sm text-foreground tracking-wide">
                  {product.name}
                </h3>
                <p className="font-body text-xs text-muted-foreground">
                  {product.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;
