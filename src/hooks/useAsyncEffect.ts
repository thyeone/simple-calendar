import { type DependencyList, useEffect } from 'react';

type Cleanup = void | (() => void);

export function useAsyncEffect<T>(
  effect: () => Promise<Cleanup>,
  deps: DependencyList,
) {
  useEffect(() => {
    const promise = effect();
    let cleanup: Cleanup;

    promise.then((__cleanup) => {
      cleanup = __cleanup;
    });

    return () => {
      cleanup?.();
    };
  }, deps);
}
