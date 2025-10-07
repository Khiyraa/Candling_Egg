'use client';

import { Settings } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { useState, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useIncubatorStore } from '@/store/incubator';
import { toast } from 'sonner';

interface Inputs {
  name: string;
  capacity: number;
  currentEggs: number;
}

export default function IncDialog() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { incubator, updateIncubator } = useIncubatorStore();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      name: incubator?.name || '',
      capacity: incubator?.capacity || 0,
      currentEggs: incubator?.currentEggs || 0,
    },
  });

  useEffect(() => {
    if (incubator) {
      reset({
        name: incubator.name,
        capacity: incubator.capacity,
        currentEggs: incubator.currentEggs,
      });
    }
  }, [incubator, reset]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (data.currentEggs > data.capacity) {
      toast.error('Jumlah telur tidak boleh melebihi kapasitas');
      return;
    }

    try {
      await updateIncubator(data);
      toast.success('Pengaturan mesin tetas berhasil diperbarui');
      setIsEditDialogOpen(false);
    } catch {
      toast.error('Gagal memperbarui pengaturan mesin tetas');
    }
  };

  return (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Pengaturan
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pengaturan Mesin Tetas</DialogTitle>
          <DialogDescription>
            Ubah nama, kapasitas, dan jumlah telur saat ini pada mesin tetas.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nama
            </Label>
            <Input
              id="name"
              type="text"
              className="col-span-3"
              placeholder={incubator?.name || 'Masukkan nama mesin tetas'}
              {...register('name', {
                required: 'Nama mesin tetas harus diisi',
              })}
            />
            {errors.name && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="capacity" className="text-right">
              Kapasitas
            </Label>
            <Input
              id="capacity"
              type="number"
              className="col-span-3"
              placeholder={
                incubator?.capacity?.toString() || 'Masukkan kapasitas'
              }
              {...register('capacity', {
                required: 'Kapasitas harus diisi',
                min: { value: 1, message: 'Kapasitas minimal 1' },
                valueAsNumber: true,
              })}
            />
            {errors.capacity && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {errors.capacity.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentEggs" className="text-right">
              Jumlah Telur
            </Label>
            <Input
              id="currentEggs"
              type="number"
              className="col-span-3"
              placeholder={
                incubator?.currentEggs?.toString() || 'Masukkan jumlah telur'
              }
              {...register('currentEggs', {
                required: 'Jumlah telur harus diisi',
                min: { value: 0, message: 'Jumlah telur tidak boleh negatif' },
                valueAsNumber: true,
              })}
            />
            {errors.currentEggs && (
              <p className="col-span-3 col-start-2 text-sm text-red-500">
                {errors.currentEggs.message}
              </p>
            )}
          </div>
        </form>
        <DialogFooter>
          <Button onClick={handleSubmit(onSubmit)}>Simpan Perubahan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
