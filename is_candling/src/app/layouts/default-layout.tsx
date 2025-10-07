'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '../landing/navbar';
import Footer from '../landing/footer';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(pathname === '/');
  }, [pathname]);

  return (
    <div>
      {isHome && <Navbar />}
      {children}
      {isHome && <Footer />}
    </div>
  );
}
