/**
 * SearchOverlay.tsx - Product Search Fullscreen Overlay
 * 
 * Search icon နှိပ်ရင် ဖွင့်ပြတဲ့ fullscreen search overlay။
 * 
 * Features:
 * - Auto-focus: ဖွင့်တာနဲ့ search input ကို focus ပေးတယ်
 * - Debounced search: 150ms delay ပြီးမှ search result ရှာတယ် (performance အတွက်)
 * - Real-time results: ရိုက်တိုင်း product grid ကို update လုပ်တယ်
 * - Product link: result click ရင် /product/:gender/:category/:id သို့ navigate
 * 
 * Search logic: src/lib/searchProducts.ts မှာ ရှိတယ်
 * (product name, category, gender, price ကို match စစ်တယ်)
 */

import { useEffect, useRef, useState } from "react";
import { X, Search } from "lucide-react";
import { searchProducts, SearchProduct } from "@/lib/searchProducts";
import { Link } from "react-router-dom";

interface SearchOverlayProps {
  open: boolean;       // Overlay ဖွင့်ထားလား
  onClose: () => void; // Overlay ပိတ်မယ်
}

const SearchOverlay = ({ open, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");                          // Search input text
  const [results, setResults] = useState<SearchProduct[]>([]);     // Search results
  const inputRef = useRef<HTMLInputElement>(null);                 // Input ref (auto-focus အတွက်)

  /**
   * Overlay ဖွင့်/ပိတ် effect:
   * - ဖွင့်ရင်: body scroll ပိတ်, input auto-focus
   * - ပိတ်ရင်: body scroll ဖွင့်, query + results clear
   */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "";
      setQuery("");
      setResults([]);
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /**
   * Debounced search - query ပြောင်းတိုင်း 150ms delay ပြီးမှ search run
   * Performance ကောင်းအောင် - key stroke တိုင်း search မလုပ်ဘူး
   */
  useEffect(() => {
    const debounce = setTimeout(() => {
      setResults(searchProducts(query));
    }, 150);
    return () => clearTimeout(debounce);
  }, [query]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-sm">
      {/* ==================== SEARCH HEADER ==================== */}
      <div className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-border">
        <div className="flex items-center gap-3 flex-1 max-w-2xl mx-auto">
          <Search size={20} className="text-muted-foreground shrink-0" />
          {/* Search input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, categories..."
            className="w-full bg-transparent font-body text-base md:text-lg text-foreground placeholder:text-muted-foreground outline-none tracking-wide"
          />
        </div>
        {/* Close button */}
        <button
          onClick={onClose}
          className="ml-4 text-foreground hover:opacity-70 transition-opacity"
        >
          <X size={20} />
        </button>
      </div>

      {/* ==================== SEARCH RESULTS ==================== */}
      <div className="overflow-y-auto h-[calc(100vh-73px)] px-6 md:px-10 py-8">
        <div className="max-w-[1400px] mx-auto">
          {query.trim() === "" ? (
            /* ဘာမှ မရိုက်ရသေးရင် */
            <p className="font-body text-sm text-muted-foreground text-center mt-20 tracking-wider">
              Start typing to search the Maison's collections
            </p>
          ) : results.length === 0 ? (
            /* ရလဒ် မရှိရင် */
            <p className="font-body text-sm text-muted-foreground text-center mt-20 tracking-wider">
              No results found for "{query}"
            </p>
          ) : (
            /* ရလဒ်ရှိရင် - product grid ပြတယ် */
            <>
              <p className="font-body text-xs text-muted-foreground tracking-wider mb-6">
                {results.length} result{results.length !== 1 && "s"} for "{query}"
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {results.map((product) => (
                  <Link
                    key={`${product.gender}-${product.category}-${product.id}`}
                    to={`/product/${product.gender}/${product.category}/${product.id}`}
                    onClick={onClose} // Link click ရင် overlay ပိတ်တယ်
                    className="group flex flex-col gap-3"
                  >
                    {/* Product ပုံ */}
                    <div className="w-full aspect-[4/5] overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    {/* Product info */}
                    <div className="space-y-1">
                      <h3 className="font-body text-sm text-foreground tracking-wide">
                        {product.name}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground">
                        {product.price}
                      </p>
                      {/* Gender · Category label */}
                      <p className="font-body text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                        {product.gender} · {product.category.replace(/-/g, " ")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
