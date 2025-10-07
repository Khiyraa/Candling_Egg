'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const formSchema = z
  .object({
    email: z.email('Email tidak valid'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
  })
  .required();

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        ...data,
      });

      if (result?.ok) {
        router.push('/dashboard');
      } else {
        toast.error('Login gagal. Email atau password salah.');
      }
    } catch (error) {
      console.log(error);
      toast.error('Login gagal. Silakan coba lagi nanti.');
    }
  }

  return (
    <>
      <CardHeader className="space-y-4 py-10">
        <div className="mb-4 flex items-center justify-center gap-3 lg:hidden">
          <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white"></div>
          <div>
            <h1 className="text-xl font-bold">IS Candling</h1>
          </div>
        </div>

        <div className="space-y-4 text-center">
          <CardTitle className="text-2xl font-bold">
            Selamat Datang Kembali
          </CardTitle>
          <CardDescription className="text-base">
            Masuk ke akun Anda untuk mengakses dashboard
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="h-11"
                    type="email"
                    placeholder="Masukkan email Anda"
                    {...field}
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
                  <div className="relative">
                    <Input
                      className="h-11"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Masukkan password Anda"
                      {...field}
                    />

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute top-0 right-0 h-full cursor-pointer px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="text-muted-foreground h-4 w-4" />
                      ) : (
                        <Eye className="text-muted-foreground h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>

        {/* <div className="flex items-center justify-between space-y-6">
          <Button
            variant="link"
            className="cursor-pointer px-0 text-sm font-normal"
          >
            Lupa password?
          </Button>
        </div> */}
      </CardContent>
      <CardFooter className="my-6 flex flex-col">
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className="h-11 w-full cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
        >
          Login
        </Button>
      </CardFooter>
    </>
  );
}
