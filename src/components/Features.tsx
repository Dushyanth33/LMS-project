import React from 'react';
import { Globe, Users } from 'lucide-react';

const Features: React.FC = () => {
  const features = [
    {
      icon: <Globe className="w-8 h-8 text-primary-500" />,
      title: 'Modern Stack',
      description: 'Learn the latest technologies used by startups.',
    },
    {
      icon: <Users className="w-8 h-8 text-primary-500" />,
      title: 'Community',
      description: 'Connect with thousands of other learners.',
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why Koddy?</h2>
          <p className="text-zinc-400">Everything you need to master coding</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div 
              key={idx} 
              className="bg-[#18181b] border border-[#27272a] rounded-2xl p-8 hover:border-primary-500/50 transition-colors duration-300"
            >
              <div className="bg-primary-500/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
