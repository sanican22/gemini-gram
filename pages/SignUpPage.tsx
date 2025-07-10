
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network delay and mock sign-up
    setTimeout(() => {
      alert('Hesap başarıyla oluşturuldu! Bu bir demo uygulamasıdır. Lütfen "dev_dreamer" gibi mevcut kullanıcılardan biriyle giriş yapın.');
      setIsLoading(false);
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-full max-w-sm p-8 space-y-6 bg-surface-1 rounded-2xl shadow-lg">
        <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-primary">Gemini Gram</h1>
            <p className="mt-2 text-secondary">Arkadaşlarının fotoğraflarını görmek için kaydol.</p>
        </div>
        <form className="space-y-4" onSubmit={handleSignUp}>
          <Input
            id="email"
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="E-posta"
          />
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
          <p className="text-xs text-secondary text-center px-2">
            Hizmet Koşullarımızı, Gizlilik Politikamızı ve Çerezler Politikamızı kabul etmiş olursunuz.
          </p>
          <Button type="submit" disabled={isLoading || !email || !username || !password}>
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
            ) : (
              'Kaydol'
            )}
          </Button>
        </form>
         <div className="text-center text-sm text-secondary">
            <p>Hesabın var mı? <Link to="/login" className="font-semibold text-accent hover:underline">Giriş Yap</Link></p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;