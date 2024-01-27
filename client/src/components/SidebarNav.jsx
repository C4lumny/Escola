import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

function SidebarNav({ className, items }) {
  return (
    <nav
      className={`flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-3 ${className}`} // Tailwind classes
    >
      {items.map((item) => (
        <Link
          key={item.href}
          onClick={item.onClick}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            item.isActive ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            "justify-start text-base"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

export default SidebarNav;
