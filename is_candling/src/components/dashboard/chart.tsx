'use client';

import { Thermometer } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '../ui/chart';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { chartService } from '@/services/chart';
import { useEffect, useState } from 'react';
import { ChartData } from '@/types/chart';
import { socket } from '@/lib/socket';

export default function DashboardChart() {
  const [chartData, setChartData] = useState<ChartData[] | null>(null);

  const fetchChartData = async () => {
    try {
      const data = await chartService.getStats();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    fetchChartData();
    socket.on('telemetry', fetchChartData);
  }, []);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-green-50 p-2">
            <Thermometer className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <CardTitle className="text-xl">
              Suhu & Kelembaban Mesin Tetas
            </CardTitle>
            <CardDescription>Data historis 24 jam terakhir</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {chartData ? (
          <ChartContainer
            config={{
              temperature: {
                label: 'Suhu (°C)',
                color: 'hsl(var(--chart-1))',
              },
              humidity: {
                label: 'Kelembaban (%)',
                color: 'hsl(var(--chart-2))',
              },
            }}
            className="aspect-video h-[250px] w-full"
          >
            <LineChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
              />
              <YAxis
                yAxisId="left"
                stroke="var(--color-temperature)"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[36, 38]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="var(--color-humidity)"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                domain={[55, 65]}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Line
                yAxisId="left"
                dataKey="temperature"
                type="monotone"
                stroke="#2a9d90"
                strokeWidth={2}
                dot={false}
              />
              <Line
                yAxisId="right"
                dataKey="humidity"
                type="monotone"
                stroke="#2764eb"
                strokeWidth={2}
                dot={false}
              />
              <ChartLegend content={<ChartLegendContent />} />
            </LineChart>
          </ChartContainer>
        ) : (
          <div className="flex h-[250px] w-full items-center justify-center">
            <div className="flex w-full flex-col items-center gap-4">
              <svg
                width="100%"
                height="80"
                viewBox="0 0 320 80"
                className="w-full"
              >
                <polyline
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="4"
                  points="0,60 40,50 80,65 120,40 160,55 200,30 240,45 280,25 320,40"
                  className="animate-pulse"
                  style={{ filter: 'blur(1px)' }}
                />
              </svg>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
