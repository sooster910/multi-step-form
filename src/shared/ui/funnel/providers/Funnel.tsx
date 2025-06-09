import React, { useState } from "react";
import { createContext, type ReactNode } from "react";
import type { Step as StepType } from "@/shared/ui/funnel/types";
import { Step as StepComponent } from "@/shared/ui/funnel/components/Step";
import { useStepNavigation } from "@/shared/ui/funnel/hooks/useStepNavigation";
import { useFunnelRouting } from "@/shared/ui/funnel/hooks/useFunnelRouting";

type FunnelContextType<T> = {
  steps: StepType[];
  currentStep: StepType;
  navigateToNextStep: () => void;
  navigateToPreviousStep: () => void;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
  formData: Partial<T>;
  updateFormData: (data: Partial<T>) => void;
};

type FunnelProps<T> = {
  children: ReactNode;
  initialData?: Partial<T>;
};

export const FunnelContext = createContext<FunnelContextType<any> | null>(null);

export const Funnel = <T extends Record<string, any>>({
  children,
  initialData = {},
}: FunnelProps<T>) => {
  const [formData, setFormData] = useState<Partial<T>>(initialData);

  console.log("formData", formData);
  const updateFormData = (data: Partial<T>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };
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

  if (!isValidStep()) {
    return redirectToFirstStep();
  }
  if (!stepNavigation) {
    throw new Error("Step navigation is not initialized");
  }

  return (
    <FunnelContext.Provider
      value={{ ...stepNavigation, formData, updateFormData }}
    >
      {children}
    </FunnelContext.Provider>
  );
};

Funnel.Step = StepComponent;
