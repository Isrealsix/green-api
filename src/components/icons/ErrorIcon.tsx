import { TEXTS } from '@constants';

export function ErrorIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-label={TEXTS.messageStatus.failed}>
      <circle cx="12" cy="12" r="10" fill="var(--danger)" />
      <path d="M12 7v6M12 16.5v.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}
