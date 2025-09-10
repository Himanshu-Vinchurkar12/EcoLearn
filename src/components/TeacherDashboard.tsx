import React, { useState } from 'react';
import { Users, ClipboardCheck, BarChart3, PlusCircle, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { User } from '../types';

interface TeacherDashboardProps {
  user: User;
  onLogout: () => void;
}

enum Tab {
  OVERVIEW = 'overview',
  VERIFY = 'verify',
  ASSIGN = 'assign',
  REPORTS = 'reports'
}

const mockSubmissions = [
  {
    id: '1',
    studentName: 'Alex Green',
    challenge: 'Plant a Tree',
    submittedAt: '2024-01-15',
    proofImage: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'pending'
  },
  {
    id: '2',
    studentName: 'Emma Nature',
    challenge: 'Zero Plastic Day',
    submittedAt: '2024-01-14',
    proofImage: 'https://images.pexels.com/photos/802221/pexels-photo-802221.jpeg?auto=compress&cs=tinysrgb&w=400',
    status: 'pending'
  }
];

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.OVERVIEW);
  const [submissions, setSubmissions] = useState(mockSubmissions);

  const tabs = [
    { id: Tab.OVERVIEW, label: 'Overview', icon: Users, color: 'text-green-400' },
    { id: Tab.VERIFY, label: 'Verify Proofs', icon: ClipboardCheck, color: 'text-orange-400' },
    { id: Tab.ASSIGN, label: 'Assign Challenge', icon: PlusCircle, color: 'text-blue-400' },
    { id: Tab.REPORTS, label: 'Reports', icon: BarChart3, color: 'text-purple-400' }
  ];

  const approveSubmission = (id: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: 'approved' } : sub
    ));
  };

  const rejectSubmission = (id: string) => {
    setSubmissions(prev => prev.map(sub => 
      sub.id === id ? { ...sub, status: 'rejected' } : sub
    ));
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">👩‍🏫</div>
        <h2 className="text-3xl font-bold text-white mb-2">Teacher Dashboard</h2>
        <p className="text-green-400">Manage your students' eco-learning journey</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">👨‍🎓</div>
          <div className="text-2xl font-bold text-white">24</div>
          <div className="text-green-400">Active Students</div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-500/20 to-red-600/20 border border-orange-500/30 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">📋</div>
          <div className="text-2xl font-bold text-white">8</div>
          <div className="text-orange-400">Pending Reviews</div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/20 to-indigo-600/20 border border-blue-500/30 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-white">156</div>
          <div className="text-blue-400">Challenges Completed</div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-6 text-center">
          <div className="text-3xl mb-2">🌍</div>
          <div className="text-2xl font-bold text-white">89kg</div>
          <div className="text-purple-400">CO₂ Saved</div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { student: 'Alex Green', action: 'completed Quiz: Renewable Energy', time: '2 hours ago', icon: '📚' },
            { student: 'Emma Nature', action: 'submitted Challenge: Plant a Tree', time: '4 hours ago', icon: '🌳' },
            { student: 'Sam Ocean', action: 'earned Badge: Water Saver', time: '1 day ago', icon: '🏅' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-slate-700/50 rounded-lg">
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-grow">
                <div className="text-white font-semibold">{activity.student}</div>
                <div className="text-slate-400 text-sm">{activity.action}</div>
              </div>
              <div className="text-slate-400 text-sm">{activity.time}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVerify = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-3xl font-bold text-white mb-2">Verify Challenge Submissions</h2>
        <p className="text-orange-400">Review and approve student eco-challenge proofs</p>
      </div>

      <div className="space-y-4">
        {submissions.filter(sub => sub.status === 'pending').map((submission) => (
          <div key={submission.id} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
              <img 
                src={submission.proofImage} 
                alt="Challenge proof" 
                className="w-full md:w-32 h-32 object-cover rounded-lg"
              />
              
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-white mb-2">{submission.challenge}</h3>
                <p className="text-slate-300 mb-1">Student: <span className="text-green-400 font-semibold">{submission.studentName}</span></p>
                <p className="text-slate-400 text-sm">Submitted: {submission.submittedAt}</p>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => approveSubmission(submission.id)}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <CheckCircle size={16} />
                  <span>Approve</span>
                </button>
                <button
                  onClick={() => rejectSubmission(submission.id)}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <XCircle size={16} />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {submissions.filter(sub => sub.status === 'pending').length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-bold text-white mb-2">All caught up!</h3>
            <p className="text-slate-400">No pending submissions to review.</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderAssign = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">📝</div>
        <h2 className="text-3xl font-bold text-white mb-2">Create New Challenge</h2>
        <p className="text-blue-400">Design engaging eco-challenges for your students</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <form className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 space-y-6">
          <div>
            <label className="block text-green-400 font-semibold mb-2">Challenge Title</label>
            <input
              type="text"
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., Create a Compost Bin"
            />
          </div>
          
          <div>
            <label className="block text-green-400 font-semibold mb-2">Description</label>
            <textarea
              rows={4}
              className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              placeholder="Describe what students need to do..."
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-green-400 font-semibold mb-2">XP Reward</label>
              <input
                type="number"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="150"
              />
            </div>
            <div>
              <label className="block text-green-400 font-semibold mb-2">Challenge Icon</label>
              <select className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                <option>🌱 Plant</option>
                <option>♻️ Recycle</option>
                <option>💧 Water</option>
                <option>⚡ Energy</option>
                <option>🌍 Earth</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            Create Challenge
          </button>
        </form>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-3xl font-bold text-white mb-2">Impact Reports</h2>
        <p className="text-purple-400">Track your students' environmental impact</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">This Month</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Trees Planted</span>
              <span className="text-green-400 font-bold">47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Water Saved</span>
              <span className="text-blue-400 font-bold">234L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Waste Recycled</span>
              <span className="text-purple-400 font-bold">89kg</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Student Engagement</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-slate-400">Active Students</span>
              <span className="text-white font-bold">24/26</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Avg Quiz Score</span>
              <span className="text-yellow-400 font-bold">87%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Challenges Done</span>
              <span className="text-orange-400 font-bold">156</span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Performers</h3>
          <div className="space-y-2">
            {['Emma Green', 'Alex Earth', 'Sam Nature'].map((name, index) => (
              <div key={name} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>
                  <span className="text-white text-sm">{name}</span>
                </div>
                <span className="text-yellow-400 text-sm font-bold">{2450 - index * 300} XP</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-4">Export Reports</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
            Download Student Progress (CSV)
          </button>
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
            Download Impact Report (PDF)
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
            Download Analytics (Excel)
          </button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case Tab.OVERVIEW: return renderOverview();
      case Tab.VERIFY: return renderVerify();
      case Tab.ASSIGN: return renderAssign();
      case Tab.REPORTS: return renderReports();
      default: return renderOverview();
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
              <h1 className="text-lg sm:text-xl font-bold text-white">EcoLearn Teacher</h1>
              <p className="text-green-400 text-xs sm:text-sm">Welcome back, {user.name}!</p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors flex items-center space-x-2 text-sm sm:text-base"
          >
            <LogOut size={20} />
            <span className="hidden sm:inline">Logout</span>
          </button>
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

export default TeacherDashboard;