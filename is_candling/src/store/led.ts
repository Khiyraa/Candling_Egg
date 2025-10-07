import { incubatorService } from '@/services/incubator';
import { LedPosition as Position } from '@/types/led';
import { create } from 'zustand';

export interface LedPosition {
  id: number;
  row: number;
  col: number;
  isActive: boolean;
  hasEgg: boolean;
}

interface LedStore {
  ledPositions: LedPosition[];
  isLedSetupOpen: boolean;

  initializeLedPositions: (totalEggs: number, leds: Position[]) => void;
  toggleLedPosition: (id: number) => void;
  toggleAllLeds: (active: boolean) => void;
  getActiveLedCount: () => number;
  setIsLedSetupOpen: (open: boolean) => void;
  saveLedConfiguration: () => Promise<void>;
}

export const useLedStore = create<LedStore>((set, get) => ({
  ledPositions: [],
  isLedSetupOpen: false,

  initializeLedPositions: (totalEggs: number, leds: Position[]) => {
    const positions: LedPosition[] = [];

    for (let i = 0; i < totalEggs; i++) {
      positions.push({
        id: i + 1,
        row: Math.floor(i / 5),
        col: i % 5,
        isActive: leds.some((led) => led.led === i + 1 && led.isActive),
        hasEgg: true,
      });
    }
    set({ ledPositions: positions });
  },

  toggleLedPosition: (id: number) => {
    set((state) => ({
      ledPositions: state.ledPositions.map((led) =>
        led.id === id ? { ...led, isActive: !led.isActive } : led,
      ),
    }));
  },

  toggleAllLeds: (active: boolean) => {
    set((state) => ({
      ledPositions: state.ledPositions.map((led) => ({
        ...led,
        isActive: active,
      })),
    }));
  },

  getActiveLedCount: () => {
    const { ledPositions } = get();
    return ledPositions.filter((led) => led.isActive).length;
  },

  setIsLedSetupOpen: (open: boolean) => {
    set({ isLedSetupOpen: open });
  },

  saveLedConfiguration: async () => {
    const { ledPositions } = get();

    try {
      await incubatorService.updateLedConfiguration(
        'INC001',
        ledPositions.map((led) => {
          return { led: led.id, isActive: led.isActive };
        }),
      );
    } catch {
      throw new Error('Gagal menyimpan konfigurasi LED');
    }
  },
}));
