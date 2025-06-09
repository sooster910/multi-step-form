import { Navigate, useNavigate } from "react-router";
import { useParams } from "react-router";
import type { Step } from "@/shared/ui/funnel/types";

// TODO: 함수커링으로 리팩토링
const resolveBasePath = (pathname: string) => {
  return pathname.split("/step")[0];
};

/**
 * 사용자가 직접 URL조작시 핸들링하는 라우팅 로직을 훅으로 분리
 * @param steps - 파이프라인 단계 목록
 * @returns 현재 단계가 유효한지 여부와 첫 단계로 리다이렉트하는 함수
 */
export function useFunnelRouting(steps: Step[]) {
  const { step: currentStep } = useParams();

  const isValidStep = () => steps.some((step) => step.path === currentStep);
  const redirectToFirstStep = () => {
    const basePath = resolveBasePath(window.location.pathname);
    const redirectPath = `${basePath}/step/${steps[0].path}`;
    return <Navigate to={redirectPath} replace={true} />;
  };

  return { isValidStep, redirectToFirstStep };
}
