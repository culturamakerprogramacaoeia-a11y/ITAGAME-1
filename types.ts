
export enum Screen {
  LOGIN = 'login',
  DASHBOARD = 'dashboard',
  DISCIPLINES = 'disciplines',
  ACTIVITY = 'activity',
  SHOP = 'shop',
  RANKING = 'ranking'
}

export enum AdminScreen {
  OVERVIEW = 'overview',
  STUDENTS = 'students',
  MISSIONS = 'missions',
  REPORTS = 'reports',
  VALIDATION = 'validation',
  ECONOMY = 'economy',
  SETTINGS = 'settings'
}

export type MissionType = 'quiz' | 'upload' | 'code' | 'interactive';

export interface UserStats {
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  coins: number;
  avatar: string;
}

export interface Mission {
  id: string;
  title: string;
  objective: string;
  reward: number;
  rewardType: 'coins' | 'xp';
  progress: number;
  maxProgress: number;
  completed: boolean;
  status?: 'pending' | 'approved' | 'rejected';
  type?: MissionType;
  content?: any; // For quiz questions or interactive data
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  class: string;
  level: number;
  xp: number;
  coins: number;
  missionsCompleted: number;
  lastActive: string;
  avatar: string;
}

export interface Submission {
  id: string;
  studentName: string;
  missionTitle: string;
  evidenceType: 'image' | 'video' | 'text';
  timestamp: string;
  status: 'pending' | 'approved' | 'rejected';
}

export interface Discipline {
  id: string;
  name: string;
  icon: string;
  color: string;
  progress: number;
  level: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'avatar' | 'powerup' | 'real';
}

export interface RankingEntry {
  rank: number;
  name: string;
  score: number;
  avatar: string;
  isCurrentUser?: boolean;
}
