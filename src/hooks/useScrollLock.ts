import { useEffect } from 'react';

export const useScrollLock = (scrollLock: boolean): void => {
  useEffect(() => {
    if (scrollLock) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [scrollLock]);
};
