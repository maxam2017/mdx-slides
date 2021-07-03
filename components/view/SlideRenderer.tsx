import { animated, useSpring } from 'react-spring';
import React, { useMemo } from 'react';
import { useDrag } from 'react-use-gesture';
import useSlideKeyboard from '~/hooks/useSlideKeyboard';
import useStep from '~/hooks/useStep';

type Slide = React.ReactNode[];
const stepToX = (x: number) => (x ? `-${x}00vw` : '0vw');

export default function SlideRenderer(props: React.PropsWithChildren<{}>) {
  const slides = useMemo(() => {
    return React.Children.toArray(props.children).reduce<Slide[]>(
      (prev, child) => {
        if ((child as any).props.mdxType === 'hr') {
          return [...prev, []];
        }
        const result = [...prev];
        result[result.length - 1].push(child);
        return result;
      },
      [[]],
    );
  }, [props.children]);

  const { stepRef, move } = useStep({
    size: slides.length,
    onStep: v => api.start({ x: stepToX(v) }),
  });

  const [style, api] = useSpring(() => ({ x: stepToX(stepRef.current) }));
  const bind = useDrag(
    ({ movement: [mx], last, cancel }) => {
      const threshold = 30;
      if (Math.abs(mx) > threshold + 10) cancel();
      if (last && Math.abs(mx) > threshold) {
        move(mx < 0 ? 1 : -1);
      }
    },
    { filterTaps: true },
  );

  useSlideKeyboard({
    onPrev: () => move(-1),
    onNext: () => move(1),
  });

  return (
    <div className="flex-1 flex overflow-x-hidden">
      <animated.div
        {...bind()}
        suppressHydrationWarning
        style={style}
        className="flex-1 text-gray-800 dark:text-gray-100 flex flex-nowrap select-none">
        {slides.map((slide, index) => (
          <div
            key={index}
            className="relative grid flex-col content-center justify-items-center gap-8 w-screen flex-shrink-0 h-full">
            {slide}
          </div>
        ))}
      </animated.div>
    </div>
  );
}
