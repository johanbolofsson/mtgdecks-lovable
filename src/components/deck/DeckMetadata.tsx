import React from "react";
import { Crown, BookOpen } from "lucide-react";

type DeckMetadataProps = {
  commander?: string;
  format?: string;
};

export const DeckMetadata = ({ commander, format }: DeckMetadataProps) => {
  return (
    <>
      {commander && (
        <div className="flex items-center space-x-2 mb-3">
          <Crown className="h-4 w-4 text-yellow-300" />
          <span className="text-sm">{commander}</span>
        </div>
      )}
      
      {format && (
        <div className="flex items-center space-x-2 mb-3">
          <BookOpen className="h-4 w-4 text-blue-200" />
          <span className="text-sm">{format}</span>
        </div>
      )}
    </>
  );
};