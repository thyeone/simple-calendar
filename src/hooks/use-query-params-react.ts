import { useCallback } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

type ReplaceOptions = {
  resetQueries?: string[];
  push?: boolean;
  path?: string;
};

export const useQueryParams = <
  T extends Record<string, string | boolean | number>,
>(
  initialValue: Readonly<Partial<T>>,
) => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const getPath = useCallback(
    (key: string, val: string, options?: ReplaceOptions) => {
      const newParams = new URLSearchParams(searchParams);

      if (options?.resetQueries) {
        options.resetQueries.forEach((k) => newParams.delete(k));
      }

      if (val) {
        newParams.set(key, val);
      } else {
        newParams.delete(key);
      }

      return `${options?.path || location.pathname}?${newParams.toString()}`;
    },
    [location.pathname, searchParams],
  );

  const setParams = useCallback(
    (queries: Partial<T>, options?: ReplaceOptions) => {
      const newParams = new URLSearchParams(searchParams);

      if (options?.resetQueries) {
        options.resetQueries.forEach((key) => {
          newParams.delete(key);
        });
      }

      Object.entries(queries).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });

      const newPath = `${options?.path || location.pathname}?${newParams.toString()}`;

      navigate(newPath, { replace: !options?.push });
    },
    [location.pathname, searchParams, navigate],
  );

  const query: Partial<T> = (() => {
    const obj: Partial<T> = initialValue;

    for (const [k, v] of searchParams.entries()) {
      if (v === 'true' || v === 'false') {
        obj[k as keyof T] = (v === 'true') as T[keyof T];
      } else if (!isNaN(Number(v)) && !v.startsWith('0')) {
        obj[k as keyof T] = Number(v) as T[keyof T];
      } else {
        obj[k as keyof T] = v as T[keyof T];
      }
    }
    return obj;
  })();

  const resetQuery = useCallback(
    (exceptKeys?: string[]) => {
      const newParams = new URLSearchParams();

      if (exceptKeys) {
        searchParams.forEach((value, key) => {
          if (exceptKeys.includes(key)) {
            newParams.set(key, value);
          }
        });
      }

      const query = newParams.toString();
      const newPath = query
        ? `${location.pathname}?${query}`
        : location.pathname;

      navigate(newPath, { replace: true });
    },
    [location.pathname, searchParams, navigate],
  );

  return {
    setParams,
    getPath,
    query,
    resetQuery,
  };
};
