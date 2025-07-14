import '@/styles/globals.css';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { LanguageProvider } from '@/context/LanguageContext';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Template',
    default: 'Template',
  },
  description: 'Next.js template',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="theme-dark">
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <NotificationProvider>{children}</NotificationProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
