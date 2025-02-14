
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
    winRate: number;
    totalGames: number;
  };
};

const colorMap: Record<string, string> = {
  U: "bg-blue-500",
  B: "bg-gray-800",
  R: "bg-red-500",
  G: "bg-green-500",
  W: "bg-yellow-100",
};

const DeckSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-32 w-full rounded-lg" />
  </div>
);

export const DeckList = () => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const { data: decks, isLoading } = useQuery({
    queryKey: ["decks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("deck")
        .select("id, name, properties");

      if (error) throw error;
      return data as Deck[];
    },
  });

  const filteredDecks = decks?.filter((deck) => 
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
              winRate: deck.properties.winRate || 0,
              totalGames: deck.properties.totalGames || 0,
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
