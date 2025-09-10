import React, { useState } from 'react';
import { BookOpen, Camera, Trophy, User, LogOut } from 'lucide-react';
import { User as UserType } from '../types';
import QuizScreen from './QuizScreen';
import ChallengesScreen from './ChallengesScreen';
import LeaderboardScreen from './LeaderboardScreen';
import ProfileScreen from './ProfileScreen';

interface StudentDashboardProps {
  user: UserType;
  onLogout: () => void;
}

enum Tab {
  QUIZ = 'quiz',
  CHALLENGES = 'challenges',
  LEADERBOARD = 'leaderboard',
  PROFILE = 'profile'
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.QUIZ);

  const tabs = [
    { id: Tab.QUIZ, label: 'Quizzes', icon: BookOpen, color: 'text-green-400' },
    { id: Tab.CHALLENGES, label: 'Challenges', icon: Camera, color: 'text-orange-400' },
    { id: Tab.LEADERBOARD, label: 'Leaderboard', icon: Trophy, color: 'text-yellow-400' },
    { id: Tab.PROFILE, label: 'Profile', icon: User, color: 'text-blue-400' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case Tab.QUIZ:
        return <QuizScreen user={user} />;
      case Tab.CHALLENGES:
        return <ChallengesScreen user={user} />;
      case Tab.LEADERBOARD:
        return <LeaderboardScreen user={user} />;
      case Tab.PROFILE:
        return <ProfileScreen user={user} />;
      default:
        return <QuizScreen user={user} />;
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      {/* Header */}
      <header className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700 p-3 sm:p-4">
        <div className="w-full max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <div className="flex items-center space-x-4">
            <div className="text-3xl animate-pulse">🌍</div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-white">EcoLearn</h1>
              <p className="text-green-400 text-xs sm:text-sm">Welcome back, {user.name}!</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-700 rounded-lg px-3 sm:px-4 py-2">
              <div className="text-yellow-400 font-bold text-base sm:text-lg">{user.xp} XP</div>
              <div className="text-slate-400 text-xs">{user.level}</div>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 sm:px-6 py-4 font-semibold transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeTab === tab.id
                    ? `${tab.color} border-b-2 border-current bg-slate-700/50`
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/25'
                }`}
              >
                <tab.icon size={18} className="sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="w-full max-w-6xl mx-auto p-4 sm:p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;