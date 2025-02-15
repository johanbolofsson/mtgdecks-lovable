
import React from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

type AddGameFormProps = {
  deckId: string;
  onGameAdded: () => void;
};

export const AddGameForm = ({ deckId, onGameAdded }: AddGameFormProps) => {
  const { toast } = useToast();
  const [result, setResult] = React.useState<"win" | "loss">("win");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("New game added:", {
      deckId,
      result,
      timestamp: new Date(),
    });

    toast({
      title: "Game Added",
      description: `Recorded ${result} for this deck`,
    });

    onGameAdded();
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

      <Button type="submit" className="w-full">
        Add Game
      </Button>
    </form>
  );
};
