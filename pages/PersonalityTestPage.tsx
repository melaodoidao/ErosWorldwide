import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Heart,
  Lock,
  Unlock,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Users,
  ArrowRight,
  Check,
  RefreshCw,
} from 'lucide-react';
import { db } from '../database';
import {
  MBTIType,
  MBTIResult,
  MBTIAnswer,
  TestTier,
  MBTIQuestion,
  TIER_QUESTION_COUNTS,
} from '../mbti/types';
import { getQuestionsByTier, shuffleQuestions } from '../mbti/questionBank';
import { calculateMBTIResult, createMBTIResult } from '../mbti/scoring';
import { getIdealMatches, getGreatMatches } from '../mbti/compatibility';
import { getMBTITypeInfo, getMBTIFullLabel } from '../mbti/descriptions';
import { getMBTITheme, getMBTIThemeClass } from '../mbti/colors';
import { MBTIBadge, DimensionBars } from '../components';
import { GentlemanProfile } from '../types';

type PageState = 'intro' | 'test' | 'calculating' | 'results';

interface PersonalityTestPageProps {
  currentUser: GentlemanProfile | null;
  onUpdateUser: (user: GentlemanProfile) => void;
}

export const PersonalityTestPage: React.FC<PersonalityTestPageProps> = ({
  currentUser,
  onUpdateUser,
}) => {
  const navigate = useNavigate();

  // Page state
  const [pageState, setPageState] = useState<PageState>('intro');
  const [selectedTier, setSelectedTier] = useState<TestTier>('short');

  // Test state
  const [questions, setQuestions] = useState<MBTIQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<MBTIAnswer[]>([]);
  const [previousAnswers, setPreviousAnswers] = useState<MBTIAnswer[]>([]);

  // Results
  const [result, setResult] = useState<MBTIResult | null>(null);

  // Get current tier completed
  const currentTierCompleted = currentUser?.mbtiResult?.testTier || 'none';

  // Get available tiers
  const getTierStatus = (tier: TestTier): 'completed' | 'available' | 'locked' => {
    const tierOrder: TestTier[] = ['none', 'short', 'medium', 'full'];
    const completedIndex = tierOrder.indexOf(currentTierCompleted);
    const tierIndex = tierOrder.indexOf(tier);

    if (tierIndex <= completedIndex) return 'completed';
    if (tierIndex === completedIndex + 1) return 'available';
    return 'locked';
  };

  // Start test for a tier
  const startTest = (tier: TestTier) => {
    setSelectedTier(tier);

    // Get questions for this tier
    let tierQuestions: MBTIQuestion[];

    if (currentTierCompleted === 'none') {
      // First test - get short questions
      tierQuestions = getQuestionsByTier('short');
    } else {
      // Upgrading - only get new questions for this tier
      tierQuestions = getQuestionsByTier(tier).filter(
        (q) => !getQuestionsByTier(currentTierCompleted).some((pq) => pq.id === q.id)
      );
      // Store previous answers for merging
      setPreviousAnswers(db.mbtiSessions.getAnswers(currentUser?.id || ''));
    }

    setQuestions(shuffleQuestions(tierQuestions));
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setPageState('test');
  };

  // Handle answer selection
  const handleAnswer = (pole: string) => {
    const question = questions[currentQuestionIndex];
    const answer: MBTIAnswer = {
      questionId: question.id,
      selectedPole: pole as any,
      timestamp: new Date().toISOString(),
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    // Save session progress
    if (currentUser) {
      db.mbtiSessions.save({
        odei: currentUser.id,
        userType: 'gentleman',
        currentTier: selectedTier,
        answers: newAnswers,
        startedAt: new Date().toISOString(),
        currentQuestionIndex: currentQuestionIndex + 1,
        isComplete: currentQuestionIndex + 1 >= questions.length,
      });
    }

    // Move to next question or finish
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      finishTest(newAnswers);
    }
  };

  // Finish test and calculate results
  const finishTest = (finalAnswers: MBTIAnswer[]) => {
    setPageState('calculating');

    // Combine with previous answers if upgrading
    const allAnswers = [...previousAnswers, ...finalAnswers];

    // Calculate result after animation
    setTimeout(() => {
      const scoringResult = calculateMBTIResult(allAnswers, selectedTier);
      const mbtiResult = createMBTIResult(scoringResult, selectedTier, allAnswers.length);

      setResult(mbtiResult);

      // Save to user profile
      if (currentUser) {
        const updatedUser = { ...currentUser, mbtiResult };
        db.mbtiResults.saveGentlemanResult(currentUser.id, mbtiResult);
        onUpdateUser(updatedUser);

        // Clear session
        db.mbtiSessions.delete(currentUser.id);
      }

      setPageState('results');
    }, 2000);
  };

  // Go back to previous question
  const goBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setAnswers(answers.slice(0, -1));
    }
  };

  // Render intro/tier selection
  const renderIntro = () => {
    const tiers: { tier: TestTier; name: string; questions: number; time: string; accuracy: string }[] = [
      { tier: 'short', name: 'Quick Assessment', questions: 20, time: '5 min', accuracy: '60%' },
      { tier: 'medium', name: 'Standard Assessment', questions: 50, time: '15 min', accuracy: '80%' },
      { tier: 'full', name: 'Complete Assessment', questions: 80, time: '25 min', accuracy: '95%' },
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#1A1D29] via-[#252836] to-[#2D3142] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6">
                <Brain size={20} className="text-rose-400" />
                <span className="text-sm font-medium">Personality Compatibility Test</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Discover Your Personality Type
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Take our Myers-Briggs inspired personality assessment to find your most compatible matches.
                Understanding personality types helps build stronger, lasting relationships.
              </p>

              {currentUser?.mbtiResult && (
                <div className="inline-flex items-center gap-3 bg-white/10 rounded-2xl px-6 py-4">
                  <span className="text-gray-300">Your type:</span>
                  <MBTIBadge type={currentUser.mbtiResult.type} size="lg" showLabel />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tier Selection */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-2">Choose Your Assessment Level</h2>
            <p className="text-gray-600 text-center mb-8">
              Complete each level to unlock the next and improve your match accuracy
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {tiers.map(({ tier, name, questions, time, accuracy }) => {
                const status = getTierStatus(tier);
                const isAvailable = status === 'available';
                const isCompleted = status === 'completed';
                const isLocked = status === 'locked';

                return (
                  <div
                    key={tier}
                    className={`tier-card ${isCompleted ? 'unlocked' : ''} ${isLocked ? 'locked' : ''} ${isAvailable ? 'current' : ''}`}
                  >
                    {isLocked && (
                      <Lock size={20} className="tier-lock-icon" />
                    )}
                    {isCompleted && (
                      <div className="absolute top-3 right-3">
                        <Check size={20} className="text-green-500" />
                      </div>
                    )}

                    <h3 className="font-bold text-lg mb-1">{name}</h3>
                    <p className="text-sm text-gray-500 mb-4">{tier.charAt(0).toUpperCase() + tier.slice(1)} Test</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Questions:</span>
                        <span className="font-medium">{questions}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Time:</span>
                        <span className="font-medium">{time}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Accuracy:</span>
                        <span className="font-medium text-green-600">{accuracy}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => !isLocked && startTest(tier)}
                      disabled={isLocked}
                      className={`w-full py-2.5 rounded-lg font-medium transition-all ${
                        isAvailable
                          ? 'bg-rose-500 text-white hover:bg-rose-600'
                          : isCompleted
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {isCompleted ? (
                        <span className="flex items-center justify-center gap-2">
                          <RefreshCw size={16} />
                          Retake
                        </span>
                      ) : isAvailable ? (
                        <span className="flex items-center justify-center gap-2">
                          Start Test
                          <ArrowRight size={16} />
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <Lock size={16} />
                          Locked
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* How it works */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-center mb-8">How It Works</h2>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { icon: Brain, title: 'Take the Test', desc: 'Answer questions about your preferences and behaviors' },
                  { icon: Sparkles, title: 'Get Your Type', desc: 'Discover your 4-letter personality type' },
                  { icon: Heart, title: 'Find Matches', desc: 'See compatibility scores with potential partners' },
                  { icon: Users, title: 'Connect', desc: 'Focus on your most compatible matches' },
                ].map(({ icon: Icon, title, desc }, i) => (
                  <div key={i} className="text-center">
                    <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center mx-auto mb-3">
                      <Icon size={24} />
                    </div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-gray-600">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render test questions
  const renderTest = () => {
    const question = questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="personality-test-container">
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-rose-500">
                  {Math.round(progress)}% complete
                </span>
              </div>
              <div className="test-progress-bar">
                <div className="test-progress-fill" style={{ width: `${progress}%` }} />
              </div>
            </div>

            {/* Question Card */}
            <div className="question-card question-enter" key={question.id}>
              <h2 className="text-xl md:text-2xl font-medium text-gray-800 mb-8">
                {question.text}
              </h2>

              <div className="space-y-3">
                <button
                  onClick={() => handleAnswer(question.optionA.pole)}
                  className="question-option"
                >
                  {question.optionA.text}
                </button>
                <button
                  onClick={() => handleAnswer(question.optionB.pole)}
                  className="question-option"
                >
                  {question.optionB.text}
                </button>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <button
                  onClick={goBack}
                  disabled={currentQuestionIndex === 0}
                  className={`flex items-center gap-2 text-sm font-medium ${
                    currentQuestionIndex === 0
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <ChevronLeft size={18} />
                  Previous
                </button>

                <span className="text-xs text-gray-400 uppercase tracking-wide">
                  {question.dimension === 'EI' && 'Energy'}
                  {question.dimension === 'SN' && 'Information'}
                  {question.dimension === 'TF' && 'Decisions'}
                  {question.dimension === 'JP' && 'Lifestyle'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render calculating animation
  const renderCalculating = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-24 h-24 mx-auto mb-6 relative">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-4 border-rose-500 border-t-transparent animate-spin" />
          <Brain size={32} className="absolute inset-0 m-auto text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Analyzing Your Responses</h2>
        <p className="text-gray-600">Calculating your personality type...</p>
      </div>
    </div>
  );

  // Render results
  const renderResults = () => {
    if (!result) return null;

    const typeInfo = getMBTITypeInfo(result.type);
    const theme = getMBTITheme(result.type);
    const themeClass = getMBTIThemeClass(result.type);
    const idealMatches = getIdealMatches(result.type);
    const greatMatches = getGreatMatches(result.type);

    return (
      <div className={`min-h-screen bg-gray-50 ${themeClass}`}>
        {/* Hero Result */}
        <div
          className="py-16 text-white"
          style={{ background: theme.gradient }}
        >
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
                <Sparkles size={18} />
                <span className="text-sm font-medium">Your Personality Type</span>
              </div>

              <div className="results-type-display">
                <div className="results-type-badge" style={{ color: 'white' }}>
                  {result.type}
                </div>
                <div className="results-type-name" style={{ color: 'rgba(255,255,255,0.9)' }}>
                  {typeInfo.name}
                </div>
              </div>

              <p className="text-lg opacity-90 mt-4">
                {typeInfo.shortDescription}
              </p>

              <div className="flex justify-center gap-4 mt-6">
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{result.confidence}%</div>
                  <div className="text-xs opacity-75">Confidence</div>
                </div>
                <div className="bg-white/20 rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{result.questionsAnswered}</div>
                  <div className="text-xs opacity-75">Questions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Dimension Scores */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">Your Personality Dimensions</h3>
              <DimensionBars scores={result.dimensionScores} type={result.type} />
            </div>

            {/* About Type */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">About {typeInfo.name}s</h3>
              <p className="text-gray-700 mb-4">{typeInfo.fullDescription}</p>

              <h4 className="font-semibold text-gray-800 mb-2">In Relationships</h4>
              <p className="text-gray-700">{typeInfo.inRelationships}</p>
            </div>

            {/* Compatible Types */}
            <div className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h3 className="text-lg font-bold mb-4">Your Best Matches</h3>

              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Ideal Matches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {idealMatches.map((type) => (
                    <MBTIBadge key={type} type={type} showLabel />
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  Great Matches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {greatMatches
                    .filter((t) => !idealMatches.includes(t))
                    .map((type) => (
                      <MBTIBadge key={type} type={type} variant="outline" />
                    ))}
                </div>
              </div>
            </div>

            {/* Next Steps */}
            <div className="bg-gradient-to-r from-rose-500 to-rose-600 rounded-2xl shadow-md p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Ready to Find Your Match?</h3>
              <p className="opacity-90 mb-4">
                Now that you know your personality type, browse our ladies and see your compatibility scores!
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate('/ladies')}
                  className="bg-white text-rose-500 px-6 py-2.5 rounded-lg font-medium hover:bg-rose-50 transition-colors"
                >
                  View Compatible Ladies
                </button>
                {result.testTier !== 'full' && (
                  <button
                    onClick={() => setPageState('intro')}
                    className="bg-white/20 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-white/30 transition-colors"
                  >
                    Improve Accuracy
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Main render
  return (
    <>
      {pageState === 'intro' && renderIntro()}
      {pageState === 'test' && renderTest()}
      {pageState === 'calculating' && renderCalculating()}
      {pageState === 'results' && renderResults()}
    </>
  );
};

export default PersonalityTestPage;
