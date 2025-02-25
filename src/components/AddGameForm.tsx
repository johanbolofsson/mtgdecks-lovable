
import React from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

type AddGameFormProps = {
  deckId: string;
  onGameAdded: () => void;
};

export const AddGameForm = ({ deckId, onGameAdded }: AddGameFormProps) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [result, setResult] = React.useState<"win" | "loss">("win");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Error saving game",
        description: "You must be logged in to add a game.",
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      // First, create a new game (no player_id needed as per updated schema)
      const { data: gameData, error: gameError } = await supabase
        .from("game")
        .insert({})
        .select()
        .single();

      if (gameError) throw gameError;

      // Then create the game details with the player_id
      const { error: detailsError } = await supabase
        .from("game_details")
        .insert({
          game_id: gameData.id,
          deck_id: deckId,
          winner: result === "win",
          player_id: user.id
        });

      if (detailsError) throw detailsError;

      toast({
        title: "Game Added",
        description: `Recorded ${result} for this deck`,
      });

      onGameAdded();
    } catch (error) {
      console.error("Error saving game:", error);
      toast({
        variant: "destructive",
        title: "Error saving game",
        description: "There was an error saving your game. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RadioGroup
        value={result}
        onValueChange={(value) => setResult(value as "win" | "loss")}
        className="grid grid-cols-2 gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="win" id="win" />
          <Label htmlFor="win">Win</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="loss" id="loss" />
          <Label htmlFor="loss">Loss</Label>
        </div>
      </RadioGroup>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Add Game"}
      </Button>
    </form>
  );
};
