'use client';

import { useEffect } from 'react';
import { initAnalytics } from '@/lib/analytics';

interface AnalyticsProviderProps {
  children: React.ReactNode;
  measurementId: string;
}

export function AnalyticsProvider({
  children,
  measurementId,
}: AnalyticsProviderProps) {
  useEffect(() => {
    initAnalytics(measurementId);
  }, [measurementId]);

  return <>{children}</>;
}
