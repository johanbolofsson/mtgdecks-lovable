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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

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

type AddGameFormProps = {
  deckId: number;
  onGameAdded: () => void;
};

const AddGameForm = ({ deckId, onGameAdded }: AddGameFormProps) => {
  const { toast } = useToast();
  const [opponent, setOpponent] = React.useState("");
  const [result, setResult] = React.useState<"win" | "loss">("win");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would make an API call to save the game
    console.log("New game added:", {
      deckId,
      opponent,
      result,
      timestamp: new Date(),
    });

    toast({
      title: "Game Added",
      description: `Recorded a ${result} against ${opponent}`,
    });

    // Reset form
    setOpponent("");
    setResult("win");
    onGameAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="opponent">Opponent Name</Label>
        <Input
          id="opponent"
          value={opponent}
          onChange={(e) => setOpponent(e.target.value)}
          placeholder="Enter opponent's name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Result</Label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="result"
              value="win"
              checked={result === "win"}
              onChange={(e) => setResult(e.target.value as "win" | "loss")}
              className="h-4 w-4"
            />
            <span>Win</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="result"
              value="loss"
              checked={result === "loss"}
              onChange={(e) => setResult(e.target.value as "win" | "loss")}
              className="h-4 w-4"
            />
            <span>Loss</span>
          </label>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add Game
      </Button>
    </form>
  );
};

export const DeckList = () => {
  const [decks, setDecks] = React.useState(mockDecks);

  const handleGameAdded = (deckId: number) => {
    // In a real app, this would fetch updated deck data from the API
    // For now, we'll just simulate updating the win rate
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

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {decks.map((deck) => (
        <Card key={deck.id} className="hover:shadow-lg transition-shadow">
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
                <Crown className="h-4 w-4 text-mtg-gold" />
                <span className="text-sm text-muted-foreground">{deck.commander}</span>
              </div>
            )}
            
            {deck.format && (
              <div className="flex items-center space-x-2 mb-3">
                <BookOpen className="h-4 w-4 text-mtg-accent" />
                <span className="text-sm text-muted-foreground">{deck.format}</span>
              </div>
            )}

            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4 text-mtg-gold" />
                <span className="text-sm font-medium">{deck.winRate}% Win Rate</span>
              </div>
              <Badge variant="secondary">{deck.totalGames} Games</Badge>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Game
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Game for {deck.name}</DialogTitle>
                </DialogHeader>
                <AddGameForm deckId={deck.id} onGameAdded={() => handleGameAdded(deck.id)} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
