import { CandlingService } from '@/services/candling';
import { Candling } from '@/types/candling';
import { create } from 'zustand';

interface CandlingState {
  candlings: Candling[] | null;
  fetchCandlings: () => Promise<void>;
}

export const useCandlingStore = create<CandlingState>((set) => ({
  candlings: null,

  fetchCandlings: async () => {
    const candlings = await CandlingService.getCandlings();
    set({ candlings });
  },
}));
