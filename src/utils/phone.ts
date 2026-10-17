export function normalizePhone(input: string) {
  let digits = input.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('8')) {
    digits = '7' + digits.slice(1);
  }
  return digits;
}

export function isValidPhone(digits: string) {
  return digits.length >= 10 && digits.length <= 15;
}

export function phoneToChatId(phone: string) {
  return `${phone}@c.us`;
}
