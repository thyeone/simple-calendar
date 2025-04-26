import React, { forwardRef, type ReactNode } from 'react';

import type {
  PolymorphicComponentProps,
  PolymorphicRef,
} from '../polymorphics';
import { Slot } from '@radix-ui/react-slot';

export type BoxProps<C extends React.ElementType = 'div'> =
  PolymorphicComponentProps<
    C,
    {
      component?: C;
      children?: ReactNode;
      asChild?: boolean;
    }
  >;

const BoxComponent = <C extends React.ElementType = 'div'>(
  { component, as, asChild, children, ...rest }: BoxProps<C>,
  ref: PolymorphicRef<C>,
) => {
  const Component = component ?? as ?? 'div';

  const componentProps = {
    ...(as === 'button' && { type: 'button' }),
    ref,
    ...rest,
  };

  if (asChild) {
    return <Slot {...componentProps}>{children}</Slot>;
  }

  return (
    <Component {...componentProps} ref={ref}>
      {children}
    </Component>
  );
};

export const Box = forwardRef(BoxComponent) as <
  C extends React.ElementType = 'div',
>(
  props: BoxProps<C> & { ref?: PolymorphicRef<C> },
) => JSX.Element;
