'use client';

import dayjs from 'dayjs';
import Activity from '@/components/dashboard/activity';
import DashboardChart from '@/components/dashboard/chart';
import StatCard from '@/components/dashboard/stat-card';
import { useIncubatorStore } from '@/store/incubator';
import { Activity as ActivityIcon, Calendar, Egg, Eye } from 'lucide-react';
import { useEffect } from 'react';
import { socket } from '@/lib/socket';

export default function Dashboard() {
  const { incubator, fetchIncubator } = useIncubatorStore();

  const stats = [
    {
      title: 'Total Telur',
      value: incubator?.currentEggs || '-',
      description: 'Telur dalam mesin tetas',
      icon: Egg,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Candling Hari Ini',
      value: '78',
      description: 'Telur yang dicandling',
      icon: Eye,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
    {
      title: 'Tingkat Fertilitas',
      value: '80%',
      description: 'Persentase telur fertil',
      icon: ActivityIcon,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
  ];

  useEffect(() => {
    fetchIncubator();
    socket.on('telemetry', () => fetchIncubator());
  }, [fetchIncubator]);

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative p-8">
          <h1 className="bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
            Dashboard Candling
          </h1>
          <div className="text-muted-foreground mt-2 flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4" />
            <span>
              Update terakhir:{' '}
              {incubator?.lastUpdate
                ? dayjs(incubator.lastUpdate).format('DD/MM/YYYY HH:mm')
                : '-'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, index) => (
          <StatCard stat={stat} key={index} />
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <DashboardChart />
        </div>

        <Activity />
      </div>
    </div>
  );
}
