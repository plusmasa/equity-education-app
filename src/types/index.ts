export interface Lesson {
  id: string;
  title: string;
  stage: number;
  section: number;
  content: string;
  quiz?: Quiz;
  minigame?: Minigame;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Minigame {
  id: string;
  type: string;
  title: string;
  description: string;
  config: any;
}

export interface JargonTerm {
  term: string;
  definition: string;
  learnMoreLesson?: string;
  learnMoreLessonTitle?: string;
}

export interface UserProgress {
  completedLessons: string[];
  currentLesson?: string;
  quizScores: Record<string, number>;
  streakDays: number;
  totalPoints: number;
}