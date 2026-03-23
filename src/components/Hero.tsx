import React from 'react';
import { ArrowRight } from 'lucide-react';

import type { User } from '../App';

interface HeroProps {
  setCurrentView: (view: string) => void;
  user: User | null;
}

const Hero: React.FC<HeroProps> = ({ setCurrentView, user }) => {
  return (
    <div className="relative overflow-hidden bg-black pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8">
            Build the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-600">Future</span> With Better Code
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join 50,000+ students learning from industry experts. Interactive courses, real-world projects, and a community of builders.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => setCurrentView(user ? 'My Learning' : 'SignUp')}
              className="w-full sm:w-auto px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              {user ? 'Start Learning' : 'Get Started for Free'}
              <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setCurrentView('Courses')}
              className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-white rounded-xl font-semibold text-lg transition-all duration-300"
            >
              Explore Courses
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-600/20 rounded-full blur-[120px] opacity-50 pointer-events-none" />
    </div>
  );
};

export default Hero;
