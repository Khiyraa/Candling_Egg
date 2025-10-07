import { Activity } from '@/types/activity';
import dayjs from 'dayjs';
import 'dayjs/locale/id';

export default function ActivityItem({
  activity,
  bordered,
}: {
  activity: Activity;
  bordered: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={`mt-2 h-2 w-2 rounded-full ${
            activity.type === 'SUCCESS'
              ? 'bg-green-500'
              : activity.type === 'WARNING'
                ? 'bg-yellow-500'
                : 'bg-blue-500'
          }`}
        />
        {bordered && <div className="mt-2 h-8 w-px bg-gray-200" />}
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{activity.action}</p>
          <span className="text-muted-foreground text-xs">
            {dayjs(activity.createdAt).format('HH:mm')}
          </span>
        </div>
        <p className="text-muted-foreground text-xs">{activity.description}</p>
      </div>
    </div>
  );
}
