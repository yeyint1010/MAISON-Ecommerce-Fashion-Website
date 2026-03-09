/**
 * ProductDetailPage.tsx - Product အသေးစိတ် ကြည့်တဲ့ စာမျက်နှာ
 * 
 * URL path: /product/:gender/:category/:productId
 * ဥပမာ: /product/men/bags/1
 * 
 * Product ရဲ့ ပုံတွေ, အမည်, ဈေးနှုန်း, color/size ရွေးချယ်ခြင်း,
 * quantity ထည့်ခြင်း, Add to Cart, အသေးစိတ် accordion info တွေ ပါဝင်တယ်။
 * 
 * Layout:
 * - ဘယ်ဘက် (58%): Image gallery (main + 3 extra from same category)
 * - ညာဘက် (42%): Product info, selectors, add to cart (sticky)
 */

import { Menu, Search, Heart, User, ShoppingBag, ArrowLeft, Minus, Plus, Star } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SlideMenu from "./SlideMenu";
import SearchOverlay from "./SearchOverlay";
import { getCategoryData, Product } from "@/data/categoryData";
import { useCart } from "@/context/CartContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/** ရွေးချယ်နိုင်တဲ့ size options */
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

/** ရွေးချယ်နိုင်တဲ့ color options (name + HSL value) */
const colors = [
  { name: "Black", value: "hsl(0 0% 10%)" },
  { name: "Ivory", value: "hsl(40 30% 92%)" },
  { name: "Navy", value: "hsl(220 40% 20%)" },
  { name: "Burgundy", value: "hsl(345 60% 30%)" },
  { name: "Camel", value: "hsl(30 40% 55%)" },
  { name: "Olive", value: "hsl(80 25% 35%)" },
];

const ProductDetailPage = () => {
  // URL params ကနေ gender, category, productId ယူတယ်
  const { gender, category, productId } = useParams();
  const navigate = useNavigate();
  const { addItem, setIsOpen } = useCart();

  // UI states
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Product selection states
  const [selectedSize, setSelectedSize] = useState("M");        // Default size: M
  const [selectedColor, setSelectedColor] = useState("Black");  // Default color: Black
  const [quantity, setQuantity] = useState(1);                  // Default quantity: 1

  // Category data + product ရှာတယ်
  const genderKey = gender || "men";
  const categoryKey = category || "bags";
  const data = getCategoryData(genderKey, categoryKey);
  const product = data?.products.find((p) => p.id === Number(productId));

  // Image gallery အတွက် - တူညီတဲ့ category ထဲက အခြား product ပုံတွေ ယူတယ် (max 3)
  const otherImages = data?.products.filter((p) => p.id !== Number(productId)).slice(0, 3) || [];

  /** Product ပြောင်းတိုင်း page ကို top သို့ scroll လုပ်တယ် */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  /** Scroll listener */
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

  // Product မရှိရင် "Product not found" ပြတယ်
  if (!data || !product) {
    return (
      <div className="w-full min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Product not found</p>
      </div>
    );
  }

  // Gallery images array (main product ပုံ + other 3 ပုံ)
  const allImages = [product, ...otherImages];

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
        <div className="flex items-center gap-4 text-foreground">
          {menuOpen ? (
            <button onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <span className="font-body text-sm tracking-wider">✕</span>
              <span className="hidden md:inline font-body text-sm tracking-wider">Close</span>
            </button>
          ) : (
            <button onClick={() => setMenuOpen(true)} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Menu size={20} />
              <span className="hidden md:inline font-body text-sm tracking-wider">Menu</span>
            </button>
          )}
          <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <Search size={20} />
            <span className="hidden md:inline font-body text-sm tracking-wider">Search</span>
          </button>
        </div>

        <Link to="/" className="font-heading text-xl md:text-2xl font-semibold tracking-[0.3em] uppercase text-foreground">
          MAISON
        </Link>

        <div className="flex items-center gap-3 md:gap-4 text-foreground">
          <button onClick={() => setIsOpen(true)} className="hover:opacity-70 transition-opacity">
            <ShoppingBag size={20} />
          </button>
          <button className="hidden md:block hover:opacity-70 transition-opacity">
            <Heart size={20} />
          </button>
          <Link to="/login" className="hover:opacity-70 transition-opacity">
            <User size={20} />
          </Link>
        </div>
      </nav>

      <SlideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="pt-[85px] pb-20">
        {/* Breadcrumb - navigation path ပြတယ် (ဥပမာ: men / bags / Messenger Bag) */}
        <div className="px-6 md:px-10 py-4 flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="hover:opacity-70 transition-opacity text-foreground">
            <ArrowLeft size={16} />
          </button>
          <span className="font-body text-xs text-muted-foreground tracking-wider uppercase">
            {gender} / {category?.replace(/-/g, " ")} / {product.name}
          </span>
        </div>

        <div className="px-4 sm:px-6 md:px-10 lg:px-16 max-w-[1400px] mx-auto">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">

            {/* ==================== LEFT: IMAGE GALLERY ==================== */}
            {/* ပထမပုံ col-span-2 (ကြီးကြီး), ကျန်ပုံတွေ 2 column grid */}
            <div className="lg:w-[58%]">
              <div className="grid grid-cols-2 gap-2">
                {allImages.map((img, i) => (
                  <div
                    key={i}
                    className={`overflow-hidden bg-muted ${i === 0 ? "col-span-2 aspect-[4/5]" : "aspect-square"}`}
                  >
                    <img
                      src={img.image}
                      alt={img.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ==================== RIGHT: PRODUCT INFO ==================== */}
            {/* Sticky sidebar - scroll လုပ်လည်း ညာဘက် info panel ကပ်နေတယ် */}
            <div className="lg:w-[42%] lg:sticky lg:top-[100px] lg:self-start">
              <div className="space-y-6">
                {/* Category badge */}
                <span className="font-body text-xs tracking-[0.2em] text-muted-foreground uppercase">
                  [ {categoryKey.replace(/-/g, " ")} ]
                </span>

                {/* Product Title + Wishlist button */}
                <div className="flex items-start justify-between gap-4">
                  <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold tracking-wide uppercase text-foreground leading-tight">
                    {product.name}
                  </h1>
                  <button className="mt-1 text-foreground hover:opacity-70 transition-opacity shrink-0">
                    <Heart size={22} />
                  </button>
                </div>

                {/* Star Rating (static 5 stars + review count) */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className="fill-foreground text-foreground" />
                    ))}
                  </div>
                  <span className="font-body text-xs text-muted-foreground tracking-wider">
                    214 reviews
                  </span>
                </div>

                {/* Price */}
                <p className="font-heading text-lg md:text-xl font-semibold text-foreground tracking-wide">
                  {product.price}
                </p>

                {/* ===== COLOR SELECTOR ===== */}
                {/* Round color swatches - click ရင် selectedColor ပြောင်းတယ် */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="font-body text-sm text-foreground tracking-wider">Color:</span>
                    <span className="font-body text-sm text-muted-foreground tracking-wider">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          selectedColor === color.name
                            ? "border-foreground scale-110 ring-2 ring-foreground/20"
                            : "border-border hover:border-foreground/50"
                        }`}
                        style={{ backgroundColor: color.value }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* ===== SIZE SELECTOR ===== */}
                {/* Rectangle buttons - click ရင် selectedSize ပြောင်းတယ် */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-body text-sm text-foreground tracking-wider">Size:</span>
                    <button className="font-body text-xs text-muted-foreground underline tracking-wider hover:text-foreground transition-colors">
                      SIZE GUIDE
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-10 font-body text-xs tracking-wider border transition-all duration-200 ${
                          selectedSize === size
                            ? "bg-foreground text-background border-foreground"
                            : "bg-background text-foreground border-border hover:border-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ===== QUANTITY SELECTOR ===== */}
                <div className="space-y-3">
                  <span className="font-body text-sm text-foreground tracking-wider">Quantity:</span>
                  <div className="flex items-center border border-border w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-12 h-10 flex items-center justify-center font-body text-sm text-foreground">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* ===== ADD TO CART BUTTON ===== */}
                <button
                  onClick={() => {
                    if (product) {
                      addItem({
                        id: product.id,
                        name: product.name,
                        price: product.price,
                        image: product.image,
                        color: selectedColor,
                        size: selectedSize,
                        quantity: quantity,
                        gender: genderKey,
                        category: categoryKey,
                      });
                    }
                  }}
                  className="w-full py-4 bg-foreground text-background font-body text-sm tracking-[0.2em] uppercase hover:opacity-90 transition-opacity active:scale-[0.98] transition-transform"
                >
                  ADD TO CART
                </button>

                {/* Installment payment note - total ÷ 4 ပြတယ် */}
                <p className="font-body text-xs text-muted-foreground text-center tracking-wider">
                  Pay in 4 interest-free payments of{" "}
                  {(() => {
                    const num = parseFloat(product.price.replace(/[$,]/g, ""));
                    return `$${(num / 4).toFixed(2)}`;
                  })()}
                  .{" "}
                  <span className="underline cursor-pointer hover:text-foreground transition-colors">
                    LEARN MORE
                  </span>
                </p>

                {/* ===== ACCORDION DETAILS ===== */}
                {/* Product description, fit, fabric, materials, shipping info */}
                <Accordion type="single" collapsible className="w-full border-t border-border">
                  <AccordionItem value="description" className="border-b border-border">
                    <AccordionTrigger className="font-body text-xs tracking-[0.15em] uppercase py-4 hover:no-underline">
                      DESCRIPTION
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-4">
                      A masterfully crafted piece from the Maison collection. This {product.name.toLowerCase()} combines timeless elegance with modern craftsmanship, featuring premium materials sourced from the finest artisans. Perfect for those who appreciate refined luxury and attention to detail.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="fit" className="border-b border-border">
                    <AccordionTrigger className="font-body text-xs tracking-[0.15em] uppercase py-4 hover:no-underline">
                      FIT & FEATURES
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-4">
                      <ul className="list-disc list-inside space-y-1">
                        <li>Premium hand-finished construction</li>
                        <li>Signature Maison hardware in brushed gold</li>
                        <li>Interior compartments with silk lining</li>
                        <li>Adjustable components for a custom fit</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="fabric" className="border-b border-border">
                    <AccordionTrigger className="font-body text-xs tracking-[0.15em] uppercase py-4 hover:no-underline">
                      FABRIC
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-4">
                      Crafted from the finest Italian full-grain leather with a soft hand feel and natural texture. The material develops a beautiful patina over time, making each piece truly unique.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="materials" className="border-b border-border">
                    <AccordionTrigger className="font-body text-xs tracking-[0.15em] uppercase py-4 hover:no-underline">
                      MATERIALS & CARE
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-4">
                      Store in the provided dust bag when not in use. Avoid direct sunlight and moisture. Clean with a soft, dry cloth. For leather items, condition periodically with a high-quality leather cream.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="shipping" className="border-b border-border">
                    <AccordionTrigger className="font-body text-xs tracking-[0.15em] uppercase py-4 hover:no-underline">
                      FREE SHIPPING & EXCHANGES
                    </AccordionTrigger>
                    <AccordionContent className="font-body text-sm text-muted-foreground leading-relaxed pb-4">
                      Complimentary shipping on all orders. Free returns and exchanges within 30 days of purchase. Items must be in original condition with all tags attached.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
