import { Lesson, UserProgress, Project } from '../types';

export const api = {
  getLessons: async (): Promise<Lesson[]> => {
    const res = await fetch('/api/lessons');
    return res.json();
  },
  getProjects: async (): Promise<Project[]> => {
    const res = await fetch('/api/projects');
    return res.json();
  },
  getProgress: async (): Promise<UserProgress[]> => {
    const res = await fetch('/api/progress');
    return res.json();
  },
  updateProgress: async (lessonId: string, completed: boolean): Promise<any> => {
    const res = await fetch('/api/progress/update', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lessonId, completed }),
    });
    return res.json();
  },
  addLesson: async (lesson: Omit<Lesson, 'id'>): Promise<Lesson> => {
    const res = await fetch('/api/admin/lessons', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lesson),
    });
    return res.json();
  }
};
