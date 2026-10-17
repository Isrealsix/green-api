import { AVATAR_COLORS } from '@constants';
import type { AvatarProps } from '@models';

function getInitials(name: string) {
  const clean = name.replace(/^\+/, '').trim();

  if (/^\d/.test(clean)) return clean.slice(-2);

  const [first = '', second = ''] = clean.split(/\s+/);
  return (first.charAt(0) + second.charAt(0)).toUpperCase();
}

function pickColor(name: string) {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

export function Avatar({ name, size = 44 }: AvatarProps) {
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.4,
        backgroundColor: pickColor(name),
      }}
    >
      {getInitials(name)}
    </div>
  );
}
