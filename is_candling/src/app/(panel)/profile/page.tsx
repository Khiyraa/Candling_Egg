'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { authService } from '@/services/auth';
import { useAuthStore } from '@/store/auth';
import { passwordSchema, profileSchema } from '@/types/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Key, Mail, Save, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';

export default function ProfilePage() {
  const { user, getUser, clearUser } = useAuthStore();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const passwordForm = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onProfileSubmit(data: z.infer<typeof profileSchema>) {
    try {
      await authService.updateUser(data);
      toast.success('Profil berhasil diperbarui');

      clearUser();
      getUser();
    } catch {
      toast.error('Gagal memperbarui profil');
    }
  }

  async function onPasswordSubmit(data: z.infer<typeof passwordSchema>) {
    try {
      await authService.updatePassword(data.currentPassword, data.password);
      toast.success('Password berhasil diperbarui');

      // Reset form setelah sukses
      passwordForm.reset({
        currentPassword: '',
        password: '',
        confirmPassword: '',
      });
    } catch {
      toast.error('Gagal memperbarui password');
    }
  }

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profil</h1>
          <p className="text-muted-foreground">
            Kelola informasi profil dan pengaturan akun Anda
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="border-0 shadow-lg">
            <CardHeader className="pb-4 text-center">
              <div className="relative mx-auto">
                <Avatar className="mx-auto h-24 w-24">
                  <AvatarImage
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                    {user?.name
                      .split(' ')
                      .splice(0, 2)
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="mt-4 space-y-2">
                <h3 className="text-xl font-semibold">{user?.name}</h3>
                <p className="text-muted-foreground">Candling Administrator</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="text-muted-foreground h-4 w-4" />
                  <span>{user?.email}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Informasi Profil</CardTitle>
                  <CardDescription>
                    Update informasi personal dan profesional Anda
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...profileForm}>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            className="h-11"
                            type="text"
                            placeholder="Masukkan nama Anda"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={profileForm.control}
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
                </div>

                <div className="flex justify-end">
                  <Button onClick={profileForm.handleSubmit(onProfileSubmit)}>
                    <Save className="mr-2 h-4 w-4" />
                    Simpan
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-red-50 p-2">
                  <Key className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <CardTitle>Ubah Password</CardTitle>
                  <CardDescription>
                    Pastikan akun Anda tetap aman dengan password yang kuat
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form {...passwordForm}>
                <div className="space-y-4">
                  <FormField
                    control={passwordForm.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password Saat Ini</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              className="h-11 pr-10"
                              type={showCurrentPassword ? 'text' : 'password'}
                              placeholder="Masukkan password saat ini"
                              {...field}
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="text-muted-foreground h-4 w-4" />
                            ) : (
                              <Eye className="text-muted-foreground h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={passwordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password Baru</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                className="h-11 pr-10"
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder="Masukkan password baru"
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                            >
                              {showNewPassword ? (
                                <EyeOff className="text-muted-foreground h-4 w-4" />
                              ) : (
                                <Eye className="text-muted-foreground h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Konfirmasi Password</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input
                                className="h-11 pr-10"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Konfirmasi password baru"
                                {...field}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="text-muted-foreground h-4 w-4" />
                              ) : (
                                <Eye className="text-muted-foreground h-4 w-4" />
                              )}
                            </Button>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-blue-50 p-4">
                  <h4 className="mb-2 text-sm font-medium text-blue-900">
                    Tips Password Aman:
                  </h4>
                  <ul className="space-y-1 text-xs text-blue-800">
                    <li>• Minimal 8 karakter</li>
                    <li>• Kombinasi huruf besar, kecil, angka, dan simbol</li>
                    <li>• Hindari informasi personal yang mudah ditebak</li>
                  </ul>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    type="submit"
                    variant="destructive"
                    onClick={passwordForm.handleSubmit(onPasswordSubmit)}
                    disabled={passwordForm.formState.isSubmitting}
                  >
                    {passwordForm.formState.isSubmitting ? (
                      <>Loading...</>
                    ) : (
                      <>
                        <Key className="mr-2 h-4 w-4" />
                        Update Password
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
