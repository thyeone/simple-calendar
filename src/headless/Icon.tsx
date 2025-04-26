import { forwardRef } from 'react';
import * as Icons from './svgs';

type IconName = keyof typeof Icons;

type IconProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  name: IconName;
};

function IconComponent(props: IconProps, ref: React.Ref<SVGSVGElement>) {
  const { name, size = 24, width, height, fill = 'none', ...rest } = props;
  const IconElement = Icons[name];

  return (
    <IconElement
      ref={ref}
      width={width ?? size}
      height={height ?? size}
      fill={fill}
      style={{
        flexShrink: 0,
      }}
      {...rest}
    />
  );
}

export const Icon = forwardRef(IconComponent);

type IconButtonProps<C extends React.ElementType> = IconProps & {
  component?: C;
};

export const IconButton = <C extends React.ElementType = 'button'>({
  as,
  component,
  name,
  size,
  width = 24,
  height = 24,
  fill = 'none',
  ...rest
}: PolymorphicComponentProps<C, IconButtonProps<C>>) => {
  const Component = (component || as || 'button') as React.ElementType;
  const iconProps: IconProps = { name, size, width, height, fill };
  const componentProps = {
    ...(as === 'button' && { type: 'button' }),
    ...rest,
  };

  return (
    <Component {...componentProps}>
      <Icon {...iconProps} />
    </Component>
  );
};
