// ========================================
// MBTI COMPATIBILITY ALGORITHM
// ========================================

import {
  MBTIType,
  MBTIDimensionScores,
  MBTIResult,
  TestTier,
  CompatibilityMatch,
  CompatibilityTier,
  ConfidenceLevel,
  TIER_CONFIDENCE_MULTIPLIERS,
} from './types';

// Compatibility ratings: 5 = Ideal, 4 = Great, 3 = Good, 2 = Moderate, 1 = Challenging
const COMPATIBILITY_MATRIX: Record<MBTIType, Record<MBTIType, number>> = {
  // Analysts (NT)
  INTJ: { INTJ: 4, INTP: 4, ENTJ: 5, ENTP: 5, INFJ: 4, INFP: 3, ENFJ: 4, ENFP: 5, ISTJ: 3, ISFJ: 2, ESTJ: 3, ESFJ: 2, ISTP: 3, ISFP: 2, ESTP: 2, ESFP: 2 },
  INTP: { INTJ: 4, INTP: 4, ENTJ: 5, ENTP: 4, INFJ: 3, INFP: 4, ENFJ: 3, ENFP: 4, ISTJ: 3, ISFJ: 2, ESTJ: 3, ESFJ: 2, ISTP: 3, ISFP: 2, ESTP: 3, ESFP: 2 },
  ENTJ: { INTJ: 5, INTP: 5, ENTJ: 4, ENTP: 4, INFJ: 4, INFP: 5, ENFJ: 3, ENFP: 4, ISTJ: 3, ISFJ: 2, ESTJ: 3, ESFJ: 2, ISTP: 3, ISFP: 3, ESTP: 3, ESFP: 3 },
  ENTP: { INTJ: 5, INTP: 4, ENTJ: 4, ENTP: 4, INFJ: 5, INFP: 4, ENFJ: 4, ENFP: 4, ISTJ: 2, ISFJ: 2, ESTJ: 3, ESFJ: 2, ISTP: 3, ISFP: 3, ESTP: 4, ESFP: 3 },

  // Diplomats (NF)
  INFJ: { INTJ: 4, INTP: 3, ENTJ: 4, ENTP: 5, INFJ: 4, INFP: 4, ENFJ: 4, ENFP: 5, ISTJ: 2, ISFJ: 3, ESTJ: 2, ESFJ: 3, ISTP: 2, ISFP: 3, ESTP: 2, ESFP: 3 },
  INFP: { INTJ: 3, INTP: 4, ENTJ: 5, ENTP: 4, INFJ: 4, INFP: 4, ENFJ: 5, ENFP: 4, ISTJ: 2, ISFJ: 3, ESTJ: 2, ESFJ: 3, ISTP: 2, ISFP: 3, ESTP: 2, ESFP: 3 },
  ENFJ: { INTJ: 4, INTP: 3, ENTJ: 3, ENTP: 4, INFJ: 4, INFP: 5, ENFJ: 4, ENFP: 4, ISTJ: 3, ISFJ: 4, ESTJ: 3, ESFJ: 4, ISTP: 3, ISFP: 5, ESTP: 3, ESFP: 4 },
  ENFP: { INTJ: 5, INTP: 4, ENTJ: 4, ENTP: 4, INFJ: 5, INFP: 4, ENFJ: 4, ENFP: 4, ISTJ: 2, ISFJ: 3, ESTJ: 2, ESFJ: 3, ISTP: 3, ISFP: 4, ESTP: 3, ESFP: 4 },

  // Sentinels (SJ)
  ISTJ: { INTJ: 3, INTP: 3, ENTJ: 3, ENTP: 2, INFJ: 2, INFP: 2, ENFJ: 3, ENFP: 2, ISTJ: 4, ISFJ: 4, ESTJ: 5, ESFJ: 5, ISTP: 4, ISFP: 3, ESTP: 4, ESFP: 4 },
  ISFJ: { INTJ: 2, INTP: 2, ENTJ: 2, ENTP: 2, INFJ: 3, INFP: 3, ENFJ: 4, ENFP: 3, ISTJ: 4, ISFJ: 4, ESTJ: 5, ESFJ: 5, ISTP: 3, ISFP: 4, ESTP: 4, ESFP: 5 },
  ESTJ: { INTJ: 3, INTP: 3, ENTJ: 3, ENTP: 3, INFJ: 2, INFP: 2, ENFJ: 3, ENFP: 2, ISTJ: 5, ISFJ: 5, ESTJ: 4, ESFJ: 4, ISTP: 5, ISFP: 4, ESTP: 4, ESFP: 4 },
  ESFJ: { INTJ: 2, INTP: 2, ENTJ: 2, ENTP: 2, INFJ: 3, INFP: 3, ENFJ: 4, ENFP: 3, ISTJ: 5, ISFJ: 5, ESTJ: 4, ESFJ: 4, ISTP: 4, ISFP: 5, ESTP: 4, ESFP: 4 },

  // Explorers (SP)
  ISTP: { INTJ: 3, INTP: 3, ENTJ: 3, ENTP: 3, INFJ: 2, INFP: 2, ENFJ: 3, ENFP: 3, ISTJ: 4, ISFJ: 3, ESTJ: 5, ESFJ: 4, ISTP: 4, ISFP: 4, ESTP: 5, ESFP: 4 },
  ISFP: { INTJ: 2, INTP: 2, ENTJ: 3, ENTP: 3, INFJ: 3, INFP: 3, ENFJ: 5, ENFP: 4, ISTJ: 3, ISFJ: 4, ESTJ: 4, ESFJ: 5, ISTP: 4, ISFP: 4, ESTP: 4, ESFP: 4 },
  ESTP: { INTJ: 2, INTP: 3, ENTJ: 3, ENTP: 4, INFJ: 2, INFP: 2, ENFJ: 3, ENFP: 3, ISTJ: 4, ISFJ: 4, ESTJ: 4, ESFJ: 4, ISTP: 5, ISFP: 4, ESTP: 4, ESFP: 5 },
  ESFP: { INTJ: 2, INTP: 2, ENTJ: 3, ENTP: 3, INFJ: 3, INFP: 3, ENFJ: 4, ENFP: 4, ISTJ: 4, ISFJ: 5, ESTJ: 4, ESFJ: 4, ISTP: 4, ISFP: 4, ESTP: 5, ESFP: 4 },
};

/**
 * Get base compatibility rating (1-5) between two types
 */
export const getBaseCompatibility = (type1: MBTIType, type2: MBTIType): number => {
  return COMPATIBILITY_MATRIX[type1][type2];
};

/**
 * Calculate dimension similarity bonus
 * For romantic relationships, some complementarity is beneficial
 */
const calculateDimensionSimilarity = (
  scores1: MBTIDimensionScores,
  scores2: MBTIDimensionScores
): number => {
  // E/I: Some difference is good (one partner more social)
  // S/N: Similar is better (shared communication style)
  // T/F: Complementary is often good (balance)
  // J/P: Similar is better (lifestyle compatibility)

  const eiDiff = Math.abs(scores1.E - scores2.E);
  const snDiff = Math.abs(scores1.S - scores2.S);
  const tfDiff = Math.abs(scores1.T - scores2.T);
  const jpDiff = Math.abs(scores1.J - scores2.J);

  // Ideal differences: E/I ~20-30, S/N ~0-20, T/F ~20-40, J/P ~0-20
  const eiScore = 100 - Math.abs(eiDiff - 25) * 2;
  const snScore = 100 - snDiff;
  const tfScore = 100 - Math.abs(tfDiff - 30) * 1.5;
  const jpScore = 100 - jpDiff;

  return Math.max(0, (eiScore + snScore + tfScore + jpScore) / 4);
};

/**
 * Calculate full compatibility between two MBTI results
 */
export const calculateCompatibility = (
  result1: MBTIResult,
  result2: MBTIResult
): {
  score: number;
  tier: CompatibilityTier;
  confidenceLevel: ConfidenceLevel;
} => {
  // Base compatibility from matrix (1-5, normalized to 0-100)
  const baseRating = COMPATIBILITY_MATRIX[result1.type][result2.type];
  const baseScore = ((baseRating - 1) / 4) * 100; // 1->0, 5->100

  // Adjust based on dimension score similarities
  const dimensionBonus = calculateDimensionSimilarity(
    result1.dimensionScores,
    result2.dimensionScores
  );

  // Calculate confidence based on both users' test tiers
  const tier1Mult = TIER_CONFIDENCE_MULTIPLIERS[result1.testTier];
  const tier2Mult = TIER_CONFIDENCE_MULTIPLIERS[result2.testTier];
  const confidenceMultiplier = (tier1Mult + tier2Mult) / 2;

  // Final score (weighted average of base and dimension similarity)
  const rawScore = baseScore * 0.7 + dimensionBonus * 0.3;
  const finalScore = Math.round(Math.min(100, Math.max(0, rawScore)));

  // Determine tier label
  const tier: CompatibilityTier =
    finalScore >= 85 ? 'ideal' :
    finalScore >= 70 ? 'great' :
    finalScore >= 55 ? 'good' :
    finalScore >= 40 ? 'moderate' : 'challenging';

  // Confidence level
  const confidenceLevel: ConfidenceLevel =
    confidenceMultiplier >= 0.9 ? 'high' :
    confidenceMultiplier >= 0.7 ? 'medium' : 'low';

  return { score: finalScore, tier, confidenceLevel };
};

/**
 * Get shared strengths between two types
 */
export const getSharedStrengths = (type1: MBTIType, type2: MBTIType): string[] => {
  const strengths: string[] = [];

  // Check shared letters
  if (type1[0] === type2[0]) {
    strengths.push(type1[0] === 'E'
      ? 'Both enjoy social activities together'
      : 'Both value quiet, intimate time together'
    );
  }
  if (type1[1] === type2[1]) {
    strengths.push(type1[1] === 'S'
      ? 'Share practical, grounded approach to life'
      : 'Share love of ideas and exploring possibilities'
    );
  }
  if (type1[2] === type2[2]) {
    strengths.push(type1[2] === 'T'
      ? 'Both value logical discussion and problem-solving'
      : 'Both prioritize emotional connection and harmony'
    );
  }
  if (type1[3] === type2[3]) {
    strengths.push(type1[3] === 'J'
      ? 'Both appreciate structure and planning'
      : 'Both enjoy spontaneity and flexibility'
    );
  }

  // Complementary strengths
  if (type1[0] !== type2[0]) {
    strengths.push('Balance each other socially - one brings energy, other brings depth');
  }
  if (type1[2] !== type2[2]) {
    strengths.push('Balance logic and emotion in decision-making together');
  }

  return strengths.slice(0, 3);
};

/**
 * Get potential challenges between two types
 */
export const getPotentialChallenges = (type1: MBTIType, type2: MBTIType): string[] => {
  const challenges: string[] = [];

  if (type1[0] !== type2[0]) {
    challenges.push('May need to balance social vs. alone time');
  }
  if (type1[1] !== type2[1]) {
    challenges.push('Different communication styles - details vs. big picture');
  }
  if (type1[2] !== type2[2]) {
    challenges.push('May approach conflicts differently - logic vs. feelings');
  }
  if (type1[3] !== type2[3]) {
    challenges.push('Different lifestyle preferences - planned vs. spontaneous');
  }

  return challenges.slice(0, 2);
};

/**
 * Create a full CompatibilityMatch object
 */
export const createCompatibilityMatch = (
  profileId: string,
  profileType: 'lady' | 'gentleman',
  myResult: MBTIResult,
  theirResult: MBTIResult
): CompatibilityMatch => {
  const { score, tier, confidenceLevel } = calculateCompatibility(myResult, theirResult);

  return {
    odei: profileId,
    profileType,
    theirType: theirResult.type,
    compatibilityScore: score,
    compatibilityTier: tier,
    sharedStrengths: getSharedStrengths(myResult.type, theirResult.type),
    potentialChallenges: getPotentialChallenges(myResult.type, theirResult.type),
    confidenceLevel,
  };
};

/**
 * Check if compatibility can be calculated
 */
export const canCalculateCompatibility = (
  result1?: MBTIResult | null,
  result2?: MBTIResult | null
): { canCalculate: boolean; reason?: string } => {
  if (!result1 || result1.testTier === 'none') {
    return { canCalculate: false, reason: 'Complete the personality test to see compatibility' };
  }
  if (!result2 || result2.testTier === 'none') {
    return { canCalculate: false, reason: 'This person has not completed the personality test yet' };
  }
  return { canCalculate: true };
};

/**
 * Get confidence message based on level
 */
export const getConfidenceMessage = (level: ConfidenceLevel): string => {
  switch (level) {
    case 'high':
      return 'High confidence - both completed comprehensive assessments';
    case 'medium':
      return 'Medium confidence - consider completing longer assessments for better accuracy';
    case 'low':
      return 'Low confidence - results will improve with longer assessments';
  }
};

/**
 * Get ideal matches for a type (rating 5)
 */
export const getIdealMatches = (type: MBTIType): MBTIType[] => {
  const matches: MBTIType[] = [];
  const row = COMPATIBILITY_MATRIX[type];

  for (const [matchType, rating] of Object.entries(row)) {
    if (rating === 5) {
      matches.push(matchType as MBTIType);
    }
  }

  return matches;
};

/**
 * Get great matches for a type (rating 4-5)
 */
export const getGreatMatches = (type: MBTIType): MBTIType[] => {
  const matches: MBTIType[] = [];
  const row = COMPATIBILITY_MATRIX[type];

  for (const [matchType, rating] of Object.entries(row)) {
    if (rating >= 4) {
      matches.push(matchType as MBTIType);
    }
  }

  return matches;
};

/**
 * Sort profiles by compatibility score
 */
export const sortByCompatibility = <T extends { mbtiResult?: MBTIResult }>(
  profiles: T[],
  myResult: MBTIResult
): T[] => {
  return [...profiles].sort((a, b) => {
    const aResult = a.mbtiResult;
    const bResult = b.mbtiResult;

    // Profiles without MBTI results go to the end
    if (!aResult && !bResult) return 0;
    if (!aResult) return 1;
    if (!bResult) return -1;

    const aScore = calculateCompatibility(myResult, aResult).score;
    const bScore = calculateCompatibility(myResult, bResult).score;

    return bScore - aScore; // Descending order
  });
};
