import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { useNavigate } from "react-router-dom";

const MTG_COLORS = [
  { id: "W", label: "White" },
  { id: "U", label: "Blue" },
  { id: "B", label: "Black" },
  { id: "R", label: "Red" },
  { id: "G", label: "Green" },
  { id: "C", label: "Colorless" },
];

const MTG_FORMATS = [
  "Standard",
  "Modern",
  "Pioneer",
  "Legacy",
  "Vintage",
  "Commander",
  "Pauper",
  "Historic",
  "Alchemy",
];

export function CreateDeckForm() {
  const [name, setName] = useState("");
  const [commander, setCommander] = useState("");
  const [format, setFormat] = useState<string>("");
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleColorChange = (colorId: string, checked: boolean) => {
    if (colorId === "C" && checked) {
      setSelectedColors(["C"]);
    } else if (colorId === "C" && !checked) {
      setSelectedColors([]);
    } else if (selectedColors.includes("C")) {
      setSelectedColors([colorId]);
    } else {
      setSelectedColors(prev =>
        checked
          ? [...prev, colorId]
          : prev.filter(color => color !== colorId)
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { error } = await supabase
      .from("deck")
      .insert({
        name,
        properties: {
          commander,
          format,
          colors: selectedColors,
          winRate: 0,
          totalGames: 0,
        },
      });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error creating deck",
        description: error.message,
      });
    } else {
      toast({
        title: "Deck created successfully",
        description: `Created deck: ${name}`,
      });
      const closeButton = document.querySelector("[data-dialog-close]") as HTMLButtonElement;
      if (closeButton) closeButton.click();
      navigate(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Deck Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="commander">Commander (Optional)</Label>
        <Input
          id="commander"
          value={commander}
          onChange={(e) => setCommander(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="format">Format</Label>
        <Select value={format} onValueChange={setFormat} required>
          <SelectTrigger>
            <SelectValue placeholder="Select a format" />
          </SelectTrigger>
          <SelectContent>
            {MTG_FORMATS.map((format) => (
              <SelectItem key={format} value={format}>
                {format}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Color Identity</Label>
        <div className="grid grid-cols-2 gap-4">
          {MTG_COLORS.map((color) => (
            <div key={color.id} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color.id}`}
                checked={selectedColors.includes(color.id)}
                onCheckedChange={(checked) => 
                  handleColorChange(color.id, checked as boolean)
                }
              />
              <Label htmlFor={`color-${color.id}`}>{color.label}</Label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <DialogClose asChild>
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </DialogClose>
        <Button type="submit">Create Deck</Button>
      </div>
    </form>
  );
}
