import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Crown, BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddGameForm } from "./AddGameForm";

type DeckCardProps = {
  deck: {
    id: number;
    name: string;
    colors: string[];
    winRate: number;
    totalGames: number;
    commander?: string;
    format?: string;
  };
  colorMap: Record<string, string>;
  onGameAdded: (deckId: number) => void;
};

const getGradientForColors = (colors: string[]) => {
  // Sort colors to ensure consistent gradients
  const sortedColors = [...colors].sort();
  const colorKey = sortedColors.join("");

  const gradients: Record<string, string> = {
    // Mono-colored - adjusted to darker shades
    "U": "bg-gradient-to-br from-blue-700 to-blue-900",
    "B": "bg-gradient-to-br from-gray-700 to-gray-900",
    "R": "bg-gradient-to-br from-red-500 to-red-700",
    "G": "bg-gradient-to-br from-green-700 to-green-900",
    "W": "bg-gradient-to-br from-yellow-500 to-yellow-700",
    
    // Two-colored - adjusted combinations with darker shades
    "BR": "bg-gradient-to-br from-gray-800 to-red-700",
    "BG": "bg-gradient-to-br from-gray-800 to-green-800",
    "BU": "bg-gradient-to-br from-gray-800 to-blue-800",
    "BW": "bg-gradient-to-br from-gray-800 to-yellow-600",
    "RG": "bg-gradient-to-br from-red-600 to-green-800",
    "RU": "bg-gradient-to-br from-red-600 to-blue-800",
    "RW": "bg-gradient-to-br from-red-600 to-yellow-600",
    "GU": "bg-gradient-to-br from-green-800 to-blue-800",
    "GW": "bg-gradient-to-br from-green-800 to-yellow-600",
    "UW": "bg-gradient-to-br from-blue-800 to-yellow-600",
    
    // Default for 3+ colors or unknown combinations
    "default": "bg-gradient-to-br from-purple-500 to-pink-500"
  };

  return gradients[colorKey] || gradients.default;
};

export const DeckCard = ({ deck, colorMap, onGameAdded }: DeckCardProps) => {
  const gradientClass = getGradientForColors(deck.colors);
  
  return (
    <Card className={`hover:shadow-lg transition-shadow ${gradientClass} text-white`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-bold">{deck.name}</CardTitle>
        <div className="flex items-center space-x-1">
          {deck.colors.map((color) => (
            <div
              key={color}
              className={`w-4 h-4 rounded-full ${colorMap[color]} border border-white`}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {deck.commander && (
          <div className="flex items-center space-x-2 mb-3">
            <Crown className="h-4 w-4 text-yellow-300" />
            <span className="text-sm">{deck.commander}</span>
          </div>
        )}
        
        {deck.format && (
          <div className="flex items-center space-x-2 mb-3">
            <BookOpen className="h-4 w-4 text-blue-200" />
            <span className="text-sm">{deck.format}</span>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Trophy className="h-4 w-4 text-yellow-300" />
            <span className="text-sm font-medium">{deck.winRate}% Win Rate</span>
          </div>
          <Badge variant="secondary" className="bg-white/20">{deck.totalGames} Games</Badge>
        </div>

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
  );
};