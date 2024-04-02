import { db } from "@/lib/db";

export const getPasswordTokenByEmail = (email: string) => {
  try {
    const passwordToken = db.passwordToken.findFirst({
      where: { email },
    });
    return passwordToken;
  } catch (error) {
    return null;
  }
};

export const getPasswordTokenByToken = (token: string) => {
    try {
      const passwordToken = db.passwordToken.findFirst({
        where: { token },
      });
      return passwordToken;
    } catch (error) {
      return null;
    }
  };
  