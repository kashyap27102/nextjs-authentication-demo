"use client";

import React, { useCallback, useEffect, useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";

const NewVerificationForm = () => {
  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    setTransition(async () => {
      if (!token) return;
      try {
        const data = await newVerification(token);
        setSuccess(data.success);
        setError(data.error);
      } catch (error) {
        console.log(error);
        setError("Something went Wrong!");
      }
    });
  }, [token]);

  useEffect(() => {
    console.log('asdasd')
    onSubmit();
  }, [token]);

  return (
    <CardWrapper
      headerLabel="Confirm your verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex items-center w-full justify-center">
        <BeatLoader loading={isPending} />
        {!isPending && (
          <>
            <FormSuccess message={success} />
            <FormError message={error} />
          </>
        )}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
