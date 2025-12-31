// ========================================
// MBTI SCORING ALGORITHM
// ========================================

import {
  MBTIType,
  MBTIAnswer,
  MBTIDimensionScores,
  MBTIResult,
  TestTier,
  TIER_CONFIDENCE_MULTIPLIERS,
} from './types';

interface ScoringResult {
  type: MBTIType;
  scores: MBTIDimensionScores;
  confidence: number;
}

/**
 * Calculate MBTI type from answers
 */
export const calculateMBTIResult = (
  answers: MBTIAnswer[],
  tier: TestTier
): ScoringResult => {
  // Initialize counters for each pole
  const counts: Record<string, number> = {
    E: 0, I: 0,
    S: 0, N: 0,
    T: 0, F: 0,
    J: 0, P: 0,
  };

  // Count responses for each pole
  answers.forEach(answer => {
    if (counts[answer.selectedPole] !== undefined) {
      counts[answer.selectedPole]++;
    }
  });

  // Calculate percentages for each dimension
  const totalEI = counts.E + counts.I || 1; // Avoid division by zero
  const totalSN = counts.S + counts.N || 1;
  const totalTF = counts.T + counts.F || 1;
  const totalJP = counts.J + counts.P || 1;

  const scores: MBTIDimensionScores = {
    E: Math.round((counts.E / totalEI) * 100),
    I: Math.round((counts.I / totalEI) * 100),
    S: Math.round((counts.S / totalSN) * 100),
    N: Math.round((counts.N / totalSN) * 100),
    T: Math.round((counts.T / totalTF) * 100),
    F: Math.round((counts.F / totalTF) * 100),
    J: Math.round((counts.J / totalJP) * 100),
    P: Math.round((counts.P / totalJP) * 100),
  };

  // Determine type based on dominant preferences
  const type = (
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P')
  ) as MBTIType;

  // Calculate confidence based on tier and score clarity
  const confidence = calculateConfidence(scores, tier);

  return { type, scores, confidence };
};

/**
 * Calculate confidence level based on:
 * 1. Test tier (more questions = more confidence)
 * 2. Score clarity (stronger preferences = more confidence)
 */
const calculateConfidence = (
  scores: MBTIDimensionScores,
  tier: TestTier
): number => {
  const tierMultiplier = TIER_CONFIDENCE_MULTIPLIERS[tier];

  // Calculate average clarity across dimensions
  // Clarity = how far from 50% the score is (max 50)
  const eiClarity = Math.abs(scores.E - 50);
  const snClarity = Math.abs(scores.S - 50);
  const tfClarity = Math.abs(scores.T - 50);
  const jpClarity = Math.abs(scores.J - 50);

  const avgClarity = (eiClarity + snClarity + tfClarity + jpClarity) / 4;

  // Base confidence starts at 50, max clarity adds up to 50 more
  const baseConfidence = 50 + avgClarity;

  // Apply tier multiplier
  const finalConfidence = Math.round(baseConfidence * tierMultiplier);

  // Clamp to 0-100
  return Math.min(100, Math.max(0, finalConfidence));
};

/**
 * Create a full MBTIResult object from scoring result
 */
export const createMBTIResult = (
  scoringResult: ScoringResult,
  tier: TestTier,
  questionsAnswered: number
): MBTIResult => {
  return {
    type: scoringResult.type,
    dimensionScores: scoringResult.scores,
    testTier: tier,
    testCompletedAt: new Date().toISOString(),
    questionsAnswered,
    confidence: scoringResult.confidence,
  };
};

/**
 * Get the dominant pole for a dimension
 */
export const getDominantPole = (
  scores: MBTIDimensionScores,
  dimension: 'EI' | 'SN' | 'TF' | 'JP'
): string => {
  switch (dimension) {
    case 'EI': return scores.E >= scores.I ? 'E' : 'I';
    case 'SN': return scores.S >= scores.N ? 'S' : 'N';
    case 'TF': return scores.T >= scores.F ? 'T' : 'F';
    case 'JP': return scores.J >= scores.P ? 'J' : 'P';
  }
};

/**
 * Get the strength of a preference (how dominant)
 * Returns: 'slight' | 'moderate' | 'clear' | 'very clear'
 */
export const getPreferenceStrength = (score: number): string => {
  const diff = Math.abs(score - 50);
  if (diff < 10) return 'slight';
  if (diff < 20) return 'moderate';
  if (diff < 35) return 'clear';
  return 'very clear';
};

/**
 * Get a human-readable description of dimension preferences
 */
export const getDimensionDescription = (
  scores: MBTIDimensionScores
): Record<string, string> => {
  return {
    EI: scores.E >= scores.I
      ? `${getPreferenceStrength(scores.E)} preference for Extraversion`
      : `${getPreferenceStrength(scores.I)} preference for Introversion`,
    SN: scores.S >= scores.N
      ? `${getPreferenceStrength(scores.S)} preference for Sensing`
      : `${getPreferenceStrength(scores.N)} preference for Intuition`,
    TF: scores.T >= scores.F
      ? `${getPreferenceStrength(scores.T)} preference for Thinking`
      : `${getPreferenceStrength(scores.F)} preference for Feeling`,
    JP: scores.J >= scores.P
      ? `${getPreferenceStrength(scores.J)} preference for Judging`
      : `${getPreferenceStrength(scores.P)} preference for Perceiving`,
  };
};

/**
 * Merge results from upgrading to a higher tier
 * Combines answers from previous tier with new tier
 */
export const mergeTestResults = (
  previousResult: MBTIResult | null,
  newAnswers: MBTIAnswer[],
  previousAnswers: MBTIAnswer[],
  newTier: TestTier
): ScoringResult => {
  // Combine all answers
  const allAnswers = [...previousAnswers, ...newAnswers];
  return calculateMBTIResult(allAnswers, newTier);
};

/**
 * Check if type changed between test tiers
 */
export const didTypeChange = (
  previousResult: MBTIResult | null,
  newResult: ScoringResult
): boolean => {
  if (!previousResult) return false;
  return previousResult.type !== newResult.type;
};

/**
 * Get dimensions that might change with more questions
 * (those with scores close to 50%)
 */
export const getUncertainDimensions = (
  scores: MBTIDimensionScores,
  threshold: number = 15
): string[] => {
  const uncertain: string[] = [];

  if (Math.abs(scores.E - 50) < threshold) uncertain.push('E/I');
  if (Math.abs(scores.S - 50) < threshold) uncertain.push('S/N');
  if (Math.abs(scores.T - 50) < threshold) uncertain.push('T/F');
  if (Math.abs(scores.J - 50) < threshold) uncertain.push('J/P');

  return uncertain;
};
