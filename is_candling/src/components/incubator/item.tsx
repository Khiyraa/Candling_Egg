import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Thermometer, Droplets } from 'lucide-react';
import { Incubator } from '@/types/incubator';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

export default function IncubatorItem({ incubator }: { incubator: Incubator }) {
  const parameters = [
    {
      label: 'Suhu Target',
      value: '37.5°C',
      current: incubator.temperature ? `${incubator.temperature}°C` : 'N/A',
      icon: Thermometer,
    },
    {
      label: 'Kelembaban Target',
      value: '60%',
      current: incubator.humidity ? `${incubator.humidity}%` : 'N/A',
      icon: Droplets,
    },
  ];

  const formatLastUpdate = (date: Date | string) => {
    return dayjs(date).locale('id').format('DD/MM/YYYY HH:mm');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Aktif</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Tidak Aktif</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="border-0 shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className={`h-4 w-4 rounded-full ${
                incubator.status === 'active'
                  ? 'bg-green-500 shadow-lg shadow-green-500/50'
                  : 'bg-yellow-500 shadow-lg shadow-yellow-500/50'
              }`}
            />
            <div>
              <CardTitle className="text-2xl">{incubator.name}</CardTitle>
              <CardDescription>Mesin Tetas Utama</CardDescription>
            </div>
          </div>
          {getStatusBadge(incubator.status)}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Kapasitas Telur</h3>
            <span className="text-2xl font-bold">
              {incubator.currentEggs}/{incubator.capacity}
            </span>
          </div>
          <Progress
            value={(incubator.currentEggs / incubator.capacity) * 100}
            className="h-3"
          />
          <p className="text-muted-foreground text-sm">
            {Math.round((incubator.currentEggs / incubator.capacity) * 100)}%
            kapasitas terisi
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {parameters.map((param, index) => (
            <Card key={index} className="border border-gray-200 py-2">
              <CardContent className="p-4">
                <div className="mb-3 flex items-center gap-3">
                  <div className="rounded-lg bg-blue-50 p-2">
                    <param.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {param.label}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      Target: {param.value}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xl font-bold text-gray-900">
                  {param.current}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="border-t pt-4 text-center">
          <p className="text-muted-foreground text-sm">
            {incubator.lastUpdate
              ? `Update terakhir: ${formatLastUpdate(incubator.lastUpdate)}`
              : 'Update terakhir: N/A'}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
