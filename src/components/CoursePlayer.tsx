import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import type { Course } from '../data/courses';

interface CoursePlayerProps {
  course: Course;
  onBack: () => void;
}

const CoursePlayer: React.FC<CoursePlayerProps> = ({ course, onBack }) => {
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);

  const toggleComplete = (idx: number) => {
    if (completedLessons.includes(idx)) {
      setCompletedLessons(prev => prev.filter(i => i !== idx));
    } else {
      setCompletedLessons(prev => [...prev, idx]);
    }
  };

  const progress = (completedLessons.length / course.curriculum.length) * 100;

  return (
    <div className="min-h-screen bg-black flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-96 border-r border-[#27272a] bg-[#18181b] flex flex-col h-screen overflow-y-auto">
        <div className="p-6 border-b border-[#27272a]">
          <button 
            onClick={onBack}
            className="text-zinc-400 hover:text-white mb-6 flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
          
          <h2 className="font-bold text-xl text-white mb-4 leading-tight">{course.title}</h2>
          
          {/* Progress Bar */}
          <div className="h-2 bg-[#27272a] rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-xs text-zinc-500 mt-2 font-bold uppercase tracking-wider">
            {Math.round(progress)}% Complete
          </p>
        </div>

        <div className="flex-1 py-4">
          {course.curriculum.map((lesson, idx) => (
            <button
              key={idx}
              onClick={() => setActiveLesson(idx)}
              className={`w-full p-4 flex items-center gap-4 text-left border-l-4 transition-all ${
                activeLesson === idx 
                  ? 'bg-primary-500/10 border-l-primary-500' 
                  : 'border-l-transparent hover:bg-[#27272a]/50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                completedLessons.includes(idx)
                  ? 'bg-primary-500 border-primary-500 text-white'
                  : 'border-zinc-600 text-zinc-500 text-xs font-bold'
              }`}>
                {completedLessons.includes(idx) ? <CheckCircle2 size={14} strokeWidth={3} /> : idx + 1}
              </div>
              <span className={`text-sm font-medium ${
                activeLesson === idx ? 'text-white' : 'text-zinc-400'
              }`}>
                {lesson}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 p-6 md:p-12 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video rounded-[32px] bg-black border border-[#27272a] overflow-hidden shadow-2xl mb-8">
            <iframe 
              src={course.videoUrl} 
              className="w-full h-full" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen 
              title="Course Video"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">{course.curriculum[activeLesson]}</h1>
              <p className="text-zinc-400 font-medium">Lesson {activeLesson + 1} of {course.curriculum.length}</p>
            </div>
            
            <button 
              onClick={() => toggleComplete(activeLesson)}
              className={`px-8 py-4 rounded-xl font-bold transition-all text-white ${
                completedLessons.includes(activeLesson)
                  ? 'bg-[#27272a] border border-[#3f3f46]'
                  : 'bg-primary-600 hover:bg-primary-500 shadow-lg shadow-primary-600/20'
              }`}
            >
              {completedLessons.includes(activeLesson) ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>

          <div className="p-8 rounded-3xl bg-[#18181b] border border-[#27272a]">
            <h3 className="font-bold text-white text-lg mb-4">About this lesson</h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              In this module, we'll dive deep into the core concepts of <strong className="text-zinc-200">{course.curriculum[activeLesson]}</strong>. Make sure to follow along with the code examples and practice in your own editor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
