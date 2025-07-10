
import React, { useState, useCallback } from 'react';
import { generateCaption } from '../services/geminiService';
import Input from './ui/Input';
import Button from './ui/Button';
import { useApp } from '../hooks/useApp';

interface CreatePostModalProps {
  onClose: () => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ onClose }) => {
  const [imageTopic, setImageTopic] = useState('');
  const [generatedCaption, setGeneratedCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [postImageUrl, setPostImageUrl] = useState('https://picsum.photos/seed/newpostplaceholder/600/800');
  const { addPost } = useApp();

  const handleGenerateCaption = useCallback(async () => {
    if (!imageTopic) return;
    setIsLoading(true);
    setGeneratedCaption(''); // Clear previous caption
    // Generate a unique image based on the topic
    setPostImageUrl(`https://picsum.photos/seed/${imageTopic.trim().replace(/\s/g, '-')}/600/800`);
    const caption = await generateCaption(imageTopic);
    setGeneratedCaption(caption);
    setIsLoading(false);
  }, [imageTopic]);

  const handlePost = () => {
    addPost({
      imageUrl: postImageUrl,
      caption: generatedCaption,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" aria-modal="true" role="dialog" onClick={onClose}>
      <div className="bg-surface-1 rounded-2xl w-full max-w-md p-6 shadow-xl animate-fade-in" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Yeni Gönderi Oluştur</h2>
          <button onClick={onClose} className="text-secondary hover:text-primary text-2xl font-light" aria-label="Kapat">&times;</button>
        </div>

        <div className="space-y-4">
          <div className="bg-surface-2 rounded-lg overflow-hidden">
             <img src={postImageUrl} alt="Oluşturulan gönderi önizlemesi" className="w-full h-auto object-cover aspect-[4/5] transition-opacity duration-300" />
          </div>

          <div>
            <label htmlFor="image-topic" className="block text-sm font-medium text-secondary mb-1">
              Fotoğrafın ne hakkında?
            </label>
            <div className="flex gap-2">
              <Input
                id="image-topic"
                type="text"
                value={imageTopic}
                onChange={(e) => setImageTopic(e.target.value)}
                placeholder="örn. dağların üzerinde bir gün batımı"
                disabled={isLoading}
                aria-describedby="topic-helper-text"
              />
              <Button onClick={handleGenerateCaption} disabled={isLoading || !imageTopic} className="w-auto px-5">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  'Oluştur'
                )}
              </Button>
            </div>
            <p id="topic-helper-text" className="text-xs text-secondary mt-1">Bu, bir görsel ve bir başlık oluşturacaktır.</p>
          </div>
          
          <div>
            <label htmlFor="caption" className="block text-sm font-medium text-secondary mb-1">
              YZ Destekli Başlık (Düzenlenebilir)
            </label>
            <textarea
              id="caption"
              rows={4}
              className="w-full bg-surface-2 border border-surface-2 rounded-md px-3 py-2 text-sm text-primary placeholder-secondary focus:outline-none focus:ring-1 focus:ring-accent transition-all disabled:opacity-50"
              value={generatedCaption}
              onChange={(e) => setGeneratedCaption(e.target.value)}
              placeholder="Başlık burada görünecek..."
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button onClick={onClose} className="bg-surface-2 text-primary hover:bg-surface-2/80 w-auto px-5">İptal</Button>
          <Button onClick={handlePost} disabled={!generatedCaption || isLoading} className="w-auto px-5">Paylaş</Button>
        </div>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.2s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default CreatePostModal;