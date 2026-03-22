import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { User } from '../App';

interface AuthCardProps {
  type: 'Login' | 'SignUp';
  setCurrentView: (view: string) => void;
  onAuth: (user: User) => void;
}

const AuthCard: React.FC<AuthCardProps> = ({ type, setCurrentView, onAuth }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (type === 'SignUp' && !name.trim()) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    // Mock auth delay
    setTimeout(() => {
      // Create Mock user object 
      const user: User = {
        name: type === 'SignUp' ? name : (email.split('@')[0] || 'User'),
        email: email
      };
      onAuth(user);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#18181b] border border-[#27272a] rounded-3xl p-8">
        
        {/* Back Button */}
        <button 
          onClick={() => setCurrentView('Home')}
          className="flex items-center text-zinc-400 hover:text-white transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            {type === 'Login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-zinc-400">
            {type === 'Login' ? 'Sign in to continue your journey' : 'Join the future of learning'}
          </p>
        </div>

        {/* Form Elements */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {type === 'SignUp' && (
            <input 
              type="text" 
              placeholder="Full Name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="auth-input"
            />
          )}
          <input 
            type="email" 
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className="auth-input"
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-4 mt-4 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 text-white font-bold rounded-xl transition-colors text-lg"
          >
            {loading ? 'Processing...' : type === 'Login' ? 'Login' : 'Sign Up'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default AuthCard;
