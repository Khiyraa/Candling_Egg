import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function StatCard({
  stat,
}: {
  stat: {
    title: string;
    value: string | number;
    description: string;
    icon: LucideIcon;
    color: string;
    bgColor: string;
    iconColor: string;
  };
}) {
  return (
    <Card className="relative gap-2 overflow-hidden border-0 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`}
      />

      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="spaye-y-1">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            {stat.title}
          </CardTitle>
          <div className="text-3xl font-bold">{stat.value}</div>
        </div>
        <div className={`rounded-xl p-3 ${stat.bgColor}`}>
          <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-muted-foreground mb-2 text-xs">{stat.description}</p>
      </CardContent>
    </Card>
  );
}
