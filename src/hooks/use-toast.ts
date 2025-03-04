
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

interface ToastContextType {
  toasts: ToastProps[];
  toast: (props: Omit<ToastProps, "id">) => { id: string; dismiss: () => void };
  dismiss: (id?: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = React.useState<ToastProps[]>([]);

  const toast = React.useCallback((props: Omit<ToastProps, "id">) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { 
      ...props, 
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss(id);
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
  }, []);

  const dismiss = React.useCallback((id?: string) => {
    setToasts((prevToasts) => {
      if (id) {
        return prevToasts.map(toast => 
          toast.id === id ? { ...toast, open: false } : toast
        );
      }
      return prevToasts.map(toast => ({ ...toast, open: false }));
    });
    
    // Remove from DOM after animation
    setTimeout(() => {
      setToasts((prevToasts) => {
        if (id) {
          return prevToasts.filter(toast => toast.id !== id);
        }
        return [];
      });
    }, 300);
  }, []);

  // Safe server-side rendering
  const useIsomorphicLayoutEffect = 
    typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

  useIsomorphicLayoutEffect(() => {
    return () => {
      // Clean up timeouts if component unmounts
      toasts.forEach(toast => {
        if (toast.duration !== 0) {
          dismiss(toast.id);
        }
      });
    };
  }, [toasts]);

  return {
    toasts,
    toast,
    dismiss
  };
};

export const useToast = () => {
  const context = React.useContext(ToastContext);
  
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  
  return context;
};

// For standalone usage
export const toast = (props: Omit<ToastProps, "id">) => {
  if (typeof window !== 'undefined') {
    // This is just for type safety, we'll replace it with the actual implementation in components/ui/use-toast.ts
    console.warn('Toast function not initialized yet. Make sure ToastProvider is mounted.');
    return { id: '', dismiss: () => {} };
  }
  // Return dummy for SSR
  return { id: '', dismiss: () => {} };
};
