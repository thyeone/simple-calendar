import { OverlayProvider } from 'overlay-kit';
import { ReactQueryProvider } from './react-query-provider';
import { AsyncBoundary } from '@/headless/async-boundary';
import Toaster from '@/headless/Toaster';
import FramerLazyMotionProvider from './framer-lazy-motion-provider';

export function Providers({ children }: PropsWithStrictChildren) {
  return (
    <FramerLazyMotionProvider>
      <ReactQueryProvider>
        <AsyncBoundary>
          <OverlayProvider>
            {children}
            <Toaster />
          </OverlayProvider>
        </AsyncBoundary>
      </ReactQueryProvider>
    </FramerLazyMotionProvider>
  );
}
