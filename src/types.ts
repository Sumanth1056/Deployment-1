export interface Lesson {
  id: string;
  title: string;
  category: string;
  description: string;
  content: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
}

export interface UserProgress {
  lessonId: string;
  completed: boolean;
  score: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  participants: number;
  category: string;
}
