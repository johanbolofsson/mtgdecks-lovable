import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddGameForm } from "./AddGameForm";
import { ColorIdentity } from "./deck/ColorIdentity";
import { DeckStats } from "./deck/DeckStats";
import { DeckMetadata } from "./deck/DeckMetadata";

type DeckCardProps = {
  deck: {
    id: string;
    name: string;
    colors: string[];
    winRate: number;
    totalGames: number;
    commander?: string;
    format?: string;
  };
  colorMap: Record<string, string>;
  onGameAdded: (deckId: string) => void;
};

const getGradientForColors = (colors: string[]) => {
  const sortedColors = [...colors].sort();
  const colorKey = sortedColors.join("");

  const gradients: Record<string, string> = {
    "U": "from-blue-700 to-blue-900",
    "B": "from-gray-700 to-gray-900",
    "R": "from-red-500 to-red-700",
    "G": "from-green-700 to-green-900",
    "W": "from-yellow-500 to-yellow-700",
    "BR": "from-gray-800 to-red-700",
    "BG": "from-gray-800 to-green-800",
    "BU": "from-gray-800 to-blue-800",
    "BW": "from-gray-800 to-yellow-600",
    "RG": "from-red-600 to-green-800",
    "RU": "from-red-600 to-blue-800",
    "RW": "from-red-600 to-yellow-600",
    "GU": "from-green-800 to-blue-800",
    "GW": "from-green-800 to-yellow-600",
    "UW": "from-blue-800 to-yellow-600",
    "default": "from-purple-500 to-pink-500"
  };

  return gradients[colorKey] || gradients.default;
};

export const DeckCard = ({ deck, colorMap, onGameAdded }: DeckCardProps) => {
  const gradientClass = getGradientForColors(deck.colors);
  
  return (
    <div className="relative group h-fit">
      <div className={`absolute -inset-0.5 rounded-lg bg-gradient-to-br ${gradientClass} opacity-75 group-hover:opacity-100 transition duration-200`} />
      <Card className="relative bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold">{deck.name}</CardTitle>
          <ColorIdentity colors={deck.colors} colorMap={colorMap} />
        </CardHeader>
        <CardContent>
          <DeckMetadata commander={deck.commander} format={deck.format} />
          <DeckStats winRate={deck.winRate} totalGames={deck.totalGames} />

          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-white/20 hover:bg-white/30 text-white" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Game
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Game for {deck.name}</DialogTitle>
              </DialogHeader>
              <AddGameForm deckId={deck.id} onGameAdded={() => onGameAdded(deck.id)} />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
};