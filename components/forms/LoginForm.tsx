'use client';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from '@hookform/resolvers/zod';
import { LogInIcon } from "lucide-react";
import { signIn, useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { LogoWithText } from "../Logo";
import { Spinner } from "../Spinner";
import { Input } from "../ui/input";
import Image from "next/image";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters"
  }),
})

const defaultValues = {
  email: '',
  password: '',
}

export function LoginForm() {
  const session = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.status === 'authenticated') {
      redirect("/")
    }
  }, [session?.status, router])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true)
    signIn('credentials', { ...data, redirect: false })
      .then(() => router.push("/"))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }

  const socialAction = (action: 'google' | 'github') => signIn(action, { redirect: false })

  const buttonIcon = loading ? <Spinner className="h-4 w-4" />
    : <LogInIcon className="h-4 w-4" />

  return (
    <div className="my-16 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div className="pb-6 sm:mx-auto sm:w-full sm:max-w-md">
          <LogoWithText text="NYIG" school="Learn" />
        </div>
        <div className='pb-6'>
          <p className='text-2xl'>
            Sign In
          </p>
          <p className='text-base text-gray-500'>to continue to NYIG Learn</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={loading}
              className="w-full"
              type="submit"
            >
              Login
              {buttonIcon}
            </Button>
          </form>
        </Form>

        {/* For OAuth sign in */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-600">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Button className="w-full" variant="outline" size="icon" onClick={() => socialAction('google')}>
              <Image alt="Google" src="/icons/google.svg" height={20} width={20} />
              Google
            </Button>
            <Button className="w-full" variant="outline" size="icon" onClick={() => socialAction('github')}>
              <Image alt="Google" src="/icons/github.svg" height={20} width={20} />
              GitHub
            </Button>
          </div>
        </div>
        <div className="flex justify-center text-sm mt-6 align-middle text-gray-600">
          <div className="flex items-center">
            New to NYIG classrooms?
          </div>
          <Button variant="link" onClick={() => router.push("/signup")}>
            Create an account
          </Button>
        </div>
      </div>
    </div>
  )
}
