import '@/styles/globals.css';

import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { NotificationProvider } from '@/context/NotificationContext';
import { LanguageProvider } from '@/context/LanguageContext';

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
              <NotificationProvider>
                {children}
              </NotificationProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
        </body>
    </html>
  );
}
