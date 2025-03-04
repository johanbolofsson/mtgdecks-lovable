
import * as React from "react";

export interface ToastProps {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement;
  variant?: "default" | "destructive";
  duration?: number;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

type ToastActionElement = React.ReactElement;

interface ToastContextType {
  toasts: ToastProps[];
  toast: (props: Omit<ToastProps, "id">) => { id: string; dismiss: () => void };
  dismiss: (id?: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const dismiss = React.useCallback((id?: string) => {
    setToasts((prevToasts) => {
      if (id) {
        return prevToasts.map((toast) => 
          toast.id === id ? { ...toast, open: false } : toast
        );
      }
      return prevToasts.map((toast) => ({ ...toast, open: false }));
    });
    
    // Remove from DOM after animation
    setTimeout(() => {
      setToasts((prevToasts) => {
        if (id) {
          return prevToasts.filter((toast) => toast.id !== id);
        }
        return [];
      });
    }, 300);
  }, []);

  const toast = React.useCallback((props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { 
      ...props, 
      id,
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) dismiss(id);
        props.onOpenChange?.(open);
      }
    };
    
    setToasts((prevToasts) => [...prevToasts, newToast]);
    
    // Auto dismiss
    if (props.duration !== 0) {
      setTimeout(() => {
        dismiss(id);
      }, props.duration || 5000);
    }
    
    return {
      id,
      dismiss: () => dismiss(id)
    };
  }, [dismiss]);

  const contextValue = React.useMemo(() => ({ toasts, toast, dismiss }), [
    toasts, 
    toast, 
    dismiss
  ]);

  return React.createElement(
    ToastContext.Provider,
    { value: contextValue },
    children
  );
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
};

// This is just a placeholder for direct imports
// The actual implementation is used through the hook
export const toast = (props: Omit<ToastProps, "id">) => {
  console.warn("Toast function not initialized yet. Make sure ToastProvider is mounted.");
  return { id: "", dismiss: () => {} };
};

export type { ToastActionElement };
