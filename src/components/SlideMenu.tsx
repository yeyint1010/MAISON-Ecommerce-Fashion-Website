/**
 * SlideMenu.tsx - ဘယ်ဘက်ကနေ Slide ဖွင့်ပြတဲ့ Navigation Menu
 * 
 * Multi-level navigation menu:
 * Level 1: Main categories (New Arrival, Men, Women, Teenage, Most Popular, New Collection)
 * Level 2: Sub-categories (Bags, Shoes, Sneakers, etc.) - arrow ရှိတဲ့ item နှိပ်ရင် ဖွင့်တယ်
 * Level 3: Teenage > Boy/Girl > Sub-categories
 * 
 * Features:
 * - Slide animation (forward/backward) menu level ပြောင်းတိုင်း
 * - Back button - ယခင် level သို့ ပြန်သွားနိုင်တယ်
 * - Men submenu မှာ hover လုပ်ရင် preview image ပြတယ် (desktop only)
 * - Final item (children မရှိတဲ့) နှိပ်ရင် /category/:gender/:category သို့ navigate
 */

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Men submenu hover preview အတွက် category hero images
import menBags from "@/assets/category-hero-men-bags.jpg";
import menShoes from "@/assets/category-hero-men-shoes.jpg";
import menSneakers from "@/assets/category-hero-men-sneakers.jpg";
import menRtw from "@/assets/category-hero-men-rtw.jpg";
import menAccessories from "@/assets/category-hero-men-accessories.jpg";
import menWatch from "@/assets/category-hero-men-watch.jpg";
import menHat from "@/assets/category-hero-men-hat.jpg";

/** Men submenu item label → preview image mapping */
const menPreviewImages: Record<string, string> = {
  Bags: menBags,
  Shoes: menShoes,
  Sneakers: menSneakers,
  "Ready-to-Wear": menRtw,
  Accessories: menAccessories,
  Watch: menWatch,
  Hat: menHat,
};

/** Menu item structure - children ရှိရင် sub-menu ဖွင့်နိုင်တယ် */
interface MenuItem {
  label: string;
  children?: MenuItem[];
}

/** Teenage > Boy/Girl ရဲ့ sub-categories (တူညီတဲ့ items) */
const boyGirlChildren: MenuItem[] = [
  { label: "Bag" },
  { label: "Shoes" },
  { label: "Sneakers" },
  { label: "Accessories" },
  { label: "Watch" },
  { label: "Hat" },
];

/** Main menu data structure - ဒီ data အတိုင်း menu ကို render လုပ်တယ် */
const menuData: MenuItem[] = [
  { label: "New Arrival" },
  {
    label: "Men",
    children: [
      { label: "Bags" },
      { label: "Shoes" },
      { label: "Sneakers" },
      { label: "Ready-to-Wear" },
      { label: "Accessories" },
      { label: "Watch" },
      { label: "Hat" },
    ],
  },
  {
    label: "Women",
    children: [
      { label: "Handbags" },
      { label: "Shoes" },
      { label: "Sneakers" },
      { label: "Ready-to-Wear" },
      { label: "Accessories" },
      { label: "Watch" },
      { label: "Hat" },
    ],
  },
  {
    label: "Teenage",
    children: [
      { label: "Boy", children: [...boyGirlChildren] },
      { label: "Girl", children: [...boyGirlChildren] },
    ],
  },
  { label: "Most Popular" },
  { label: "New Collection" },
];

interface SlideMenuProps {
  open: boolean;       // Menu ဖွင့်ထားလား
  onClose: () => void; // Menu ပိတ်မယ်
}

/** Menu level တစ်ခုရဲ့ data - items နဲ့ title */
interface MenuLevel {
  items: MenuItem[];
  title?: string;
}

const SlideMenu = ({ open, onClose }: SlideMenuProps) => {
  const navigate = useNavigate();

  /**
   * menuStack - Menu level history stack
   * ဥပမာ: [{ items: mainMenu }] → [{ items: mainMenu }, { items: menItems, title: "Men" }]
   * Back နှိပ်ရင် stack ရဲ့ နောက်ဆုံးကို pop လုပ်တယ်
   */
  const [menuStack, setMenuStack] = useState<MenuLevel[]>([
    { items: menuData },
  ]);
  const [direction, setDirection] = useState<"forward" | "backward">("forward"); // Animation direction
  const [isAnimating, setIsAnimating] = useState(false);                        // Animation running state
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);          // Hover ထားတဲ့ item (preview image အတွက်)

  // Men submenu မှာ ရှိလားစစ်တယ် (preview image ပြဖို့)
  const isMenSubMenu = menuStack.length === 2 && menuStack[1]?.title === "Men";
  const previewImage = isMenSubMenu && hoveredItem ? menPreviewImages[hoveredItem] : null;

  const currentLevel = menuStack[menuStack.length - 1]; // လက်ရှိ ပြနေတဲ့ menu level
  const canGoBack = menuStack.length > 1;               // Back button ပြရမလား

  /**
   * getGenderFromStack - menuStack ကနေ gender ကို ရှာတယ် (navigate URL အတွက်)
   * Teenage > Boy/Girl ကို ဦးစားပေး စစ်တယ်
   * ပြီးမှ Men/Women ကို စစ်တယ်
   */
  const getGenderFromStack = (): string => {
    // Boy/Girl ရှိလား စစ်တယ် (Teenage submenu)
    for (const level of menuStack) {
      if (level.title && ["Boy", "Girl"].includes(level.title)) {
        return level.title.toLowerCase();
      }
    }
    // Men/Women ရှိလား စစ်တယ်
    for (const level of menuStack) {
      if (level.title && ["Men", "Women"].includes(level.title)) {
        return level.title.toLowerCase();
      }
    }
    return "men"; // Default
  };

  /**
   * handleItemClick - Menu item နှိပ်ရင်
   * children ရှိရင် → sub-menu ဖွင့်တယ် (stack push)
   * children မရှိရင် → category page သို့ navigate
   */
  const handleItemClick = (item: MenuItem) => {
    if (item.children) {
      // Sub-menu ဖွင့်တယ် (slide forward animation)
      setDirection("forward");
      setIsAnimating(true);
      setTimeout(() => {
        setMenuStack((prev) => [
          ...prev,
          { items: item.children!, title: item.label },
        ]);
        setIsAnimating(false);
      }, 250);
    } else {
      // Final item - category page သို့ navigate
      const gender = getGenderFromStack();
      const category = item.label.toLowerCase().replace(/\s+/g, "-");
      handleClose();
      navigate(`/category/${gender}/${category}`);
    }
  };

  /**
   * handleBack - Back button နှိပ်ရင် ယခင် menu level သို့ ပြန်သွားတယ်
   * Stack ရဲ့ နောက်ဆုံး level ကို ဖယ်တယ် (slide backward animation)
   */
  const handleBack = () => {
    if (menuStack.length <= 1) return;
    setDirection("backward");
    setIsAnimating(true);
    setTimeout(() => {
      setMenuStack((prev) => prev.slice(0, -1));
      setIsAnimating(false);
    }, 250);
  };

  /**
   * handleClose - Menu ပိတ်ပြီး stack ကို reset လုပ်တယ်
   * Close animation ပြီးမှ stack reset လုပ်တယ် (300ms delay)
   */
  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setMenuStack([{ items: menuData }]);
      setDirection("forward");
    }, 300);
  };

  /** Slide animation class - forward/backward direction အလိုက် */
  const getAnimationClass = () => {
    if (!isAnimating) return "translate-x-0 opacity-100";
    if (direction === "forward") return "translate-x-full opacity-0";
    return "-translate-x-full opacity-0";
  };

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Dark overlay - menu အပြင် click ရင် menu ပိတ်တယ် */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Menu panel + Preview image container */}
      <div
        className={`absolute top-0 left-0 h-full flex transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menu panel - ဘယ်ဘက်က slide ထွက်လာတဲ့ menu */}
        <div className="w-full max-w-md bg-background pt-20 pb-8 overflow-y-auto">
          <div className="px-8">
            {/* Back button - sub-menu မှာ ရှိမှ ပြတယ် */}
            {canGoBack && !isAnimating && (
              <button
                onClick={handleBack}
                className="flex items-center gap-1 mb-6 font-body text-sm tracking-wider text-foreground hover:opacity-70 transition-opacity underline underline-offset-4"
              >
                <ChevronLeft size={16} />
                <span>BACK</span>
              </button>
            )}

            {/* Category title - sub-menu ရဲ့ header (ဥပမာ: "Men", "Women") */}
            {currentLevel.title && !isAnimating && (
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-8">
                {currentLevel.title}
              </h2>
            )}

            {/* Menu items list - slide animation နဲ့ */}
            <div
              className={`transition-all duration-250 ease-out ${getAnimationClass()}`}
            >
              {!isAnimating && (
                <ul className="space-y-1">
                  {currentLevel.items.map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => handleItemClick(item)}
                        onMouseEnter={() => isMenSubMenu && setHoveredItem(item.label)}
                        onMouseLeave={() => isMenSubMenu && setHoveredItem(null)}
                        className="w-full flex items-center justify-between py-3 font-body text-base tracking-wider text-foreground hover:underline hover:underline-offset-4 transition-all duration-200 text-left"
                      >
                        <span>{item.label}</span>
                        {/* Arrow icon - children ရှိတဲ့ item မှာပဲ ပြတယ် */}
                        {item.children && <ChevronRight size={18} />}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Preview image panel - Men submenu မှာ hover လုပ်ရင် ပြတယ် (desktop only) */}
        <div
          className={`hidden md:block w-[350px] h-full bg-muted overflow-hidden transition-all duration-500 ease-out ${
            previewImage ? "opacity-100" : "opacity-0"
          }`}
        >
          {previewImage && (
            <img
              key={hoveredItem}
              src={previewImage}
              alt={hoveredItem || ""}
              className="w-full h-full object-cover animate-fade-in"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SlideMenu;
