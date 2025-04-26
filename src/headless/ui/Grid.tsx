import { forwardRef } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/libs/cn';
import { Box, type BoxProps } from './Box';
import type { PolymorphicRef } from '../polymorphics';

type GridProps<C extends React.ElementType = 'div'> = BoxProps<C> & {
  className?: string;
  style?: React.CSSProperties;
  display?: 'grid' | 'inline-grid' | 'none';
  columns?: GridVariants['columns'];
  rows?: GridVariants['rows'];
  align?: GridVariants['align'];
  justify?: GridVariants['justify'];
  gap?: number;
  gapX?: number;
  gapY?: number;
};

type GridVariants = VariantProps<typeof gridVariants>;

export const Grid = forwardRef(function Grid<
  C extends React.ElementType = 'div',
>(
  {
    className,
    columns,
    rows,
    gap,
    gapX,
    gapY,
    align,
    justify,
    style: injectedStyle,
    ...rest
  }: GridProps<C>,
  ref: PolymorphicRef<C>,
) {
  return (
    <Box
      className={cn(gridVariants({ columns, rows, align, justify }), className)}
      style={{
        gap,
        columnGap: gap ? `${gap}px` : gapX ? `${gapX}px` : undefined,
        rowGap: gap ? `${gap}px` : gapY ? `${gapY}px` : undefined,
        ...injectedStyle,
      }}
      ref={ref}
      {...(rest as BoxProps<C>)}
    />
  );
}) as <C extends React.ElementType = 'div'>(
  props: GridProps<C> & { ref?: PolymorphicRef<C> },
) => JSX.Element;

const gridVariants = cva('grid', {
  variants: {
    display: {
      grid: 'grid',
      'inline-grid': 'inline-grid',
      none: 'hidden',
    },
    columns: {
      none: 'grid-cols-none',
      '1': 'grid-cols-1',
      '2': 'grid-cols-2',
      '3': 'grid-cols-3',
      '4': 'grid-cols-4',
      '5': 'grid-cols-5',
      '6': 'grid-cols-6',
      '7': 'grid-cols-7',
      '8': 'grid-cols-8',
      '9': 'grid-cols-9',
    },
    rows: {
      none: 'grid-rows-none',
      '1': 'grid-rows-1',
      '2': 'grid-rows-2',
      '3': 'grid-rows-3',
      '4': 'grid-rows-4',
      '5': 'grid-rows-5',
      '6': 'grid-rows-6',
      '7': 'grid-rows-7',
      '8': 'grid-rows-8',
      '9': 'grid-rows-9',
    },
    align: {
      start: 'place-items-start',
      center: 'place-items-center',
      end: 'place-items-end',
      stretch: 'place-items-stretch',
    },
    justify: {
      start: 'place-items-start',
      center: 'place-items-center',
      end: 'place-items-end',
      stretch: 'place-items-stretch',
    },
  },
});
