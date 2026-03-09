/**
 * searchProducts.ts - Product Search Logic
 * 
 * SearchOverlay component မှာ သုံးတဲ့ search functionality။
 * categoryDataMap ထဲက product data အားလုံးကို flatten လုပ်ပြီး
 * query string နဲ့ match စစ်တယ်။
 * 
 * Search fields: product name, category, gender, price
 * Case-insensitive search (lowercase compare)
 */

import { categoryDataMap, Product } from "@/data/categoryData";

/** Search result product - original Product + gender/category info ပါတယ် */
export interface SearchProduct extends Product {
  gender: string;    // ဥပမာ: "men", "women", "boy", "girl"
  category: string;  // ဥပမာ: "bags", "shoes", "sneakers"
}

/**
 * getAllProducts - categoryDataMap ထဲက product data အားလုံးကို
 * flat array အဖြစ် ပြောင်းပေးတယ် (gender + category info ပေါင်းထည့်ပြီး)
 * 
 * categoryDataMap structure: { men: { bags: { products: [...] }, ... }, ... }
 * → flat array: [{ ...product, gender: "men", category: "bags" }, ...]
 */
export function getAllProducts(): SearchProduct[] {
  const results: SearchProduct[] = [];
  for (const [gender, categories] of Object.entries(categoryDataMap)) {
    for (const [category, data] of Object.entries(categories)) {
      for (const product of data.products) {
        results.push({ ...product, gender, category });
      }
    }
  }
  return results;
}

/**
 * searchProducts - query string နဲ့ match တဲ့ products ကို return ပြန်တယ်
 * 
 * @param query - Search text (ဥပမာ: "bag", "men", "$2,450")
 * @returns match တဲ့ SearchProduct array (empty string ဆိုရင် empty array)
 * 
 * Match fields: name, category, gender, price (case-insensitive)
 */
export function searchProducts(query: string): SearchProduct[] {
  if (!query.trim()) return [];
  const q = query.toLowerCase();
  return getAllProducts().filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||       // Product name match
      p.category.toLowerCase().includes(q) ||    // Category name match
      p.gender.toLowerCase().includes(q) ||      // Gender match
      p.price.toLowerCase().includes(q)          // Price match
  );
}
