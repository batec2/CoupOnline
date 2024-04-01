import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { PersonIcon } from "@radix-ui/react-icons";
import { GlobeIcon } from "@radix-ui/react-icons";
import { PinRightIcon } from "@radix-ui/react-icons";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DropDownMenu = () => {
  return (
    <div className="pt-4 pl-4 text-textColor-dark bg-primary">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="p-5">
            <HamburgerMenuIcon className="w-5 h-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <Link to="/">
            <DropdownMenuLabel>Super Couper</DropdownMenuLabel>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Account</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <Link to="/">
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <DividerVerticalIcon /> Login
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/creation">
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <DividerVerticalIcon /> Sign Up
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Statistics</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <Link to="/profile">
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <PersonIcon /> Profile
                    </DropdownMenuItem>
                  </Link>
                  <Link to="/global-stats">
                    <DropdownMenuItem className="hover:cursor-pointer">
                      <GlobeIcon /> Global Statistics
                    </DropdownMenuItem>
                  </Link>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <Link to="/room">
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:cursor-pointer">
                <PinRightIcon />
                Join game
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropDownMenu;
