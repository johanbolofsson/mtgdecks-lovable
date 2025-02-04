import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { GamepadIcon, Grid, Menu, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

export const TopMenuBar = () => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: <GamepadIcon className="h-4 w-4" />, label: "Games", link: "/games" },
    { icon: <User className="h-4 w-4" />, label: "Players", link: "/players" },
    { icon: <Grid className="h-4 w-4" />, label: "Statistics", link: "/statistics" },
  ];

  const MobileMenu = () => (
    <div className="space-y-4 mt-4">
      {menuItems.map((item) => (
        <Link
          key={item.label}
          to={item.link}
          className="flex items-center space-x-2 text-white hover:text-mtg-accent"
          onClick={() => setOpen(false)}
        >
          {item.icon}
          <span>{item.label}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className="flex justify-between items-center">
      {/* Mobile Menu */}
      <div className="md:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-mtg-primary/50">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 bg-mtg-primary border-mtg-accent">
            <MobileMenu />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Menu */}
      <Menubar className="border-none bg-transparent hidden md:flex">
        {menuItems.map((item) => (
          <MenubarMenu key={item.label}>
            <MenubarTrigger className="cursor-pointer text-white hover:bg-mtg-primary/50">
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link to={item.link} className="flex items-center">
                  View All {item.label}
                </Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        ))}
      </Menubar>

      <Button className="bg-mtg-accent hover:bg-mtg-accent/90">
        <Plus className="mr-2 h-4 w-4" /> Add New Deck
      </Button>
    </div>
  );
};