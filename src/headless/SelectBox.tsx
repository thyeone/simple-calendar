'use client';

import { cn } from '@/libs/cn';
import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Flex } from '@/headless/ui/Flex';
import { Icon } from '@/headless/icon/Icon';
import { Portal } from '@/headless/overlay/Portal';
import { useScrollLock } from '@/hooks/useScrollLock';

type SelectBoxProps<T> = Omit<
  React.ComponentPropsWithoutRef<'button'>,
  'value' | 'onClick' | 'onChange'
> & {
  value: T;
  menu?: T[];
  render: (value: T) => JSX.Element | string | null | undefined;
  renderMenu?: (value: T) => JSX.Element | string | null | undefined;
  placeholder?: string;
  disabled?: boolean;
  active?: boolean;
  isError?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  onChange?: (menu: T) => void;
  renderOver?: boolean;
};

export default function SelectBox<
  T extends string | string[] | number | null | undefined,
>({
  value,
  menu,
  render,
  renderMenu,
  placeholder = '선택',
  active,
  isError,
  className,
  onClick,
  onChange,
  renderOver,
  ...rest
}: SelectBoxProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  const handleMenuItemClick = (menuItem: T, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.(menuItem);
    setIsOpen(false);
  };

  if (menu) useScrollLock(isOpen);

  useEffect(() => {
    if (isOpen && buttonRef.current && dropdownRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();

      setDropdownPosition({
        top: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: dropdownRef.current.getBoundingClientRect().height,
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!buttonRef.current || !dropdownRef.current) return;

      if (
        !buttonRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      )
        setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Flex
        ref={buttonRef}
        as="button"
        type="button"
        align="center"
        className={cn(
          'relative min-h-50 w-full rounded-12 border border-gray-100 bg-gray-50 py-10 pl-16 pr-14 outline-none disabled:bg-gray-100 disabled:text-gray-400',
          className,
          {
            'border-gray-900 bg-white': isOpen,
            'border-state-red-600 bg-white': isError,
          },
        )}
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          if (menu) setIsOpen((prev) => !prev);
          if (!menu) onClick?.(e);
        }}
        {...rest}
      >
        <Flex align="center" className="gap-8">
          {value ? (
            React.isValidElement(render(value)) ? (
              render(value)
            ) : (
              <span className="text-body-2">{render(value)}</span>
            )
          ) : (
            <span className="text-body-2">{placeholder}</span>
          )}
        </Flex>
        <div className="ml-auto">
          <Icon name="Calendar" size={18} />
        </div>
      </Flex>
      <Portal>
        {isOpen && menu && (
          <motion.ul
            ref={dropdownRef}
            initial={{
              opacity: 0,
              y: '-10px',
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            style={{
              top: renderOver
                ? dropdownPosition.top - dropdownPosition.height - 50 - 6
                : dropdownPosition.top + 6,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
              maxHeight: '150px',
            }}
            className={cn(
              'fixed z-modal mx-auto max-w-mobile overflow-y-auto rounded-12 border border-gray-100 bg-white py-12 shadow-[0_3px_8px_0_#99999940]',
            )}
          >
            {menu.map((menuItem, index) => (
              <Flex
                key={index}
                as="li"
                align="center"
                justify="between"
                onClick={(e: React.MouseEvent<HTMLLIElement>) =>
                  handleMenuItemClick(menuItem, e)
                }
                className="relative z-10 h-44 cursor-pointer px-16 py-12 text-body-2 text-gray-950"
              >
                <span>{renderMenu ? renderMenu(menuItem) : menuItem}</span>
                {value === menuItem && (
                  <Icon
                    name="Calendar"
                    size={18}
                    className="text-state-blue-600"
                  />
                )}
              </Flex>
            ))}
          </motion.ul>
        )}
      </Portal>
    </>
  );
}
