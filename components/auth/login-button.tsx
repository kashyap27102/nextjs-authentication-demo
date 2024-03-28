"use client";

import { useRouter } from "next/navigation";

export const LogginButton = ({
  children,
  mode = "redirect",
  asChild,
}: {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}) => {
  const router = useRouter();

  if (mode === "modal") {
    return <span>TODO : Implement Modal</span>;
  }

  const onClickHandler = () => {
    console.log('click')
    router.push("/auth/login");
  };

  return <span onClick={onClickHandler}>{children}</span>;
};
