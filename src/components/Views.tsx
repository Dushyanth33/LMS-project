import React, { useState } from 'react';
import { Search, Star, BookOpen, User as UserIcon, Bell, Heart, CreditCard, ChevronRight } from 'lucide-react';
import { type Course, courses } from '../data/courses';
import type { User } from '../App';

interface CoursesViewProps {
  enrolledCourses: string[];
  onSelectCourse: (course: Course) => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ enrolledCourses, onSelectCourse }) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', 'JavaScript', 'Web Development', 'App Development', 'Python', 'Data Science', 'AI & Machine Learning'];

  const filtered = courses.filter(c => 
    (category === 'All' || c.category === category) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) || c.instructor.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-[calc(100vh-80px)] bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4">Explore Courses</h2>
        <p className="text-zinc-400 mb-12">Browse our extensive library of professional courses.</p>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search for courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#18181b] border border-[#27272a] rounded-xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-primary-500 transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-6 py-4 rounded-xl font-medium whitespace-nowrap transition-colors ${
                  category === cat ? 'bg-primary-500 text-white' : 'bg-[#18181b] text-zinc-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(course => {
            const isEnrolled = enrolledCourses.includes(course.id);
            return (
              <div 
                key={course.id} 
                onClick={() => onSelectCourse(course)}
                className="bg-[#18181b] border border-[#27272a] rounded-[32px] overflow-hidden group cursor-pointer hover:border-primary-500/50 transition-all"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-primary-500/30 text-xs font-bold text-primary-400">
                    {course.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-zinc-400 mb-4">{course.instructor}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="text-sm font-bold text-white">{course.rating}</span>
                      <span className="text-xs text-zinc-500 ml-1">({course.students.toLocaleString()})</span>
                    </div>
                    <div className="text-xl font-bold text-primary-400">
                      {isEnrolled ? "Enrolled" : `₹${course.price}`}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const MyLearningView: React.FC<CoursesViewProps> = ({ enrolledCourses, onSelectCourse }) => {
  const myCourses = courses.filter(c => enrolledCourses.includes(c.id));

  return (
    <div className="min-h-[calc(100vh-80px)] bg-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4">My Learning</h2>
        <p className="text-zinc-400 mb-12">Continue where you left off.</p>

        {myCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {myCourses.map(course => (
              <div 
                key={course.id} 
                onClick={() => onSelectCourse(course)}
                className="bg-[#18181b] border border-[#27272a] rounded-[32px] overflow-hidden group cursor-pointer hover:border-primary-500/50 transition-all"
              >
                <div className="h-48 relative overflow-hidden">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                    <div className="h-full bg-primary-500 w-1/3" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{course.title}</h3>
                  <p className="text-sm text-zinc-400 mb-4">{course.instructor}</p>
                  <button className="w-full py-3 bg-[#27272a] group-hover:bg-primary-500 group-hover:text-white rounded-xl font-bold transition-all text-white">
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-[#18181b] rounded-[40px] border border-[#27272a]">
            <BookOpen size={48} className="mx-auto text-zinc-600 mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">No courses yet</h2>
            <p className="text-zinc-400 mb-8">You haven't enrolled in any courses yet.</p>
            <button className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white rounded-2xl font-bold transition-colors">
              Browse Courses
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

interface ProfileViewProps {
  user: User | null;
  enrolledCount: number;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ user, enrolledCount }) => {
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-black py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Profile settings</h2>
          <div className="bg-[#18181b] border border-[#27272a] rounded-[40px] p-8 text-center text-zinc-400">
            <p>Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-black py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="p-12 rounded-[40px] bg-[#18181b] border border-[#27272a] text-center">
          <div className="w-32 h-32 rounded-full bg-primary-500/20 border-2 border-primary-500/50 flex items-center justify-center text-primary-400 mx-auto mb-8">
            <UserIcon size={64} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">{user.name}</h1>
          <p className="text-zinc-400 mb-12">{user.email}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-6 rounded-3xl bg-black border border-[#27272a]">
              <div className="text-3xl font-bold text-primary-400 mb-1">{enrolledCount}</div>
              <div className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Courses Enrolled</div>
            </div>
            <div className="p-6 rounded-3xl bg-black border border-[#27272a]">
              <div className="text-3xl font-bold text-cyan-400 mb-1">0</div>
              <div className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Lessons Completed</div>
            </div>
          </div>

          <div className="mt-12 space-y-4 text-left">
            <h3 className="font-bold text-lg text-white px-2 mb-4">Account Settings</h3>
            {[
              { icon: <UserIcon size={18} />, label: "Edit Profile" },
              { icon: <Bell size={18} />, label: "Notifications" },
              { icon: <Heart size={18} />, label: "Wishlist" },
              { icon: <CreditCard size={18} />, label: "Billing Methods" }
            ].map((item, i) => (
              <button key={i} className="w-full p-4 rounded-2xl bg-black border border-[#27272a] flex items-center gap-4 hover:bg-zinc-900 transition-all group cursor-pointer">
                <div className="text-zinc-500 group-hover:text-primary-400 transition-colors">
                  {item.icon}
                </div>
                <span className="font-medium text-zinc-300">{item.label}</span>
                <ChevronRight size={18} className="ml-auto text-zinc-600" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
