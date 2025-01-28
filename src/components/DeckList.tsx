import React from "react";
import { Input } from "@/components/ui/input";
import { DeckCard } from "./DeckCard";

type Deck = {
  id: number;
  name: string;
  colors: string[];
  winRate: number;
  totalGames: number;
  commander?: string;
  format?: string;
};

const mockDecks: Deck[] = [
  { 
    id: 1, 
    name: "Blue Control", 
    colors: ["U"], 
    winRate: 65, 
    totalGames: 20,
    commander: "Urza, Lord High Artificer",
    format: "Commander"
  },
  { 
    id: 2, 
    name: "Rakdos Aggro", 
    colors: ["R", "B"], 
    winRate: 55, 
    totalGames: 15,
    format: "Modern"
  },
  { 
    id: 3, 
    name: "Selesnya Tokens", 
    colors: ["G", "W"], 
    winRate: 48, 
    totalGames: 25,
    commander: "Rhys the Redeemed",
    format: "Commander"
  },
];

const colorMap: Record<string, string> = {
  U: "bg-blue-500",
  B: "bg-gray-800",
  R: "bg-red-500",
  G: "bg-green-500",
  W: "bg-yellow-100",
};

export const DeckList = () => {
  const [decks, setDecks] = React.useState(mockDecks);
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleGameAdded = (deckId: number) => {
    setDecks(decks.map(deck => {
      if (deck.id === deckId) {
        return {
          ...deck,
          totalGames: deck.totalGames + 1,
        };
      }
      return deck;
    }));
  };

  const filteredDecks = decks.filter(deck => 
    deck.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deck.commander?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deck.format?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold text-white">Your Decks</h2>
        <Input
          type="search"
          placeholder="Search decks by name, commander, or format..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-96"
        />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredDecks.map((deck) => (
          <DeckCard
            key={deck.id}
            deck={deck}
            colorMap={colorMap}
            onGameAdded={handleGameAdded}
          />
        ))}
      </div>
    </div>
  );
};