'use client';

import { Dialog, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';
import IncDialog from './inc-dialog';
import { useLedStore } from '@/store/led';

export default function IncubatorHeader() {
  const { isLedSetupOpen, setIsLedSetupOpen } = useLedStore();
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mesin Tetas</h1>
        <p className="text-muted-foreground">
          Kelola dan pantau status mesin tetas telur
        </p>
      </div>

      <div className="flex flex-col gap-2 md:flex-row">
        <Dialog open={isLedSetupOpen} onOpenChange={setIsLedSetupOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Setup LED Candling
            </Button>
          </DialogTrigger>
        </Dialog>

        <IncDialog />
      </div>
    </div>
  );
}
