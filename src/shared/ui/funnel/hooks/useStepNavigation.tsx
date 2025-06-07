import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import type { Step as StepType } from "@/shared/ui/funnel/types";

/**
 * 현재 단계를 관리하고 이동하는 훅
 * @param steps - 퍼널 단계 목록
 * @returns 현재 단계와 이동 함수, 이동 가능 여부
 */
export const useStepNavigation = (steps: StepType[]) => {
  const { step } = useParams();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState<StepType>(() => {
    // TODO: REFACTOR
    if (!step) {
      return steps[0];
    }
    // 2. URL에 step이 있으면 해당 step 사용
    const stepFromUrl = steps.find((s) => s.id === step);
    return stepFromUrl || steps[0];
  });

  useEffect(() => {
    if (step) {
      setCurrentStep(steps.find((s) => s.path === step) || steps[0]);
    }
  }, [step]);
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep.id);

  const navigateToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      setCurrentStep(nextStep);
      //TODO: 하드코딩 보완
      navigate(`/user-onboarding/step/${nextStep.id}`);
    }
  };

  const navigateToPreviousStep = () => {
    if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1];
      setCurrentStep(prevStep);
      //TODO: 하드코딩 보완
      navigate(`/user-onboarding/step/${prevStep.id}`);
    }
  };

  const canNavigateNext = currentStepIndex < steps.length - 1;
  const canNavigatePrevious = currentStepIndex > 0;

  return {
    steps,
    currentStep,
    navigateToNextStep,
    navigateToPreviousStep,
    canNavigateNext,
    canNavigatePrevious,
  };
};
