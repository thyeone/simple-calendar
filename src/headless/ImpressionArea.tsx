import { useEffect, useRef, type ElementType } from 'react';
import type { PolymorphicComponentProps, PolymorphicRef } from './polymorphics';

type ImpressionAreaProps<T extends ElementType = 'div'> =
  PolymorphicComponentProps<
    T,
    {
      rootMargin?: IntersectionObserverInit['rootMargin'];
      areaThreshold?: IntersectionObserverInit['threshold'];
      onImpressionStart?: <T>(value?: T) => void;
      onImpressionEnd?: <T>(value?: T) => void;
    }
  >;

export function ImpressionArea<T extends ElementType = 'div'>({
  as,
  onImpressionStart,
  onImpressionEnd,
  rootMargin,
  ...props
}: PropsWithStrictChildren<ImpressionAreaProps<T>>) {
  const Element = as ?? 'div';

  const targetRef = useRef<T>(null) as PolymorphicRef<T>;

  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onImpressionStart?.(entry.target);
        } else {
          onImpressionEnd?.(entry.target);
        }
      },
      {
        rootMargin: `${rootMargin} 0px`,
      },
    );

    observer?.observe(targetRef.current);

    return () => {
      observer?.disconnect();
    };
  }, []);

  return <Element targetRef={targetRef} {...props} />;
}
