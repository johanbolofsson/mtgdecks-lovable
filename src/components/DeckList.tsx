
import React from "react";
import { Input } from "@/components/ui/input";
import { DeckCard } from "./DeckCard";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Deck = {
  id: string;
  name: string;
  properties: {
    colors: string[];
    commander?: string;
    format?: string;
  };
};

type DeckWithStats = Deck & {
  winRate: number;
  totalGames: number;
};

const colorMap: Record<string, string> = {
  W: "bg-yellow-100", // White
  U: "bg-blue-500",   // Blue
  B: "bg-gray-800",   // Black
  R: "bg-red-500",    // Red
  G: "bg-green-500",  // Green
  C: "bg-gray-400"    // Colorless
};

const DeckSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-32 w-full rounded-lg" />
  </div>
);

export const DeckList = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data: decksWithStats, isLoading } = useQuery({
    queryKey: ["decks-with-stats"],
    queryFn: async () => {
      // First, get all decks
      const { data: decks, error: decksError } = await supabase
        .from("deck")
        .select("id, name, properties");

      if (decksError) throw decksError;

      // Then, get game statistics for each deck
      const decksWithStats = await Promise.all((decks as Deck[]).map(async (deck) => {
        const { data: gameDetails, error: statsError } = await supabase
          .from("game_details")
          .select("winner")
          .eq("deck_id", deck.id);

        if (statsError) throw statsError;

        const totalGames = gameDetails?.length || 0;
        const wins = gameDetails?.filter(game => game.winner)?.length || 0;
        const winRate = totalGames > 0 ? Math.round((wins / totalGames) * 100) : 0;

        return {
          ...deck,
          winRate,
          totalGames
        };
      }));

      return decksWithStats;
    },
  });

  const filteredDecks = decksWithStats?.filter((deck) => 
    deck.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deck.properties.commander?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    deck.properties.format?.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? [];

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
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <DeckSkeleton key={i} />)
        ) : filteredDecks.map((deck) => (
          <DeckCard
            key={deck.id}
            deck={{
              id: deck.id,
              name: deck.name || "Unnamed Deck",
              colors: deck.properties.colors || [],
              winRate: deck.winRate,
              totalGames: deck.totalGames,
              commander: deck.properties.commander,
              format: deck.properties.format,
            }}
            colorMap={colorMap}
            onGameAdded={() => {
              // Will implement game addition later
            }}
          />
        ))}
      </div>
    </div>
  );
};
