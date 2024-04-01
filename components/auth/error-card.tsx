import React from "react";
import { Header } from "./header";
import { BackButton } from "./back-button";
import { Card, CardFooter, CardHeader } from "../ui/card";
import { CardWrapper } from "./card-wrapper";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops Somthing Went Wrong!"
      backButtonLabel="Go back to Login page"
      backButtonHref="/auth/login"
    />
  );
};

export default ErrorCard;
