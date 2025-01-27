import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Trophy } from "lucide-react";

type Deck = {
  id: number;
  name: string;
  colors: string[];
  winRate: number;
  totalGames: number;
};

const mockDecks: Deck[] = [
  { id: 1, name: "Blue Control", colors: ["U"], winRate: 65, totalGames: 20 },
  { id: 2, name: "Rakdos Aggro", colors: ["R", "B"], winRate: 55, totalGames: 15 },
  { id: 3, name: "Selesnya Tokens", colors: ["G", "W"], winRate: 48, totalGames: 25 },
];

const colorMap: Record<string, string> = {
  U: "bg-blue-500",
  B: "bg-gray-800",
  R: "bg-red-500",
  G: "bg-green-500",
  W: "bg-yellow-100",
};

export const DeckList = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {mockDecks.map((deck) => (
        <Card key={deck.id} className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold">{deck.name}</CardTitle>
            <Database className="h-5 w-5 text-mtg-accent" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              {deck.colors.map((color) => (
                <div
                  key={color}
                  className={`w-6 h-6 rounded-full ${colorMap[color]} border-2 border-white`}
                />
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-mtg-gold" />
                <span className="text-sm font-medium">{deck.winRate}% Win Rate</span>
              </div>
              <Badge variant="secondary">{deck.totalGames} Games</Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};