import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLedStore } from '@/store/led';
import { toast } from 'sonner';

export default function LedDialog() {
  const {
    ledPositions,
    isLedSetupOpen,
    toggleLedPosition,
    toggleAllLeds,
    getActiveLedCount,
    setIsLedSetupOpen,
    saveLedConfiguration,
  } = useLedStore();

  const saveConfig = async () => {
    try {
      await saveLedConfiguration();
      toast.success('Konfigurasi LED berhasil disimpan');
    } catch {
      toast.error('Gagal menyimpan konfigurasi LED');
    }
  };

  return (
    <Dialog open={isLedSetupOpen} onOpenChange={setIsLedSetupOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Setup LED Candling</DialogTitle>
          <DialogDescription>
            Pilih posisi LED yang akan menyala saat candling. Klik pada titik
            LED untuk mengaktifkan/menonaktifkan.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div className="space-y-1">
              <p className="font-medium">
                LED Aktif: {getActiveLedCount()} dari {ledPositions.length}
              </p>
              <p className="text-muted-foreground text-sm">
                Kapasitas: 5 telur per baris ×{' '}
                {Math.ceil(ledPositions.length / 5)} baris
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleAllLeds(true)}
              >
                Aktifkan Semua
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleAllLeds(false)}
              >
                Matikan Semua
              </Button>
            </div>
          </div>

          {/* Incubator Layout */}
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="mb-2 text-lg font-semibold">Layout LED</h3>
              <p className="text-muted-foreground text-sm">
                Klik pada LED untuk mengaktifkan/menonaktifkan posisi candling
              </p>
            </div>

            {/* LED Grid */}
            <div className="relative">
              {/* Incubator Container */}
              <div className="rounded-lg border-4 border-gray-400 bg-gradient-to-b from-gray-100 to-gray-200 p-4 shadow-inner">
                <div
                  className="grid gap-4"
                  style={{ gridTemplateColumns: 'repeat(5, 1fr)' }}
                >
                  {ledPositions.map((led) => (
                    <div key={led.id} className="relative aspect-square">
                      {/* LED Button */}
                      <button
                        onClick={() => toggleLedPosition(led.id)}
                        className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-200 hover:scale-105 ${
                          led.isActive
                            ? 'border-green-600 bg-green-400 shadow-md'
                            : 'border-gray-400 bg-gray-300 hover:bg-gray-400'
                        }`}
                        title={`LED ${led.id} - ${led.isActive ? 'Aktif' : 'Tidak Aktif'}`}
                      >
                        {/* Position Label inside LED */}
                        <span
                          className={`font-mono text-xs ${led.isActive ? 'text-green-800' : 'text-gray-600'}`}
                        >
                          {led.id}
                        </span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-green-600 bg-green-400"></div>
                  <span className="text-sm">LED Aktif</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 rounded-full border-2 border-gray-400 bg-gray-300"></div>
                  <span className="text-sm">LED Tidak Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="text-muted-foreground text-sm">
            {getActiveLedCount()} LED akan menyala saat candling dimulai
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsLedSetupOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={() => {
                setIsLedSetupOpen(false);
                saveConfig();
              }}
            >
              Simpan Konfigurasi
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
