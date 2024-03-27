"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { CardWrapper } from "./card-wrapper";
import { LoginSchema, RegisterSchema } from "@/schemas";

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
import { useState, useTransition } from "react";
import { register } from "@/actions/register";

export const RegisterForm = () => {
    const [isPending, setTransition] = useTransition();
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
  
    const form = useForm<z.infer<typeof RegisterSchema>>({
      resolver: zodResolver(RegisterSchema),
      defaultValues: {
        email: "",
        password: "",
        name:"",
      },
    });
  
    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
      setTransition(async () => {
        const res = await register(values);
        setError(res.error);
        setSuccess(res.success);
      });
    };
  
    return (
      <div>
        <CardWrapper
          headerLabel="Create an account"
          backButtonLabel="Already have an account ?"
          backButtonHref="/auth/login"
          showSocial
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
              <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Jhon Denial"
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button disabled={isPending} type="submit" className="w-full">
                Register
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    );
}