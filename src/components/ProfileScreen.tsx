import React from 'react';
import { Award, Zap, TrendingUp, Star } from 'lucide-react';
import { User } from '../types';

interface ProfileScreenProps {
  user: User;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ user }) => {
  const nextLevelXP = 1500;
  const progressToNext = ((user.xp || 0) / nextLevelXP) * 100;

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">{user.avatar}</div>
        <h2 className="text-3xl font-bold text-white mb-2">{user.name}</h2>
        <p className="text-green-400 text-lg">{user.level}</p>
      </div>

      {/* XP Progress */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Zap className="text-yellow-400" />
            <span>Experience Points</span>
          </h3>
          <div className="text-yellow-400 font-bold text-2xl">{user.xp}</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Progress to next level</span>
            <span className="text-white">{user.xp}/{nextLevelXP} XP</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-4 rounded-full transition-all duration-1000 relative overflow-hidden"
              style={{ width: `${progressToNext}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full" />
            </div>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-slate-300">
            {nextLevelXP - (user.xp || 0)} XP needed to reach <span className="text-green-400 font-bold">Planet Protector</span>
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <Award className="text-purple-400" />
          <span>Badges Collection</span>
        </h3>
        
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
          {user.badges?.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-lg border transition-all duration-300 text-center ${
                badge.unlocked
                  ? 'border-green-500/50 bg-green-500/10 hover:scale-105'
                  : 'border-slate-600 bg-slate-700/50 opacity-50'
              }`}
            >
              <div className="text-2xl mb-2">{badge.icon}</div>
              <div className={`text-xs font-bold ${badge.unlocked ? badge.color : 'text-slate-500'}`}>
                {badge.name}
              </div>
              {badge.unlocked && (
                <div className="mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full mx-auto animate-pulse" />
                </div>
              )}
            </div>
          ))}
          
          {/* Locked badges preview */}
          {[...Array(6)].map((_, i) => (
            <div key={`locked-${i}`} className="p-4 rounded-lg border border-slate-600 bg-slate-700/50 opacity-50 text-center">
              <div className="text-2xl mb-2">🔒</div>
              <div className="text-xs text-slate-500 font-bold">
                Mystery Badge
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="text-green-400" />
            <span>This Week</span>
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Quizzes Completed</span>
              <span className="text-white font-bold">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Challenges Done</span>
              <span className="text-white font-bold">1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">XP Earned</span>
              <span className="text-yellow-400 font-bold">+350</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
            <Star className="text-yellow-400" />
            <span>Achievements</span>
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-lg">🌱</div>
                <span className="text-slate-300">First Quiz Completed</span>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-lg">🏆</div>
                <span className="text-slate-300">Made it to Top 5</span>
              </div>
              <div className="w-2 h-2 bg-green-400 rounded-full" />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="text-lg">🌍</div>
                <span className="text-slate-300">Eco Warrior Streak (5 days)</span>
              </div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Eco Impact */}
      <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4 text-center">Your Eco Impact 🌍</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl mb-1">🌳</div>
            <div className="text-xl font-bold text-green-400">3</div>
            <div className="text-xs text-slate-400">Trees Planted</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">💧</div>
            <div className="text-xl font-bold text-blue-400">45L</div>
            <div className="text-xs text-slate-400">Water Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">♻️</div>
            <div className="text-xl font-bold text-purple-400">12kg</div>
            <div className="text-xs text-slate-400">Waste Recycled</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xl font-bold text-yellow-400">8kWh</div>
            <div className="text-xs text-slate-400">Energy Saved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;