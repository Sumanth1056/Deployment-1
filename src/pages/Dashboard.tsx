import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { BookOpen, Trophy, Clock, ChevronRight, Star } from 'lucide-react';
import { api } from '../services/api';
import { Lesson, UserProgress } from '../types';

export default function Dashboard() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [progress, setProgress] = useState<UserProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [l, p] = await Promise.all([api.getLessons(), api.getProgress()]);
        setLessons(l);
        setProgress(p);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getLessonProgress = (id: string) => progress.find(p => p.lessonId === id);

  const completedCount = progress.filter(p => p.completed).length;
  const progressPercent = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Hero / Stats */}
      <section className="bg-emerald-950 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Track Your Green Journey
          </motion.h1>
          <p className="text-emerald-100 text-lg mb-8">
            Complete lessons, participate in challenges, and earn certificates as you learn to live a more sustainable life.
          </p>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Trophy className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Lessons Done</span>
              </div>
              <div className="text-3xl font-bold">{completedCount} / {lessons.length}</div>
            </div>
            <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-emerald-400 mb-1">
                <Star className="w-4 h-4" />
                <span className="text-xs uppercase tracking-wider font-semibold">Overall Progress</span>
              </div>
              <div className="text-3xl font-bold">{Math.round(progressPercent)}%</div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-700/10 blur-[120px] rounded-full translate-y-1/2 translate-x-1/2" />
      </section>

      {/* Lesson Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-stone-900 leading-tight">Featured Lessons</h2>
          <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">New Content Weekly</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {lessons.map((lesson, idx) => (
            <motion.div
              key={lesson.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white rounded-3xl border border-stone-200 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5 transition-all p-6 relative flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${
                  lesson.category === 'Energy' ? 'bg-orange-50 text-orange-600' :
                  lesson.category === 'Waste' ? 'bg-blue-50 text-blue-600' :
                  'bg-emerald-50 text-emerald-600'
                }`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                {getLessonProgress(lesson.id)?.completed && (
                  <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Completed
                  </div>
                )}
              </div>

              <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-emerald-700 transition-colors">
                {lesson.title}
              </h3>
              <p className="text-stone-500 text-sm line-clamp-2 mb-6">
                {lesson.description}
              </p>

              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-4 text-stone-400 text-sm">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                    <span>{lesson.difficulty}</span>
                  </div>
                </div>
                
                <Link
                  to={`/lesson/${lesson.id}`}
                  className="p-2 bg-stone-50 text-stone-400 group-hover:bg-emerald-600 group-hover:text-white rounded-full transition-all"
                >
                  <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
