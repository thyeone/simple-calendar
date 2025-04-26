import { AnimatePresence } from "framer-motion";
import { Portal } from "./Portal";

type AnimatePortalProps = {
  isOpen: boolean;
};

export function AnimatePortal({
  children,
  isOpen,
}: PropsWithStrictChildren<AnimatePortalProps>) {
  return (
    <Portal>
      <AnimatePresence>{isOpen && children}</AnimatePresence>
    </Portal>
  );
}
