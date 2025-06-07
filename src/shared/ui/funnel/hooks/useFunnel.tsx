import { useContext } from "react";
import { FunnelContext } from "@/shared/ui/funnel/providers/Funnel";

export const useFunnel = () => {
  const context = useContext(FunnelContext);
  if (!context) {
    throw new Error("useFunnel 은 FunnelProvider 안에서 사용되어야 합니다.");
  }
  return context;
};
