/**
 * girlData.ts - Girl (Teenage) Category Product Data
 * 
 * Teenage > Girl section ရဲ့ product data အားလုံး ဒီ file မှာ define ထားတယ်။
 * categoryData.ts ရဲ့ categoryDataMap.girl မှာ import လုပ်သုံးတယ်။
 * 
 * Categories: bag, shoes, sneakers, accessories, watch, hat
 * Category တစ်ခုစီမှာ hero image 1 ခု + product 6 ခု ပါတယ်။
 */

// ==================== HERO IMAGES ====================
import categoryHeroGirlBags from "@/assets/category-hero-girl-bags.jpg";
import categoryHeroGirlShoes from "@/assets/category-hero-girl-shoes.jpg";
import categoryHeroGirlSneakers from "@/assets/category-hero-girl-sneakers.jpg";
import categoryHeroGirlAccessories from "@/assets/category-hero-girl-accessories.jpg";
import categoryHeroGirlWatch from "@/assets/category-hero-girl-watch.jpg";
import categoryHeroGirlHat from "@/assets/category-hero-girl-hat.jpg";

// ==================== PRODUCT IMAGES ====================
// Bags
import productGbag1 from "@/assets/product-gbag-1.jpg";
import productGbag2 from "@/assets/product-gbag-2.jpg";
import productGbag3 from "@/assets/product-gbag-3.jpg";
import productGbag4 from "@/assets/product-gbag-4.jpg";
import productGbag5 from "@/assets/product-gbag-5.jpg";
import productGbag6 from "@/assets/product-gbag-6.jpg";

// Shoes
import productGshoe1 from "@/assets/product-gshoe-1.jpg";
import productGshoe2 from "@/assets/product-gshoe-2.jpg";
import productGshoe3 from "@/assets/product-gshoe-3.jpg";
import productGshoe4 from "@/assets/product-gshoe-4.jpg";
import productGshoe5 from "@/assets/product-gshoe-5.jpg";
import productGshoe6 from "@/assets/product-gshoe-6.jpg";

// Sneakers
import productGsnk1 from "@/assets/product-gsnk-1.jpg";
import productGsnk2 from "@/assets/product-gsnk-2.jpg";
import productGsnk3 from "@/assets/product-gsnk-3.jpg";
import productGsnk4 from "@/assets/product-gsnk-4.jpg";
import productGsnk5 from "@/assets/product-gsnk-5.jpg";
import productGsnk6 from "@/assets/product-gsnk-6.jpg";

// Accessories
import productGacc1 from "@/assets/product-gacc-1.jpg";
import productGacc2 from "@/assets/product-gacc-2.jpg";
import productGacc3 from "@/assets/product-gacc-3.jpg";
import productGacc4 from "@/assets/product-gacc-4.jpg";
import productGacc5 from "@/assets/product-gacc-5.jpg";
import productGacc6 from "@/assets/product-gacc-6.jpg";

// Watches
import productGwatch1 from "@/assets/product-gwatch-1.jpg";
import productGwatch2 from "@/assets/product-gwatch-2.jpg";
import productGwatch3 from "@/assets/product-gwatch-3.jpg";
import productGwatch4 from "@/assets/product-gwatch-4.jpg";
import productGwatch5 from "@/assets/product-gwatch-5.jpg";
import productGwatch6 from "@/assets/product-gwatch-6.jpg";

// Hats
import productGhat1 from "@/assets/product-ghat-1.jpg";
import productGhat2 from "@/assets/product-ghat-2.jpg";
import productGhat3 from "@/assets/product-ghat-3.jpg";
import productGhat4 from "@/assets/product-ghat-4.jpg";
import productGhat5 from "@/assets/product-ghat-5.jpg";
import productGhat6 from "@/assets/product-ghat-6.jpg";

import { CategoryData } from "./categoryData";

/**
 * girlCategories - Girl (Teenage) ရဲ့ category data map
 * Key = category name (URL path မှာ သုံးတယ်: /category/girl/bag)
 */
export const girlCategories: Record<string, CategoryData> = {
  bag: {
    hero: categoryHeroGirlBags,
    products: [
      { id: 1, name: "Mini Handbag", price: "$1,150", image: productGbag1, tall: true },
      { id: 2, name: "Pastel Backpack", price: "$980", image: productGbag2 },
      { id: 3, name: "Chain Crossbody", price: "$1,250", image: productGbag3, tall: true },
      { id: 4, name: "Floral Tote", price: "$720", image: productGbag4 },
      { id: 5, name: "Evening Clutch", price: "$890", image: productGbag5, tall: true },
      { id: 6, name: "Belt Bag", price: "$580", image: productGbag6 },
    ],
  },
  shoes: {
    hero: categoryHeroGirlShoes,
    products: [
      { id: 1, name: "Ballet Flats", price: "$650", image: productGshoe1, tall: true },
      { id: 2, name: "Crystal Sandals", price: "$780", image: productGshoe2 },
      { id: 3, name: "Platform Boots", price: "$920", image: productGshoe3, tall: true },
      { id: 4, name: "Patent Loafers", price: "$690", image: productGshoe4 },
      { id: 5, name: "Bow Pumps", price: "$750", image: productGshoe5, tall: true },
      { id: 6, name: "Gold Mules", price: "$620", image: productGshoe6 },
    ],
  },
  sneakers: {
    hero: categoryHeroGirlSneakers,
    products: [
      { id: 1, name: "Platform White", price: "$620", image: productGsnk1, tall: true },
      { id: 2, name: "Pink High-Top", price: "$680", image: productGsnk2 },
      { id: 3, name: "Colorful Chunky", price: "$750", image: productGsnk3, tall: true },
      { id: 4, name: "Knit Slip-On", price: "$520", image: productGsnk4 },
      { id: 5, name: "Floral Canvas", price: "$480", image: productGsnk5, tall: true },
      { id: 6, name: "Pastel Low-Top", price: "$550", image: productGsnk6 },
    ],
  },
  accessories: {
    hero: categoryHeroGirlAccessories,
    products: [
      { id: 1, name: "Gold Pendant", price: "$680", image: productGacc1, tall: true },
      { id: 2, name: "Cat-Eye Shades", price: "$350", image: productGacc2 },
      { id: 3, name: "Silk Scrunchie", price: "$120", image: productGacc3, tall: true },
      { id: 4, name: "Pink Wallet", price: "$320", image: productGacc4 },
      { id: 5, name: "Floral Scarf", price: "$280", image: productGacc5, tall: true },
      { id: 6, name: "Pearl Earrings", price: "$450", image: productGacc6 },
    ],
  },
  watch: {
    hero: categoryHeroGirlWatch,
    products: [
      { id: 1, name: "Rose Gold Crystal", price: "$2,500", image: productGwatch1, tall: true },
      { id: 2, name: "Silver Bracelet", price: "$1,800", image: productGwatch2 },
      { id: 3, name: "White Ceramic", price: "$2,100", image: productGwatch3, tall: true },
      { id: 4, name: "Pink Leather", price: "$1,450", image: productGwatch4 },
      { id: 5, name: "Gold Chain", price: "$2,800", image: productGwatch5, tall: true },
      { id: 6, name: "Two-Tone Elegance", price: "$1,950", image: productGwatch6 },
    ],
  },
  hat: {
    hero: categoryHeroGirlHat,
    products: [
      { id: 1, name: "Wool Beret", price: "$280", image: productGhat1, tall: true },
      { id: 2, name: "Straw Sun Hat", price: "$320", image: productGhat2 },
      { id: 3, name: "Pink Beanie", price: "$220", image: productGhat3, tall: true },
      { id: 4, name: "Floral Bucket", price: "$290", image: productGhat4 },
      { id: 5, name: "Jewel Headband", price: "$380", image: productGhat5, tall: true },
      { id: 6, name: "Sport Visor", price: "$250", image: productGhat6 },
    ],
  },
};
