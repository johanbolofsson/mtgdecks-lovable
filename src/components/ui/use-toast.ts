
import { 
  useToast as useHookToast,
  toast as hookToast,
  ToastProvider as HookToastProvider,
  ToastProps 
} from "@/hooks/use-toast";

// Re-export everything from the hook
export const useToast = useHookToast;
export const toast = hookToast;
export const ToastProvider = HookToastProvider;
export type { ToastProps };
