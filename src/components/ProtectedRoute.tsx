/**
 * ProtectedRoute.tsx - Authentication Guard
 * 
 * Login မလုပ်ရသေးရင် /login page ကို redirect လုပ်ပေးတယ်။
 * Checkout နဲ့ Profile page တွေကို protect လုပ်ဖို့ သုံးတယ်။
 */

import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="font-heading text-lg text-muted-foreground tracking-wider">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
