
import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';
import { ICONS } from '../constants';
import { useApp } from '../hooks/useApp';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const { toggleLike } = useApp();

  const handleLike = () => {
    toggleLike(post.id);
  };

  return (
    <div className="bg-background md:border md:border-surface-2 md:rounded-lg mb-4">
      <div className="flex items-center p-3">
        <Link to={`/profile/${post.user.username}`}>
            <img src={post.user.avatar} alt={post.user.username} className="w-8 h-8 rounded-full mr-3" />
        </Link>
        <Link to={`/profile/${post.user.username}`} className="font-bold text-sm hover:underline">
          {post.user.username}
        </Link>
      </div>
      
      <img src={post.imageUrl} alt="Post content" className="w-full object-cover" />

      <div className="p-3">
        <div className="flex items-center space-x-4 mb-2">
          <button onClick={handleLike}>
            <ICONS.Heart className={`w-6 h-6 transition-colors ${post.isLikedByCurrentUser ? 'text-red-500 fill-current' : 'text-primary'}`} />
          </button>
          <ICONS.Comment className="w-6 h-6 text-primary" />
          <ICONS.Send className="w-6 h-6 text-primary" />
        </div>

        <p className="font-bold text-sm">{post.likes.toLocaleString()} beğeni</p>

        <div className="text-sm mt-1">
          <Link to={`/profile/${post.user.username}`} className="font-bold hover:underline">{post.user.username}</Link>
          <span className="ml-2">{post.caption}</span>
        </div>

        {post.comments.length > 0 && (
          <p className="text-secondary text-sm mt-2">{post.comments.length} yorumun tümünü gör</p>
        )}
        
        <p className="text-secondary text-xs uppercase mt-2">{post.timestamp}</p>
      </div>
    </div>
  );
};

export default PostCard;