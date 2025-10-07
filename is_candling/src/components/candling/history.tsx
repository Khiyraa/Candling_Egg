'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCandlingStore } from '@/store/candling';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { Badge } from '../ui/badge';
import { socket } from '@/lib/socket';
import { EggOffIcon } from 'lucide-react';

export default function CandlingHistory() {
  const { candlings, fetchCandlings } = useCandlingStore();

  const generateStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return (
          <Badge className="bg-neutral-100 text-neutral-800">Pending</Badge>
        );
      case 'SUCCESS':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'FAILED':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchCandlings();
    socket.on('candling', fetchCandlings);
  }, [fetchCandlings]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Riwayat Candling</CardTitle>
        <CardDescription>
          Hasil candling telur dari waktu ke waktu
        </CardDescription>
      </CardHeader>
      <CardContent>
        {candlings == null ? (
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
              Memuat Data Candling
            </h3>
            <p className="text-muted-foreground max-w-md">
              Mohon tunggu sebentar, kami sedang mengambil data candling...
            </p>
            <div className="mt-4 flex items-center gap-1">
              <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.3s]"></div>
              <div className="bg-primary h-2 w-2 animate-bounce rounded-full [animation-delay:-0.15s]"></div>
              <div className="bg-primary h-2 w-2 animate-bounce rounded-full"></div>
            </div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tanggal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total Telur</TableHead>
                <TableHead>Fertil</TableHead>
                <TableHead>Infertil</TableHead>
                <TableHead>Tingkat Kesuburan</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {candlings.length < 1 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <EggOffIcon className="mb-2 h-10 w-10 text-orange-400" />
                      <span className="text-muted-foreground text-lg font-semibold">
                        Belum terdapat riwayat candling
                      </span>
                      <span className="text-muted-foreground text-sm">
                        Mulai proses candling untuk melihat riwayat di sini.
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                candlings.map((candling) => (
                  <TableRow key={candling.id}>
                    <TableCell>
                      {dayjs(candling.createdAt).format('DD/MM/YYYY - HH:mm')}
                    </TableCell>
                    <TableCell>
                      {generateStatusBadge(candling.status)}
                    </TableCell>
                    <TableCell>
                      {candling.eggCount ? candling.eggCount : 'N/A'}
                    </TableCell>
                    <TableCell className="text-green-600">
                      {candling.fertile ? candling.fertile : 'N/A'}
                    </TableCell>
                    <TableCell className="text-red-600">
                      {candling.infertile ? candling.infertile : 'N/A'}
                    </TableCell>
                    <TableCell>
                      {candling.fertileRate
                        ? `${candling.fertileRate}%`
                        : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Lihat Detail
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
