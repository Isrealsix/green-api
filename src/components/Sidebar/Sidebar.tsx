import { useState } from 'react';
import { ChatLogo, ComposeIcon, LogoutIcon } from '@components/icons';
import { ChatListItem } from '@components/Sidebar/ChatListItem';
import { ConnectionStatus } from '@components/Sidebar/ConnectionStatus';
import { NewChatForm } from '@components/Sidebar/NewChatForm';
import { TEXTS } from '@constants';
import type { SidebarProps } from '@models';
import { useAuthStore, useChatStore } from '@store';

const texts = TEXTS.sidebar;

export function Sidebar({ idInstance, status, error }: SidebarProps) {
  const chats = useChatStore((state) => state.chats);
  const activeId = useChatStore((state) => state.activeId);
  const openChat = useChatStore((state) => state.openChat);
  const createChat = useChatStore((state) => state.createChat);
  const closeChat = useChatStore((state) => state.closeChat);
  const logout = useAuthStore((state) => state.logout);

  const [showNewChat, setShowNewChat] = useState(false);

  function handleCreate(phone: string) {
    createChat(phone);
    setShowNewChat(false);
  }

  function handleLogout() {
    closeChat();
    logout();
  }

  return (
    <aside className="sidebar">
      <header className="sidebar-header">
        <ChatLogo size={30} />
        <div className="sidebar-title">
          <h2>{texts.title}</h2>
          <ConnectionStatus status={status} error={error} idInstance={idInstance} />
        </div>
        <button
          className="icon-button"
          title={texts.newChat}
          onClick={() => setShowNewChat((show) => !show)}
        >
          <ComposeIcon />
        </button>
        <button className="icon-button" title={texts.logout} onClick={handleLogout}>
          <LogoutIcon />
        </button>
      </header>

      {showNewChat && <NewChatForm onCreate={handleCreate} />}

      <ul className="chat-list">
        {chats.length === 0 && !showNewChat && (
          <li className="chat-list-empty">
            <p>{texts.empty}</p>
            <button className="link-button" onClick={() => setShowNewChat(true)}>
              {texts.startChat}
            </button>
          </li>
        )}

        {chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            active={chat.id === activeId}
            onSelect={openChat}
          />
        ))}
      </ul>
    </aside>
  );
}
