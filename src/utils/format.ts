import { LOCALE, TEXTS } from '@constants';

const timeFormat = new Intl.DateTimeFormat(LOCALE, { hour: '2-digit', minute: '2-digit' });
const dayFormat = new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'long' });

export function formatTime(ms: number) {
  return timeFormat.format(new Date(ms));
}

export function formatDay(ms: number) {
  const date = new Date(ms);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return TEXTS.dates.today;
  if (date.toDateString() === yesterday.toDateString()) return TEXTS.dates.yesterday;
  return dayFormat.format(date);
}
