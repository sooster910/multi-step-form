import { type ReactNode } from "react";
import { useFunnel } from "../hooks/useFunnel";

type StepProps = {
  path: string;
  children: ReactNode;
};

/**
 * 현재 단계에 해당하는 컴포넌트를 렌더링 여부를 결정하는 컴포넌트
 * @param  - 단계 경로와 하위 컴포넌트
 * @returns 현재 단계에 해당하는 컴포넌트를 렌더링 여부를 결정하는 컴포넌트
 */
export const Step = ({ children, path }: StepProps) => {
  const { currentStep } = useFunnel();

  if (currentStep.path !== path) {
    return null;
  }
  return <div id={`step-${path}`}>{children}</div>;
};
