"use server";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, name, password } = validateFields.data;

  const existUser = await getUserByEmail(email);

  if (existUser) {
    return { error: "Email already exist" };
  }

  const hasedPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      email,
      name,
      password: hasedPassword,
    },
  });

  return { success: "User created successfully" };
};
