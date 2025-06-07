import { Funnel } from "@/shared/ui/funnel/providers";
import { Gender } from "@/onboarding/user/steps/Gender";
import { NickName } from "@/onboarding/user/steps/NickName";
import { type UserOnBoardingDTO } from "./schema";

export const UserOnboarding = () => {
  return (
    <Funnel<UserOnBoardingDTO>
      initialData={{ nickname: "", gender: undefined }}
    >
      <Funnel.Step path="nickname">
        <NickName />
      </Funnel.Step>
      <Funnel.Step path="gender">
        <Gender />
      </Funnel.Step>
    </Funnel>
  );
};
