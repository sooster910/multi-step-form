import { Funnel } from "@/shared/ui/funnel/providers";
import { Gender } from "@/onboarding/user/steps/Gender";
import { NickName } from "@/onboarding/user/steps/NickName";
import { type UserOnBoardingDTO } from "./schema";
import type { FieldErrors } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";
import type { UseFormHandleSubmit } from "react-hook-form";

// TODO : 타입 적절한 파일로 분리
export type FunnelFormProps<T extends keyof UserOnBoardingDTO> = {
  onSubmit: (data: Pick<UserOnBoardingDTO, T>) => void;
  register: UseFormRegister<Pick<UserOnBoardingDTO, T>>;
  errors: FieldErrors<Pick<UserOnBoardingDTO, T>>;
  onPreviousStep: () => void;
  canNavigatePrevious: boolean;
  handleSubmit: UseFormHandleSubmit<Pick<UserOnBoardingDTO, T>>;
};

export const UserOnboarding = () => {
  return (
    <Funnel<UserOnBoardingDTO> initialData={{ nickname: "", gender: "남성" }}>
      <Funnel.Step path="nickname">
        <NickName />
      </Funnel.Step>
      <Funnel.Step path="gender">
        <Gender />
      </Funnel.Step>
    </Funnel>
  );
};
