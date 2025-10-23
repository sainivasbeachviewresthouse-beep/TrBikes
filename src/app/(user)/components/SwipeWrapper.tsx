'use client';

import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useRouter, usePathname } from 'next/navigation';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const pageOrder = ['/', '/about', '/bikes', '/gallery', '/contact'];

const pageVariants = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 100 : -100,
  }),
  in: { opacity: 1, x: 0 },
  outLeft: { opacity: 0, x: -100 },
  outRight: { opacity: 0, x: 100 },
};

export default function SwipeWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentIndex = pageOrder.indexOf(pathname);

  const [isSwiping, setIsSwiping] = React.useState(false);
  const [exitDirection, setExitDirection] = React.useState<'outLeft' | 'outRight'>('outLeft');

  // Motion values to track swipe distance for dynamic blur
  const x = useMotionValue(0);
  // Map absolute swipe distance to a blur value (0px → 8px)
  const blur = useTransform(x, [-200, 0, 200], [8, 0, 8]);

  const handlers = useSwipeable({
    onSwiping: (eventData) => {
      // Track the live drag distance
      x.set(-eventData.deltaX);
    },
    onSwipedLeft: () => {
      if (currentIndex !== -1 && currentIndex < pageOrder.length - 1) {
        setExitDirection('outLeft');
        setIsSwiping(true);
        router.push(pageOrder[currentIndex + 1]);
      }
      x.set(0);
    },
    onSwipedRight: () => {
      if (currentIndex > 0) {
        setExitDirection('outRight');
        setIsSwiping(true);
        router.push(pageOrder[currentIndex - 1]);
      }
      x.set(0);
    },
    onSwiped: () => x.set(0), // reset after swipe
    delta: 10,
    trackMouse: true,
  });

  React.useEffect(() => {
    const timeout = setTimeout(() => setIsSwiping(false), 500);
    return () => clearTimeout(timeout);
  }, [pathname]);

  const entryDirection = exitDirection === 'outLeft' ? 1 : -1;

  return (
    <motion.div
      {...handlers}
      key={pathname}
      custom={entryDirection}
      initial={isSwiping ? 'initial' : false}
      animate="in"
      exit={isSwiping ? exitDirection : undefined}
      variants={pageVariants}
      transition={{ type: 'tween', duration: 0.4 }}
      style={{
        position: 'relative',
        width: '100%',
        height: 'auto',
        touchAction: 'pan-y',
        filter: blur ? blur : 'none', // dynamic blur based on swipe distance
      }}
    >
      {children}
    </motion.div>
  );
}
