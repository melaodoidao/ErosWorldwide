import React from 'react';
import { MBTIDimensionScores, MBTIType } from '../mbti/types';
import { getMBTITheme, getMBTIThemeClass } from '../mbti/colors';
import { getDimensionExplanation } from '../mbti/descriptions';

interface DimensionBarsProps {
  scores: MBTIDimensionScores;
  type?: MBTIType; // Optional for theming
  compact?: boolean;
  showLabels?: boolean;
  showPercentages?: boolean;
}

export const DimensionBars: React.FC<DimensionBarsProps> = ({
  scores,
  type,
  compact = false,
  showLabels = true,
  showPercentages = true,
}) => {
  const themeClass = type ? getMBTIThemeClass(type) : '';
  const theme = type ? getMBTITheme(type) : null;

  const dimensions: Array<{
    key: 'EI' | 'SN' | 'TF' | 'JP';
    leftPole: string;
    rightPole: string;
    leftScore: number;
    rightScore: number;
    leftKey: 'E' | 'S' | 'T' | 'J';
    rightKey: 'I' | 'N' | 'F' | 'P';
  }> = [
    { key: 'EI', leftPole: 'Extraversion', rightPole: 'Introversion', leftScore: scores.E, rightScore: scores.I, leftKey: 'E', rightKey: 'I' },
    { key: 'SN', leftPole: 'Sensing', rightPole: 'Intuition', leftScore: scores.S, rightScore: scores.N, leftKey: 'S', rightKey: 'N' },
    { key: 'TF', leftPole: 'Thinking', rightPole: 'Feeling', leftScore: scores.T, rightScore: scores.F, leftKey: 'T', rightKey: 'F' },
    { key: 'JP', leftPole: 'Judging', rightPole: 'Perceiving', leftScore: scores.J, rightScore: scores.P, leftKey: 'J', rightKey: 'P' },
  ];

  return (
    <div className={`space-y-${compact ? '3' : '4'} ${themeClass}`}>
      {dimensions.map((dim) => {
        const isDominantLeft = dim.leftScore >= dim.rightScore;
        const dominantScore = isDominantLeft ? dim.leftScore : dim.rightScore;

        return (
          <div key={dim.key}>
            {/* Labels */}
            {showLabels && (
              <div className="flex justify-between items-center mb-1.5">
                <span
                  className={`text-xs font-semibold ${isDominantLeft ? '' : 'opacity-50'}`}
                  style={isDominantLeft && theme ? { color: theme.primary } : undefined}
                >
                  {compact ? dim.leftKey : dim.leftPole}
                  {showPercentages && !compact && (
                    <span className="ml-1 font-normal text-gray-500">
                      {dim.leftScore}%
                    </span>
                  )}
                </span>
                <span
                  className={`text-xs font-semibold ${!isDominantLeft ? '' : 'opacity-50'}`}
                  style={!isDominantLeft && theme ? { color: theme.primary } : undefined}
                >
                  {showPercentages && !compact && (
                    <span className="mr-1 font-normal text-gray-500">
                      {dim.rightScore}%
                    </span>
                  )}
                  {compact ? dim.rightKey : dim.rightPole}
                </span>
              </div>
            )}

            {/* Bar */}
            <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
              {/* Left side fill */}
              <div
                className="absolute left-0 top-0 h-full rounded-l-full transition-all duration-500"
                style={{
                  width: `${dim.leftScore}%`,
                  background: isDominantLeft
                    ? (theme ? `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})` : 'var(--gradient-primary)')
                    : 'var(--gray-300)',
                }}
              />
              {/* Right side fill */}
              <div
                className="absolute right-0 top-0 h-full rounded-r-full transition-all duration-500"
                style={{
                  width: `${dim.rightScore}%`,
                  background: !isDominantLeft
                    ? (theme ? `linear-gradient(270deg, ${theme.primary}, ${theme.secondary})` : 'var(--gradient-primary)')
                    : 'var(--gray-300)',
                }}
              />
              {/* Center marker */}
              <div className="absolute left-1/2 top-0 w-0.5 h-full bg-white transform -translate-x-1/2" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Single dimension bar for inline display
interface SingleDimensionBarProps {
  dimension: 'EI' | 'SN' | 'TF' | 'JP';
  scores: MBTIDimensionScores;
  type?: MBTIType;
}

export const SingleDimensionBar: React.FC<SingleDimensionBarProps> = ({
  dimension,
  scores,
  type,
}) => {
  const theme = type ? getMBTITheme(type) : null;
  const dimInfo = getDimensionExplanation(dimension);

  const dimMap = {
    EI: { left: scores.E, right: scores.I, leftKey: 'E', rightKey: 'I' },
    SN: { left: scores.S, right: scores.N, leftKey: 'S', rightKey: 'N' },
    TF: { left: scores.T, right: scores.F, leftKey: 'T', rightKey: 'F' },
    JP: { left: scores.J, right: scores.P, leftKey: 'J', rightKey: 'P' },
  };

  const dim = dimMap[dimension];
  const isDominantLeft = dim.left >= dim.right;

  return (
    <div className="flex items-center gap-2">
      <span className={`text-xs font-bold w-4 ${isDominantLeft ? 'opacity-100' : 'opacity-40'}`}>
        {dim.leftKey}
      </span>
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${dim.left}%`,
            background: theme ? theme.primary : 'var(--primary)',
          }}
        />
      </div>
      <span className={`text-xs font-bold w-4 text-right ${!isDominantLeft ? 'opacity-100' : 'opacity-40'}`}>
        {dim.rightKey}
      </span>
    </div>
  );
};

export default DimensionBars;
