'use client';

import { useState, useEffect } from 'react';
import ActivityItem from '@/components/dashboard/activity-item';
import type { Activity } from '@/types/activity';
import { activityService } from '@/services/activity';
import { Activity as ActivityIcon } from 'lucide-react';
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
} from '../ui/card';
import { socket } from '@/lib/socket';

export default function Activity() {
  const [activities, setActivities] = useState<Activity[] | null>(null);

  const fetchActivities = async () => {
    try {
      const data = await activityService.getActivities();
      setActivities(data.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  useEffect(() => {
    fetchActivities();
    socket.on('activity', fetchActivities);
  }, []);

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-purple-50 p-2">
            <ActivityIcon className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <CardTitle className="text-xl">Aktivitas Terbaru</CardTitle>
            <CardDescription>Log aktivitas sistem hari ini</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activities == null ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex animate-pulse items-start space-x-3">
                <div className="bg-muted h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2 py-1">
                  <div className="bg-muted h-4 w-1/3 rounded" />
                  <div className="bg-muted h-3 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <ActivityIcon className="text-muted-foreground mb-4 h-12 w-12" />
            <p className="text-muted-foreground text-lg font-semibold">
              Tidak ada aktivitas ditemukan
            </p>
            <span className="text-muted-foreground text-sm">
              Semua aktivitas terbaru akan muncul di sini.
            </span>
          </div>
        ) : (
          <div className="space-y-4">
            {activities.map((act, index) => (
              <ActivityItem
                activity={act}
                key={index}
                bordered={index < activities.length - 1}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
