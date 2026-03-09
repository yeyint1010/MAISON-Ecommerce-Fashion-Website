/**
 * CartContext.tsx - Shopping Cart State Management
 * 
 * ဒီ file က shopping cart ရဲ့ state (item တွေ, total price) ကို
 * application တစ်ခုလုံးမှာ share လုပ်နိုင်အောင် React Context သုံးထားတယ်။
 * 
 * ဘယ် component ကမဆို useCart() hook ကို ခေါ်ပြီး cart data ကို
 * ဖတ်/ပြင်/ဖျက် လုပ်နိုင်တယ်။
 * 
 * Features:
 * - Cart ထဲ item ထည့်ခြင်း (addItem) - တူညီတဲ့ item+color+size ရှိရင် quantity ပေါင်းပေးတယ်
 * - Item ဖယ်ရှားခြင်း (removeItem)
 * - Quantity ပြောင်းခြင်း (updateQuantity)
 * - Color/Size ပြောင်းခြင်း (updateColor, updateSize)
 * - Cart အကုန်ရှင်းခြင်း (clearCart)
 * - Cart drawer ဖွင့်/ပိတ် (isOpen, setIsOpen)
 * - စုစုပေါင်း ဈေးနှုန်း တွက်ခြင်း (totalPrice)
 */

import React, { createContext, useContext, useState, ReactNode } from "react";

/** Cart ထဲက item တစ်ခုရဲ့ data structure */
export interface CartItem {
  id: number;           // Product ID
  name: string;         // Product အမည်
  price: string;        // ဈေးနှုန်း (ဥပမာ: "$2,450")
  image: string;        // Product ပုံ URL
  color: string;        // ရွေးထားတဲ့ အရောင် (ဥပမာ: "Black")
  size: string;         // ရွေးထားတဲ့ Size (ဥပမာ: "M")
  quantity: number;     // အရေအတွက်
  gender: string;       // Gender category (men/women/boy/girl)
  category: string;     // Product category (bags/shoes/sneakers...)
}

/** Cart Context မှာ ပါဝင်တဲ့ functions နဲ့ data types */
interface CartContextType {
  items: CartItem[];                                                              // Cart ထဲက item အားလုံး
  addItem: (item: CartItem) => void;                                              // Item ထည့်မယ်
  removeItem: (id: number, color: string, size: string) => void;                  // Item ဖယ်မယ်
  updateQuantity: (id: number, color: string, size: string, quantity: number) => void;  // Quantity ပြောင်းမယ်
  updateColor: (id: number, oldColor: string, size: string, newColor: string) => void;  // Color ပြောင်းမယ်
  updateSize: (id: number, color: string, oldSize: string, newSize: string) => void;    // Size ပြောင်းမယ်
  clearCart: () => void;                                                          // Cart ရှင်းမယ်
  isOpen: boolean;                                                                // Cart drawer ဖွင့်ထားလား
  setIsOpen: (open: boolean) => void;                                             // Cart drawer ဖွင့်/ပိတ်
  totalPrice: number;                                                             // စုစုပေါင်း ဈေးနှုန်း
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * CartProvider - Cart state ကို children components တွေအားလုံးကို provide လုပ်ပေးတယ်
 * App.tsx မှာ application တစ်ခုလုံးကို wrap လုပ်ထားတယ်
 */
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);      // Cart items array
  const [isOpen, setIsOpen] = useState(false);              // Cart drawer open/close state

  /**
   * addItem - Cart ထဲကို item အသစ်ထည့်တယ်
   * တူညီတဲ့ id + color + size ရှိပြီးသားဆိုရင် quantity ကို ပေါင်းထည့်ပေးတယ်
   * Item ထည့်ပြီးရင် cart drawer ကို အလိုအလျောက် ဖွင့်ပေးတယ်
   */
  const addItem = (newItem: CartItem) => {
    setItems((prev) => {
      // တူညီတဲ့ item ရှိပြီးသားလား စစ်ဆေးတယ် (id + color + size တူရမယ်)
      const existing = prev.find(
        (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
      );
      if (existing) {
        // ရှိပြီးသားဆိုရင် quantity ပေါင်းထည့်တယ်
        return prev.map((item) =>
          item.id === newItem.id && item.color === newItem.color && item.size === newItem.size
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      // မရှိသေးရင် item အသစ်အနေနဲ့ ထည့်တယ်
      return [...prev, newItem];
    });
    setIsOpen(true); // Cart drawer ဖွင့်ပေးတယ်
  };

  /** removeItem - id + color + size နဲ့ ကိုက်ညီတဲ့ item ကို cart ထဲကနေ ဖယ်ရှားတယ် */
  const removeItem = (id: number, color: string, size: string) => {
    setItems((prev) => prev.filter((item) => !(item.id === id && item.color === color && item.size === size)));
  };

  /** updateQuantity - item ရဲ့ quantity ကို ပြောင်းတယ်။ 1 ထက်နည်းရင် လက်မခံဘူး */
  const updateQuantity = (id: number, color: string, size: string, quantity: number) => {
    if (quantity < 1) return; // Quantity 0 အောက် ဆင်းခွင့်မပြုဘူး
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color && item.size === size ? { ...item, quantity } : item
      )
    );
  };

  /** updateColor - cart ထဲက item ရဲ့ color ကို ပြောင်းတယ် */
  const updateColor = (id: number, oldColor: string, size: string, newColor: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.color === oldColor && item.size === size ? { ...item, color: newColor } : item
      )
    );
  };

  /** updateSize - cart ထဲက item ရဲ့ size ကို ပြောင်းတယ် */
  const updateSize = (id: number, color: string, oldSize: string, newSize: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.color === color && item.size === oldSize ? { ...item, size: newSize } : item
      )
    );
  };

  /** clearCart - Cart ထဲက item အားလုံးကို ရှင်းလင်းတယ် (checkout ပြီးတဲ့အခါ သုံးတယ်) */
  const clearCart = () => setItems([]);

  /**
   * totalPrice - Cart ထဲက item အားလုံးရဲ့ စုစုပေါင်း ဈေးနှုန်းကို တွက်ချက်တယ်
   * Price string (ဥပမာ "$2,450") ကို number ပြောင်းပြီး quantity နဲ့ မြှောက်တယ်
   */
  const totalPrice = items.reduce((sum, item) => {
    const price = parseFloat(item.price.replace(/[$,]/g, "")); // "$2,450" → 2450
    return sum + price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        updateColor,
        updateSize,
        clearCart,
        isOpen,
        setIsOpen,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

/**
 * useCart - Cart data ကို သုံးချင်တဲ့ component တိုင်းမှာ ဒီ hook ကို ခေါ်သုံးရတယ်
 * CartProvider အတွင်းမှာမှ သုံးလို့ရတယ်၊ အပြင်မှာ သုံးရင် error ပြမယ်
 * 
 * Usage: const { items, addItem, totalPrice } = useCart();
 */
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};
