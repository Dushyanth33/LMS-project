import React from 'react';
import { ArrowLeft, User, Star, PlayCircle } from 'lucide-react';
import type { Course } from '../data/courses';

interface CourseDetailProps {
  course: Course;
  isEnrolled: boolean;
  onEnroll: () => void;
  onBack: () => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, isEnrolled, onEnroll, onBack }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-black pt-16 pb-20 px-4">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={onBack}
          className="text-zinc-400 hover:text-white mb-8 flex items-center gap-2 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{course.title}</h1>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">{course.description}</p>
            
            <div className="flex items-center gap-8 mb-12">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#18181b] flex items-center justify-center text-zinc-400 border border-[#27272a]">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Instructor</p>
                  <p className="font-bold text-white">{course.instructor}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#18181b] flex items-center justify-center text-yellow-500 border border-[#27272a]">
                  <Star size={24} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Rating</p>
                  <p className="font-bold text-white">{course.rating} / 5.0</p>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-6">Curriculum</h3>
            <div className="space-y-4">
              {course.curriculum.map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-[#18181b] border border-[#27272a] hover:border-primary-500/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-zinc-400 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <span className="font-medium text-zinc-200 text-lg">{item}</span>
                  <PlayCircle size={20} className="ml-auto text-zinc-600" />
                </div>
              ))}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-28 p-8 rounded-[40px] bg-[#18181b] border border-[#27272a] backdrop-blur-xl">
              <div className="aspect-video rounded-2xl bg-black mb-6 overflow-hidden">
                <iframe 
                  src={course.videoUrl} 
                  className="w-full h-full" 
                  title="Course Promo"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen 
                />
              </div>
              <div className="text-4xl font-bold text-white mb-8">₹{course.price}</div>
              <button 
                onClick={onEnroll}
                className="w-full py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary-600/20 mb-4"
              >
                {isEnrolled ? "Go to Course" : "Enroll Now"}
              </button>
              <p className="text-center text-zinc-500 text-sm font-medium">30-Day Money-Back Guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
