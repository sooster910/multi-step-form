import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NickNameSchema, type UserOnBoardingDTO } from "../schema";
import { useFunnel } from "@/shared/ui/funnel/hooks/useFunnel";
import type { FunnelFormProps } from "..";

export const NickName = () => {
  const {
    updateFormData,
    navigateToNextStep,
    navigateToPreviousStep,
    canNavigatePrevious,
  } = useFunnel();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Pick<UserOnBoardingDTO, "nickname">>({
    resolver: zodResolver(NickNameSchema),
    mode: "all",
    defaultValues: {
      nickname: "",
    },
  });
  const onSubmit = (data: Pick<UserOnBoardingDTO, "nickname">) => {
    updateFormData({
      nickname: data.nickname,
    });
    navigateToNextStep();
  };

  return (
    <NickNameForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      onPreviousStep={navigateToPreviousStep}
      canNavigatePrevious={canNavigatePrevious}
    />
  );
};

const NickNameForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  onPreviousStep,
  canNavigatePrevious,
}: FunnelFormProps<"nickname">) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>닉네임</h2>
      <input {...register("nickname")} />
      <p>{errors.nickname?.message}</p>
      <button onClick={onPreviousStep} disabled={!canNavigatePrevious}>
        이전
      </button>
      <button type="submit">다음</button>
    </form>
  );
};
