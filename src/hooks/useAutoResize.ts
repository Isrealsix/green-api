import { useEffect, type RefObject } from 'react';
import { MAX_COMPOSER_HEIGHT } from '@constants';

export function useAutoResize(
  ref: RefObject<HTMLTextAreaElement>,
  value: string,
  maxHeight = MAX_COMPOSER_HEIGHT
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, maxHeight) + 'px';
  }, [ref, value, maxHeight]);
}
