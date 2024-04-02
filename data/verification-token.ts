import { db } from "@/lib/db";

export const getVerificationTokenByEmail = (email: string) => {
  try {
    const verificationToken = db.verificationToken.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByToken = (token: string) => {
    try {
      const verificationToken = db.verificationToken.findFirst({
        where: { token },
      });
      return verificationToken;
    } catch (error) {
      return null;
    }
  };
  