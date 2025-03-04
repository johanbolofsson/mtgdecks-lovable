
import React from "react";
import { Circle } from "lucide-react";

type ColorIdentityProps = {
  colors: string[];
  colorMap: Record<string, string>;
};

export const ColorIdentity = ({ colors, colorMap }: ColorIdentityProps) => {
  // Parse color identities into individual color symbols
  const parseColors = (colorStrings: string[]): string[] => {
    // If we receive an empty array or invalid input, return default colorless
    if (!Array.isArray(colorStrings) || colorStrings.length === 0) {
      return ["C"]; // Colorless as default
    }
    
    // For each color string (e.g., "WUB"), split it into individual colors
    const parsedColors = colorStrings.flatMap(colorString => 
      typeof colorString === 'string' && colorString.length > 0
        ? colorString.split('')
        : []
    );
    
    // If we still have no colors after parsing, return colorless
    return parsedColors.length > 0 ? parsedColors : ["C"];
  };

  const parsedColors = parseColors(colors);
  
  return (
    <div className="flex items-center space-x-1">
      {parsedColors.map((color, index) => (
        <div
          key={`${color}-${index}`}
          className={`w-4 h-4 rounded-full ${colorMap[color] || 'bg-gray-400'} border border-white flex items-center justify-center`}
          title={getColorName(color)}
        >
          {color === "C" && (
            <Circle className="w-2 h-2 text-white" />
          )}
        </div>
      ))}
    </div>
  );
};

// Helper function to get full color names for title attributes
function getColorName(color: string): string {
  switch (color) {
    case "W": return "White";
    case "U": return "Blue";
    case "B": return "Black";
    case "R": return "Red";
    case "G": return "Green";
    case "C": return "Colorless";
    default: return "Unknown";
  }
}
