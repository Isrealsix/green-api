import { useEffect, type RefObject } from 'react';

export function useScrollToBottom(ref: RefObject<HTMLElement>, trigger: unknown) {
  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [ref, trigger]);
}
