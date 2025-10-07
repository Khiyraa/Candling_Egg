'use client';

import IncubatorItem from '@/components/incubator/item';
import IncubatorHeader from '@/components/incubator/header';
import LedDialog from '@/components/incubator/led-dialog';
import type { Incubator } from '@/types/incubator';
import { useEffect } from 'react';
import { useIncubatorStore } from '@/store/incubator';
import { useLedStore } from '@/store/led';
import { socket } from '@/lib/socket';

export default function Incubator() {
  const { incubator, fetchIncubator } = useIncubatorStore();
  const { initializeLedPositions } = useLedStore();

  useEffect(() => {
    fetchIncubator();
    socket.on('telemetry', () => fetchIncubator());
  }, [fetchIncubator]);

  useEffect(() => {
    if (incubator?.currentEggs) {
      initializeLedPositions(incubator.currentEggs, incubator.leds);
    }
  }, [incubator?.currentEggs, incubator?.leds, initializeLedPositions]);

  return (
    <div className="space-y-6">
      <IncubatorHeader />

      {incubator != null ? (
        <IncubatorItem incubator={incubator} />
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="relative mb-4">
            <div className="h-16 w-16 rounded-full border-4 border-gray-200">
              <div className="border-t-primary h-14 w-14 animate-spin rounded-full border-4 border-transparent"></div>
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-6 animate-pulse rounded-full bg-orange-200 opacity-60"></div>
            </div>
          </div>
          <h3 className="text-foreground mb-2 text-lg font-semibold">
            Memuat Data Mesin Tetas
          </h3>
          <p className="text-muted-foreground max-w-md">
            Mohon tunggu sebentar, kami sedang mengambil informasi terbaru dari
            mesin tetas Anda...
          </p>
          <div className="mt-4 flex items-center gap-1">
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
            <div className="bg-primary h-2 w-2 animate-bounce rounded-full"></div>
          </div>
        </div>
      )}

      <LedDialog />
    </div>
  );
}
