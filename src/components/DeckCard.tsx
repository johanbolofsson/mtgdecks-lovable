
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
 
  const colorKey = [...colors].join("");

    const gradients: Record<string, string> = {
    // Single color gradients
    "U": "from-blue-700 to-blue-900",
    "B": "from-gray-700 to-gray-900",
    "R": "from-red-500 to-red-700",
    "G": "from-green-700 to-green-900",
    "W": "from-yellow-500 to-yellow-700",
    
    // Two color gradients
    "BR": "from-gray-800 to-red-700", //Rakdos
    "BG": "from-gray-800 to-green-800", //Golgari
    "UB": "from-blue-800 to-gray-800", //Dimir
    "WB": "from-yellow-600 to-gray-800", //Orzhov
    "RG": "from-red-700 to-green-800", //Gruul
    "UR": "from-blue-800 to-red-700", //Izzet
    "WR": "from-yellow-600 to-red-700", //Boros
    "UG": "from-blue-800 to-green-800", //Simic
    "WG": "from-yellow-600 to-green-800", //Selesnya
    "WU": "from-yellow-600 to-blue-800", //Azorius
    
    // Three color gradients
    "BRG": "from-gray-800 via-red-700 to-green-800", // Jund
    "WBR": "from-yellow-600 via-red-700 to-gray-800", // Mardu
    "UBG": "from-blue-800 via-gray-800 to-green-800", // Sultai
    "WBG": "from-yellow-600 via-gray-800 to-green-800", // Abzan
    "UBR": "from-blue-800 via-gray-800 to-red-700", // Grixis
    "WUB": "from-yellow-600 via-blue-800 to-gray-800", // Esper
    "URG": "from-blue-800 via-red-700 to-green-800", // Temur
    "WRG": "from-yellow-600 via-red-700 to-green-800", // Naya
    "WUR": "from-yellow-600 via-blue-800 to-red-700", // Jeskai
    "WUG": "from-yellow-600 via-blue-800 to-green-800", // Bant
    
    // Four color gradients
    "WBRG": "from-yellow-600 via-gray-800 via-red-700 to-green-800", //Dune
    "UBRG": "from-blue-800 via-gray-800 via-red-700 to-green-800", //Glint
    "WUBR": "from-yellow-600 via-blue-800 via-gray-800 to-red-700", //Yore
    "WUBG": "from-yellow-600 via-blue-800 via-gray-800 to-green-800", //Witch
    "WURG": "from-yellow-600 via-blue-800 via-red-700 to-green-800", //Ink

    // Five color gradients
    "WUBRG": "from-yellow-600 via-blue-800 via-gray-800 via-red-700 to-green-800", //WUBRG
    
    // Default gradient
    "default": "from-gray-700 to-gray-900" //Colorless
  };

  if (gradients[colorKey]) return gradients[colorKey];

  // Generate all permutations of the input letters
  const letters = colorKey.split("");
  const permutations = permute(letters);

  for (const perm of permutations) {
    const key = perm.join("");
    if (gradients[key]) {
      return gradients[key];
    }
  }

  // Return default gradient if no match is found
  return gradients["default"];

};

/**
 * Generate all permutations of an array of characters.
 * @param arr An array of characters.
 * @returns An array of all possible permutations (each permutation is an array of characters).
 */
function permute(arr: string[]): string[][] {
  if (arr.length === 1) return [arr];

  const result: string[][] = [];

  for (let i = 0; i < arr.length; i++) {
    const currentChar = arr[i];
    // Get the remaining array without the current character
    const remaining = [...arr.slice(0, i), ...arr.slice(i + 1)];
    // Recursively get permutations of the remaining characters
    const remainingPermutations = permute(remaining);
    // Add the current character to the beginning of each permutation of the remaining characters
    for (const perm of remainingPermutations) {
      result.push([currentChar, ...perm]);
    }
  }

  return result;
}

export const DeckCard = ({ deck, colorMap, onGameAdded }: DeckCardProps) => {
  // Ensure we always have a valid colors array
  const safeColors = Array.isArray(deck.colors) && deck.colors.length > 0 
    ? deck.colors 
    : ["C"]; // Default to colorless if no colors provided
  
  const gradientClass = getGradientForColors(safeColors);
  
  return (
    <div className="relative group h-fit">
      <div className={`absolute -inset-0.5 rounded-lg bg-gradient-to-br ${gradientClass} opacity-75 group-hover:opacity-100 transition duration-200`} />
      <Card className="relative bg-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-bold">{deck.name}</CardTitle>
          <ColorIdentity colors={safeColors} colorMap={colorMap} />
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
