/**
 * CheckoutPage.tsx - ငွေပေးချေတဲ့ စာမျက်နှာ
 * 
 * ဒီ page မှာ user က payment method ရွေးပြီး order place လုပ်နိုင်တယ်။
 * Order place ပြီးရင် success page + receipt ပြပေးတယ်။
 * 
 * Payment Methods:
 * 1. Cash on Delivery (COD) - အိမ်ရောက် ငွေပေးချေ
 * 2. Credit/Debit Card - Visa, Mastercard, PayPal, Amex
 * 3. Mobile Banking - KBZPay, WavePay, AYAPay
 * 
 * Page States:
 * - isConfirmed = false → Payment form + Order summary ပြတယ်
 * - isConfirmed = true → Success message + Receipt ပြတယ်
 */

import { useState, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { CreditCard, Wallet, Smartphone, X, Minus, Plus, Send, CheckCircle, Printer, Download } from "lucide-react";

/** Payment method type - 3 မျိုးရှိတယ် */
type PaymentMethod = "cod" | "card" | "mobile";

/** Order place ပြီးနောက် receipt မှာ ပြဖို့ item data structure */
interface OrderItem {
  name: string;
  price: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  gender: string;
  category: string;
}

const CheckoutPage = () => {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  // ==================== STATE MANAGEMENT ====================
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card"); // ရွေးထားတဲ့ payment method
  const [promoCode, setPromoCode] = useState("");                              // Promo code input

  // Credit/Debit Card form fields
  const [cardNumber, setCardNumber] = useState("");   // Card နံပါတ်
  const [cardName, setCardName] = useState("");       // Card holder name
  const [expiry, setExpiry] = useState("");           // Expiry date (MM/YY)
  const [cvv, setCvv] = useState("");                 // CVV code

  // Mobile Banking form fields
  const [mobileProvider, setMobileProvider] = useState<string>("KBZPay"); // ရွေးထားတဲ့ provider
  const [mobilePhone, setMobilePhone] = useState("");                     // ဖုန်းနံပါတ်
  const [mobilePin, setMobilePin] = useState("");                         // PIN code

  // Order confirmation state (order place ပြီးနောက်)
  const [isConfirmed, setIsConfirmed] = useState(false);       // Order place ပြီးပြီလား
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]); // Order place ချိန်မှာ cart ထဲကရှိတဲ့ items
  const [orderTotal, setOrderTotal] = useState(0);             // စုစုပေါင်း ဈေး (shipping + tax ပါ)
  const [orderSubtotal, setOrderSubtotal] = useState(0);       // Product ဈေးချည်း
  const [orderTax, setOrderTax] = useState(0);                 // Tax ပမာဏ
  const [orderId, setOrderId] = useState("");                  // Order ID (auto-generated)
  const receiptRef = useRef<HTMLDivElement>(null);             // Receipt div ref (print အတွက်)

  // ==================== PRICE CALCULATIONS ====================
  const shipping = 5;              // Shipping fee ($5 ပုံသေ)
  const taxRate = 0.05;            // Tax rate (5%)
  const subtotal = totalPrice;     // Cart ရဲ့ subtotal
  const tax = subtotal * taxRate;  // Tax amount
  const total = subtotal + shipping + tax; // Grand total

  /**
   * handlePlaceOrder - "Place Order" button နှိပ်ရင် ခေါ်တယ်
   * 1. Unique Order ID generate လုပ်တယ်
   * 2. လက်ရှိ cart items နဲ့ totals ကို orderState ထဲ save တယ် (receipt ပြဖို့)
   * 3. isConfirmed = true ထားပြီး success view ပြတယ်
   * 4. Cart ကို clear လုပ်တယ်
   */
  const handlePlaceOrder = () => {
    const id = "ORD-" + Date.now().toString(36).toUpperCase(); // Unique ID: ORD-M1ABCD...
    setOrderId(id);
    setOrderItems([...items]);
    setOrderSubtotal(subtotal);
    setOrderTax(tax);
    setOrderTotal(total);
    setIsConfirmed(true);
    clearCart(); // Cart ရှင်းတယ်
  };

  /**
   * handlePrint - Receipt ကို print/download လုပ်တယ်
   * New window ဖွင့်ပြီး receipt HTML ကို ထည့်ပြီး browser print dialog ပြတယ်
   */
  const handlePrint = () => {
    if (receiptRef.current) {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html><head><title>Order Receipt - ${orderId}</title>
          <style>body{font-family:system-ui,sans-serif;padding:40px;max-width:600px;margin:0 auto}
          .header{text-align:center;border-bottom:2px solid #000;padding-bottom:20px;margin-bottom:20px}
          .item{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #eee}
          .total{font-weight:bold;font-size:18px;border-top:2px solid #000;padding-top:12px;margin-top:12px}
          </style></head><body>${receiptRef.current.innerHTML}</body></html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    }
  };

  /**
   * formatCardNumber - Card number ကို 4 digit group ခွဲပြတယ်
   * ဥပမာ: "1234567890123456" → "1234 5678 9012 3456"
   */
  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16); // Number တွေပဲ ယူတယ်, max 16 digits
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  /**
   * formatExpiry - Expiry date ကို MM/YY format ပြောင်းပေးတယ်
   * ဥပमा: "1225" → "12/25"
   */
  const formatExpiry = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length > 2) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  };

  // ==================== ORDER CONFIRMATION VIEW ====================
  // Order place ပြီးရင် success message နဲ့ receipt ပြတယ်
  if (isConfirmed) {
    const orderDate = new Date().toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
    // Payment method label - receipt မှာ ပြဖို့
    const paymentLabel = selectedMethod === "card" ? "Credit/Debit Card" : selectedMethod === "mobile" ? `Mobile Banking (${mobileProvider})` : "Cash on Delivery";

    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 py-12">
          {/* ==================== SUCCESS HEADER ==================== */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-wide mb-2">
              Payment Successful!
            </h1>
            <p className="font-body text-sm text-muted-foreground">
              Thank you for your order. Your receipt is below.
            </p>
          </div>

          {/* ==================== RECEIPT CARD ==================== */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* receiptRef - print/download အတွက် ဒီ div ထဲက HTML ကို ယူသုံးတယ် */}
            <div ref={receiptRef}>
              {/* Receipt Header - Order Receipt title + date */}
              <div className="bg-foreground text-background px-6 py-5 text-center">
                <h2 className="font-heading text-lg tracking-[0.2em] uppercase">ORDER RECEIPT</h2>
                <p className="font-body text-xs text-background/70 mt-1">{orderDate}</p>
              </div>

              {/* Order Info - Order ID + Payment method */}
              <div className="px-6 py-4 border-b border-border flex justify-between">
                <div>
                  <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Order ID</span>
                  <p className="font-heading text-sm font-semibold">{orderId}</p>
                </div>
                <div className="text-right">
                  <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">Payment</span>
                  <p className="font-heading text-sm font-semibold">{paymentLabel}</p>
                </div>
              </div>

              {/* Items Ordered - မှာယူထားတဲ့ item တွေ list */}
              <div className="px-6 py-4">
                <h3 className="font-heading text-sm font-semibold uppercase tracking-wider mb-3">
                  Items Ordered
                </h3>
                <div className="space-y-3">
                  {orderItems.map((item, i) => (
                    <div key={i} className="flex gap-3 pb-3 border-b border-border last:border-b-0">
                      <div className="w-14 h-18 rounded-lg overflow-hidden bg-muted shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading text-sm font-semibold truncate">{item.name}</p>
                        <p className="font-body text-xs text-muted-foreground">
                          {item.color} · {item.size} · Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-body text-sm font-semibold shrink-0">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals - Subtotal, Shipping, Tax, Total Paid */}
              <div className="px-6 py-4 bg-muted/30 border-t border-border">
                <div className="space-y-2">
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${orderSubtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between font-body text-sm">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span>${orderTax.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between pt-3 mt-2 border-t border-border">
                    <span className="font-heading text-base font-bold">Total Paid</span>
                    <span className="font-heading text-lg font-bold text-primary">
                      ${orderTotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Print & Download buttons */}
            <div className="px-6 py-4 flex gap-3 border-t border-border">
              <button
                onClick={handlePrint}
                className="flex-1 h-11 flex items-center justify-center gap-2 rounded-lg border border-border font-body text-sm font-semibold hover:bg-muted transition-colors"
              >
                <Printer size={16} /> Print Receipt
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 h-11 flex items-center justify-center gap-2 rounded-lg border border-border font-body text-sm font-semibold hover:bg-muted transition-colors"
              >
                <Download size={16} /> Download
              </button>
            </div>
          </div>

          {/* Continue Shopping button - Home page သို့ ပြန်သွားတယ် */}
          <button
            onClick={() => navigate("/")}
            className="w-full mt-6 h-12 rounded-lg bg-foreground text-background font-body text-sm font-semibold tracking-[0.15em] uppercase hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ==================== CHECKOUT FORM VIEW ====================
  // Payment method ရွေးပြီး order place လုပ်တဲ့ main view
  return (
    <div className="min-h-screen bg-background">
      {/* Header - Back button */}
      <div className="border-b border-border px-6 py-4">
        <button
          onClick={() => navigate(-1)}
          className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back to Shopping
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* ==================== LEFT SIDE: PAYMENT METHODS ==================== */}
        <div className="flex-1">
          <h1 className="font-heading text-2xl font-bold tracking-wide mb-1">
            Payment Method Options
          </h1>
          <p className="font-body text-sm text-muted-foreground mb-6">
            Pick a payment option to continue to review.
          </p>

          <div className="space-y-4">
            {/* ===== OPTION 1: Cash on Delivery ===== */}
            <div
              onClick={() => setSelectedMethod("cod")}
              className={`relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedMethod === "cod"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                <Wallet className="w-5 h-5 text-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-heading text-base font-semibold">Cash on Delivery</span>
                  {/* "Popular" badge */}
                  <span className="text-[10px] font-body font-semibold bg-foreground text-background px-2 py-0.5 rounded">
                    Popular
                  </span>
                </div>
                <p className="font-body text-xs text-muted-foreground mt-0.5">
                  Pay when you receive your order.
                </p>
              </div>
              {/* Radio button indicator */}
              <div
                className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                  selectedMethod === "cod" ? "border-primary" : "border-muted-foreground/40"
                }`}
              >
                {selectedMethod === "cod" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                )}
              </div>
            </div>

            {/* ===== OPTION 2: Credit / Debit Card ===== */}
            <div
              onClick={() => setSelectedMethod("card")}
              className={`relative rounded-xl border-2 cursor-pointer transition-all ${
                selectedMethod === "card"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-center gap-4 p-5">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-heading text-base font-semibold">Credit / Debit Card</span>
                  </div>
                  {/* Payment provider logos (Visa, Mastercard, PayPal, Amex) */}
                  <div className="flex items-center gap-2 mt-1.5">
                    {/* Visa logo */}
                    <svg viewBox="0 0 48 32" className="h-5 w-auto" aria-label="Visa">
                      <rect width="48" height="32" rx="4" fill="#1A1F71"/>
                      <text x="24" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">VISA</text>
                    </svg>
                    {/* Mastercard logo */}
                    <svg viewBox="0 0 48 32" className="h-5 w-auto" aria-label="Mastercard">
                      <rect width="48" height="32" rx="4" fill="#2D2D2D"/>
                      <circle cx="19" cy="16" r="9" fill="#EB001B"/>
                      <circle cx="29" cy="16" r="9" fill="#F79E1B"/>
                      <circle cx="24" cy="16" r="5.5" fill="#FF5F00"/>
                    </svg>
                    {/* PayPal logo */}
                    <svg viewBox="0 0 48 32" className="h-5 w-auto" aria-label="PayPal">
                      <rect width="48" height="32" rx="4" fill="#003087"/>
                      <text x="24" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">PayPal</text>
                    </svg>
                    {/* Amex logo */}
                    <svg viewBox="0 0 48 32" className="h-5 w-auto" aria-label="Amex">
                      <rect width="48" height="32" rx="4" fill="#2E77BC"/>
                      <text x="24" y="19" textAnchor="middle" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">AMEX</text>
                    </svg>
                  </div>
                </div>
                {/* Radio button indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                    selectedMethod === "card" ? "border-primary" : "border-muted-foreground/40"
                  }`}
                >
                  {selectedMethod === "card" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
              </div>

              {/* Card Form - card ရွေးထားမှ ပြတယ် */}
              {selectedMethod === "card" && (
                <div className="px-5 pb-5 space-y-4">
                  {/* Card Number input */}
                  <div>
                    <label className="font-heading text-sm font-semibold block mb-1.5">
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      className="w-full h-11 px-4 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  {/* Cardholder Name input */}
                  <div>
                    <label className="font-heading text-sm font-semibold block mb-1.5">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="w-full h-11 px-4 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>
                  {/* Expiry Date + CVV (side by side) */}
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <label className="font-heading text-sm font-semibold block mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        className="w-full h-11 px-4 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="font-heading text-sm font-semibold block mb-1.5">
                        CVV
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                        className="w-full h-11 px-4 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ===== OPTION 3: Mobile Banking ===== */}
            <div
              onClick={() => setSelectedMethod("mobile")}
              className={`relative rounded-xl border-2 cursor-pointer transition-all ${
                selectedMethod === "mobile"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-muted-foreground/30"
              }`}
            >
              <div className="flex items-center gap-4 p-5">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Smartphone className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-1">
                  <span className="font-heading text-base font-semibold">Mobile Banking</span>
                  <p className="font-body text-xs text-muted-foreground mt-0.5">
                    Supported: KBZPay, WavePay, AYAPay.
                  </p>
                </div>
                {/* Radio button indicator */}
                <div
                  className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                    selectedMethod === "mobile" ? "border-primary" : "border-muted-foreground/40"
                  }`}
                >
                  {selectedMethod === "mobile" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                  )}
                </div>
              </div>

              {/* Mobile Banking Form - mobile ရွေးထားမှ ပြတယ် */}
              {selectedMethod === "mobile" && (
                <div className="px-5 pb-5 space-y-4">
                  {/* Provider Selection - KBZPay / WavePay / AYAPay toggle buttons */}
                  <div>
                    <label className="font-heading text-sm font-semibold block mb-2">
                      Select Provider
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {["KBZPay", "WavePay", "AYAPay"].map((provider) => (
                        <button
                          key={provider}
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setMobileProvider(provider); }}
                          className={`h-10 rounded-lg border-2 font-body text-[11px] sm:text-xs font-semibold tracking-wider transition-all ${
                            mobileProvider === provider
                              ? "border-primary bg-primary/10 text-foreground"
                              : "border-border text-muted-foreground hover:border-muted-foreground/50"
                          }`}
                        >
                          {provider}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Phone Number input - numbers only, max 11 digits */}
                  <div>
                    <label className="font-heading text-sm font-semibold block mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="09xxxxxxxxx"
                      value={mobilePhone}
                      onClick={(e) => e.stopPropagation()} // Parent onClick နဲ့ conflict မဖြစ်အောင်
                      onChange={(e) => setMobilePhone(e.target.value.replace(/[^0-9]/g, "").slice(0, 11))}
                      className="w-full h-11 px-4 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                  </div>

                  {/* PIN Code input - numbers only, max 6 digits, password mask */}
                  <div>
                    <label className="font-heading text-sm font-semibold block mb-1.5">
                      PIN Code
                    </label>
                    <input
                      type="password"
                      placeholder="••••••"
                      value={mobilePin}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => setMobilePin(e.target.value.replace(/[^0-9]/g, "").slice(0, 6))}
                      className="w-full h-11 px-4 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                    />
                    <p className="font-body text-[11px] text-muted-foreground mt-1">
                      Enter your {mobileProvider} PIN to authorize payment.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons - Back + Place Order */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8">
            <button
              onClick={() => navigate(-1)}
              className="flex-1 h-12 rounded-lg border border-border font-body text-sm font-semibold tracking-wider hover:bg-muted transition-colors"
            >
              Back to Shopping
            </button>
            <button
              onClick={handlePlaceOrder}
              className="flex-1 h-12 rounded-lg bg-foreground text-background font-body text-sm font-semibold tracking-wider hover:opacity-90 transition-opacity"
            >
              Place Order
            </button>
          </div>
        </div>

        {/* ==================== RIGHT SIDE: ORDER SUMMARY ==================== */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
            <h2 className="font-heading text-xl font-bold tracking-wide mb-5">
              Order Summary
            </h2>

            {/* Cart Items - item ပုံ, အမည်, ဈေး, quantity controls */}
            {items.length === 0 ? (
              <p className="text-muted-foreground font-body text-sm text-center py-8">
                No items in cart
              </p>
            ) : (
              <div className="space-y-4 mb-6">
                {items.map((item, index) => (
                  <div
                    key={`checkout-${item.id}-${item.color}-${item.size}-${index}`}
                    className="flex gap-3"
                  >
                    {/* Product ပုံ */}
                    <div className="w-16 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Product info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-body text-xs text-primary font-semibold uppercase tracking-wider">
                        {item.gender} · {item.category}
                      </p>
                      <h4 className="font-heading text-sm font-semibold truncate">
                        {item.name}
                      </h4>
                      <p className="font-body text-sm text-foreground mt-0.5">
                        {item.price}
                      </p>
                    </div>
                    {/* Remove button + Quantity controls */}
                    <div className="flex flex-col items-end justify-between shrink-0">
                      <button
                        onClick={() => removeItem(item.id, item.color, item.size)}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <X size={16} />
                      </button>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.color, item.size, item.quantity - 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded border border-border hover:bg-muted transition-colors"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="w-6 text-center font-body text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.color, item.size, item.quantity + 1)
                          }
                          className="w-7 h-7 flex items-center justify-center rounded border border-border hover:bg-muted transition-colors"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Promo Code input */}
            <div className="mb-6">
              <h3 className="font-heading text-base font-bold mb-2">Promotion Code</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add Promo Code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 h-10 px-3 rounded-lg border border-border bg-background font-body text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                />
                <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-muted hover:bg-muted-foreground/10 transition-colors">
                  <Send size={16} className="text-foreground" />
                </button>
              </div>
            </div>

            {/* Order Total - Subtotal + Shipping + Tax = Total */}
            <div>
              <h3 className="font-heading text-base font-bold mb-3">Order Total</h3>
              <div className="space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">
                    ${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-foreground">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-muted-foreground">Tax (5%)</span>
                  <span className="text-foreground">
                    ${tax.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="border-t border-border pt-3 mt-3 flex justify-between">
                  <span className="font-heading text-base font-bold">Total</span>
                  <span className="font-heading text-lg font-bold text-primary">
                    ${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
              </div>
            </div>

            {/* Terms & Conditions notice */}
            <div className="mt-6 p-4 rounded-lg bg-accent/20 border border-accent/30">
              <p className="font-body text-xs text-muted-foreground leading-relaxed">
                Welcome to our Store. By accessing or using this App, you agree to be bound by
                these Terms and Conditions. Enjoy your luxury shopping experience!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
