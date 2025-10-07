import { BarChart3, Eye, ArrowRight, BookOpen, Target } from 'lucide-react';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="border-0 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                🔬 Research AI Project - Intelligent System for Egg Candling
              </Badge>
              <h1 className="text-5xl leading-tight font-bold lg:text-6xl">
                <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                  Digital Candling
                </span>
                <br />
                <span className="text-gray-900">Research System</span>
              </h1>
              <p className="text-xl leading-relaxed text-gray-600">
                Sistem penelitian canggih untuk studi inkubasi telur dengan
                monitoring real-time dan manajemen mesin tetas. Mendukung
                penelitian ilmiah dengan data terintegrasi dan fitur lengkap.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-lg hover:from-blue-700 hover:to-purple-700"
                >
                  Akses Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative mx-auto aspect-square max-w-lg">
              {/* Main Circle */}
              <div className="absolute inset-0 rounded-full border border-white/40 bg-gradient-to-br from-white/60 to-white/30 shadow-2xl backdrop-blur-sm" />

              {/* Center Egg */}
              <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                <div className="relative">
                  <div className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-r from-yellow-400 to-orange-400 opacity-75 blur-xl" />
                  <div className="relative h-28 w-24 rounded-full border-4 border-white/50 bg-gradient-to-br from-yellow-200 via-orange-300 to-yellow-400 shadow-2xl" />
                </div>
              </div>

              {/* Static Elements */}
              <div className="absolute inset-0">
                {[
                  {
                    icon: BarChart3,
                    color: 'from-blue-400 to-blue-600',
                    position: 'top-8 left-1/2 transform -translate-x-1/2',
                  },
                  {
                    icon: Eye,
                    color: 'from-purple-400 to-purple-600',
                    position: 'bottom-8 right-12',
                  },
                  {
                    icon: BookOpen,
                    color: 'from-green-400 to-green-600',
                    position: 'top-1/2 left-8 transform -translate-y-1/2',
                  },
                  {
                    icon: Target,
                    color: 'from-orange-400 to-orange-600',
                    position: 'top-1/2 right-8 transform -translate-y-1/2',
                  },
                ].map((item, index) => (
                  <div key={index} className={`absolute ${item.position}`}>
                    <div className="relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-full opacity-50 blur-md`}
                      />
                      <div
                        className={`relative h-20 w-20 bg-gradient-to-br ${item.color} flex items-center justify-center rounded-full border-2 border-white/30 shadow-xl`}
                      >
                        <item.icon className="h-10 w-10 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
