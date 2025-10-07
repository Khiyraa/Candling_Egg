import { incubatorService } from '@/services/incubator';
import { Incubator } from '@/types/incubator';
import { create } from 'zustand';

interface IncubatorState {
  incubator: Incubator | null;
  fetchIncubator: () => Promise<void>;
  updateIncubator: (updates: Partial<Incubator>) => Promise<void>;
}

export const useIncubatorStore = create<IncubatorState>((set, get) => ({
  incubator: null,

  fetchIncubator: async () => {
    const data = await incubatorService.getIncubator('INC001');
    set({ incubator: data });
  },

  updateIncubator: async (updates: Partial<Incubator>) => {
    try {
      await incubatorService.updateIncubator('INC001', updates);
      await get().fetchIncubator();
    } catch {
      throw new Error('Gagal memperbarui data mesin tetas');
    }
  },
}));
