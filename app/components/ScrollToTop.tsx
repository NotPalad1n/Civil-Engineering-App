'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // Force le scroll en haut de page immédiatement
    window.scrollTo(0, 0);
  }, [pathname]); // Se déclenche à chaque changement de route

  return null;
}