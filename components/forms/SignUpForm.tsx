'use client';

import * as z from "zod"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { redirect, useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react'
import { Spinner } from "../Spinner";
import { SquarePenIcon } from "lucide-react";
import { LogoWithText } from "../Logo";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from "../ui/input";
import { logStack } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Name must be at least 3 characters"
  }),
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters"
  }),
})

const defaultValues = {
  name: '',
  email: '',
  password: '',
}

export function SignUpForm() {
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setLoading(true)
    try {
      await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })
      router.push("/")
    } catch (error) {
      logStack(error)
    } finally {
      setLoading(false)
    }
  }

  const buttonIcon = loading ? <Spinner className="h-4 w-4" />
    : <SquarePenIcon className="h-4 w-4" />

  return (
    <div className="my-16 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div className="pb-6 sm:mx-auto sm:w-full sm:max-w-md">
          <LogoWithText text="NYIG" school="Learn" />
        </div>
        <div className='pb-6'>
          <p className='text-2xl'>
            Sign Up
          </p>
          <p className='text-base text-gray-500'>to create an account and learn</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
              Register
              {buttonIcon}
            </Button>
          </form>
        </Form>

        <div className="flex gap-2 justify-center text-sm mt-6 px-2 align-middle text-gray-600">
          <div className="flex items-center">
            Already have an account?
          </div>
          <Button variant="link" onClick={() => router.push("/login")}>
            Sign in
          </Button>
        </div>
      </div>
    </div>
  )
}
