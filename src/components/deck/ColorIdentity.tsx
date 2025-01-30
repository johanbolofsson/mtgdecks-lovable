import React from "react";

type ColorIdentityProps = {
  colors: string[];
  colorMap: Record<string, string>;
};

export const ColorIdentity = ({ colors, colorMap }: ColorIdentityProps) => {
  return (
    <div className="flex items-center space-x-1">
      {colors.map((color) => (
        <div
          key={color}
          className={`w-4 h-4 rounded-full ${colorMap[color]} border border-white`}
        />
      ))}
    </div>
  );
};