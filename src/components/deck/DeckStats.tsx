import React from "react";
import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type DeckStatsProps = {
  winRate: number;
  totalGames: number;
};

export const DeckStats = ({ winRate, totalGames }: DeckStatsProps) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center space-x-2">
        <Trophy className="h-4 w-4 text-yellow-300" />
        <span className="text-sm font-medium">{winRate}% Win Rate</span>
      </div>
      <Badge variant="secondary" className="bg-white/20">
        {totalGames} Games
      </Badge>
    </div>
  );
};