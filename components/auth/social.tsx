import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import google from "next-auth/providers/google";

export const Social = () => {
  const onClickHandler = async (provider: "google" | "github") => {
    try {
      await signIn(provider, {
        callbackUrl: DEFAULT_LOGIN_REDIRECT,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex items-center gap-x-2">
      <Button variant="outline" className="w-full" size="lg" onClick={() => onClickHandler('google')}>
        <FaGoogle className="h-5 w-5" />
      </Button>
      <Button variant="outline" className="w-full" size="lg" onClick={() => onClickHandler('github')}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};
