import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useRef } from 'react';

const makeClamp = (a: number, b: number) => (v: number) => {
  if (a > b) return Math.max(Math.min(a, v), b);
  return Math.max(Math.min(b, v), a);
};

interface Options {
  size: number;
  onStep?(step: number): void;
}

/**
 * @description control step with hash router
 */
export default function useStep({ size, onStep }: Options) {
  const clamp = useMemo(() => makeClamp(0, size - 1), [size]);
  const router = useRouter();
  const stepRef = useRef(clamp(+router.asPath.split('#')[1] - 1) || 0);
  const onStepRef = useRef(onStep);

  // init from hash route
  useEffect(() => {
    if (Number.isNaN(+router.asPath.split('#')[1])) {
      router.push(`/#${stepRef.current + 1}`, undefined, { shallow: true });
    }
  }, []);

  const move = useCallback((diff: number) => {
    const v = Math.min(Math.max(0, stepRef.current + diff), size - 1);
    stepRef.current = v;
    router.push(`/#${v + 1}`, undefined, { shallow: true });
    onStepRef.current?.(v);
  }, []);

  return { stepRef, move };
}
