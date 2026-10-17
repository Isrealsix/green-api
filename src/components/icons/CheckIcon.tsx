import { TEXTS } from '@constants';

export function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-label={TEXTS.messageStatus.sent}>
      <path
        d="M4 12.5l5 5L20 6.5"
        stroke="currentColor"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
