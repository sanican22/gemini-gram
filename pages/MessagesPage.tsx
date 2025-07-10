import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../hooks/useApp';
import { useAuth } from '../hooks/useAuth';
import ConversationListItem from '../components/ConversationListItem';
import { users } from '../data/mockData';

const MessagesPage: React.FC = () => {
  const { conversations } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  if (!user) return null;

  const botUser = users.find(u => u.isBot);

  const userConversations = conversations
    .filter(c => c.participantIds.includes(user.id))
    .sort((a, b) => {
        const lastMsgA = a.messages[a.messages.length - 1];
        const lastMsgB = b.messages[b.messages.length - 1];
        if (!lastMsgA) return 1;
        if (!lastMsgB) return -1;
        return lastMsgB.id - lastMsgA.id;
    });

  const botConversation = botUser ? userConversations.find(c => c.participantIds.includes(botUser.id)) : undefined;
  const otherConversations = botUser ? userConversations.filter(c => !c.participantIds.includes(botUser.id)) : userConversations;

  return (
    <div className="max-w-2xl mx-auto h-screen flex flex-col">
      <header className="flex items-center p-4 border-b border-surface-2 sticky top-0 bg-background z-10">
        <button onClick={() => navigate(-1)} className="mr-4">
            <i className="fas fa-arrow-left text-xl"></i>
        </button>
        <h1 className="text-xl font-bold">{user.username}</h1>
      </header>
      
      <div className="flex-grow overflow-y-auto">
        <h2 className="p-4 font-bold text-lg">Mesajlar</h2>
        {botConversation && <ConversationListItem key={botConversation.id} conversation={botConversation} />}
        {otherConversations.map(convo => (
            <ConversationListItem key={convo.id} conversation={convo} />
        ))}
        {userConversations.length === 0 && (
          <div className="text-center p-10 text-secondary">
            <p>Henüz mesajınız yok.</p>
            <p className="text-sm">Başka bir kullanıcının profilinden mesaj göndermeyi deneyin.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagesPage;