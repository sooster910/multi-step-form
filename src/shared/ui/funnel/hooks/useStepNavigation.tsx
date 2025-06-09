import { useNavigate, useParams } from "react-router";
import type { Step as StepType } from "@/shared/ui/funnel/types";
import { useMemo } from "react";

/**
 * 현재 단계를 관리하고 이동하는 훅
 * @param steps - 퍼널 단계 목록
 * @returns 현재 단계와 이동 함수, 이동 가능 여부
 */
export const useStepNavigation = (steps: StepType[]) => {
  const { step: currentStepPath } = useParams();
  const navigate = useNavigate();
  const basePath = window.location.pathname.split("/step")[0]; //TODO: 하드코딩 보완
  const currentStep = steps.find((step) => step.path === currentStepPath);
  const currentStepIndex =
    steps.findIndex((step) => step.path === currentStepPath) ?? 0;

  const navigateToNextStep = () => {
    if (!canNavigateNext) return;
    const nextStep = steps[currentStepIndex + 1];
    navigate(`${basePath}/step/${nextStep.path}`);
  };

  const navigateToPreviousStep = () => {
    if (!canNavigatePrevious) return;
    const prevStep = steps[currentStepIndex - 1];
    navigate(`${basePath}/step/${prevStep.path}`);
  };

  const canNavigateNext = useMemo(() => {
    if (currentStepIndex >= steps.length - 1) return false;
    const nextStep = steps[currentStepIndex + 1];
    return Boolean(nextStep.path);
  }, [currentStepIndex]);

  const canNavigatePrevious = useMemo(() => {
    if (currentStepIndex <= 0) return false;
    const prevStep = steps[currentStepIndex - 1];
    return Boolean(prevStep.path);
  }, [currentStepIndex]);

  return {
    steps,
    currentStep,
    navigateToNextStep,
    navigateToPreviousStep,
    canNavigateNext,
    canNavigatePrevious,
  };
};
