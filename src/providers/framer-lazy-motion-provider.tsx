import { LazyMotion, domMax } from 'framer-motion';

const FramerLazyMotionProvider = ({ children }: PropsWithStrictChildren) => {
  return <LazyMotion features={domMax}>{children}</LazyMotion>;
};

export default FramerLazyMotionProvider;
