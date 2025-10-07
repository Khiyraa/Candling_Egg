import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

type Features = {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
};

export default function features({ features }: { features: Features[] }) {
  return (
    <section id="features" className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-900">
            Research System Features
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-gray-600">
            Dilengkapi dengan tools dan fitur canggih untuk mendukung penelitian
            inkubasi telur yang komprehensif
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <CardHeader className="pb-4">
                <div
                  className={`h-12 w-12 bg-gradient-to-r ${feature.color} mb-4 flex items-center justify-center rounded-xl`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
