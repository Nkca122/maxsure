import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Menu } from "lucide-react";

let menu_links = [
  {
    display: "Home",
    to: "/",
  },

  {
    display: "Explore",
    to: "/explore",
  },

  {
    display: "Categories",
    to: "/categories",
  },

  {
    display: "Courses",
    to: "/courses",
  },

  {
    display: "About",
    to: "/about",
  },
];
export default function Header() {
  return (
    <>
      <div className="absolute top-0 w-full flex items-center justify-between px-2 py-2 z-10">
        <div className="h-[62px] flex justify-center items-center gap-2">
          <img src="/assets/logo.png" alt="Logo" className="h-full aspect-square"/>
          <h1 className="text-blue-500 font-bold text-xl">
            Algo<span className="text-white">Brief</span>
          </h1>
        </div>
        <NavigationMenu>
          <NavigationMenuList className="w-full hidden md:flex">
            <div className="flex">
              {menu_links.map((menu_link) => {
                return (
                  <NavigationMenuItem key={menu_link.to}>
                    <NavigationMenuLink href={menu_link.to}>
                      {menu_link.display}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </div>
          </NavigationMenuList>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex md:hidden">
              <Menu />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {menu_links.map((menu_link) => {
                return (
                  <DropdownMenuItem key={menu_link.to}>
                    <Link to={menu_link.to}>{menu_link.display}</Link>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </NavigationMenu>
      </div>
    </>
  );
}
