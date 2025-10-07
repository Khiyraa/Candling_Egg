import { ApiResponse } from '@/types/api-response';
import apiClient from './utils/client';
import { Activity } from '@/types/activity';

export const activityService = {
  async getActivities(): Promise<ApiResponse<Activity[]>> {
    const response =
      await apiClient.get<ApiResponse<Activity[]>>('/activities');
    return response.data;
  },
};
