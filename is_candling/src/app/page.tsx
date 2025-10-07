import { BarChart3, Eye, Zap } from 'lucide-react';

import Hero from './landing/hero';
import Features from './landing/features';
import CTASection from './landing/cta';
export default function LandingPage() {
  const features = [
    {
      icon: BarChart3,
      title: 'Real-time Monitoring',
      description:
        'Sistem monitoring suhu, kelembaban, dan kondisi mesin tetas telur secara real-time',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Eye,
      title: 'Digital Candling System',
      description:
        'Teknologi digital untuk deteksi embrio pada telur dengan kecerdasan buatan',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Zap,
      title: 'Automated Logging',
      description: 'Log sistem yang dapat diakses kapan saja',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}

      <Features features={features} />

      {/* CTA Section */}

      <CTASection />
    </div>
  );
}
