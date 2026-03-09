/**
 * CartDrawer.tsx - Shopping Cart Side Panel (Drawer)
 * 
 * ညာဘက်ကနေ slide ဖွင့်ပြတဲ့ shopping cart panel။
 * Shadcn Sheet component ကို အသုံးပြုထားတယ်။
 * 
 * Features:
 * - Cart ထဲက item တွေပြခြင်း (ပုံ, အမည်, ဈေး, color, size, quantity)
 * - Color/Size dropdown နဲ့ ပြောင်းလဲနိုင်ခြင်း
 * - Quantity +/- ပြောင်းနိုင်ခြင်း
 * - Item ဖယ်ရှားနိုင်ခြင်း (X button)
 * - Order Summary ပြခြင်း (item list + total price)
 * - "Proceed to Checkout" button → /checkout page သို့ navigate
 */

import { X, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** ရွေးချယ်နိုင်တဲ့ size options */
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

/** ရွေးချယ်နိုင်တဲ့ color options */
const colors = ["Black", "Ivory", "Navy", "Burgundy", "Camel", "Olive"];

/** Color name → HSL value mapping (color swatch ပြဖို့) */
const colorValues: Record<string, string> = {
  Black: "hsl(0 0% 10%)",
  Ivory: "hsl(40 30% 92%)",
  Navy: "hsl(220 40% 20%)",
  Burgundy: "hsl(345 60% 30%)",
  Camel: "hsl(30 40% 55%)",
  Olive: "hsl(80 25% 35%)",
};

const CartDrawer = () => {
  const {
    items,            // Cart ထဲက item တွေ
    isOpen,           // Drawer ဖွင့်ထားလား
    setIsOpen,        // Drawer ဖွင့်/ပိတ်
    removeItem,       // Item ဖယ်ရှားမယ်
    updateQuantity,   // Quantity ပြောင်းမယ်
    updateColor,      // Color ပြောင်းမယ်
    updateSize,       // Size ပြောင်းမယ်
    totalPrice,       // စုစုပေါင်း ဈေးနှုန်း
  } = useCart();
  const navigate = useNavigate();

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl p-0 flex flex-col">
        {/* ==================== HEADER ==================== */}
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle className="font-heading text-lg tracking-[0.2em] uppercase">
            SHOPPING BAG ({items.length})
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* ==================== CART ITEMS LIST ==================== */}
          {/* ဘယ်ဘက် - Cart ထဲက item တွေ list ပြတယ် */}
          <div className="flex-1 overflow-y-auto px-6 py-4">
            {items.length === 0 ? (
              /* Cart ဗလာဆိုရင် */
              <p className="text-muted-foreground font-body text-sm text-center py-12">
                Your bag is empty
              </p>
            ) : (
              <div className="space-y-6">
                {items.map((item, index) => (
                  <div key={`${item.id}-${item.color}-${item.size}-${index}`} className="flex gap-4 pb-6 border-b border-border last:border-b-0">
                    {/* Product ပုံ */}
                    <div className="w-24 h-32 md:w-32 md:h-40 bg-muted shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product အသေးစိတ် */}
                    <div className="flex-1 flex flex-col justify-between">
                      {/* အမည်နဲ့ ဈေး + Remove button */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h3 className="font-heading text-base md:text-lg font-semibold tracking-wide uppercase text-foreground">
                            {item.name}
                          </h3>
                          <p className="font-body text-sm text-foreground mt-1">
                            <span className="line-through text-muted-foreground mr-2">{item.price}</span>
                            {item.price}
                          </p>
                        </div>
                        {/* X button - item ဖယ်ရှားမယ် */}
                        <button
                          onClick={() => removeItem(item.id, item.color, item.size)}
                          className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        >
                          <X size={18} />
                        </button>
                      </div>

                      {/* Color နဲ့ Size dropdown selectors */}
                      <div className="flex flex-wrap items-center gap-3 mt-3">
                        {/* Color Dropdown - ရွေးထားတဲ့ color ပြောင်းနိုင်တယ် */}
                        <Select
                          value={item.color}
                          onValueChange={(val) => updateColor(item.id, item.color, item.size, val)}
                        >
                          <SelectTrigger className="w-[110px] h-9 text-xs font-body tracking-wider border-border">
                            <div className="flex items-center gap-2">
                              <span
                                className="w-4 h-4 rounded-full border border-border shrink-0"
                                style={{ backgroundColor: colorValues[item.color] }}
                              />
                              <SelectValue />
                            </div>
                          </SelectTrigger>
                          <SelectContent>
                            {colors.map((c) => (
                              <SelectItem key={c} value={c} className="text-xs font-body">
                                <div className="flex items-center gap-2">
                                  <span
                                    className="w-3 h-3 rounded-full border border-border"
                                    style={{ backgroundColor: colorValues[c] }}
                                  />
                                  {c}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>

                        {/* Size Dropdown - ရွေးထားတဲ့ size ပြောင်းနိုင်တယ် */}
                        <Select
                          value={item.size}
                          onValueChange={(val) => updateSize(item.id, item.color, item.size, val)}
                        >
                          <SelectTrigger className="w-[70px] h-9 text-xs font-body tracking-wider border-border">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {sizes.map((s) => (
                              <SelectItem key={s} value={s} className="text-xs font-body">
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Quantity +/- controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <span className="font-body text-xs tracking-wider text-muted-foreground uppercase">
                          Quantity
                        </span>
                        <div className="flex items-center">
                          {/* Minus button */}
                          <button
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center font-body text-sm text-foreground">
                            {item.quantity}
                          </span>
                          {/* Plus button */}
                          <button
                            onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-foreground hover:bg-muted transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ==================== ORDER SUMMARY ==================== */}
          {/* ညာဘက် (lg) / အောက်ပိုင်း - Order summary + Checkout button */}
          {items.length > 0 && (
            <div className="lg:w-72 border-t lg:border-t-0 lg:border-l border-border bg-muted/30 p-6 shrink-0">
              {/* Item တစ်ခုချင်းစီရဲ့ ဈေးနှုန်း */}
              <div className="space-y-3">
                {items.map((item, index) => (
                  <div key={`summary-${item.id}-${index}`} className="flex justify-between text-sm font-body">
                    <span className="text-foreground uppercase tracking-wider truncate max-w-[150px]">
                      {item.name}
                    </span>
                    <span className="text-foreground">{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Tax + Total */}
              <div className="border-t border-border mt-4 pt-4 space-y-2">
                <div className="flex justify-between text-sm font-body">
                  <span className="text-muted-foreground uppercase tracking-wider">Sales Tax</span>
                  <span className="text-muted-foreground">included</span>
                </div>
                <div className="flex justify-between font-body">
                  <span className="text-foreground uppercase tracking-wider font-semibold">Total</span>
                  <span className="text-foreground font-semibold text-lg">
                    ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                  </span>
                </div>
              </div>

              {/* Checkout button - နှိပ်ရင် drawer ပိတ်ပြီး /checkout page သို့ သွားတယ် */}
              <button
                onClick={() => { setIsOpen(false); navigate("/checkout"); }}
                className="w-full mt-6 py-4 bg-foreground text-background font-body text-xs tracking-[0.2em] uppercase hover:opacity-90 transition-opacity"
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
