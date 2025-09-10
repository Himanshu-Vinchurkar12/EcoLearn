import React, { useState } from 'react';
import { Sprout, Users, BookOpen } from 'lucide-react';
import { User, UserType } from '../types';

interface LoginScreenProps {
  onLogin: (user: User) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [userType, setUserType] = useState<UserType | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleUserTypeSelect = (type: UserType) => {
    setUserType(type);
    setShowForm(true);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (userType === UserType.STUDENT) {
      onLogin({
        id: '1',
        name: 'Alex Green',
        type: UserType.STUDENT,
        avatar: '🌱',
        xp: 1250,
        level: 'Eco Explorer',
        badges: [
          { id: '1', name: 'Tree Hugger', icon: '🌳', color: 'text-green-400', unlocked: true, description: 'Planted your first tree!' },
          { id: '2', name: 'Water Saver', icon: '💧', color: 'text-blue-400', unlocked: true, description: 'Saved water for a week!' },
          { id: '3', name: 'Quiz Master', icon: '🧠', color: 'text-purple-400', unlocked: false, description: 'Score 100% on 5 quizzes' }
        ]
      });
    } else {
      onLogin({
        id: '2',
        name: 'Mrs. Johnson',
        type: UserType.TEACHER,
        avatar: '👩‍🏫'
      });
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 overflow-x-hidden">
      <div className="w-full max-w-md mx-auto">
        {/* Mascot */}
        <div className="text-center mb-8">
          <div className="inline-block animate-bounce">
            <div className="text-8xl mb-4">🌍</div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">EcoLearn</h1>
          <p className="text-green-400 text-lg">Let's save the planet together!</p>
        </div>

        {!showForm ? (
          <div className="space-y-4">
            <button
              onClick={() => handleUserTypeSelect(UserType.STUDENT)}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg hover:shadow-green-500/25 text-base sm:text-xl"
            >
              <BookOpen size={24} />
              <span>I'm a Student</span>
            </button>

            <button
              onClick={() => handleUserTypeSelect(UserType.TEACHER)}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-4 sm:px-6 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg hover:shadow-blue-500/25 text-base sm:text-xl"
            >
              <Users size={24} />
              <span>I'm a Teacher</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="bg-slate-800/50 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-slate-700">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Welcome {userType === UserType.STUDENT ? 'Student' : 'Teacher'}!
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-green-400 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label className="block text-green-400 font-semibold mb-2">Password</label>
                <input
                  type="password"
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/25"
              >
                Login
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="w-full mt-4 text-slate-400 hover:text-white transition-colors"
            >
              Back to selection
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginScreen;