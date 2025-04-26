import type { UseQueryOptions } from "@tanstack/react-query";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense, cache } from "react";

type Props = {
  queries: UseQueryOptions<any, any, any, any>[];
  fallback?: React.ReactNode;
};

export async function PrefetchHydration({
  queries,
  fallback = null,
  children,
}: PropsWithStrictChildren<Props>) {
  const getQueryClient = cache(() => new QueryClient());
  const queryClient = getQueryClient();

  for (const query of queries) {
    await queryClient.prefetchQuery({
      ...query,
      staleTime: 5 * 1000,
    });
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={fallback}>{children}</Suspense>
    </HydrationBoundary>
  );
}
