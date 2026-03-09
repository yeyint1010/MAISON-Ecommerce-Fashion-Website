/**
 * NavLink.tsx - Custom Navigation Link Component
 * 
 * React Router ရဲ့ NavLink ကို wrap လုပ်ထားတဲ့ component။
 * Active state (လက်ရှိ page) နဲ့ pending state အလိုက်
 * className ပြောင်းနိုင်အောင် ပြုလုပ်ထားတယ်။
 * 
 * Props:
 * - className: ပုံမှန် class
 * - activeClassName: Active state (URL match) မှာ ပေါင်းထည့်မယ့် class
 * - pendingClassName: Loading/pending state မှာ ပေါင်းထည့်မယ့် class
 * 
 * Usage example:
 * <NavLink to="/about" className="text-sm" activeClassName="font-bold">About</NavLink>
 */

import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    return (
      <RouterNavLink
        ref={ref}
        to={to}
        className={({ isActive, isPending }) =>
          cn(className, isActive && activeClassName, isPending && pendingClassName)
        }
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
