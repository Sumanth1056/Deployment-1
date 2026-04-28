import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Clock, BookOpen, Share2 } from 'lucide-react';
import { api } from '../services/api';
import { Lesson } from '../types';

export default function LessonDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [l, p] = await Promise.all([api.getLessons(), api.getProgress()]);
        const currentLesson = l.find(item => item.id === id);
        if (currentLesson) {
          setLesson(currentLesson);
          const prog = p.find(item => item.lessonId === id);
          setIsCompleted(!!prog?.completed);
        } else {
          navigate('/');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleComplete = async () => {
    if (!lesson) return;
    try {
      await api.updateProgress(lesson.id, !isCompleted);
      setIsCompleted(!isCompleted);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading || !lesson) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-stone-500 hover:text-emerald-600 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr,300px] gap-12">
        {/* Content Side */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.2em] font-bold text-emerald-600 mb-2 block">
              {lesson.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-6">
              {lesson.title}
            </h1>
            
            <div className="flex flex-wrap gap-6 items-center border-y border-stone-200 py-6">
              <div className="flex items-center gap-2 text-stone-500">
                <Clock className="w-5 h-5 text-emerald-600/60" />
                <span className="text-sm font-medium">{lesson.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500">
                <BookOpen className="w-5 h-5 text-emerald-600/60" />
                <span className="text-sm font-medium">{lesson.difficulty}</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500">
                <CheckCircle2 className={`w-5 h-5 ${isCompleted ? 'text-emerald-600' : 'text-stone-300'}`} />
                <span className="text-sm font-medium">{isCompleted ? 'Completed' : 'Study to complete'}</span>
              </div>
            </div>
          </div>

          <div className="markdown-body bg-white rounded-3xl p-8 md:p-12 border border-stone-100 shadow-sm">
            <Markdown>{lesson.content}</Markdown>
          </div>

          <div className="mt-12 flex items-center justify-between gap-4 p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
            <div>
              <h3 className="font-bold text-emerald-900 mb-1 leading-tight">Ready for a challenge?</h3>
              <p className="text-emerald-700/80 text-sm">Mark this lesson as completed to earn your sustainability points.</p>
            </div>
            <button
              onClick={handleComplete}
              className={`px-8 py-4 rounded-2xl font-bold transition-all shadow-lg ${
                isCompleted 
                ? 'bg-white text-emerald-600 shadow-emerald-200 hover:bg-emerald-100' 
                : 'bg-emerald-600 text-white shadow-emerald-200 hover:bg-emerald-500'
              }`}
            >
              {isCompleted ? 'Completed' : 'Mark as Done'}
            </button>
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="bg-stone-50 rounded-3xl p-6 border border-stone-200">
            <h4 className="font-bold mb-4 text-stone-900 leading-tight">Resources</h4>
            <ul className="space-y-3">
              {['Reading Material PDF', 'Sustainability Checklist', 'Community Forum'].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-stone-600 hover:text-emerald-600 cursor-pointer transition-colors">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm text-center">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Share2 className="w-8 h-8" />
            </div>
            <h4 className="font-bold mb-2 leading-tight">Inspire Others</h4>
            <p className="text-stone-500 text-sm mb-4 leading-relaxed">Let your friends know what you're learning about sustainable living.</p>
            <button className="w-full py-3 bg-stone-900 text-white rounded-2xl font-bold text-sm hover:bg-stone-800 transition-all">
              Share Lesson
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
