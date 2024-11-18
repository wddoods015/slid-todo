"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { login } from "@/actions/auth/login";

const loginSchema = z.object({
  email: z.string().email("올바른 이메일 주소를 입력해주세요"),
  password: z.string().min(1, "비밀번호를 입력해주세요"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    const loginPromise = login(data)
      .then((response) => {
        router.push("/");
        router.refresh();
        return response;
      })
      .finally(() => {
        setIsLoading(false);
      });

    toast.promise(loginPromise, {
      loading: "로그인 중...",
      success: "로그인 성공!",
      error: (err: Error) => err.message,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="이메일을 입력해 주세요"
                    className="h-12"
                    disabled={isLoading}
                    autoComplete="email"
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
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    placeholder="비밀번호를 입력해 주세요"
                    className="h-12"
                    disabled={isLoading}
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-blue-500 hover:bg-blue-600"
          disabled={isLoading}
        >
          로그인하기
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          아직 회원이 아니신가요?
          <Link href="/signup" className="text-blue-500 hover:underline">
            회원가입
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
