import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Post, Story, Conversation, Message, User } from '../types';
import { 
  posts as initialPosts, 
  stories as storiesData,
  conversations as initialConversations,
  users as allUsers
} from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import { generateBotResponse } from '../services/geminiService';

interface AppContextType {
  posts: Post[];
  stories: Story[];
  conversations: Conversation[];
  isBotTyping: Record<number, boolean>;
  addPost: (newPostData: { imageUrl: string; caption: string }) => void;
  toggleLike: (postId: number) => void;
  sendMessage: (conversationId: number, text: string) => void;
  getOrCreateConversation: (targetUserId: number) => number | null;
  getUserById: (userId: number) => User | undefined;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppProviderProps {
  children: ReactNode;
}

const botUser = allUsers.find(u => u.isBot);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [stories] = useState<Story[]>(storiesData);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [isBotTyping, setBotTyping] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (user && botUser) {
      const botConvoExists = conversations.some(c => 
        c.participantIds.includes(user.id) && c.participantIds.includes(botUser.id)
      );

      if (!botConvoExists) {
        const newBotConvo: Conversation = {
          id: Date.now(),
          participantIds: [user.id, botUser.id],
          messages: [
            { id: Date.now() + 1, senderId: botUser.id, text: `Merhaba ${user.username}! Ben Gemini Asistan. Sana nasıl yardımcı olabilirim?`, timestamp: 'az önce' }
          ]
        };
        setConversations(prev => [...prev, newBotConvo]);
      }
    }
  }, [user]);

  const getUserById = (userId: number): User | undefined => allUsers.find(u => u.id === userId);

  const addPost = ({ imageUrl, caption }: { imageUrl: string; caption: string }) => {
    if (!user) return;

    const newPost: Post = {
      id: Date.now(),
      user: user,
      imageUrl,
      caption,
      likes: 0,
      comments: [],
      timestamp: 'az önce',
      isLikedByCurrentUser: false,
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
  };
  
  const toggleLike = (postId: number) => {
    setPosts(posts.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLikedByCurrentUser;
        return {
          ...p,
          isLikedByCurrentUser: isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1,
        };
      }
      return p;
    }));
  };

  const sendMessage = (conversationId: number, text: string) => {
    if (!user || !text.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      senderId: user.id,
      text,
      timestamp: 'az önce'
    };
    
    // Immediately add the user's message to the conversation
    const updatedConversations = conversations.map(c => 
      c.id === conversationId 
        ? { ...c, messages: [...c.messages, newMessage] } 
        : c
    );
    setConversations(updatedConversations);

    // Check if it's a bot conversation and trigger a response
    const conversation = updatedConversations.find(c => c.id === conversationId);
    if (conversation && botUser && conversation.participantIds.includes(botUser.id)) {
      setBotTyping(prev => ({ ...prev, [conversationId]: true }));

      // Use an async IIFE to handle the promise
      (async () => {
        const botResponseText = await generateBotResponse(conversation.messages, botUser, user);
        const botMessage: Message = {
          id: Date.now() + 1, // Ensure unique ID
          senderId: botUser.id,
          text: botResponseText,
          timestamp: 'az önce'
        };

        setConversations(prevConvos =>
          prevConvos.map(c =>
            c.id === conversationId
              ? { ...c, messages: [...c.messages, botMessage] }
              : c
          )
        );
        setBotTyping(prev => ({ ...prev, [conversationId]: false }));
      })();
    }
  };

  const getOrCreateConversation = (targetUserId: number): number | null => {
    if (!user) return null;

    const existingConversation = conversations.find(c => 
      c.participantIds.includes(user.id) && c.participantIds.includes(targetUserId)
    );

    if (existingConversation) {
      return existingConversation.id;
    }

    const newConversation: Conversation = {
      id: Date.now(),
      participantIds: [user.id, targetUserId],
      messages: [],
    };
    setConversations(prev => [...prev, newConversation]);
    return newConversation.id;
  };

  return (
    <AppContext.Provider value={{ posts, stories, conversations, isBotTyping, addPost, toggleLike, sendMessage, getOrCreateConversation, getUserById }}>
      {children}
    </AppContext.Provider>
  );
};