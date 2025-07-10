import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/Navbar';
import SignUpPage from './pages/SignUpPage';
import MessagesPage from './pages/MessagesPage';
import ChatPage from './pages/ChatPage';

const App: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-primary font-sans">
      <main className="pb-16 md:pb-0">
        <Routes>
          <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUpPage />} />
          <Route path="/" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/profile/:username" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/messages" element={user ? <MessagesPage /> : <Navigate to="/login" />} />
          <Route path="/messages/:conversationId" element={user ? <ChatPage /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
        </Routes>
      </main>
      {user && <Navbar />}
    </div>
  );
};

export default App;