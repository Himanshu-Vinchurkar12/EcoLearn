export enum UserType {
  STUDENT = 'student',
  TEACHER = 'teacher'
}

export interface User {
  id: string;
  name: string;
  type: UserType;
  avatar?: string;
  xp?: number;
  level?: string;
  badges?: Badge[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  color: string;
  unlocked: boolean;
  description: string;
}

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  xpReward: number;
  badgeReward?: Badge;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  status: 'pending' | 'submitted' | 'approved' | 'rejected';
  proofImage?: string;
  icon: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  avatar: string;
  level: string;
  rank: number;
}