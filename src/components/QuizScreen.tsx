import React, { useState } from 'react';
import { Play, Clock, Star, Zap, Award } from 'lucide-react';
import { User, Quiz } from '../types';

interface QuizScreenProps {
  user: User;
}

const mockQuizzes: Quiz[] = [
  {
    id: '1',
    title: 'Renewable Energy Basics',
    questions: [
      {
        id: '1',
        text: 'Which of these is a renewable energy source?',
        options: ['Coal', 'Solar Power', 'Natural Gas', 'Oil'],
        correctAnswer: 1,
        explanation: 'Solar power harnesses energy from the sun, which is renewable and clean!'
      },
      {
        id: '2',
        text: 'What percentage of electricity should come from renewable sources by 2030?',
        options: ['25%', '50%', '75%', '100%'],
        correctAnswer: 2,
        explanation: 'Scientists recommend at least 75% renewable electricity by 2030 to combat climate change!'
      }
    ],
    xpReward: 150,
    badgeReward: {
      id: '4',
      name: 'Energy Expert',
      icon: '⚡',
      color: 'text-yellow-400',
      unlocked: false,
      description: 'Master of renewable energy!'
    }
  },
  {
    id: '2',
    title: 'Ocean Conservation',
    questions: [
      {
        id: '3',
        text: 'How much plastic waste enters our oceans every year?',
        options: ['1 million tons', '5 million tons', '8 million tons', '12 million tons'],
        correctAnswer: 2,
        explanation: 'About 8 million tons of plastic waste enters our oceans annually - we must reduce this!'
      }
    ],
    xpReward: 100
  },
  {
    id: '3',
    title: 'Climate Change Fundamentals',
    questions: [
      {
        id: '4',
        text: 'What is the main cause of climate change?',
        options: ['Deforestation', 'Greenhouse gases', 'Ocean pollution', 'Volcanic activity'],
        correctAnswer: 1,
        explanation: 'Greenhouse gases from human activities are the primary driver of climate change.'
      }
    ],
    xpReward: 200
  }
];

const QuizScreen: React.FC<QuizScreenProps> = ({ user }) => {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const startQuiz = (quiz: Quiz) => {
    setSelectedQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const nextQuestion = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (selectedAnswer === selectedQuiz!.questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < selectedQuiz!.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswers([]);
  };

  if (!selectedQuiz) {
    return (
      <div className="space-y-6">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 animate-bounce">🧠</div>
          <h2 className="text-3xl font-bold text-white mb-2">Knowledge Quests</h2>
          <p className="text-green-400">Test your eco-knowledge and earn XP!</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockQuizzes.map((quiz) => (
            <div
              key={quiz.id}
              className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 sm:p-6 hover:border-green-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer group w-full"
              onClick={() => startQuiz(quiz)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl">📚</div>
                <div className="bg-green-600 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap">
                  +{quiz.xpReward} XP
                </div>
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors break-words">
                {quiz.title}
              </h3>
              
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{quiz.questions.length} questions</span>
                <div className="flex items-center space-x-1">
                  <Clock size={16} />
                  <span>{quiz.questions.length * 30}s</span>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 sm:px-4 py-2 rounded-lg font-bold flex items-center space-x-2 group-hover:from-green-600 group-hover:to-emerald-700 transition-all text-sm sm:text-base">
                  <Play size={16} />
                  <span>Start Quiz</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / selectedQuiz.questions.length) * 100);
    const earned = Math.round((percentage / 100) * selectedQuiz.xpReward);

    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8">
          <div className="text-6xl mb-4">
            {percentage >= 80 ? '🎉' : percentage >= 60 ? '👏' : '💪'}
          </div>
          
          <h2 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h2>
          
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-600/20 border border-green-500/30 rounded-lg p-6 mb-6">
            <div className="text-4xl font-bold text-green-400 mb-2">{score}/{selectedQuiz.questions.length}</div>
            <div className="text-2xl font-bold text-white mb-2">{percentage}% Correct</div>
            <div className="text-yellow-400 font-bold text-xl">+{earned} XP Earned!</div>
          </div>

          {percentage >= 80 && selectedQuiz.badgeReward && (
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-600/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-3">
                <Award size={24} className="text-yellow-400" />
                <span className="text-lg font-bold text-white">Badge Unlocked!</span>
                <div className="text-2xl">{selectedQuiz.badgeReward.icon}</div>
              </div>
              <p className="text-yellow-400 mt-2">{selectedQuiz.badgeReward.name}</p>
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={resetQuiz}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
            >
              Back to Quizzes
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = selectedQuiz.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / selectedQuiz.questions.length) * 100;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-semibold">{selectedQuiz.title}</span>
            <span className="text-slate-400 text-sm">
              {currentQuestion + 1} of {selectedQuiz.questions.length}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-white mb-6">{question.text}</h3>
          
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 rounded-lg border transition-all duration-300 text-left ${
                  selectedAnswer === index
                    ? 'border-green-500 bg-green-500/20 text-green-400'
                    : 'border-slate-600 bg-slate-700/50 text-white hover:border-slate-500 hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedAnswer === index ? 'border-green-500 bg-green-500' : 'border-slate-500'
                  }`}>
                    {selectedAnswer === index && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <span className="font-semibold">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Next Button */}
        <div className="flex justify-end">
          <button
            onClick={nextQuestion}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              selectedAnswer !== null
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white transform hover:scale-105'
                : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }`}
          >
            {currentQuestion < selectedQuiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;