import type { ChatLogoProps } from '@models';

export function ChatLogo({ size = 32 }: ChatLogoProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <rect width="48" height="48" rx="11" fill="var(--accent)" />
      <path
        d="M24 12c-7.2 0-13 4.8-13 10.8 0 3.3 1.8 6.3 4.6 8.3-.3 1.9-1.2 3.7-2.6 5 2.9-.1 5.5-1.1 7.4-2.7 1.2.3 2.3.4 3.6.4 7.2 0 13-4.8 13-10.9S31.2 12 24 12z"
        fill="#fff"
      />
      <circle cx="18.5" cy="23" r="1.8" fill="var(--accent)" />
      <circle cx="24" cy="23" r="1.8" fill="var(--accent)" />
      <circle cx="29.5" cy="23" r="1.8" fill="var(--accent)" />
    </svg>
  );
}
