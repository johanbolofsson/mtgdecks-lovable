
import * as React from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-native-toast";
import { X } from "lucide-react";

export function NativeToast() {
  const { toasts, dismiss } = useToast();

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-4 max-w-xs w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "p-4 rounded-md shadow-lg transition-all transform animate-in slide-in-from-right-full border",
            toast.variant === "destructive"
              ? "bg-destructive text-destructive-foreground border-destructive"
              : "bg-background text-foreground border-border"
          )}
        >
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              {toast.title && <h4 className="font-medium text-sm">{toast.title}</h4>}
              {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
            </div>
            <button
              onClick={() => dismiss(toast.id)}
              className="h-6 w-6 rounded-md flex items-center justify-center text-foreground/50 hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
