import { Egg } from 'lucide-react';

export default function footer() {
  return (
    <div>
      <footer className="bg-gray-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 md:justify-start">
                <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white">
                  <Egg className="size-5" />
                </div>
                <span className="text-xl font-bold">IS Candling</span>
              </div>
              <p className="text-gray-400">
                Intelligent System for Egg Candling
              </p>
            </div>

            <p className="text-center text-gray-400">
              &copy; 2025 Research AI Community. Politeknik Negeri Jember.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
