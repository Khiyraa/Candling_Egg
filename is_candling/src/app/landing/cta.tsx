import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function cta() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-20">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="mb-4 text-4xl font-bold text-white">
          Ready to Start Your Research?
        </h2>
        <p className="mb-8 text-xl text-blue-100">
          Akses sistem penelitian untuk melihat data inkubasi telur secara
          real-time
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-white px-8 py-6 text-lg text-blue-600 hover:bg-gray-100"
            >
              Access Research System
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
