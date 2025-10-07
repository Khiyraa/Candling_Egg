import { ApiResponse } from '@/types/api-response';
import apiClient from './utils/client';
import { ChartData } from '@/types/chart';

export const chartService = {
  async getStats(): Promise<ChartData[]> {
    const response =
      await apiClient.get<ApiResponse<ChartData[]>>('/telemetries/stats');

    return response.data.data;
  },
};
