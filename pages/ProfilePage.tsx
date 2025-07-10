import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { users } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import { useApp } from '../hooks/useApp';
import Button from '../components/ui/Button';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { user: currentUser, logout } = useAuth();
  const { posts, getOrCreateConversation } = useApp();

  const profileUser = users.find(u => u.username === username);
  const userPosts = posts.filter(p => p.user.username === username);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  const handleSendMessage = () => {
    if (!profileUser) return;
    const conversationId = getOrCreateConversation(profileUser.id);
    if (conversationId) {
      navigate(`/messages/${conversationId}`);
    }
  };

  if (!profileUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
        <h2 className="text-2xl font-bold">Kullanıcı bulunamadı</h2>
        <p className="text-secondary mt-2">@{username} adında bir kullanıcı mevcut değil.</p>
        <Button onClick={() => navigate('/')} className="mt-6 w-auto px-6">Ana Sayfaya Dön</Button>
      </div>
    );
  }

  const isOwnProfile = currentUser?.username === profileUser.username;

  return (
    <div className="max-w-4xl mx-auto p-4 md:py-8">
      <header className="flex items-center mb-8">
        <img
          src={profileUser.avatar}
          alt={profileUser.username}
          className="w-20 h-20 md:w-36 md:h-36 rounded-full mr-6 md:mr-16 border-2 border-surface-2"
        />
        <div className="flex-grow">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <h1 className="text-2xl font-light">{profileUser.username}</h1>
            {isOwnProfile ? (
              <Button onClick={handleLogout} className="bg-surface-2 text-primary hover:bg-surface-2/80 w-auto px-4 py-1 text-sm order-last md:order-none">
                Çıkış Yap
              </Button>
            ) : (
               <Button onClick={handleSendMessage} className="w-auto px-4 py-1 text-sm">Mesaj Gönder</Button>
            )}
          </div>
          <div className="hidden md:flex space-x-8 mb-4">
            <div><span className="font-bold">{userPosts.length}</span> gönderi</div>
            <div><span className="font-bold">{profileUser.followers.toLocaleString()}</span> takipçi</div>
            <div><span className="font-bold">{profileUser.following.toLocaleString()}</span> takip</div>
          </div>
          <div className="hidden md:block">
            <p className="font-bold">{profileUser.username}</p>
            <p className="text-secondary">{profileUser.bio}</p>
          </div>
        </div>
      </header>
      
      <div className="md:hidden mb-4">
        <p className="font-bold">{profileUser.username}</p>
        <p className="text-secondary">{profileUser.bio}</p>
      </div>
      
       {/* Stats for mobile */}
       <div className="flex justify-around text-center p-2 border-t border-b border-surface-2 md:hidden mb-4">
            <div>
                <p className="font-bold">{userPosts.length}</p>
                <p className="text-secondary text-sm">gönderi</p>
            </div>
            <div>
                <p className="font-bold">{profileUser.followers.toLocaleString()}</p>
                <p className="text-secondary text-sm">takipçi</p>
            </div>
            <div>
                <p className="font-bold">{profileUser.following.toLocaleString()}</p>
                <p className="text-secondary text-sm">takip</p>
            </div>
      </div>


      <div className="border-t border-surface-2 pt-1">
        <div className="grid grid-cols-3 gap-1">
          {userPosts.map(post => (
            <div key={post.id} className="aspect-square bg-surface-1">
              <Link to={`/`}>
                <img src={post.imageUrl} alt={`Gönderen: ${post.user.username}`} className="w-full h-full object-cover" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;