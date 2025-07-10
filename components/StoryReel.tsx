
import React, { useState } from 'react';
import { useApp } from '../hooks/useApp';
import { Story } from '../types';
import StoryViewerModal from './StoryViewerModal';

const StoryReel: React.FC = () => {
  const { stories } = useApp();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <>
      <div className="p-4 border-b border-surface-2">
        <div className="flex space-x-4 overflow-x-auto pb-2 -mb-2">
          {stories.map(story => (
            <div key={story.id} className="flex-shrink-0 text-center cursor-pointer" onClick={() => setSelectedStory(story)}>
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-br from-yellow-400 via-red-500 to-purple-600">
                  <div className="bg-background p-0.5 rounded-full">
                     <img className="w-full h-full rounded-full object-cover" src={story.user.avatar} alt={story.user.username} />
                  </div>
              </div>
              <p className="text-xs mt-1 truncate w-16">{story.user.username}</p>
            </div>
          ))}
        </div>
      </div>
      {selectedStory && <StoryViewerModal story={selectedStory} onClose={() => setSelectedStory(null)} />}
    </>
  );
};

export default StoryReel;
