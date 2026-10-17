import { Fragment, useRef } from 'react';
import { MessageBubble } from '@components/Chat/MessageBubble';
import { TEXTS } from '@constants';
import { useScrollToBottom } from '@hooks';
import type { MessageListProps } from '@models';
import { formatDay } from '@utils';

export function MessageList({ chat }: MessageListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  useScrollToBottom(listRef, `${chat.id}:${chat.messages.length}`);

  return (
    <div className="messages" ref={listRef}>
      {chat.messages.length === 0 && <p className="messages-hint">{TEXTS.chat.emptyHint}</p>}

      {chat.messages.map((message, index) => {
        const day = formatDay(message.time);
        const previous = chat.messages[index - 1];
        const isNewDay = !previous || formatDay(previous.time) !== day;

        return (
          <Fragment key={message.id}>
            {isNewDay && <div className="day-divider">{day}</div>}
            <MessageBubble message={message} />
          </Fragment>
        );
      })}
    </div>
  );
}
