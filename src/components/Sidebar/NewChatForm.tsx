import { useState, type FormEvent } from 'react';
import { TEXTS } from '@constants';
import type { NewChatFormProps } from '@models';
import { isValidPhone, normalizePhone } from '@utils';

const texts = TEXTS.newChat;

export function NewChatForm({ onCreate }: NewChatFormProps) {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const digits = normalizePhone(phone);
    if (!isValidPhone(digits)) {
      setError(texts.invalidPhone);
      return;
    }

    onCreate(digits);
  }

  return (
    <form className="new-chat" onSubmit={handleSubmit}>
      <input
        autoFocus
        type="tel"
        placeholder={texts.phonePlaceholder}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button className="button-primary">{texts.create}</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
