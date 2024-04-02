"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { LoginSchema } from "@/schemas";

import {
  Form,
  FormControl,
  FormLabel,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { login } from "@/actions/login";
import { Suspense, useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";
  const [isPending, setTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setTransition(async () => {
      const res = await login(values);
      setError(res?.error);
      // TODO when 2FA
      setSuccess(res?.success);
    });
  };

  return (
    <Suspense>
      <CardWrapper
        headerLabel="Welcome back"
        backButtonLabel="Don't have an account ?"
        backButtonHref="/auth/register"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="jhon.d@gmail.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="password"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormError message={error || urlError} />
            <FormSuccess message={success} />
            <Button disabled={isPending} type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </Suspense>
  );
};
