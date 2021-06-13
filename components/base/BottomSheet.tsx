import React, { useMemo, useState } from 'react';
import { animated, config, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { Portal } from './Portal';

type RenderFn = (props: {
  onClose: () => void;
  rest: boolean;
}) => React.ReactElement;

interface Props {
  full?: boolean;
  height?: number;
  draggable?: boolean;
  renderTrigger: ({ open }: { open: (event: any) => void }) => React.ReactNode;
  children?: React.ReactElement | RenderFn;
}

export default function BottomSheet({
  height: propHeight = 400,
  full,
  draggable = true,
  children,
  renderTrigger,
}: Props) {
  const height = useMemo(
    () =>
      full && typeof window !== 'undefined'
        ? window.innerHeight - 12
        : propHeight,
    [full, propHeight],
  );

  const [show, setShow] = useState(false);
  const [rest, setRest] = useState(false);

  const [{ y }, api] = useSpring(() => ({
    y: height,
    onRest: ({ value: { y } }) => setRest(y === 0),
  }));

  const open = (options?: { canceled: boolean }) => {
    const { canceled } = options || {};
    api.start({
      y: 0,
      immediate: false,
      config: canceled
        ? config.wobbly
        : // prettier-ignore
        full ? { tension: 170, friction: 24 } : config.stiff,
    });
    setShow(true);
  };

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...config.stiff, velocity },
    });
    setShow(false);
  };

  const bind = useDrag(
    ({ last, vxvy: [, vy], movement: [, my], cancel, canceled }) => {
      if (my < -70) cancel();
      if (last) {
        my > height * 0.5 || vy > 0.5 ? close(vy) : open({ canceled });
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      initial: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    },
  );

  const display = y.to(py => (py < height ? 'block' : 'none'));

  if (typeof window === 'undefined') return null;

  return (
    <>
      {renderTrigger({ open })}
      <Portal>
        <animated.div
          className="fixed left-0 top-0 z-100 w-full h-full bg-black bg-opacity-40 transition-opacity duration-200"
          onClick={() => close(0.8)}
          style={{
            opacity: show ? 1 : 0,
            pointerEvents: y.to(v => (v > height / 2 ? 'none' : 'all')),
          }}
        />
        <animated.div
          className="fixed left-0 w-full z-100 bg-white dark:bg-opacity-10 dark:shadow-sm rounded-t-xl"
          {...(draggable && { ...bind() })}
          style={{
            display,
            touchAction: 'none',
            height: 'calc(100% + 100px)',
            bottom: `calc(-100% + ${height - 100}px)`,
            y,
          }}>
          {show && (
            <div className="relative">
              {typeof children === 'function'
                ? children({ onClose: () => close(0.8), rest })
                : children}
              <div className="absolute h-1 top-1.5 w-10 rounded-lg bg-gray-200 dark:bg-white dark:bg-opacity-20 left-1/2 transform -translate-x-1/2" />
            </div>
          )}
        </animated.div>
      </Portal>
    </>
  );
}
