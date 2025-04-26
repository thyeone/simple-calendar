import { cn } from '@/libs/cn';
import { useId } from 'react';
import { Flex } from './ui/Flex';
import { Icon } from './icon/Icon';

type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function Radio({
  checked,
  onChange,
  label,
  className,
  ...rest
}: CheckBoxProps) {
  const id = useId();

  return (
    <Flex align="center" gap={6} className="py-4">
      <input
        id={id}
        type="checkbox"
        className={cn('hidden appearance-none', className)}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <label
        htmlFor={id}
        className={cn('cursor-pointer', {
          'cursor-default': rest.disabled,
        })}
      >
        {checked ? (
          <Icon name="Calendar" size={24} className="text-brand-500" />
        ) : (
          <Icon
            name="Calendar"
            size={24}
            className={cn('text-gray-300', {
              'text-gray-100': rest.disabled,
            })}
          />
        )}
      </label>
      <label
        htmlFor={id}
        className={cn('cursor-pointer text-[16px] font-medium', {
          'cursor-default text-gray-200': rest.disabled,
        })}
      >
        {label}
      </label>
    </Flex>
  );
}
