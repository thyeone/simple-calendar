"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Flex } from "@/headless/ui/Flex";
import { ChevronDown } from "lucide-react";
import { cn } from "../libs/cn";

type AccordionContextType = {
  item: Set<string>;
  setter: (item: string) => void;
};

const AccordionContext = createContext<AccordionContextType | null>(null);

export const Accordion = ({
  children,
  defaultOpen = [],
}: PropsWithStrictChildren<{ defaultOpen?: string[] }>) => {
  const [item, setItem] = useState<Set<string>>(new Set(defaultOpen));

  const setter = useCallback(
    (value: string) => {
      const newItem = new Set(item);

      if (item.has(value)) {
        newItem.delete(value);
        setItem(newItem);
      } else {
        newItem.add(value);
        setItem(newItem);
      }
    },
    [item]
  );

  return (
    <AccordionContext.Provider value={{ item, setter }}>
      {children}
    </AccordionContext.Provider>
  );
};

export const useAccordion = () => {
  const context = useContext(AccordionContext);

  if (!context)
    throw new Error("부모 트리에서 AccordionContext를 사용해주세요.");

  return { ...context };
};

const AccordionItemContext = createContext<string | null>(null);

function Item({
  value,
  children,
}: PropsWithStrictChildren<{
  value: string;
}>) {
  return (
    <AccordionItemContext.Provider value={value}>
      {children}
    </AccordionItemContext.Provider>
  );
}

const useAccordionItem = () => {
  const context = useContext(AccordionItemContext);

  if (!context) throw new Error();

  return context;
};

function Trigger({
  children,
  buttonClassName,
  containerClassName,
}: PropsWithStrictChildren<{
  containerClassName?: string;
  buttonClassName?: string;
}>) {
  const value = useAccordionItem();
  const { item, setter } = useAccordion();

  return (
    <Flex
      align="center"
      className={cn("w-full cursor-pointer px-16 py-10", containerClassName)}
      onClick={() => setter(value)}
    >
      {children}
      <button className="ml-auto">
        <ChevronDown
          name="ArrowDownSLine"
          className={cn(
            "w-18 transition-transform",
            {
              "rotate-180": item.has(value),
            },
            buttonClassName
          )}
        />
      </button>
    </Flex>
  );
}

function Content({
  children,
  className,
  containerClassName,
}: PropsWithStrictChildren<{
  className?: string;
  containerClassName?: string;
}>) {
  const { item } = useAccordion();
  const label = useAccordionItem();
  const isActive = item.has(label);

  return (
    <motion.div
      className={cn(
        "h-auto overflow-hidden border-b border-gray-100",
        containerClassName
      )}
    >
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto" },
              collapsed: { opacity: 0, height: 0 },
            }}
          >
            <div className={cn("py-10", className)}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

Accordion.Item = Item;
Accordion.Trigger = Trigger;
Accordion.Content = Content;
