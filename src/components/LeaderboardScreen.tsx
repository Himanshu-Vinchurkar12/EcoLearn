import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, Star } from 'lucide-react';
import { User, LeaderboardEntry } from '../types';

interface LeaderboardScreenProps {
  user: User;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { id: '1', name: 'Emma Green', xp: 2450, avatar: '🌱', level: 'Eco Champion', rank: 1 },
  { id: '2', name: 'Alex Earth', xp: 2100, avatar: '🌍', level: 'Planet Protector', rank: 2 },
  { id: '3', name: 'Sam Nature', xp: 1950, avatar: '🦋', level: 'Nature Guardian', rank: 3 },
  { id: '4', name: 'Alex Green', xp: 1250, avatar: '🌱', level: 'Eco Explorer', rank: 4 },
  { id: '5', name: 'Maya Forest', xp: 1100, avatar: '🌳', level: 'Tree Hugger', rank: 5 },
  { id: '6', name: 'Rio Ocean', xp: 950, avatar: '🐋', level: 'Ocean Defender', rank: 6 },
  { id: '7', name: 'Sky Blue', xp: 800, avatar: '🌤️', level: 'Climate Helper', rank: 7 },
  { id: '8', name: 'Leaf Green', xp: 650, avatar: '🍃', level: 'Eco Learner', rank: 8 },
];

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ user }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Show confetti animation when component loads
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="text-yellow-400" size={24} />;
      case 2: return <Medal className="text-gray-400" size={24} />;
      case 3: return <Medal className="text-orange-400" size={24} />;
      default: return <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-white text-sm font-bold">{rank}</div>;
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 2: return 'bg-gradient-to-r from-gray-400/20 to-slate-500/20 border-gray-400/30';
      case 3: return 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/30';
      default: return 'bg-slate-800/50 border-slate-700';
    }
  };

  return (
    <div className="space-y-6">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`
              }}
            >
              <Trophy className="text-yellow-400" size={16} />
            </div>
          ))}
        </div>
      )}

      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-bounce">🏆</div>
        <h2 className="text-3xl font-bold text-white mb-2">Leaderboard</h2>
        <p className="text-green-400">See how you rank among eco-warriors!</p>
      </div>

      {/* Top 3 Podium */}
      <div className="flex justify-center items-end space-x-4 mb-8">
        {mockLeaderboard.slice(0, 3).map((entry, index) => {
          const heights = ['h-32', 'h-40', 'h-28'];
          const positions = [1, 0, 2]; // Second, First, Third
          const actualIndex = positions[index];
          const actualEntry = mockLeaderboard[actualIndex];
          
          return (
            <div key={actualEntry.id} className="text-center">
              <div className={`${getRankStyle(actualEntry.rank)} backdrop-blur-sm border rounded-xl p-4 ${heights[actualIndex]} flex flex-col justify-end items-center transition-all duration-300 hover:scale-105`}>
                <div className="text-3xl mb-2">{actualEntry.avatar}</div>
                <div className="mb-2">{getRankIcon(actualEntry.rank)}</div>
                <div className="text-white font-bold text-sm">{actualEntry.name}</div>
                <div className="text-yellow-400 font-bold text-xs">{actualEntry.xp} XP</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Star className="text-yellow-400" />
          <span>Global Rankings</span>
        </h3>

        <div className="space-y-3">
          {mockLeaderboard.map((entry) => (
            <div
              key={entry.id}
              className={`flex items-center space-x-4 p-4 rounded-lg border transition-all duration-300 hover:scale-105 ${
                entry.name === user.name
                  ? 'bg-green-500/20 border-green-500/50 ring-2 ring-green-500/25'
                  : getRankStyle(entry.rank)
              }`}
            >
              <div className="flex-shrink-0">
                {getRankIcon(entry.rank)}
              </div>

              <div className="text-2xl flex-shrink-0">{entry.avatar}</div>

              <div className="flex-grow">
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white">{entry.name}</span>
                  {entry.name === user.name && (
                    <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                      YOU
                    </span>
                  )}
                </div>
                <div className="text-sm text-slate-400">{entry.level}</div>
              </div>

              <div className="text-right">
                <div className="text-yellow-400 font-bold text-lg">{entry.xp}</div>
                <div className="text-slate-400 text-xs">XP</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your Stats */}
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Your Progress</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{user.xp}</div>
            <div className="text-sm text-slate-400">Total XP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">4</div>
            <div className="text-sm text-slate-400">Rank</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">{user.badges?.filter(b => b.unlocked).length || 2}</div>
            <div className="text-sm text-slate-400">Badges</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardScreen;