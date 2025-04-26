import { memo } from 'react';
import { cn } from '@/libs/cn';

type SpacingProps = React.HTMLAttributes<HTMLDivElement> & {
  children?: never;
  direction?: 'horizontal' | 'vertical';
  size: number;
};

export const Spacing = memo(function Spacing({
  direction = 'vertical',
  size,
  className,
  ...props
}: SpacingProps) {
  return (
    <div
      className={cn('flex-none', className)}
      style={{
        [direction === 'vertical' ? 'height' : 'width']: size + 'px',
      }}
      {...props}
    />
  );
});
