import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { buttonVariants } from "@/components/ui/button";
//Assets
import { Icons } from "@/components/ui/icons";
import { ModeToggle } from "../mode-toggle";
import { LogOut } from "lucide-react";

export const Navbar = () => {
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="font-bold flex">
            <div className="ml-2 font-bold text-xl flex">
              <Icons.LogoIcon />
              Sadie / Escola
            </div>
          </NavigationMenuItem>

          {/* desktop */}
          <nav className="hidden md:flex gap-2">
            <a
              className={`text-[17px] gap-3 ${buttonVariants({
                variant: "outline",
              })}`}
            >
              <LogOut size={20} />
              Cerrar sesion
            </a>
            <div className="ml-4">
              <ModeToggle />
            </div>
          </nav>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
