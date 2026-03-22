import React from 'react';
import { Code2, LogOut, User as UserIcon } from 'lucide-react';
import type { User } from '../App';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setCurrentView, user, onLogout }) => {
  const navLinks = ['Home', 'Courses', 'My Learning', 'Profile'];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#27272a] bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setCurrentView('Home')}
          >
            <div className="bg-primary-500 p-1.5 rounded-lg text-white">
              <Code2 size={24} strokeWidth={2.5} />
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">Learn With Koddy</span>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => setCurrentView(link)}
                className={`text-sm font-medium transition-colors ${
                  currentView === link 
                    ? 'text-white' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          {/* Auth Buttons / User Profile */}
          <div className="flex items-center space-x-4">
            {user ? (
               <div className="flex items-center gap-4">
                 <div className="w-9 h-9 rounded-full bg-primary-500/20 border border-primary-500/50 flex items-center justify-center text-primary-400">
                   <UserIcon size={18} />
                 </div>
                 <button onClick={onLogout} className="text-zinc-400 hover:text-white transition-colors">
                   <LogOut size={20} />
                 </button>
               </div>
            ) : (
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setCurrentView('Login')}
                  className="text-zinc-300 hover:text-white font-medium text-sm transition-colors"
                >
                  Login
                </button>
                <button 
                  onClick={() => setCurrentView('SignUp')}
                  className="bg-white text-black hover:bg-primary-500 hover:text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
