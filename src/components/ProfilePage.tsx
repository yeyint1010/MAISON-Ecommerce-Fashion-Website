/**
 * ProfilePage.tsx - User Profile Management Page
 * 
 * Supabase profiles table ကနေ data load/save လုပ်တယ်။
 * 3 Tabs: Personal Info, Address, Preferences
 */

import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Camera, Menu, Search, ShoppingBag, Heart, User, X, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import SlideMenu from "./SlideMenu";
import SearchOverlay from "./SearchOverlay";

interface ProfileData {
  fullName: string;
  phone: string;
  avatarUrl: string;
  country: string;
  city: string;
  township: string;
  streetAddress: string;
  postalCode: string;
  language: string;
  notifyEmail: boolean;
  notifySms: boolean;
  notifyPush: boolean;
}

const defaultProfile: ProfileData = {
  fullName: "", phone: "", avatarUrl: "",
  country: "", city: "", township: "", streetAddress: "", postalCode: "",
  language: "en", notifyEmail: true, notifySms: false, notifyPush: true,
};

const ProfilePage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [loading, setLoading] = useState(true);

  /** Supabase ကနေ profile data load */
  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();
      if (data) {
        setProfile({
          fullName: data.full_name || "",
          phone: data.phone || "",
          avatarUrl: data.avatar_url || "",
          country: data.country || "",
          city: data.city || "",
          township: data.township || "",
          streetAddress: data.street_address || "",
          postalCode: data.postal_code || "",
          language: data.language || "en",
          notifyEmail: data.notify_email ?? true,
          notifySms: data.notify_sms ?? false,
          notifyPush: data.notify_push ?? true,
        });
      }
      setLoading(false);
    };
    fetchProfile();
  }, [user]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const updateField = (field: keyof ProfileData, value: string | boolean) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  /** Supabase profiles table ကို update */
  const handleSave = async (section: string) => {
    if (!user) return;
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.fullName,
        phone: profile.phone,
        avatar_url: profile.avatarUrl,
        country: profile.country,
        city: profile.city,
        township: profile.township,
        street_address: profile.streetAddress,
        postal_code: profile.postalCode,
        language: profile.language,
        notify_email: profile.notifyEmail,
        notify_sms: profile.notifySms,
        notify_push: profile.notifyPush,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Saved successfully", description: `Your ${section} has been updated.` });
    }
  };

  const handlePasswordChange = async () => {
    if (!passwords.new || !passwords.confirm) {
      toast({ title: "Error", description: "Please fill in all password fields.", variant: "destructive" });
      return;
    }
    if (passwords.new.length < 6) {
      toast({ title: "Error", description: "New password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast({ title: "Error", description: "New passwords do not match.", variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: passwords.new });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPasswords({ current: "", new: "", confirm: "" });
      toast({ title: "Password updated", description: "Your password has been changed successfully." });
    }
  };

  const getInitials = () => {
    if (!profile.fullName) return user?.email?.[0]?.toUpperCase() || "U";
    return profile.fullName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="font-heading text-lg text-muted-foreground tracking-wider">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-background">
      {/* NAV BAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 transition-all duration-300 ${
        menuOpen ? "bg-background border-b border-border" : scrolled ? "backdrop-blur-xl bg-white/60 border-b border-border shadow-sm" : "bg-background border-b border-border"
      }`}>
        <div className="flex items-center gap-4 text-foreground">
          {menuOpen ? (
            <button onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <X size={20} /><span className="hidden md:inline font-body text-sm tracking-wider">Close</span>
            </button>
          ) : (
            <button onClick={() => setMenuOpen(true)} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Menu size={20} /><span className="hidden md:inline font-body text-sm tracking-wider">Menu</span>
            </button>
          )}
          <button onClick={() => setSearchOpen(true)} className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <Search size={20} /><span className="hidden md:inline font-body text-sm tracking-wider">Search</span>
          </button>
        </div>
        <Link to="/" className="font-heading text-xl md:text-2xl font-semibold tracking-[0.3em] uppercase text-foreground">MAISON</Link>
        <div className="flex items-center gap-4 text-foreground">
          <button className="hover:opacity-70 transition-opacity"><ShoppingBag size={20} /></button>
          <button className="hover:opacity-70 transition-opacity"><Heart size={20} /></button>
          <Link to="/profile" className="hover:opacity-70 transition-opacity"><User size={20} /></Link>
          <button onClick={() => signOut()} className="hover:opacity-70 transition-opacity"><LogOut size={20} /></button>
        </div>
      </nav>

      <SlideMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* PROFILE CONTENT */}
      <div className="pt-24 pb-16 px-4 md:px-10 max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 font-body text-sm tracking-wider">
          <ArrowLeft size={16} /> Back
        </button>

        <div className="flex items-center gap-5 mb-10">
          <div className="relative group">
            <Avatar className="h-20 w-20 border-2 border-border">
              <AvatarImage src={profile.avatarUrl} alt={profile.fullName} />
              <AvatarFallback className="bg-primary text-primary-foreground font-heading text-xl">{getInitials()}</AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-foreground/0 group-hover:bg-foreground/20 flex items-center justify-center transition-all cursor-pointer">
              <Camera size={20} className="text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <div>
            <h1 className="font-heading text-2xl md:text-3xl font-semibold tracking-wide text-foreground">
              {profile.fullName || "Your Profile"}
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-1">{user?.email}</p>
          </div>
        </div>

        {/* TABS */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="w-full grid grid-cols-3 bg-secondary rounded-none h-12 mb-8">
            <TabsTrigger value="personal" className="rounded-none font-body text-sm tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none">Personal</TabsTrigger>
            <TabsTrigger value="address" className="rounded-none font-body text-sm tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none">Address</TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-none font-body text-sm tracking-wider data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none">Preferences</TabsTrigger>
          </TabsList>

          {/* TAB 1: Personal Info */}
          <TabsContent value="personal" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName" className="font-body text-xs tracking-wider uppercase text-muted-foreground">Full Name</Label>
                <Input id="fullName" value={profile.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Enter your full name" className="mt-2 rounded-none border-border font-body" maxLength={100} />
              </div>
              <div>
                <Label htmlFor="email" className="font-body text-xs tracking-wider uppercase text-muted-foreground">Email Address</Label>
                <Input id="email" type="email" value={user?.email || ""} disabled className="mt-2 rounded-none border-border font-body opacity-60" />
              </div>
              <div>
                <Label htmlFor="phone" className="font-body text-xs tracking-wider uppercase text-muted-foreground">Phone Number</Label>
                <Input id="phone" type="tel" value={profile.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="+95 9xxxxxxxxx" className="mt-2 rounded-none border-border font-body" maxLength={20} />
              </div>
            </div>
            <Button onClick={() => handleSave("personal information")} className="w-full rounded-none font-body text-sm tracking-widest uppercase h-12">Save Changes</Button>
          </TabsContent>

          {/* TAB 2: Address */}
          <TabsContent value="address" className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="country" className="font-body text-xs tracking-wider uppercase text-muted-foreground">Country</Label>
                <Input id="country" value={profile.country} onChange={(e) => updateField("country", e.target.value)} placeholder="Myanmar" className="mt-2 rounded-none border-border font-body" maxLength={100} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city" className="font-body text-xs tracking-wider uppercase text-muted-foreground">City</Label>
                  <Input id="city" value={profile.city} onChange={(e) => updateField("city", e.target.value)} placeholder="Yangon" className="mt-2 rounded-none border-border font-body" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="township" className="font-body text-xs tracking-wider uppercase text-muted-foreground">Township</Label>
                  <Input id="township" value={profile.township} onChange={(e) => updateField("township", e.target.value)} placeholder="Kamayut" className="mt-2 rounded-none border-border font-body" maxLength={100} />
                </div>
              </div>
              <div>
                <Label htmlFor="street" className="font-body text-xs tracking-wider uppercase text-muted-foreground">Street Address</Label>
                <Input id="street" value={profile.streetAddress} onChange={(e) => updateField("streetAddress", e.target.value)} placeholder="No. 123, Example Street" className="mt-2 rounded-none border-border font-body" maxLength={255} />
              </div>
              <div>
                <Label htmlFor="postal" className="font-body text-xs tracking-wider uppercase text-muted-foreground">Postal Code</Label>
                <Input id="postal" value={profile.postalCode} onChange={(e) => updateField("postalCode", e.target.value)} placeholder="11041" className="mt-2 rounded-none border-border font-body" maxLength={20} />
              </div>
            </div>
            <Button onClick={() => handleSave("address")} className="w-full rounded-none font-body text-sm tracking-widest uppercase h-12">Save Address</Button>
          </TabsContent>

          {/* TAB 3: Preferences */}
          <TabsContent value="preferences" className="space-y-8">
            <div>
              <h3 className="font-heading text-lg font-medium text-foreground mb-4">Language</h3>
              <div className="flex gap-3">
                <Button variant={profile.language === "en" ? "default" : "outline"} onClick={() => updateField("language", "en")} className="rounded-none font-body text-sm tracking-wider">English</Button>
                <Button variant={profile.language === "my" ? "default" : "outline"} onClick={() => updateField("language", "my")} className="rounded-none font-body text-sm tracking-wider">မြန်မာ</Button>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-lg font-medium text-foreground mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <Label htmlFor="notifyEmail" className="font-body text-sm text-foreground cursor-pointer">Email Notifications</Label>
                  <Switch id="notifyEmail" checked={profile.notifyEmail} onCheckedChange={(v) => updateField("notifyEmail", v)} />
                </div>
                <div className="flex items-center justify-between py-2">
                  <Label htmlFor="notifySms" className="font-body text-sm text-foreground cursor-pointer">SMS Notifications</Label>
                  <Switch id="notifySms" checked={profile.notifySms} onCheckedChange={(v) => updateField("notifySms", v)} />
                </div>
                <div className="flex items-center justify-between py-2">
                  <Label htmlFor="notifyPush" className="font-body text-sm text-foreground cursor-pointer">Push Notifications</Label>
                  <Switch id="notifyPush" checked={profile.notifyPush} onCheckedChange={(v) => updateField("notifyPush", v)} />
                </div>
              </div>
            </div>

            <Button onClick={() => handleSave("preferences")} className="w-full rounded-none font-body text-sm tracking-widest uppercase h-12">Save Preferences</Button>

            <div className="border-t border-border pt-8">
              <h3 className="font-heading text-lg font-medium text-foreground mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="newPw" className="font-body text-xs tracking-wider uppercase text-muted-foreground">New Password</Label>
                  <Input id="newPw" type="password" value={passwords.new} onChange={(e) => setPasswords((p) => ({ ...p, new: e.target.value }))} className="mt-2 rounded-none border-border font-body" maxLength={128} />
                </div>
                <div>
                  <Label htmlFor="confirmPw" className="font-body text-xs tracking-wider uppercase text-muted-foreground">Confirm New Password</Label>
                  <Input id="confirmPw" type="password" value={passwords.confirm} onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))} className="mt-2 rounded-none border-border font-body" maxLength={128} />
                </div>
              </div>
              <Button onClick={handlePasswordChange} variant="outline" className="w-full rounded-none font-body text-sm tracking-widest uppercase h-12 mt-4 border-foreground text-foreground hover:bg-foreground hover:text-background">
                Update Password
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
