import React from 'react';
import { Link } from 'react-router-dom';
import PostCard from '../components/PostCard';
import { useApp } from '../hooks/useApp';
import { ICONS } from '../constants';
import StoryReel from '../components/StoryReel';

const HomePage: React.FC = () => {
  const { posts } = useApp();

  return (
    <div className="max-w-xl mx-auto md:pb-8">
       <header className="flex items-center justify-between p-4 border-b border-surface-2 md:border-none sticky top-0 bg-background z-10">
         <h1 className="text-xl font-serif font-bold">Gemini Gram</h1>
         <div className="flex items-center space-x-6">
             <button aria-label="Beğeniler">
                <ICONS.Heart className="w-7 h-7" />
             </button>
             <Link to="/messages" aria-label="Mesajlar">
                <ICONS.Send className="w-7 h-7" />
             </Link>
         </div>
      </header>
      <StoryReel />
      <div className="md:space-y-8">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;