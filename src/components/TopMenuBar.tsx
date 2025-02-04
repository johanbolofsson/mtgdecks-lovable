import { Button } from "@/components/ui/button";
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import { GamepadIcon, Grid, Plus, User } from "lucide-react";
import { Link } from "react-router-dom";

export const TopMenuBar = () => {
  return (
    <div className="flex justify-between items-center">
      <Menubar className="border-none bg-transparent">
        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer text-white hover:bg-mtg-primary/50">
            <GamepadIcon className="mr-2 h-4 w-4" />
            Games
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link to="/games" className="flex items-center">View All Games</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer text-white hover:bg-mtg-primary/50">
            <User className="mr-2 h-4 w-4" />
            Players
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link to="/players" className="flex items-center">View All Players</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger className="cursor-pointer text-white hover:bg-mtg-primary/50">
            <Grid className="mr-2 h-4 w-4" />
            Statistics
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <Link to="/statistics" className="flex items-center">View Statistics</Link>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <Button className="bg-mtg-accent hover:bg-mtg-accent/90">
        <Plus className="mr-2 h-4 w-4" /> Add New Deck
      </Button>
    </div>
  );
};