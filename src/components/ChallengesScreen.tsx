import React, { useState } from 'react';
import { Camera, Upload, CheckCircle, Clock, X } from 'lucide-react';
import { User, Challenge } from '../types';

interface ChallengesScreenProps {
  user: User;
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Plant a Tree',
    description: 'Plant a tree in your garden or local park. Take a photo of yourself with the planted tree!',
    xpReward: 200,
    status: 'pending',
    icon: '🌳'
  },
  {
    id: '2',
    title: 'Zero Plastic Day',
    description: 'Spend an entire day without using any single-use plastic. Document your plastic-free alternatives!',
    xpReward: 150,
    status: 'submitted',
    icon: '🚯'
  },
  {
    id: '3',
    title: 'Water Conservation',
    description: 'Install a water-saving device or collect rainwater. Show us your water-saving setup!',
    xpReward: 175,
    status: 'approved',
    icon: '💧'
  },
  {
    id: '4',
    title: 'Recycle Masterpiece',
    description: 'Create something useful or beautiful from recycled materials. Share your creative recycling project!',
    xpReward: 180,
    status: 'pending',
    icon: '♻️'
  },
  {
    id: '5',
    title: 'Energy Saver',
    description: 'Reduce your home energy consumption for a week. Track and share your energy-saving efforts!',
    xpReward: 160,
    status: 'rejected',
    icon: '💡'
  }
];

const ChallengesScreen: React.FC<ChallengesScreenProps> = ({ user }) => {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const submitChallenge = (challengeId: string) => {
    // Mock submission - in real app this would upload to Firebase
    alert('Challenge submitted! Your teacher will review it soon.');
    setSelectedChallenge(null);
    setUploadedImage(null);
  };

  const getStatusColor = (status: Challenge['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30';
      case 'submitted': return 'text-blue-400 bg-blue-400/20 border-blue-400/30';
      case 'approved': return 'text-green-400 bg-green-400/20 border-green-400/30';
      case 'rejected': return 'text-red-400 bg-red-400/20 border-red-400/30';
      default: return 'text-slate-400 bg-slate-400/20 border-slate-400/30';
    }
  };

  const getStatusIcon = (status: Challenge['status']) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'submitted': return <Upload size={16} />;
      case 'approved': return <CheckCircle size={16} />;
      case 'rejected': return <X size={16} />;
      default: return null;
    }
  };

  if (selectedChallenge) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
          <button
            onClick={() => {
              setSelectedChallenge(null);
              setUploadedImage(null);
            }}
            className="text-slate-400 hover:text-white mb-4 transition-colors"
          >
            ← Back to Challenges
          </button>

          <div className="text-center mb-6">
            <div className="text-6xl mb-4">{selectedChallenge.icon}</div>
            <h2 className="text-2xl font-bold text-white mb-2">{selectedChallenge.title}</h2>
            <p className="text-slate-300 mb-4">{selectedChallenge.description}</p>
            <div className="bg-green-600 text-white px-4 py-2 rounded-full inline-block font-bold">
              Reward: +{selectedChallenge.xpReward} XP
            </div>
          </div>

          <div className="space-y-6">
            <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center hover:border-green-500 transition-colors">
              {uploadedImage ? (
                <div className="space-y-4">
                  <img 
                    src={uploadedImage} 
                    alt="Challenge proof" 
                    className="max-h-64 mx-auto rounded-lg shadow-lg"
                  />
                  <p className="text-green-400 font-semibold">Photo uploaded! Ready to submit.</p>
                </div>
              ) : (
                <div>
                  <Camera size={48} className="mx-auto mb-4 text-slate-400" />
                  <p className="text-slate-300 mb-4">Upload a photo as proof of completion</p>
                  <label className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg cursor-pointer transition-all duration-300 inline-flex items-center space-x-2">
                    <Upload size={20} />
                    <span>Choose Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              )}
            </div>

            {uploadedImage && (
              <button
                onClick={() => submitChallenge(selectedChallenge.id)}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Submit Challenge
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 animate-pulse">🌟</div>
        <h2 className="text-3xl font-bold text-white mb-2">Eco Challenges</h2>
        <p className="text-green-400">Complete real-world environmental actions!</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockChallenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 sm:p-6 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 w-full"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">{challenge.icon}</div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold border flex items-center space-x-1 ${getStatusColor(challenge.status)}`}>
                {getStatusIcon(challenge.status)}
                <span className="capitalize hidden sm:inline">{challenge.status}</span>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-white mb-2 break-words">{challenge.title}</h3>
            <p className="text-slate-300 text-sm mb-4 line-clamp-3 break-words">{challenge.description}</p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <div className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                +{challenge.xpReward} XP
              </div>
              
              {challenge.status === 'pending' && (
                <button
                  onClick={() => setSelectedChallenge(challenge)}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-2 px-3 sm:px-4 rounded-lg transition-all duration-300 flex items-center space-x-2 text-sm sm:text-base"
                >
                  <Camera size={16} />
                  <span>Start</span>
                </button>
              )}
              
              {challenge.status === 'approved' && (
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle size={20} />
                  <span className="font-semibold text-sm sm:text-base">Completed!</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChallengesScreen;