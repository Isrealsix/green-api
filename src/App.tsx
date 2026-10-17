import { ChatWindow } from '@components/Chat';
import { Login } from '@components/Login';
import { Sidebar } from '@components/Sidebar';
import { useNotifications } from '@hooks';
import { selectActiveChat, useAuthStore, useChatStore } from '@store';

export function App() {
  const credentials = useAuthStore((state) => state.credentials);
  const hasActiveChat = useChatStore((state) => selectActiveChat(state) !== null);
  const { status, error } = useNotifications();

  if (!credentials) {
    return <Login />;
  }

  return (
    <div className={hasActiveChat ? 'app has-active' : 'app'}>
      <Sidebar idInstance={credentials.idInstance} status={status} error={error} />
      <ChatWindow />
    </div>
  );
}
