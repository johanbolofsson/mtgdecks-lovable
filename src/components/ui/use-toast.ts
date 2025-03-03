
import { useToast as useNativeToast, ToastProps } from "@/hooks/use-native-toast";

export const useToast = () => {
  return useNativeToast();
};

export const toast = (props: Omit<ToastProps, "id">) => {
  // This is just a placeholder - the actual implementation will use the hook context
  // The component using this will properly use the hook
  return "";
};
