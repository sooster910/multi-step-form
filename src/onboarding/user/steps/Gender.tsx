import { useFunnel } from "@/shared/ui/funnel/hooks/useFunnel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GenderSchema, type UserOnBoardingDTO } from "../schema";
import type { FunnelFormProps } from "..";

export const Gender = () => {
  const {
    updateFormData,
    navigateToNextStep,
    canNavigateNext,
    navigateToPreviousStep,
    canNavigatePrevious,
  } = useFunnel();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Pick<UserOnBoardingDTO, "gender">>({
    resolver: zodResolver(GenderSchema),
    mode: "all",
    defaultValues: {
      gender: "남성",
    },
  });
  const onSubmit = (data: Pick<UserOnBoardingDTO, "gender">) => {
    updateFormData({
      gender: data.gender,
    });
    if (canNavigateNext) {
      navigateToNextStep();
    }
  };

  return (
    <GenderForm
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      register={register}
      errors={errors}
      onPreviousStep={navigateToPreviousStep}
      canNavigatePrevious={canNavigatePrevious}
    />
  );
};

const GenderForm = ({
  onSubmit,
  register,
  errors,
  handleSubmit,
  onPreviousStep,
  canNavigatePrevious,
}: FunnelFormProps<"gender">) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>성별 *</h1>
      <label>
        <input type="radio" {...register("gender")} value="남성" />
        남성
      </label>
      <label>
        <input type="radio" {...register("gender")} value="여성" />
        여성
      </label>
      <p>{errors.gender?.message}</p>
      <button
        type="button"
        onClick={onPreviousStep}
        disabled={!canNavigatePrevious}
      >
        이전
      </button>
      <button type="submit">다음</button>
    </form>
  );
};
