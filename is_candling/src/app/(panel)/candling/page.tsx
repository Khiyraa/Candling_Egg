'use client';

import { useState } from 'react';
import CandlingHeader from '@/components/candling/header';
import CandlingHistory from '@/components/candling/history';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Eye, XCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import AnimateEggRack from '@/components/candling/animate-egg-rack';
import { Button } from '@/components/ui/button';
import { CandlingService } from '@/services/candling';

export default function Candling() {
  const [openGuide, setOpenGuide] = useState(false);

  const guideModal = () => {
    setOpenGuide(true);
  };

  return (
    <div className="space-y-6">
      <CandlingHeader startCandling={guideModal} />
      <Dialog open={openGuide} onOpenChange={setOpenGuide}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Panduan Candling</DialogTitle>
            <DialogDescription>
              Pastikan posisi penggeser telur berada di sebelah kiri.
            </DialogDescription>
          </DialogHeader>
          <div>
            <AnimateEggRack />
          </div>
          <DialogFooter className="sm:justify-center">
            <Button
              onClick={async () => {
                await CandlingService.notifyCandling();
                setOpenGuide(false);
              }}
            >
              Mulai Candling
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Candling Hari Ini
            </CardTitle>
            <Eye className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-muted-foreground text-xs">
              Telur yang dicandling
            </p>
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Telur Fertil</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">142</div>
            <p className="text-muted-foreground text-xs">
              91% tingkat kesuburan
            </p>
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Telur Infertil
            </CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">14</div>
            <p className="text-muted-foreground text-xs">9% tidak berkembang</p>
          </CardContent>
        </Card>
      </div>

      <CandlingHistory />
    </div>
  );
}
