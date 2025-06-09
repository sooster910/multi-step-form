import z from "zod";

export const NickNameSchema = z.object({
  nickname: z
    .string()
    .min(2, { message: "닉네임은 2-10자 이내로 입력해주세요" })
    .max(10, { message: "닉네임은 2-10자 이내로 입력해주세요" }),
});

export const GenderSchema = z.object({
  gender: z.enum(["남성", "여성"]),
});

export const UserOnboardingSchema = z.object({
  nickname: NickNameSchema.shape.nickname,
  gender: GenderSchema.shape.gender,
});

export type UserOnBoardingDTO = z.infer<typeof UserOnboardingSchema>;
