import {
  Children,
  Fragment,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
} from 'react';
import { cn } from '@/libs/cn';
import { Spacing } from '@/headless/ui/Spacing';

type ButtonGroupProps = {
  isSpacing?: boolean;
  isBackground?: boolean;
  isPadding?: boolean;
  isShadow?: boolean;
};

/**
 * 버튼을 하단 고정하기 위한 래퍼입니다. 래퍼 안에 최대 두 개의 버튼까지 허용됩니다.
 */

export default function ButtonGroup({
  isSpacing = true,
  isBackground = true,
  isPadding = true,
  isShadow = true,
  children,
}: PropsWithStrictChildren<ButtonGroupProps>) {
  const arrayChildren = Children.toArray(children) as ReactElement<
    typeof HTMLButtonElement
  >[];

  return (
    <>
      {isSpacing && <Spacing size={20 + 10 + 50} />}
      {renderButtonElements(arrayChildren, isPadding, isBackground, isShadow)}
    </>
  );
}

const renderButtonElements = (
  elements: ReactElement[],
  isPadding: boolean,
  isBackground: boolean,
  isShadow: boolean,
) => {
  const flatElements = elements.flatMap((child: ReactNode) => {
    if (isValidElement(child) && child.type === Fragment) {
      return Children.toArray(child.props.children);
    }

    return child;
  });

  if (flatElements.length === 1) {
    return (
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 mx-auto max-w-mobile bg-white pb-20 pt-10',
          {
            'px-16': isPadding,
            'shadow-[0_-2px_14px_0_#F1F1F1C9]': isShadow,
          },
        )}
      >
        {elements[0]}
      </div>
    );
  }
  const buttonElements = Children.map(flatElements, (child, index) => {
    return cloneElement(child as ReactElement, {
      className: cn({
        'flex-[1_1_120px]': index === 0,
        'flex-[2_1_230px]': index === 1,
      }),
    });
  });

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 mx-auto flex max-w-mobile items-center gap-8 pb-20 pt-10',
        {
          'px-16': isPadding,
          'bg-white': isBackground,
          'shadow-[0_-2px_14px_0_#F1F1F1C9]': isShadow,
        },
      )}
    >
      {buttonElements}
    </div>
  );
};
