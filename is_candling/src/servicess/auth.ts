import { ApiResponse } from '@/types/api-response';
import apiClient from './utils/client';
import { UserSession } from '@/types/auth';
import { getSession } from 'next-auth/react';
import z from 'zod';
import { profileSchema } from '@/types/profile';

export const authService = {
  async login(email: string, password: string): Promise<string> {
    try {
      const response = await apiClient.post<
        ApiResponse<{ access_token: string }>
      >('/auth/login', {
        email,
        password,
      });

      if (!response.data?.data?.access_token) {
        throw new Error('Access token not found in response');
      }

      return response.data.data.access_token;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async getUser(): Promise<UserSession> {
    try {
      const session = await getSession();

      if (!session?.accessToken) {
        throw new Error('No access token found');
      }

      const response = await apiClient.get<ApiResponse<UserSession>>(
        '/auth/user',
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        },
      );

      if (!response.data?.data) {
        throw new Error('User data not found in response');
      }

      return response.data.data;
    } catch (error) {
      console.error('Get user error:', error);
      throw error;
    }
  },

  async updateUser(data: z.infer<typeof profileSchema>): Promise<UserSession> {
    try {
      const session = await getSession();

      if (!session?.accessToken) throw new Error('No access token found');

      const response = await apiClient.patch<ApiResponse<UserSession>>(
        '/auth/user',
        {
          name: data.name,
          email: data.email,
        },
        {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        },
      );

      return response.data.data;
    } catch (error) {
      console.error('Update user error:', error);
      throw error;
    }
  },

  async updatePassword(
    currentPassword: string,
    newPassword: string,
  ): Promise<void> {
    try {
      const session = await getSession();

      if (!session?.accessToken) throw new Error('No access token found');

      await apiClient.patch(
        '/auth/user/password',
        {
          password: currentPassword,
          newPassword: newPassword,
        },
        {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        },
      );
    } catch (error) {
      console.error('Update password error:', error);
      throw error;
    }
  },
};
