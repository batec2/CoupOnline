import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const NavMenu = () => {
  return (
    <NavigationMenu className="bg-lightgray">
      <NavigationMenuList className="flex space-x-4 w-full">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black w-full">
            Account
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-gray-900 p-2 rounded-md w-full">
            <ul className="grid w-[300px] gap-3 p-4 md:w-[300px] md:grid-cols-1 lg:w-[200px] text-center">
              <li>
                <Link to="/">
                  <NavigationMenuLink className={linkClasses}>
                    Login
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link to="/creation">
                  <NavigationMenuLink className={linkClasses}>
                    Create an Account
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link to="/profile">
                  <NavigationMenuLink className={linkClasses}>
                    Profile
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-black">
            Games
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-gray-900 p-2 rounded-md">
            <ul className="grid w-[300px] gap-3 p-4 md:w-[300px] md:grid-cols-1 lg:w-[200px] text-center">
              <li>
                <Link to="/game">
                  <NavigationMenuLink className={linkClasses}>
                    Join Game
                  </NavigationMenuLink>
                </Link>
              </li>
              <li>
                <Link to="/stats">
                  <NavigationMenuLink className={linkClasses}>
                    Global Stats
                  </NavigationMenuLink>
                </Link>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const linkClasses =
  "text-white block select-none space-y-1 rounded-md p-6 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground";

export default NavMenu;
