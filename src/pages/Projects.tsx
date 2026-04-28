import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Users, Rocket, ExternalLink, Filter, Search } from 'lucide-react';
import { api } from '../services/api';
import { Project } from '../types';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await api.getProjects();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight leading-tight mb-4">
            Hands-on Projects
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">
            Apply what you've learned through community-driven challenges and personal sustainability experiments.
          </p>
        </div>
      </header>

      <div className="flex flex-wrap gap-4 items-center bg-white p-4 rounded-3xl border border-stone-200">
        <div className="flex-1 min-w-[200px] flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-2xl">
          <Search className="w-4 h-4 text-stone-400" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="bg-transparent border-none focus:outline-none text-sm w-full placeholder:text-stone-400"
          />
        </div>
        <button className="flex items-center gap-2 px-6 py-2 border border-stone-200 rounded-2xl text-sm font-medium hover:bg-stone-50 transition-all">
          <Filter className="w-4 h-4" />
          Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2rem] p-8 border border-stone-200 hover:border-emerald-300 transition-all group"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                {project.category}
              </span>
              <div className="flex items-center gap-1.5 text-stone-400 text-sm">
                <Users className="w-4 h-4" />
                <span>{project.participants} participants</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-stone-900 mb-3 leading-tight group-hover:text-emerald-700 transition-colors">
              {project.title}
            </h3>
            <p className="text-stone-500 mb-8 leading-relaxed">
              {project.description}
            </p>

            <div className="flex items-center gap-4">
              <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-200">
                Join Project
              </button>
              <button className="p-4 border border-stone-200 rounded-2xl hover:bg-stone-50 transition-all">
                <ExternalLink className="w-5 h-5 text-stone-400" />
              </button>
            </div>
          </motion.div>
        ))}

        {/* Suggest Card */}
        <div className="bg-stone-100 rounded-[2rem] p-8 border border-dashed border-stone-300 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
            <Rocket className="w-8 h-8 text-stone-400" />
          </div>
          <h3 className="text-xl font-bold text-stone-900 mb-2 leading-tight">Have a project idea?</h3>
          <p className="text-stone-500 text-sm mb-6 max-w-xs leading-relaxed">
            Suggest a new sustainability goal to the community and lead the change.
          </p>
          <button className="px-6 py-2 bg-white border border-stone-200 rounded-xl text-sm font-bold hover:bg-white/50 transition-all">
            Submit Proposal
          </button>
        </div>
      </div>
    </div>
  );
}
