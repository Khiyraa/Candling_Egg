import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import DefaultLayout from './layouts/default-layout';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IS Candling',
  description: 'Aplikasi untuk manajemen proses candling',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <DefaultLayout>{children}</DefaultLayout>
      </body>
    </html>
  );
}
