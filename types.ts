export interface User {
  id: number;
  username: string;
  avatar: string;
  bio: string;
  postsCount: number;
  followers: number;
  following: number;
  isBot?: boolean;
}

export interface Comment {
  id: number;
  user: Pick<User, 'username'>;
  text: string;
}

export interface Story {
  id: number;
  user: Pick<User, 'username' | 'avatar'>;
  imageUrl: string;
}

export interface Post {
  id: number;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  isLikedByCurrentUser?: boolean;
}

export interface Message {
  id: number;
  senderId: number;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: number;
  participantIds: number[];
  messages: Message[];
}