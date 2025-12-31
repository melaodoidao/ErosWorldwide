import React from 'react';
import { Heart, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { CompatibilityMatch, CompatibilityTier, ConfidenceLevel, MBTIType } from '../mbti/types';
import { getMBTITheme } from '../mbti/colors';
import { getConfidenceMessage } from '../mbti/compatibility';

interface CompatibilityScoreProps {
  match: CompatibilityMatch;
  showDetails?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const CompatibilityScore: React.FC<CompatibilityScoreProps> = ({
  match,
  showDetails = false,
  size = 'md',
  className = '',
}) => {
  const tierColors: Record<CompatibilityTier, { bg: string; text: string; label: string }> = {
    ideal: { bg: '#059669', text: 'white', label: 'Ideal Match' },
    great: { bg: '#10B981', text: 'white', label: 'Great Match' },
    good: { bg: '#3B82F6', text: 'white', label: 'Good Match' },
    moderate: { bg: '#F59E0B', text: '#1F2937', label: 'Moderate' },
    challenging: { bg: '#EF4444', text: 'white', label: 'Challenging' },
  };

  const tier = tierColors[match.compatibilityTier];
  const theme = getMBTITheme(match.theirType);

  const sizeClasses = {
    sm: { circle: 'w-12 h-12', text: 'text-sm', label: 'text-[10px]' },
    md: { circle: 'w-16 h-16', text: 'text-lg', label: 'text-xs' },
    lg: { circle: 'w-20 h-20', text: 'text-2xl', label: 'text-sm' },
  };

  const sizes = sizeClasses[size];

  return (
    <div className={`${className}`}>
      {/* Score Circle */}
      <div className="flex items-center gap-3">
        <div
          className={`${sizes.circle} rounded-full flex items-center justify-center relative`}
          style={{ background: `conic-gradient(${tier.bg} ${match.compatibilityScore}%, #E5E7EB ${match.compatibilityScore}%)` }}
        >
          <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
            <span className={`${sizes.text} font-bold text-gray-800`}>
              {match.compatibilityScore}%
            </span>
          </div>
        </div>

        <div>
          <div
            className={`inline-block px-2 py-0.5 rounded-full ${sizes.label} font-semibold`}
            style={{ backgroundColor: tier.bg, color: tier.text }}
          >
            {tier.label}
          </div>
          {match.confidenceLevel !== 'high' && (
            <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
              <Info size={12} />
              <span>{match.confidenceLevel === 'low' ? 'Low confidence' : 'Medium confidence'}</span>
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      {showDetails && (
        <div className="mt-4 space-y-3">
          {/* Shared Strengths */}
          {match.sharedStrengths.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <CheckCircle size={12} className="text-green-500" />
                Shared Strengths
              </h4>
              <ul className="space-y-1">
                {match.sharedStrengths.map((strength, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Potential Challenges */}
          {match.potentialChallenges.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <AlertCircle size={12} className="text-amber-500" />
                Areas to Navigate
              </h4>
              <ul className="space-y-1">
                {match.potentialChallenges.map((challenge, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Confidence Note */}
          {match.confidenceLevel !== 'high' && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
              <p className="text-xs text-blue-700">
                {getConfidenceMessage(match.confidenceLevel)}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Compact inline version for profile cards
interface CompatibilityBadgeProps {
  score: number;
  tier: CompatibilityTier;
  className?: string;
}

export const CompatibilityBadge: React.FC<CompatibilityBadgeProps> = ({
  score,
  tier,
  className = '',
}) => {
  const tierColors: Record<CompatibilityTier, string> = {
    ideal: '#059669',
    great: '#10B981',
    good: '#3B82F6',
    moderate: '#F59E0B',
    challenging: '#EF4444',
  };

  return (
    <div
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold text-white ${className}`}
      style={{ backgroundColor: tierColors[tier] }}
    >
      <Heart size={10} fill="currentColor" />
      {score}%
    </div>
  );
};

// Heart icon that fills based on compatibility
interface CompatibilityHeartProps {
  score: number;
  size?: number;
  className?: string;
}

export const CompatibilityHeart: React.FC<CompatibilityHeartProps> = ({
  score,
  size = 24,
  className = '',
}) => {
  // Determine color based on score
  const getColor = () => {
    if (score >= 85) return '#059669';
    if (score >= 70) return '#10B981';
    if (score >= 55) return '#3B82F6';
    if (score >= 40) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      {/* Background heart (gray) */}
      <Heart size={size} className="text-gray-200" fill="currentColor" />
      {/* Filled portion */}
      <div
        className="absolute bottom-0 left-0 overflow-hidden"
        style={{ height: `${score}%` }}
      >
        <Heart size={size} fill={getColor()} stroke={getColor()} />
      </div>
    </div>
  );
};

export default CompatibilityScore;
