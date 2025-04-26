"use client";

import { Slot } from "@radix-ui/react-slot";
import { type RefObject, useCallback, useEffect, useRef } from "react";

type ClickOutsideDetectorProps = {
  onClickOutside: (e: MouseEvent) => void;
  exceptionElementRef?: RefObject<HTMLElement>[];
};

export function ClickOutsideDetector({
  onClickOutside,
  exceptionElementRef,
  ...rest
}: ClickOutsideDetectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const onClickScreen = useCallback(
    (e: MouseEvent) => {
      if (
        exceptionElementRef?.some((ref) =>
          ref.current?.contains(e.target as Node)
        )
      )
        return;

      if (
        !e.target ||
        !(e.target instanceof Node) ||
        !containerRef.current?.contains(e.target)
      ) {
        onClickOutside?.(e);
      }
    },
    [onClickOutside, exceptionElementRef]
  );

  useEffect(() => {
    window.addEventListener("mousedown", onClickScreen, { passive: true });

    return () => {
      window.removeEventListener("mousedown", onClickScreen);
    };
  }, [onClickScreen]);

  return <Slot ref={containerRef} {...rest} />;
}
