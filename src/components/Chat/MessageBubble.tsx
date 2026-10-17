import { CheckIcon, ClockIcon, ErrorIcon } from '@components/icons';
import type { MessageBubbleProps } from '@models';
import { formatTime } from '@utils';

export function MessageBubble({ message }: MessageBubbleProps) {
  const failed = message.status === 'failed';

  return (
    <>
      <div className={message.out ? 'message message--out' : 'message message--in'}>
        <div className={failed ? 'bubble bubble--failed' : 'bubble'}>
          <span className="bubble-text">{message.text}</span>
          <span className="bubble-meta">
            {formatTime(message.time)}
            {message.out && <StatusIcon message={message} />}
          </span>
        </div>
      </div>

      {message.error && <p className="send-error">{message.error}</p>}
    </>
  );
}

function StatusIcon({ message }: MessageBubbleProps) {
  if (message.status === 'pending') return <ClockIcon />;
  if (message.status === 'failed') return <ErrorIcon />;
  return <CheckIcon />;
}
