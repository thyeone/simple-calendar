import React, {
  Children,
  cloneElement,
  isValidElement,
  MouseEventHandler,
  ReactElement,
} from "react";

type PreventBubblingProps = {
  children:
    | Array<ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }>>
    | ReactElement<{ onClick?: MouseEventHandler<HTMLElement> }>;
};

export const PreventBubbling = ({ children }: PreventBubblingProps) => {
  const preventBubbling = (
    e: React.MouseEvent<HTMLElement>,
    onClick?: MouseEventHandler<HTMLElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    onClick?.(e);
  };

  const childrenWithOnClick = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        onClick: (e: React.MouseEvent<HTMLElement>) =>
          preventBubbling(e, child.props.onClick),
      });
    }
    return child;
  });

  return <>{childrenWithOnClick}</>;
};
