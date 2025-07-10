
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ICONS } from '../constants';
import CreatePostModal from './CreatePostModal';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);

  if (!user) return null;

  const navItems = [
    { path: '/', icon: ICONS.Home },
    { path: '#create', icon: ICONS.Add, action: () => setCreatePostOpen(true) },
    { path: `/profile/${user.username}`, icon: () => <img src={user.avatar} alt="Profile" className="w-6 h-6 rounded-full" /> },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-surface-2 p-2 md:hidden">
        <div className="flex justify-around items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path === '#create' ? '#' : item.path}
              onClick={item.action}
              className={`p-2 rounded-full ${location.pathname === item.path && item.path !== '#create' ? 'bg-surface-2' : ''}`}
            >
              {typeof item.icon === 'function' ? item.icon({className: "w-6 h-6 text-primary"}) : item.icon}
            </Link>
          ))}
        </div>
      </nav>
      {isCreatePostOpen && <CreatePostModal onClose={() => setCreatePostOpen(false)} />}
    </>
  );
};

export default Navbar;
