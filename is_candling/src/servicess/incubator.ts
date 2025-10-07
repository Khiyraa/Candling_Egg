import { Incubator } from '@/types/incubator';
import apiClient from './utils/client';
import { ApiResponse } from '@/types/api-response';
import { LedPosition } from '@/types/led';

export const incubatorService = {
  async getIncubator(id: string): Promise<Incubator> {
    const response = await apiClient.get<ApiResponse<Incubator>>(
      `/incubators/${id}`,
    );

    return response.data.data;
  },

  async updateIncubator(
    id: string,
    updates: Partial<Incubator>,
  ): Promise<Incubator> {
    const response = await apiClient.put<ApiResponse<Incubator>>(
      `/incubators/${id}`,
      updates,
    );

    return response.data.data;
  },

  async updateLedConfiguration(
    id: string,
    ledConfig: LedPosition[],
  ): Promise<ApiResponse<null>> {
    const response = await apiClient.post<ApiResponse<null>>(
      `/incubators/${id}/leds`,
      { config: ledConfig },
    );

    return response.data;
  },
};
