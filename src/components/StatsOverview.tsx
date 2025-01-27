import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, List, ChartBar } from "lucide-react";

export const StatsOverview = () => {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Decks</CardTitle>
          <List className="h-4 w-4 text-mtg-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Games</CardTitle>
          <ChartBar className="h-4 w-4 text-mtg-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">60</div>
        </CardContent>
      </Card>
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Best Win Rate</CardTitle>
          <Trophy className="h-4 w-4 text-mtg-gold" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">65%</div>
        </CardContent>
      </Card>
    </div>
  );
};