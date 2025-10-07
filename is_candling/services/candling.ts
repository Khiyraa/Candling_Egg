import { Candling } from '@/types/candling';
import apiClient from './utils/client';
import { ApiResponse } from '@/types/api-response';

export const CandlingService = {
  async getCandlings(): Promise<Candling[]> {
    const response = await apiClient.get<ApiResponse<Candling[]>>('/candling');
    return response.data.data;
  },

  async notifyCandling(): Promise<string> {
    const response =
      await apiClient.post<ApiResponse<{ message: string }>>('/candling/start');

    return response.data.data.message;
  },
};
