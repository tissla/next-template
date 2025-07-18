'use client';

import { createContext, useContext, useState, useRef } from 'react';

interface NotificationContextType {
  showNotification: (message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notification, setNotification] = useState<{
    message: string;
    visible: boolean;
  }>({ message: '', visible: false });

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotification = (message: string, duration = 2000) => {
    // clean previous timers
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setNotification({ message, visible: true });

    timeoutRef.current = setTimeout(() => {
      setNotification((prev) => ({ ...prev, visible: false }));
      timeoutRef.current = null;
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification.visible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-primary text-background rounded-lg shadow-lg z-50 animate-slide-up">
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
};
