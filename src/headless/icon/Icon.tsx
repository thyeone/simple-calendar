import { forwardRef } from 'react';
import * as Icons from './svgs';
import { PolymorphicComponentProps } from '../polymorphics';
import { Flex, FlexProps } from '../ui/Flex';

export type IconName = keyof typeof Icons;

export type IconProps = React.SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

function IconComponent(props: IconProps, ref: React.Ref<SVGSVGElement>) {
  const {
    name,
    width = props.width ?? props.size ?? 24,
    height = props.height ?? props.size ?? 24,
    fill = 'none',
    ...rest
  } = props;
  const IconElement = Icons[name];

  return (
    <IconElement
      ref={ref}
      width={width}
      height={height}
      fill={fill}
      style={{
        flexShrink: 0,
      }}
      {...rest}
    />
  );
}

export const Icon = forwardRef(IconComponent);

export type IconButtonProps<C extends React.ElementType = 'button'> =
  IconProps &
    FlexProps<C> & {
      className?: string;
    };

export const IconButton = <C extends React.ElementType = 'button'>({
  as,
  component,
  name,
  width,
  height,
  size,
  fill = 'none',
  style,
  ...rest
}: PolymorphicComponentProps<C, IconButtonProps<C>>) => {
  const Component = component ?? Flex;

  const iconProps: IconProps = {
    name,
    width: width || size,
    height: height || size,
    fill,
  };

  const componentProps =
    Component === Flex
      ? {
          as: as ?? 'button',
          center: true,
          style: { flexShrink: 0, ...style },
          ...rest,
        }
      : {
          style: { flexShrink: 0, ...style },
          ...rest,
        };

  return (
    <Component {...componentProps}>
      <Icon {...iconProps} />
    </Component>
  );
};
