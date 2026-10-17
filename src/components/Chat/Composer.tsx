import { useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { SendIcon } from '@components/icons';
import { MAX_MESSAGE_LENGTH, TEXTS } from '@constants';
import { useAutoResize } from '@hooks';
import type { ComposerProps } from '@models';

export function Composer({ onSend }: ComposerProps) {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  useAutoResize(inputRef, text);

  function send(e?: FormEvent) {
    e?.preventDefault();
    const message = text.trim();
    if (!message) return;
    onSend(message);
    setText('');
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      send();
    }
  }

  return (
    <form className="composer" onSubmit={send}>
      <textarea
        ref={inputRef}
        autoFocus
        rows={1}
        maxLength={MAX_MESSAGE_LENGTH}
        placeholder={TEXTS.chat.inputPlaceholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className="send-button" title={TEXTS.chat.send} disabled={!text.trim()}>
        <SendIcon />
      </button>
    </form>
  );
}
