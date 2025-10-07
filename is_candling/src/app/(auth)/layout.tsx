import { Card } from '@/components/ui/card';
import { BarChart3, Eye } from 'lucide-react';
import { Toaster } from 'sonner';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div className="hidden space-y-8 lg:block">
          <div className="space-y-4">
            <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
              Kelola Mesin Tetas dengan Mudah
            </h1>
            <p className="text-lg leading-relaxed text-gray-600">
              Solusi modern untuk monitoring dan pengelolaan mesin tetas telur
              dengan teknologi candling otomatis
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-xl border border-white/20 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900">
                  Monitoring Real-time
                </h3>
                <p className="leading-relaxed text-gray-600">
                  Pantau suhu dan kelembaban secara langsung dengan dashboard
                  interaktif
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-xl border border-white/20 bg-white/70 p-4 shadow-sm backdrop-blur-sm transition-shadow hover:shadow-md">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="space-y-1">
                <h3 className="font-semibold text-gray-900">
                  Candling Otomatis
                </h3>
                <p className="leading-relaxed text-gray-600">
                  Sistem candling terintegrasi dengan AI untuk deteksi akurat
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md border-0 bg-white/80 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl">
            <div className="p-1">{children}</div>
          </Card>
        </div>
      </div>
      <Toaster />
    </main>
  );
}
