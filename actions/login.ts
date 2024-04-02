"use server";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { sendVerificationEmail } from "@/lib/mail";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validateFields.data;

  const existedUser = await getUserByEmail(email);

  if (!existedUser || !existedUser.email || !existedUser.password) {
    return { error: "Email does not exist" };
  }

  if (!existedUser.emailVerified) {
    const verificationToken = await getVerificationTokenByEmail(
      existedUser.email
    );

    await sendVerificationEmail(
      verificationToken!.email,
      verificationToken!.token
    );
    return { success: "Conformation email sent" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
