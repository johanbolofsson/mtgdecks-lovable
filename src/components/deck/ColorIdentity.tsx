
import React from "react";

type ColorIdentityProps = {
  colors: string[];
  colorMap: Record<string, string>;
};

export const ColorIdentity = ({ colors, colorMap }: ColorIdentityProps) => {
  // Parse color identities into individual color symbols
  const parseColors = (colorStrings: string[]): string[] => {
    // If we receive an empty array or invalid input, return empty array
    if (!Array.isArray(colorStrings)) return [];
    
    // For each color string (e.g., "WUB"), split it into individual colors
    return colorStrings.flatMap(colorString => 
      typeof colorString === 'string' 
        ? colorString.split('')
        : []
    );
  };

  const parsedColors = parseColors(colors);
  
  return (
    <div className="flex items-center space-x-1">
      {parsedColors.map((color, index) => (
        <div
          key={`${color}-${index}`}
          className={`w-4 h-4 rounded-full ${colorMap[color] || 'bg-gray-400'} border border-white`}
        />
      ))}
    </div>
  );
};
