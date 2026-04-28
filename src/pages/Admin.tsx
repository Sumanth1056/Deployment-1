import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Plus, Save, Trash2, Eye, Activity, Users, BookOpen } from 'lucide-react';
import { api } from '../services/api';
import { Lesson } from '../types';

export default function Admin() {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newLesson, setNewLesson] = useState<Omit<Lesson, 'id'>>({
    title: '',
    category: 'Energy',
    description: '',
    content: '',
    difficulty: 'Beginner',
    duration: '15 mins',
  });

  const categories = ['Energy', 'Waste', 'Lifestyle', 'Food'];

  useEffect(() => {
    const fetchData = async () => {
      const data = await api.getLessons();
      setLessons(data);
    };
    fetchData();
  }, []);

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const added = await api.addLesson(newLesson);
      setLessons([...lessons, added]);
      setShowAddForm(false);
      setNewLesson({
        title: '',
        category: 'Energy',
        description: '',
        content: '',
        difficulty: 'Beginner',
        duration: '15 mins',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-2">
            Admin Console
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">Manage educational resources and monitor student activity.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center justify-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200"
        >
          {showAddForm ? 'Cancel' : (
            <>
              <Plus className="w-5 h-5" />
              New Lesson
            </>
          )}
        </button>
      </header>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex items-center gap-3 text-stone-400 mb-4 font-bold text-xs uppercase tracking-widest">
            <Activity className="w-4 h-4 text-emerald-600" />
            Active Users
          </div>
          <div className="text-3xl font-bold text-stone-900">1,284</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex items-center gap-3 text-stone-400 mb-4 font-bold text-xs uppercase tracking-widest">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Total Lessons
          </div>
          <div className="text-3xl font-bold text-stone-900">{lessons.length}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-sm">
          <div className="flex items-center gap-3 text-stone-400 mb-4 font-bold text-xs uppercase tracking-widest">
            <Users className="w-4 h-4 text-emerald-600" />
            Project Enrolls
          </div>
          <div className="text-3xl font-bold text-stone-900">3,492</div>
        </div>
      </div>

      {showAddForm && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[2rem] p-8 border border-emerald-200 shadow-2xl shadow-emerald-900/5"
        >
          <h2 className="text-2xl font-bold mb-8 text-stone-900 leading-tight">Create New Lesson</h2>
          <form onSubmit={handleAddLesson} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-400 uppercase tracking-widest">Title</label>
              <input
                required
                type="text"
                value={newLesson.title}
                onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
                className="w-full px-5 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:outline-none transition-colors"
                placeholder="e.g. Introduction to Permaculture"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-stone-400 uppercase tracking-widest">Category</label>
              <select
                value={newLesson.category}
                onChange={(e) => setNewLesson({ ...newLesson, category: e.target.value })}
                className="w-full px-5 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:outline-none transition-colors appearance-none bg-white"
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-stone-400 uppercase tracking-widest">Description</label>
              <textarea
                required
                value={newLesson.description}
                onChange={(e) => setNewLesson({ ...newLesson, description: e.target.value })}
                className="w-full px-5 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:outline-none transition-colors"
                rows={2}
                placeholder="Brief summary of the lesson..."
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-stone-400 uppercase tracking-widest">Markdown Content</label>
              <textarea
                required
                value={newLesson.content}
                onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
                className="w-full px-5 py-3 rounded-xl border border-stone-200 focus:border-emerald-500 focus:outline-none transition-colors font-mono text-sm"
                rows={10}
                placeholder="# Use Markdown for lesson formatting..."
              />
            </div>
            <div className="flex gap-4 md:col-span-2">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-stone-800 transition-all ml-auto"
              >
                <Save className="w-5 h-5" />
                Publish Lesson
              </button>
            </div>
          </form>
        </motion.section>
      )}

      <section>
        <h2 className="text-2xl font-bold text-stone-900 mb-8 leading-tight">Sustainability Content</h2>
        <div className="bg-white rounded-[2rem] border border-stone-200 overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-200">
                <th className="text-left px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Lesson</th>
                <th className="text-left px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Category</th>
                <th className="text-left px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Duration</th>
                <th className="text-right px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-stone-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lessons.map((lesson) => (
                <tr key={lesson.id} className="border-b border-stone-100 last:border-none hover:bg-stone-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="font-bold text-stone-900 mb-0.5 group-hover:text-emerald-700 transition-colors">{lesson.title}</div>
                    <div className="text-xs text-stone-400">{lesson.difficulty}</div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">{lesson.category}</span>
                  </td>
                  <td className="px-8 py-5 text-stone-500 font-medium text-sm">{lesson.duration}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-stone-400 hover:text-stone-900 transition-colors">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-stone-400 hover:text-red-600 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
