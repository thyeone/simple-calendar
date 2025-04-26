import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type ReplaceOptions = {
  resetQueries?: string[];
  push?: boolean;
  path?: string;
};

export const useQueryParams = <
  T extends Record<string, string | boolean | number>
>() => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const getPath = useCallback(
    (key: string, val: string, options?: ReplaceOptions) => {
      const query = [];
      let isFresh = true;
      for (const [k, v] of searchParams.entries()) {
        if (k === key) {
          if (val) {
            query.push(`${k}=${val}`);
          }
          isFresh = false;
        } else {
          if (!options?.resetQueries?.includes(k)) {
            query.push(`${k}=${v}`);
          }
        }
      }

      if (isFresh) {
        query.push(`${key}=${val}`);
      }

      return `${options?.path || pathname}?${query.join("&")}`;
    },
    [pathname, searchParams]
  );

  const replaceQuery = useCallback(
    (key: string, val: string, options?: ReplaceOptions) => {
      if (options?.push) {
        router.push(getPath(key, val, options));
        return;
      }
      router.replace(getPath(key, val, options), {
        scroll: false,
      });
    },
    [getPath, router]
  );

  const replaceQueries = useCallback(
    (queries: Partial<T>, options?: ReplaceOptions) => {
      const params = new URLSearchParams(searchParams);

      if (options?.resetQueries) {
        options.resetQueries.forEach((key) => {
          params.delete(key);
        });
      }

      Object.entries(queries).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      const newPath = `${options?.path || pathname}?${params.toString()}`;

      if (options?.push) {
        router.push(newPath);
        return;
      }
      router.replace(newPath, {
        scroll: false,
      });
    },
    [pathname, searchParams, router]
  );

  const query: Partial<T> = useMemo(() => {
    const obj: Partial<T> = {};

    for (const [k, v] of searchParams.entries()) {
      if (v === "true" || v === "false") {
        obj[k as keyof T] = (v === "true") as T[keyof T];
      } else if (!isNaN(Number(v))) {
        obj[k as keyof T] = Number(v) as T[keyof T];
      } else {
        obj[k as keyof T] = v as T[keyof T];
      }
    }
    return obj;
  }, [searchParams]);

  const resetQuery = useCallback(
    (exceptKeys?: string[]) => {
      const params = new URLSearchParams();

      if (exceptKeys) {
        searchParams.forEach((value, key) => {
          if (exceptKeys.includes(key)) {
            params.set(key, value);
          }
        });
      }

      const query = params.toString();

      const newPath = query ? `${pathname}?${query}` : pathname;

      router.replace(newPath);
    },
    [pathname, searchParams]
  );

  return {
    replaceQuery,
    replaceQueries,
    getPath,
    query,
    resetQuery,
  };
};
