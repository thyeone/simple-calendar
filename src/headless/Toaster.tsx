'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '../libs/cn';
import { AnimatePortal } from './overlay/AnimatePortal';

type Toast = {
  id: number;
  text: string;
  type: 'success' | 'fail';
  duration?: number;
};

type Action =
  | {
      type: 'ADD';
      toast: Toast;
    }
  | {
      type: 'REMOVE';
      id: number;
    };

let toastMemory: Toast[] = [];
let listeners: Array<(toasts: Toast[]) => void> = [];

const reducer = (state: Toast[], action: Action): Toast[] => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.toast];
    case 'REMOVE':
      return state.filter((toast) => toast.id !== action.id);
  }
};

const emitChange = () => {
  for (const listener of listeners) {
    listener(toastMemory);
  }
};

const dispatch = (action: Action) => {
  toastMemory = reducer(toastMemory, action);
  emitChange();
};

export const toast = {
  show: ({ type, text, duration }: Omit<Toast, 'id'>) => {
    const newToast = {
      id: Date.now(),
      type,
      text,
      duration: duration ?? 2500,
    };

    dispatch({ type: 'ADD', toast: newToast });

    setTimeout(() => {
      toast.remove(newToast.id);
    }, newToast.duration);
  },

  remove: (id: number) => {
    dispatch({ type: 'REMOVE', id });
  },

  subscribe: (listener: (toasts: Toast[]) => void) => {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
};

const TOAST_LIMIT_POLICY = 5;

const variants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = toast.subscribe((state) => {
      setToasts(state.slice(0, TOAST_LIMIT_POLICY));
    });

    return () => unsubscribe();
  }, []);

  return (
    <AnimatePortal isOpen={!!toasts.length}>
      <motion.div
        layout
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pointer-events-none fixed inset-x-0 bottom-68 z-modal mx-auto flex w-full max-w-[358px] flex-col justify-center gap-2 px-5"
      >
        <AnimatePresence>
          {toasts.map(({ id, type, text }) => (
            <motion.div
              key={id}
              layout
              variants={variants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={cn(
                `pointer-events-none inline-flex h-52 w-full select-none items-center gap-12 rounded-xl bg-gray-700 px-18 text-body-3 font-medium text-white backdrop-blur`,
              )}
            >
              {text}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </AnimatePortal>
  );
}
