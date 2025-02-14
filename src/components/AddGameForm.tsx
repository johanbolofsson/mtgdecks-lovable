import React from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Opponent = {
  name: string;
  result: "win" | "loss";
};

type AddGameFormProps = {
  deckId: string;
  onGameAdded: () => void;
};

export const AddGameForm = ({ deckId, onGameAdded }: AddGameFormProps) => {
  const { toast } = useToast();
  const [opponents, setOpponents] = React.useState<Opponent[]>([{ name: "", result: "win" }]);

  const handleAddOpponent = () => {
    if (opponents.length < 5) {
      setOpponents([...opponents, { name: "", result: "win" }]);
    }
  };

  const handleRemoveOpponent = (index: number) => {
    if (opponents.length > 1) {
      setOpponents(opponents.filter((_, i) => i !== index));
    }
  };

  const handleOpponentChange = (index: number, field: keyof Opponent, value: string) => {
    const newOpponents = [...opponents];
    newOpponents[index] = {
      ...newOpponents[index],
      [field]: value,
    };
    setOpponents(newOpponents);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log("New game added:", {
      deckId,
      opponents,
      timestamp: new Date(),
    });

    toast({
      title: "Game Added",
      description: `Recorded game with ${opponents.length} opponent${opponents.length > 1 ? 's' : ''}`,
    });

    setOpponents([{ name: "", result: "win" }]);
    onGameAdded();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4">
        {opponents.map((opponent, index) => (
          <div key={index} className="space-y-2 p-4 bg-secondary rounded-lg relative">
            <div className="flex justify-between items-center">
              <Label>Opponent {index + 1}</Label>
              {opponents.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveOpponent(index)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <Input
              value={opponent.name}
              onChange={(e) => handleOpponentChange(index, "name", e.target.value)}
              placeholder="Enter opponent's name"
              required
            />
            
            <div className="flex space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`result-${index}`}
                  value="win"
                  checked={opponent.result === "win"}
                  onChange={(e) => handleOpponentChange(index, "result", e.target.value as "win" | "loss")}
                  className="h-4 w-4"
                />
                <span>Win</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`result-${index}`}
                  value="loss"
                  checked={opponent.result === "loss"}
                  onChange={(e) => handleOpponentChange(index, "result", e.target.value as "win" | "loss")}
                  className="h-4 w-4"
                />
                <span>Loss</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {opponents.length < 5 && (
        <Button
          type="button"
          variant="outline"
          onClick={handleAddOpponent}
          className="w-full"
        >
          Add Opponent ({opponents.length}/5)
        </Button>
      )}

      <Button type="submit" className="w-full">
        Add Game
      </Button>
    </form>
  );
};