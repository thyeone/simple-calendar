import { cn } from '@/libs/cn';
import { useId } from 'react';
import { Flex } from '@/headless/ui/Flex';
import { Icon } from '@/headless/icon/Icon';

type CheckBoxProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function CheckBox({
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
      <label htmlFor={id} className="cursor-pointer">
        {checked ? (
          <Icon name="Calendar" size={24} className="text-brand-500" />
        ) : (
          <Icon name="Calendar" size={24} className="text-gray-300" />
        )}
      </label>

      <label htmlFor={id} className="cursor-pointer text-[16px] font-medium">
        {label}
      </label>
    </Flex>
  );
}
