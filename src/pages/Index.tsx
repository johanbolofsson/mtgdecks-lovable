import { DeckList } from "@/components/DeckList";
import { TopMenuBar } from "@/components/TopMenuBar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-mtg-primary to-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <TopMenuBar />
        <h1 className="text-4xl font-bold text-white text-left">MTG Deck Tracker</h1>
        <DeckList />
      </div>
    </div>
  );
};

export default Index;