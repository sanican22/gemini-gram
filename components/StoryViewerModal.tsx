
import React from 'react';
import { Story } from '../types';

interface StoryViewerModalProps {
  story: Story;
  onClose: () => void;
}

const StoryViewerModal: React.FC<StoryViewerModalProps> = ({ story, onClose }) => {
  // Auto-close after 5 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-surface-1 rounded-2xl w-full max-w-sm h-[90vh] shadow-xl animate-fade-in relative overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="absolute top-0 left-0 w-full p-3 z-10 bg-gradient-to-b from-black/50 to-transparent">
          <div className="h-1 bg-white/30 w-full rounded-full overflow-hidden">
            <div className="h-full bg-white animate-story-progress"></div>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <img src={story.user.avatar} alt={story.user.username} className="w-8 h-8 rounded-full" />
            <span className="text-white text-sm font-bold">{story.user.username}</span>
          </div>
        </div>
        <img src={story.imageUrl} alt={`Story by ${story.user.username}`} className="w-full h-full object-cover" />
      </div>
      <style>{`
        @keyframes story-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-story-progress {
          animation: story-progress 5s linear forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default StoryViewerModal;
