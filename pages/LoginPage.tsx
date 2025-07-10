
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Mock, not really used
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay
    setTimeout(() => {
      const success = login(username);
      if (success) {
        navigate('/');
      } else {
        setError('Geçersiz kullanıcı adı. "dev_dreamer" veya "pixel_artist" deneyin.');
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-sm p-8 space-y-8 bg-surface-1 rounded-2xl shadow-lg">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Gemini Gram</h1>
            <p className="mt-2 text-secondary">Arkadaşlarının fotoğraflarını ve videolarını görmek için giriş yap.</p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4">
             <Input
                id="username"
                type="text"
                placeholder="Kullanıcı Adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                aria-label="Kullanıcı Adı"
              />
              <Input
                id="password"
                type="password"
                placeholder="Parola"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-label="Parola"
              />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div>
             <Button type="submit" disabled={isLoading || !username || !password}>
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                ) : (
                  'Giriş Yap'
                )}
            </Button>
          </div>
        </form>
         <div className="text-center text-sm text-secondary">
          <p>Hesabın yok mu? <Link to="/signup" className="font-semibold text-accent hover:underline">Kaydol</Link></p>
          <p className="mt-2">Giriş yapmak için sahte bir kullanıcı kullanın: <br/> <code className="bg-surface-2 p-1 rounded">dev_dreamer</code>, <code className="bg-surface-2 p-1 rounded">pixel_artist</code>, or <code className="bg-surface-2 p-1 rounded">nature_nomad</code></p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;