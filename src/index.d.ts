type PropsWithStrictChildren<
  P = unknown,
  T extends React.ReactNode = ReactNode
> = P & {
  children: T;
};

type RenderPropsChildren<P = unknown, T = unknown> = P & {
  children: ((props: T) => React.ReactNode) | React.ReactNode;
};

type AsProp<C extends ElementType> = {
  as?: C;
};

type KeyWithAs<C extends ElementType, Props> = keyof (AsProp<C> & Props);

type PolymorphicRef<C extends ElementType> = ComponentPropsWithoutRef<C>["ref"];

type PolymorphicComponentProps<C extends ElementType, Props = object> = (Props &
  AsProp<C>) &
  Omit<ComponentPropsWithoutRef<C>, KeyWithAs<C, Props>>;

type PolymorphicComponentPropsWithRef<
  C extends ElementType,
  Props = object
> = Props & {
  ref?: PolymorphicRef<C>;
};
