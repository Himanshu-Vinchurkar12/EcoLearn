import React, { useState, useEffect } from 'react';
import { Sprout, Trophy, BookOpen, Camera, Users, Settings, Star, Leaf, Zap, Award } from 'lucide-react';
import LoginScreen from './components/LoginScreen';
import StudentDashboard from './components/StudentDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import { User, UserType } from './types';

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [confetti, setConfetti] = useState(false);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 3000);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900">
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
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
              <div className={`w-2 h-2 rounded-full ${
                ['bg-green-400', 'bg-yellow-400', 'bg-blue-400', 'bg-orange-400'][Math.floor(Math.random() * 4)]
              }`} />
            </div>
          ))}
        </div>
      )}

      {!currentUser ? (
        <LoginScreen onLogin={handleLogin} />
      ) : currentUser.type === UserType.STUDENT ? (
        <StudentDashboard user={currentUser} onLogout={handleLogout} />
      ) : (
        <TeacherDashboard user={currentUser} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;