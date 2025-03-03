
import { useToast, ToastProps } from "@/hooks/use-native-toast";

const toast = (props: Omit<ToastProps, "id">) => {
  const { toast: showToast } = useToast();
  return showToast(props);
};

export { useToast, toast };
