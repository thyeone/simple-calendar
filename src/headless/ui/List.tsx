import { Fragment } from 'react';
import { Divider } from '@/headless/ui/Divider';
import { cn } from '@/libs/cn';
import { Flex } from '@/headless/ui/Flex';

type ListProps<T> = Omit<React.ComponentProps<typeof Flex>, 'children'> & {
  data: T[];
  renderItem: (
    data: T,
    index: number,
  ) => JSX.Element | boolean | null | undefined;
  renderEmpty?: () => JSX.Element | boolean | null | undefined;
  direction?: 'row' | 'col';
  className?: string;
  nonEmptyClassName?: string;
  divider?: JSX.Element;
  dividerOptions?: React.ComponentProps<typeof Divider>;
  hasDivider?: boolean;
  bottomElement?: JSX.Element;
};

export function List<T>({
  data,
  renderItem,
  renderEmpty,
  direction = 'col',
  className,
  nonEmptyClassName,
  divider,
  dividerOptions,
  hasDivider,
  bottomElement,
  ...props
}: ListProps<T>) {
  return (
    <Flex
      direction={direction}
      className={cn(className, {
        [nonEmptyClassName || '']: data.length,
      })}
      {...props}
    >
      {data.length === 0
        ? renderEmpty?.()
        : data.map((item, index) => {
            return (
              <Fragment key={index}>
                {renderItem(item, index)}
                {renderItem(item, index) &&
                  hasDivider &&
                  index !== data.length - 1 &&
                  (divider || <Divider {...dividerOptions} />)}
              </Fragment>
            );
          })}
      {bottomElement}
    </Flex>
  );
}
