import { TEXTS } from '@constants';
import type { ConnectionStatusProps } from '@models';

export function ConnectionStatus({ status, error, idInstance }: ConnectionStatusProps) {
  return (
    <span className={`status status--${status}`} title={error}>
      <span className="status-dot" />
      {TEXTS.connection[status]} ({idInstance})
    </span>
  );
}
