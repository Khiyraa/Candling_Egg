import AppSidebar from '@/components/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import PanelHeader from '@/components/panel-header';
import { Toaster } from '@/components/ui/sonner';
export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <AppSidebar />

        <main className="w-full flex-1 bg-gray-50">
          <PanelHeader />
          <div className="p-6">{children}</div>
        </main>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
