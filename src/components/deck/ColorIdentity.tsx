
import React from "react";

type ColorIdentityProps = {
  colors: string[];
  colorMap: Record<string, string>;
};

export const ColorIdentity = ({ colors, colorMap }: ColorIdentityProps) => {
  // Ensure colors is always an array, even if empty
  const safeColors = Array.isArray(colors) ? colors : [];
  
  return (
    <div className="flex items-center space-x-1">
      {safeColors.map((color) => (
        <div
          key={color}
          className={`w-4 h-4 rounded-full ${colorMap[color] || 'bg-gray-400'} border border-white`}
        />
      ))}
    </div>
  );
};
