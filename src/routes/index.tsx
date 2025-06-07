import { Navigate, createBrowserRouter } from "react-router";
import { ROUTES } from "./constant";
import { UserOnboarding } from "@/onboarding/user";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <div>RootErrorBoundary</div>,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.USER_ONBOARDING} replace />,
      },
      {
        path: ROUTES.USER_ONBOARDING,
        element: <Navigate to={`${ROUTES.USER_ONBOARDING}/step`} replace />,
      },
      {
        path: `${ROUTES.USER_ONBOARDING}/step/:step?`,
        element: <UserOnboarding />,
      },
      {
        path: ROUTES.COMPLETE_USER_ONBOARDING,
        element: <div>CompleteOnboardingPage</div>,
      },
    ],
  },
]);
