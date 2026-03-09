/**
 * boyData.ts - Boy (Teenage) Category Product Data
 * 
 * Teenage > Boy section ရဲ့ product data အားလုံး ဒီ file မှာ define ထားတယ်။
 * categoryData.ts ရဲ့ categoryDataMap.boy မှာ import လုပ်သုံးတယ်။
 * 
 * Categories: bag, shoes, sneakers, accessories, watch, hat
 * Category တစ်ခုစီမှာ hero image 1 ခု + product 6 ခု ပါတယ်။
 */

// ==================== HERO IMAGES ====================
import categoryHeroBoyBags from "@/assets/category-hero-boy-bags.jpg";
import categoryHeroBoyShoes from "@/assets/category-hero-boy-shoes.jpg";
import categoryHeroBoySneakers from "@/assets/category-hero-boy-sneakers.jpg";
import categoryHeroBoyAccessories from "@/assets/category-hero-boy-accessories.jpg";
import categoryHeroBoyWatch from "@/assets/category-hero-boy-watch.jpg";
import categoryHeroBoyHat from "@/assets/category-hero-boy-hat.jpg";

// ==================== PRODUCT IMAGES ====================
// Bags
import productBbag1 from "@/assets/product-bbag-1.jpg";
import productBbag2 from "@/assets/product-bbag-2.jpg";
import productBbag3 from "@/assets/product-bbag-3.jpg";
import productBbag4 from "@/assets/product-bbag-4.jpg";
import productBbag5 from "@/assets/product-bbag-5.jpg";
import productBbag6 from "@/assets/product-bbag-6.jpg";

// Shoes
import productBshoe1 from "@/assets/product-bshoe-1.jpg";
import productBshoe2 from "@/assets/product-bshoe-2.jpg";
import productBshoe3 from "@/assets/product-bshoe-3.jpg";
import productBshoe4 from "@/assets/product-bshoe-4.jpg";
import productBshoe5 from "@/assets/product-bshoe-5.jpg";
import productBshoe6 from "@/assets/product-bshoe-6.jpg";

// Sneakers
import productBsnk1 from "@/assets/product-bsnk-1.jpg";
import productBsnk2 from "@/assets/product-bsnk-2.jpg";
import productBsnk3 from "@/assets/product-bsnk-3.jpg";
import productBsnk4 from "@/assets/product-bsnk-4.jpg";
import productBsnk5 from "@/assets/product-bsnk-5.jpg";
import productBsnk6 from "@/assets/product-bsnk-6.jpg";

// Accessories
import productBacc1 from "@/assets/product-bacc-1.jpg";
import productBacc2 from "@/assets/product-bacc-2.jpg";
import productBacc3 from "@/assets/product-bacc-3.jpg";
import productBacc4 from "@/assets/product-bacc-4.jpg";
import productBacc5 from "@/assets/product-bacc-5.jpg";
import productBacc6 from "@/assets/product-bacc-6.jpg";

// Watches
import productBwatch1 from "@/assets/product-bwatch-1.jpg";
import productBwatch2 from "@/assets/product-bwatch-2.jpg";
import productBwatch3 from "@/assets/product-bwatch-3.jpg";
import productBwatch4 from "@/assets/product-bwatch-4.jpg";
import productBwatch5 from "@/assets/product-bwatch-5.jpg";
import productBwatch6 from "@/assets/product-bwatch-6.jpg";

// Hats
import productBhat1 from "@/assets/product-bhat-1.jpg";
import productBhat2 from "@/assets/product-bhat-2.jpg";
import productBhat3 from "@/assets/product-bhat-3.jpg";
import productBhat4 from "@/assets/product-bhat-4.jpg";
import productBhat5 from "@/assets/product-bhat-5.jpg";
import productBhat6 from "@/assets/product-bhat-6.jpg";

import { CategoryData } from "./categoryData";

/**
 * boyCategories - Boy (Teenage) ရဲ့ category data map
 * Key = category name (URL path မှာ သုံးတယ်: /category/boy/bag)
 */
export const boyCategories: Record<string, CategoryData> = {
  bag: {
    hero: categoryHeroBoyBags,
    products: [
      { id: 1, name: "Messenger Bag", price: "$1,250", image: productBbag1, tall: true },
      { id: 2, name: "Leather Backpack", price: "$1,450", image: productBbag2 },
      { id: 3, name: "Crossbody Bag", price: "$890", image: productBbag3, tall: true },
      { id: 4, name: "Canvas Tote", price: "$780", image: productBbag4 },
      { id: 5, name: "Duffle Bag", price: "$1,650", image: productBbag5, tall: true },
      { id: 6, name: "Belt Bag", price: "$620", image: productBbag6 },
    ],
  },
  shoes: {
    hero: categoryHeroBoyShoes,
    products: [
      { id: 1, name: "Oxford Brogue", price: "$850", image: productBshoe1, tall: true },
      { id: 2, name: "Navy Loafers", price: "$720", image: productBshoe2 },
      { id: 3, name: "Chelsea Boots", price: "$980", image: productBshoe3, tall: true },
      { id: 4, name: "Derby Cap Toe", price: "$790", image: productBshoe4 },
      { id: 5, name: "Suede Boots", price: "$920", image: productBshoe5, tall: true },
      { id: 6, name: "Moccasins", price: "$650", image: productBshoe6 },
    ],
  },
  sneakers: {
    hero: categoryHeroBoySneakers,
    products: [
      { id: 1, name: "Classic White", price: "$580", image: productBsnk1, tall: true },
      { id: 2, name: "High-Top Black", price: "$750", image: productBsnk2 },
      { id: 3, name: "Chunky Platform", price: "$680", image: productBsnk3, tall: true },
      { id: 4, name: "Runner Sport", price: "$620", image: productBsnk4 },
      { id: 5, name: "Slip-On Dark", price: "$520", image: productBsnk5, tall: true },
      { id: 6, name: "Leather Low-Top", price: "$690", image: productBsnk6 },
    ],
  },
  accessories: {
    hero: categoryHeroBoyAccessories,
    products: [
      { id: 1, name: "Leather Belt", price: "$380", image: productBacc1, tall: true },
      { id: 2, name: "Designer Sunglasses", price: "$320", image: productBacc2 },
      { id: 3, name: "Leather Wallet", price: "$290", image: productBacc3, tall: true },
      { id: 4, name: "Leather Bracelet", price: "$180", image: productBacc4 },
      { id: 5, name: "Silk Scarf", price: "$250", image: productBacc5, tall: true },
      { id: 6, name: "Card Holder", price: "$220", image: productBacc6 },
    ],
  },
  watch: {
    hero: categoryHeroBoyWatch,
    products: [
      { id: 1, name: "Chronograph", price: "$2,800", image: productBwatch1, tall: true },
      { id: 2, name: "Sport Watch", price: "$1,950", image: productBwatch2 },
      { id: 3, name: "Digital Smart", price: "$2,200", image: productBwatch3, tall: true },
      { id: 4, name: "Leather Classic", price: "$1,650", image: productBwatch4 },
      { id: 5, name: "Skeleton Auto", price: "$3,500", image: productBwatch5, tall: true },
      { id: 6, name: "Steel Bracelet", price: "$2,100", image: productBwatch6 },
    ],
  },
  hat: {
    hero: categoryHeroBoyHat,
    products: [
      { id: 1, name: "Designer Cap", price: "$320", image: productBhat1, tall: true },
      { id: 2, name: "Wool Beanie", price: "$250", image: productBhat2 },
      { id: 3, name: "Bucket Hat", price: "$280", image: productBhat3, tall: true },
      { id: 4, name: "Snapback", price: "$220", image: productBhat4 },
      { id: 5, name: "Classic Fedora", price: "$350", image: productBhat5, tall: true },
      { id: 6, name: "Flat Cap", price: "$290", image: productBhat6 },
    ],
  },
};
