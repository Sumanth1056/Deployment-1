import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Leaf, BookOpen, Trophy, Settings, Menu, X, Rocket, LayoutDashboard } from 'lucide-react';
import Dashboard from './pages/Dashboard';
import LessonDetail from './pages/LessonDetail';
import Projects from './pages/Projects';
import Admin from './pages/Admin';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Projects', path: '/projects', icon: Rocket },
    { name: 'Admin', path: '/admin', icon: Settings },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-stone-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 bg-emerald-600 rounded-xl group-hover:bg-emerald-500 transition-colors">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="font-sans text-xl font-bold tracking-tight text-stone-900">EcoLearn</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  location.pathname === item.path ? 'text-emerald-600' : 'text-stone-500 hover:text-emerald-600'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.name}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden p-2 text-stone-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-stone-200"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="flex items-center gap-3 text-lg font-medium text-stone-700"
                  onClick={() => setIsOpen(false)}
                >
                  <item.icon className="w-5 h-5 text-emerald-600" />
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FDFCFB] font-sans text-stone-900">
        <Navigation />
        <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/lesson/:id" element={<LessonDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <footer className="border-t border-stone-200 py-12 px-4 text-center">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-stone-900">EcoLearn</span>
          </div>
          <p className="text-stone-500 text-sm">Empowering the next generation of sustainable citizens.</p>
        </footer>
      </div>
    </Router>
  );
}
