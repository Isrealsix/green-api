export const GREEN_API_HOST = 'api.green-api.com';
export const DEFAULT_API_URL = `https://${GREEN_API_HOST}`;

export const POLL_TIMEOUT_SECONDS = 20;
export const RETRY_DELAY_MS = 3000;

export const MAX_MESSAGE_LENGTH = 4000;
export const MAX_COMPOSER_HEIGHT = 160;

export const STORAGE_KEYS = {
  credentials: 'max-chat:creds',
  chats: 'max-chat:chats',
} as const;

export const AVATAR_COLORS = [
  '#ff9f0a',
  '#30d158',
  '#64d2ff',
  '#0a84ff',
  '#5e5ce6',
  '#bf5af2',
  '#ff375f',
];
