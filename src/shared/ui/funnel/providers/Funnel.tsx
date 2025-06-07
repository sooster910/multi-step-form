import React from "react";
import { createContext, useEffect, type ReactNode } from "react";
import type { Step as StepType } from "@/shared/ui/funnel/types";
import { Step as StepComponent } from "@/shared/ui/funnel/components/Step";
import { useStepNavigation } from "@/shared/ui/funnel/hooks/useStepNavigation";
import { useFunnelRouting } from "@/shared/ui/funnel/hooks/useFunnelRouting";

type FunnelContextType = {
  steps: StepType[];
  currentStep: StepType;
  navigateToNextStep: () => void;
  navigateToPreviousStep: () => void;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
};

type FunnelProps = {
  children: ReactNode;
};

export const FunnelContext = createContext<FunnelContextType | null>(null);

export const Funnel = ({ children }: FunnelProps) => {
  const steps = React.Children.toArray(children).map((child, idx) => {
    if (!React.isValidElement(child)) {
      throw new Error("Funnel children must be React elements");
    }

    if (child.type !== StepComponent) {
      throw new Error("Funnel children must be Step components");
    }

    return {
      id: idx.toString(),
      path: child.props.path, // TODO : 타입가드 개선
    };
  });

  const { isValidStep, redirectToFirstStep } = useFunnelRouting(steps);
  const stepNavigation = useStepNavigation(steps);
  useEffect(() => {
    if (!isValidStep()) {
      redirectToFirstStep();
    }
  }, [isValidStep, redirectToFirstStep, stepNavigation.currentStep]);

  if (!stepNavigation) {
    throw new Error("Step navigation is not initialized");
  }

  return (
    <FunnelContext.Provider value={stepNavigation}>
      {children}
    </FunnelContext.Provider>
  );
};

Funnel.Step = StepComponent;
