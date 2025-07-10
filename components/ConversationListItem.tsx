import React from 'react';
import { Link } from 'react-router-dom';
import { Conversation } from '../types';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../hooks/useApp';

interface ConversationListItemProps {
  conversation: Conversation;
}

const ConversationListItem: React.FC<ConversationListItemProps> = ({ conversation }) => {
  const { user: currentUser } = useAuth();
  const { getUserById } = useApp();
  
  if (!currentUser) return null;

  const otherParticipantId = conversation.participantIds.find(id => id !== currentUser.id);
  if (!otherParticipantId) return null;

  const otherUser = getUserById(otherParticipantId);
  if (!otherUser) return null;
  
  const lastMessage = conversation.messages[conversation.messages.length - 1];

  return (
    <Link to={`/messages/${conversation.id}`} className="flex items-center p-3 hover:bg-surface-2 transition-colors duration-150">
      <img src={otherUser.avatar} alt={otherUser.username} className="w-14 h-14 rounded-full mr-4" />
      <div className="flex-grow overflow-hidden">
        <p className="font-bold truncate">{otherUser.username}</p>
        {lastMessage && (
            <p className="text-sm text-secondary truncate">
                {lastMessage.senderId === currentUser.id ? 'Siz: ' : ''}
                {lastMessage.text}
            </p>
        )}
      </div>
      {lastMessage && (
         <p className="text-xs text-secondary flex-shrink-0 ml-2">{lastMessage.timestamp}</p>
      )}
    </Link>
  );
};

export default ConversationListItem;