import { StatsOverview } from "@/components/StatsOverview";
import { DeckList } from "@/components/DeckList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mtg-primary to-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-white">MTG Deck Tracker</h1>
          <Button className="bg-mtg-accent hover:bg-mtg-accent/90">
            <Plus className="mr-2 h-4 w-4" /> Add New Deck
          </Button>
        </div>
        
        <StatsOverview />
        
        <DeckList />
      </div>
    </div>
  );
};

export default Index;