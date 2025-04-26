import { ErrorBoundary } from '@suspensive/react';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import { Suspense } from 'react';

export function AsyncBoundary({
  children,
  suspenseFallback,
  errorFallback,
}: PropsWithStrictChildren<{
  suspenseFallback?: React.ReactNode | null;
  errorFallback?: React.ReactNode | null;
}>) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} fallback={errorFallback}>
          <Suspense fallback={suspenseFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
