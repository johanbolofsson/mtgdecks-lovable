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

export const DeckCard = ({ deck, colorMap, onGameAdded }: DeckCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
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
            <AddGameForm deckId={deck.id} onGameAdded={() => onGameAdded(deck.id)} />
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};