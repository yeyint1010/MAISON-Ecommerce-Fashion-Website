/**
 * LoginPage.tsx - User Login / Sign-up Page
 * 
 * Supabase auth ကို သုံးပြီး email/password sign in နဲ့ sign up လုပ်နိုင်တယ်။
 * Sign up mode နဲ့ Sign in mode toggle လုပ်လို့ရတယ်။
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import loginHero from "@/assets/login-hero.jpg";

const LoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);

  /** Sign In handler */
  const handleSignIn = async () => {
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Welcome back!", description: "You have signed in successfully." });
      navigate("/");
    }
  };

  /** Sign Up handler */
  const handleSignUp = async () => {
    if (!email || !password) {
      toast({ title: "Error", description: "Please fill in all fields.", variant: "destructive" });
      return;
    }
    if (password.length < 6) {
      toast({ title: "Error", description: "Password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);
    if (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Account created!", description: "Please check your email to verify your account." });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    isSignUp ? handleSignUp() : handleSignIn();
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* LEFT SIDE: HERO IMAGE */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img src={loginHero} alt="Luxury fashion editorial" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 to-transparent" />
        <div className="absolute bottom-12 left-12 right-12">
          <p className="font-heading text-3xl font-light tracking-tight text-card leading-relaxed">
            Discover curated elegance,<br />crafted for you.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: LOGIN/SIGNUP FORM */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="space-y-2">
            <h1 className="font-heading text-3xl font-semibold tracking-tight text-foreground">MAISON</h1>
            <p className="text-muted-foreground font-body text-sm tracking-wide">
              {isSignUp ? "Create your account to get started." : "Welcome back. Sign in to your account."}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name - sign up only */}
            {isSignUp && (
              <div className="space-y-2">
                <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground font-body">Full Name</label>
                <Input
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12 border-border bg-card font-body text-sm placeholder:text-muted-foreground/60 focus-visible:ring-accent"
                  maxLength={100}
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground font-body">Email</label>
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 border-border bg-card font-body text-sm placeholder:text-muted-foreground/60 focus-visible:ring-accent"
                maxLength={255}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground font-body">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 border-border bg-card font-body text-sm pr-12 placeholder:text-muted-foreground/60 focus-visible:ring-accent"
                  maxLength={128}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password (sign in only) */}
            {!isSignUp && (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" className="border-border data-[state=checked]:bg-accent data-[state=checked]:border-accent" />
                  <label htmlFor="remember" className="text-sm text-muted-foreground font-body cursor-pointer">Remember me</label>
                </div>
                <a href="#" className="text-sm text-accent hover:text-accent/80 font-body transition-colors">Forgot password?</a>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              variant="accent"
              size="lg"
              className="w-full h-12 font-heading text-sm tracking-wide uppercase"
              disabled={loading}
            >
              {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-4 text-muted-foreground font-body tracking-widest">or</span>
            </div>
          </div>

          {/* Social login buttons */}
          <div className="space-y-3">
            <Button variant="social" className="w-full h-12 font-body text-sm gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>
            <Button variant="social" className="w-full h-12 font-body text-sm gap-3">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Continue with Apple
            </Button>
          </div>

          {/* Toggle sign in / sign up */}
          <p className="text-center text-sm text-muted-foreground font-body">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-foreground font-medium hover:text-accent transition-colors"
            >
              {isSignUp ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
