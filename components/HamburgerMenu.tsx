'use client';

import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeButton';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // handle clickoutside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <div className="absolute top-4 right-4 flex items-center gap-2 sm:hidden">
        <button onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div
          ref={menuRef}
          className="absolute top-14 right-4 z-50 bg-background border rounded-lg shadow-md p-4 flex flex-col gap-2 sm:hidden"
        >
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      )}
    </>
  );
}
