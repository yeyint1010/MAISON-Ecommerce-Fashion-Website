/**
 * categoryData.ts - Product Category Data (Men + Women)
 * 
 * Website ရဲ့ product data အားလုံးကို ဒီ file မှာ define လုပ်ထားတယ်။
 * Boy/Girl data က boyData.ts နဲ့ girlData.ts မှာ ခွဲထားတယ်။
 * 
 * Data Structure:
 * categoryDataMap = {
 *   men: { bags: { hero, products[] }, shoes: {...}, ... },
 *   women: { handbags: {...}, shoes: {...}, ... },
 *   boy: boyCategories,
 *   girl: girlCategories
 * }
 * 
 * Product တစ်ခုမှာ: id, name, price, image, tall? (masonry layout အတွက်)
 * 
 * ⚠️ Product data ထည့်/ပြင်/ဖျက် ချင်ရင် ဒီ file ကို ပြင်ပါ။
 * Boy/Girl data ဆိုရင် boyData.ts / girlData.ts ကို ပြင်ပါ။
 */

// ==================== HERO IMAGES - MEN ====================
import categoryHeroMenBags from "@/assets/category-hero-men-bags.jpg";
import categoryHeroMenShoes from "@/assets/category-hero-men-shoes.jpg";
import categoryHeroMenSneakers from "@/assets/category-hero-men-sneakers.jpg";
import categoryHeroMenRtw from "@/assets/category-hero-men-rtw.jpg";
import categoryHeroMenAccessories from "@/assets/category-hero-men-accessories.jpg";
import categoryHeroMenWatch from "@/assets/category-hero-men-watch.jpg";
import categoryHeroMenHat from "@/assets/category-hero-men-hat.jpg";

// ==================== HERO IMAGES - WOMEN ====================
import categoryHeroWomenHandbags from "@/assets/category-hero-women-handbags.jpg";
import categoryHeroWomenShoes from "@/assets/category-hero-women-shoes.jpg";
import categoryHeroWomenSneakers from "@/assets/category-hero-women-sneakers.jpg";
import categoryHeroWomenRtw from "@/assets/category-hero-women-rtw.jpg";
import categoryHeroWomenAccessories from "@/assets/category-hero-women-accessories.jpg";
import categoryHeroWomenWatch from "@/assets/category-hero-women-watch.jpg";
import categoryHeroWomenHat from "@/assets/category-hero-women-hat.jpg";

// ==================== MEN - PRODUCT IMAGES ====================
// Bags
import productBag1 from "@/assets/product-bag-1.jpg";
import productBag2 from "@/assets/product-bag-2.jpg";
import productBag3 from "@/assets/product-bag-3.jpg";
import productBag4 from "@/assets/product-bag-4.jpg";
import productBag5 from "@/assets/product-bag-5.jpg";
import productBag6 from "@/assets/product-bag-6.jpg";

// Shoes
import productShoe1 from "@/assets/product-shoe-1.jpg";
import productShoe2 from "@/assets/product-shoe-2.jpg";
import productShoe3 from "@/assets/product-shoe-3.jpg";
import productShoe4 from "@/assets/product-shoe-4.jpg";
import productShoe5 from "@/assets/product-shoe-5.jpg";
import productShoe6 from "@/assets/product-shoe-6.jpg";

// Sneakers
import productSneaker1 from "@/assets/product-sneaker-1.jpg";
import productSneaker2 from "@/assets/product-sneaker-2.jpg";
import productSneaker3 from "@/assets/product-sneaker-3.jpg";
import productSneaker4 from "@/assets/product-sneaker-4.jpg";
import productSneaker5 from "@/assets/product-sneaker-5.jpg";
import productSneaker6 from "@/assets/product-sneaker-6.jpg";

// Ready-to-Wear
import productRtw1 from "@/assets/product-rtw-1.jpg";
import productRtw2 from "@/assets/product-rtw-2.jpg";
import productRtw3 from "@/assets/product-rtw-3.jpg";
import productRtw4 from "@/assets/product-rtw-4.jpg";
import productRtw5 from "@/assets/product-rtw-5.jpg";
import productRtw6 from "@/assets/product-rtw-6.jpg";

// Accessories
import productAcc1 from "@/assets/product-acc-1.jpg";
import productAcc2 from "@/assets/product-acc-2.jpg";
import productAcc3 from "@/assets/product-acc-3.jpg";
import productAcc4 from "@/assets/product-acc-4.jpg";
import productAcc5 from "@/assets/product-acc-5.jpg";
import productAcc6 from "@/assets/product-acc-6.jpg";

// Watches
import productWatch1 from "@/assets/product-watch-1.jpg";
import productWatch2 from "@/assets/product-watch-2.jpg";
import productWatch3 from "@/assets/product-watch-3.jpg";
import productWatch4 from "@/assets/product-watch-4.jpg";
import productWatch5 from "@/assets/product-watch-5.jpg";
import productWatch6 from "@/assets/product-watch-6.jpg";

// Hats
import productHat1 from "@/assets/product-hat-1.jpg";
import productHat2 from "@/assets/product-hat-2.jpg";
import productHat3 from "@/assets/product-hat-3.jpg";
import productHat4 from "@/assets/product-hat-4.jpg";
import productHat5 from "@/assets/product-hat-5.jpg";
import productHat6 from "@/assets/product-hat-6.jpg";

// ==================== WOMEN - PRODUCT IMAGES ====================
// Handbags
import productWhb1 from "@/assets/product-whb-1.jpg";
import productWhb2 from "@/assets/product-whb-2.jpg";
import productWhb3 from "@/assets/product-whb-3.jpg";
import productWhb4 from "@/assets/product-whb-4.jpg";
import productWhb5 from "@/assets/product-whb-5.jpg";
import productWhb6 from "@/assets/product-whb-6.jpg";

// Shoes
import productWshoe1 from "@/assets/product-wshoe-1.jpg";
import productWshoe2 from "@/assets/product-wshoe-2.jpg";
import productWshoe3 from "@/assets/product-wshoe-3.jpg";
import productWshoe4 from "@/assets/product-wshoe-4.jpg";
import productWshoe5 from "@/assets/product-wshoe-5.jpg";
import productWshoe6 from "@/assets/product-wshoe-6.jpg";

// Sneakers
import productWsnk1 from "@/assets/product-wsnk-1.jpg";
import productWsnk2 from "@/assets/product-wsnk-2.jpg";
import productWsnk3 from "@/assets/product-wsnk-3.jpg";
import productWsnk4 from "@/assets/product-wsnk-4.jpg";
import productWsnk5 from "@/assets/product-wsnk-5.jpg";
import productWsnk6 from "@/assets/product-wsnk-6.jpg";

// Ready-to-Wear
import productWrtw1 from "@/assets/product-wrtw-1.jpg";
import productWrtw2 from "@/assets/product-wrtw-2.jpg";
import productWrtw3 from "@/assets/product-wrtw-3.jpg";
import productWrtw4 from "@/assets/product-wrtw-4.jpg";
import productWrtw5 from "@/assets/product-wrtw-5.jpg";
import productWrtw6 from "@/assets/product-wrtw-6.jpg";

// Accessories
import productWacc1 from "@/assets/product-wacc-1.jpg";
import productWacc2 from "@/assets/product-wacc-2.jpg";
import productWacc3 from "@/assets/product-wacc-3.jpg";
import productWacc4 from "@/assets/product-wacc-4.jpg";
import productWacc5 from "@/assets/product-wacc-5.jpg";
import productWacc6 from "@/assets/product-wacc-6.jpg";

// Watches
import productWwatch1 from "@/assets/product-wwatch-1.jpg";
import productWwatch2 from "@/assets/product-wwatch-2.jpg";
import productWwatch3 from "@/assets/product-wwatch-3.jpg";
import productWwatch4 from "@/assets/product-wwatch-4.jpg";
import productWwatch5 from "@/assets/product-wwatch-5.jpg";
import productWwatch6 from "@/assets/product-wwatch-6.jpg";

// Hats
import productWhat1 from "@/assets/product-what-1.jpg";
import productWhat2 from "@/assets/product-what-2.jpg";
import productWhat3 from "@/assets/product-what-3.jpg";
import productWhat4 from "@/assets/product-what-4.jpg";
import productWhat5 from "@/assets/product-what-5.jpg";
import productWhat6 from "@/assets/product-what-6.jpg";

// ==================== TYPE DEFINITIONS ====================

/** Product interface - product တစ်ခုရဲ့ data structure */
export interface Product {
  id: number;        // Unique product ID (category အတွင်း unique)
  name: string;      // Product အမည် (ဥပမာ: "Messenger Bag")
  price: string;     // ဈေးနှုန်း string (ဥပမာ: "$2,450")
  image: string;     // Product ပုံ import path
  tall?: boolean;    // Masonry layout: true = 3:4 ratio, false/undefined = 1:1 square
}

/** CategoryData interface - category တစ်ခုရဲ့ data (hero image + products) */
export interface CategoryData {
  hero: string;          // Category page ရဲ့ hero banner image
  products: Product[];   // ဒီ category ထဲက product list
}

// ==================== BOY/GIRL DATA IMPORTS ====================
import { boyCategories } from "./boyData";
import { girlCategories } from "./girlData";

// ==================== MAIN DATA MAP ====================
/**
 * categoryDataMap - Application ရဲ့ product data အားလုံး
 * 
 * Structure: gender → category → { hero, products[] }
 * 
 * Gender keys: "men", "women", "boy", "girl"
 * Category keys: "bags", "shoes", "sneakers", "ready-to-wear", "accessories", "watch", "hat"
 *                Women: "handbags" (bags အစား)
 *                Boy/Girl: "bag" (bags အစား, singular)
 * 
 * ⚠️ Category key တွေက URL path မှာ သုံးတယ် (ဥပမာ: /category/men/bags)
 *    SlideMenu ရဲ့ item label ကို lowercase + hyphenate လုပ်ပြီး ဒီ key တွေနဲ့ match လုပ်တယ်
 */
export const categoryDataMap: Record<string, Record<string, CategoryData>> = {
  men: {
    bags: {
      hero: categoryHeroMenBags,
      products: [
        { id: 1, name: "Messenger Bag", price: "$2,450", image: productBag1, tall: true },
        { id: 2, name: "Leather Briefcase", price: "$3,100", image: productBag2 },
        { id: 3, name: "Backpack", price: "$2,800", image: productBag3, tall: true },
        { id: 4, name: "Tote Bag", price: "$1,950", image: productBag4 },
        { id: 5, name: "Crossbody Bag", price: "$1,750", image: productBag5, tall: true },
        { id: 6, name: "Duffle Bag", price: "$3,600", image: productBag6 },
      ],
    },
    shoes: {
      hero: categoryHeroMenShoes,
      products: [
        { id: 1, name: "Oxford Shoes", price: "$1,850", image: productShoe1, tall: true },
        { id: 2, name: "Penny Loafers", price: "$1,450", image: productShoe2 },
        { id: 3, name: "Chelsea Boots", price: "$2,100", image: productShoe3, tall: true },
        { id: 4, name: "Monk Strap", price: "$1,950", image: productShoe4 },
        { id: 5, name: "Derby Shoes", price: "$1,650", image: productShoe5, tall: true },
        { id: 6, name: "Patent Leather", price: "$2,300", image: productShoe6 },
      ],
    },
    sneakers: {
      hero: categoryHeroMenSneakers,
      products: [
        { id: 1, name: "Classic White", price: "$980", image: productSneaker1, tall: true },
        { id: 2, name: "High-Top Leather", price: "$1,250", image: productSneaker2 },
        { id: 3, name: "Low-Top Beige", price: "$890", image: productSneaker3, tall: true },
        { id: 4, name: "Runner Sport", price: "$1,100", image: productSneaker4 },
        { id: 5, name: "Slip-On Navy", price: "$750", image: productSneaker5, tall: true },
        { id: 6, name: "Platform Chunky", price: "$1,350", image: productSneaker6 },
      ],
    },
    "ready-to-wear": {
      hero: categoryHeroMenRtw,
      products: [
        { id: 1, name: "Navy Blazer", price: "$3,200", image: productRtw1, tall: true },
        { id: 2, name: "Cashmere Overcoat", price: "$5,800", image: productRtw2 },
        { id: 3, name: "Tailored Shirt", price: "$890", image: productRtw3, tall: true },
        { id: 4, name: "Wool Trousers", price: "$1,450", image: productRtw4 },
        { id: 5, name: "Leather Bomber", price: "$4,200", image: productRtw5, tall: true },
        { id: 6, name: "Cashmere Turtleneck", price: "$1,650", image: productRtw6 },
      ],
    },
    accessories: {
      hero: categoryHeroMenAccessories,
      products: [
        { id: 1, name: "Leather Belt", price: "$650", image: productAcc1, tall: true },
        { id: 2, name: "Aviator Sunglasses", price: "$480", image: productAcc2 },
        { id: 3, name: "Silk Tie", price: "$320", image: productAcc3, tall: true },
        { id: 4, name: "Card Holder", price: "$390", image: productAcc4 },
        { id: 5, name: "Cashmere Scarf", price: "$750", image: productAcc5, tall: true },
        { id: 6, name: "Leather Gloves", price: "$520", image: productAcc6 },
      ],
    },
    watch: {
      hero: categoryHeroMenWatch,
      products: [
        { id: 1, name: "Chronograph", price: "$8,500", image: productWatch1, tall: true },
        { id: 2, name: "Dress Watch", price: "$5,200", image: productWatch2 },
        { id: 3, name: "Diver Watch", price: "$6,800", image: productWatch3, tall: true },
        { id: 4, name: "Gold Classic", price: "$12,500", image: productWatch4 },
        { id: 5, name: "Skeleton Auto", price: "$9,800", image: productWatch5, tall: true },
        { id: 6, name: "Rose Gold Chrono", price: "$11,200", image: productWatch6 },
      ],
    },
    hat: {
      hero: categoryHeroMenHat,
      products: [
        { id: 1, name: "Wool Fedora", price: "$580", image: productHat1, tall: true },
        { id: 2, name: "Leather Cap", price: "$420", image: productHat2 },
        { id: 3, name: "Cashmere Beanie", price: "$350", image: productHat3, tall: true },
        { id: 4, name: "Panama Hat", price: "$680", image: productHat4 },
        { id: 5, name: "Tweed Flat Cap", price: "$390", image: productHat5, tall: true },
        { id: 6, name: "Designer Bucket", price: "$450", image: productHat6 },
      ],
    },
  },
  women: {
    handbags: {
      hero: categoryHeroWomenHandbags,
      products: [
        { id: 1, name: "Leather Tote", price: "$3,200", image: productWhb1, tall: true },
        { id: 2, name: "Quilted Chain Bag", price: "$4,500", image: productWhb2 },
        { id: 3, name: "Evening Clutch", price: "$2,100", image: productWhb3, tall: true },
        { id: 4, name: "Bucket Bag", price: "$2,800", image: productWhb4 },
        { id: 5, name: "Satchel Bag", price: "$3,650", image: productWhb5, tall: true },
        { id: 6, name: "Mini Backpack", price: "$2,400", image: productWhb6 },
      ],
    },
    shoes: {
      hero: categoryHeroWomenShoes,
      products: [
        { id: 1, name: "Stiletto Pumps", price: "$1,450", image: productWshoe1, tall: true },
        { id: 2, name: "Strappy Sandals", price: "$1,250", image: productWshoe2 },
        { id: 3, name: "Ankle Boots", price: "$1,800", image: productWshoe3, tall: true },
        { id: 4, name: "Ballet Flats", price: "$890", image: productWshoe4 },
        { id: 5, name: "Heeled Mules", price: "$1,100", image: productWshoe5, tall: true },
        { id: 6, name: "Knee-High Boots", price: "$2,200", image: productWshoe6 },
      ],
    },
    sneakers: {
      hero: categoryHeroWomenSneakers,
      products: [
        { id: 1, name: "Classic White", price: "$890", image: productWsnk1, tall: true },
        { id: 2, name: "Platform Chunky", price: "$1,150", image: productWsnk2 },
        { id: 3, name: "Slip-On Knit", price: "$780", image: productWsnk3, tall: true },
        { id: 4, name: "High-Top Gold", price: "$1,350", image: productWsnk4 },
        { id: 5, name: "Runner Sport", price: "$950", image: productWsnk5, tall: true },
        { id: 6, name: "Canvas Print", price: "$820", image: productWsnk6 },
      ],
    },
    "ready-to-wear": {
      hero: categoryHeroWomenRtw,
      products: [
        { id: 1, name: "Silk Evening Gown", price: "$6,500", image: productWrtw1, tall: true },
        { id: 2, name: "Cashmere Coat", price: "$4,800", image: productWrtw2 },
        { id: 3, name: "Tailored Blazer", price: "$2,900", image: productWrtw3, tall: true },
        { id: 4, name: "Pleated Skirt", price: "$1,650", image: productWrtw4 },
        { id: 5, name: "Silk Blouse", price: "$1,200", image: productWrtw5, tall: true },
        { id: 6, name: "Knit Dress", price: "$2,100", image: productWrtw6 },
      ],
    },
    accessories: {
      hero: categoryHeroWomenAccessories,
      products: [
        { id: 1, name: "Gold Necklace", price: "$1,850", image: productWacc1, tall: true },
        { id: 2, name: "Cat-Eye Sunglasses", price: "$580", image: productWacc2 },
        { id: 3, name: "Silk Scarf", price: "$450", image: productWacc3, tall: true },
        { id: 4, name: "Leather Belt", price: "$520", image: productWacc4 },
        { id: 5, name: "Compact Wallet", price: "$680", image: productWacc5, tall: true },
        { id: 6, name: "Pearl Earrings", price: "$1,200", image: productWacc6 },
      ],
    },
    watch: {
      hero: categoryHeroWomenWatch,
      products: [
        { id: 1, name: "Rose Gold Diamond", price: "$9,500", image: productWwatch1, tall: true },
        { id: 2, name: "Silver Bracelet", price: "$4,800", image: productWwatch2 },
        { id: 3, name: "Gold Chain", price: "$7,200", image: productWwatch3, tall: true },
        { id: 4, name: "White Ceramic", price: "$5,500", image: productWwatch4 },
        { id: 5, name: "Leather Classic", price: "$3,800", image: productWwatch5, tall: true },
        { id: 6, name: "Two-Tone Elegance", price: "$6,900", image: productWwatch6 },
      ],
    },
    hat: {
      hero: categoryHeroWomenHat,
      products: [
        { id: 1, name: "Wide-Brim Sun Hat", price: "$620", image: productWhat1, tall: true },
        { id: 2, name: "Wool Beret", price: "$380", image: productWhat2 },
        { id: 3, name: "Cashmere Beanie", price: "$320", image: productWhat3, tall: true },
        { id: 4, name: "Fascinator", price: "$890", image: productWhat4 },
        { id: 5, name: "Bucket Hat", price: "$420", image: productWhat5, tall: true },
        { id: 6, name: "Straw Visor", price: "$350", image: productWhat6 },
      ],
    },
  },
  boy: boyCategories,   // Boy category data (boyData.ts ကနေ import)
  girl: girlCategories, // Girl category data (girlData.ts ကနေ import)
};

/**
 * getCategoryData - gender နဲ့ category key ပေးလိုက်ရင် ဆိုင်ရာ data ကို return ပြန်တယ်
 * 
 * @param gender - "men" | "women" | "boy" | "girl"
 * @param category - "bags" | "shoes" | "sneakers" | etc.
 * @returns CategoryData (hero + products) သို့မဟုတ် null (မရှိရင်)
 * 
 * Usage: const data = getCategoryData("men", "bags");
 */
export const getCategoryData = (gender: string, category: string): CategoryData | null => {
  const genderData = categoryDataMap[gender];
  if (!genderData) return null;
  return genderData[category] || null;
};
