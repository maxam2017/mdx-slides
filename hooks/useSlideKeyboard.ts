import { useRef, useEffect } from 'react';

const isPrev = (key: KeyboardEvent['key']) =>
  key === 'Up' || key === 'ArrowUp' || key === 'Left' || key === 'ArrowLeft';
const isNext = (key: KeyboardEvent['key']) =>
  key === 'Down' ||
  key === 'ArrowDown' ||
  key === 'Right' ||
  key === 'ArrowRight';

interface Options {
  onPrev?(): void;
  onNext?(): void;
}

/**
 * @description listener for prev/next keyboard event
 */
export default function useSlideKeyboard({ onPrev, onNext }: Options) {
  const prevRef = useRef(onPrev);
  const nextRef = useRef(onNext);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (isPrev(event.key)) prevRef.current?.();
      if (isNext(event.key)) nextRef.current?.();
    };
    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);
}
