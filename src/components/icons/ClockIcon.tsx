import { TEXTS } from '@constants';

export function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" aria-label={TEXTS.messageStatus.pending}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}
