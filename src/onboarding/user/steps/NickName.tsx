import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NickNameSchema, type UserOnBoardingDTO } from "../schema";
import { useFunnel } from "@/shared/ui/funnel/hooks/useFunnel";

export const NickName = () => {
  const { updateFormData } = useFunnel();
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
    console.log("onSubmit", data);
    updateFormData({
      nickname: data.nickname,
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>닉네임</h2>
      <input {...register("nickname")} />
      <p>{errors.nickname?.message}</p>
      <button>이전</button>
      <button type="submit">다음</button>
    </form>
  );
};
