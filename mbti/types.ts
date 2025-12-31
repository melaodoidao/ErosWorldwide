// ========================================
// MBTI PERSONALITY SYSTEM - Type Definitions
// ========================================

// The 16 MBTI personality types
export type MBTIType =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'  // Analysts
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'  // Diplomats
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'  // Sentinels
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'; // Explorers

// Four MBTI dimensions
export type MBTIDimension = 'EI' | 'SN' | 'TF' | 'JP';

// Individual poles
export type MBTIPole = 'E' | 'I' | 'S' | 'N' | 'T' | 'F' | 'J' | 'P';

// Test completion tiers (progressive unlock)
export type TestTier = 'none' | 'short' | 'medium' | 'full';

// MBTI type groups
export type MBTIGroup = 'analysts' | 'diplomats' | 'sentinels' | 'explorers';

// Dimension scores (percentage towards each pole)
export interface MBTIDimensionScores {
  E: number; // 0-100, Extraversion
  I: number; // 0-100, Introversion (100 - E)
  S: number; // 0-100, Sensing
  N: number; // 0-100, Intuition (100 - S)
  T: number; // 0-100, Thinking
  F: number; // 0-100, Feeling (100 - T)
  J: number; // 0-100, Judging
  P: number; // 0-100, Perceiving (100 - J)
}

// Complete MBTI result for a user
export interface MBTIResult {
  type: MBTIType;
  dimensionScores: MBTIDimensionScores;
  testTier: TestTier;
  testCompletedAt: string; // ISO date string
  questionsAnswered: number;
  confidence: number; // 0-100, higher with more questions
}

// Question structure
export interface MBTIQuestion {
  id: string;
  tier: TestTier; // Which tier this question belongs to
  dimension: MBTIDimension;
  text: string;
  optionA: {
    text: string;
    pole: 'E' | 'S' | 'T' | 'J'; // First letter of dimension
  };
  optionB: {
    text: string;
    pole: 'I' | 'N' | 'F' | 'P'; // Second letter of dimension
  };
}

// User answer
export interface MBTIAnswer {
  questionId: string;
  selectedPole: MBTIPole;
  timestamp: string;
}

// Test session state
export interface MBTITestSession {
  odei: string;
  userType: 'lady' | 'gentleman';
  currentTier: TestTier;
  answers: MBTIAnswer[];
  startedAt: string;
  currentQuestionIndex: number;
  isComplete: boolean;
}

// Compatibility tier labels
export type CompatibilityTier = 'ideal' | 'great' | 'good' | 'moderate' | 'challenging';

// Confidence level based on test completion
export type ConfidenceLevel = 'low' | 'medium' | 'high';

// Compatibility match result
export interface CompatibilityMatch {
  odei: string;
  profileType: 'lady' | 'gentleman';
  theirType: MBTIType;
  compatibilityScore: number; // 0-100
  compatibilityTier: CompatibilityTier;
  sharedStrengths: string[];
  potentialChallenges: string[];
  confidenceLevel: ConfidenceLevel;
}

// Color theme for each MBTI type
export interface MBTIColorTheme {
  primary: string;      // Main accent color
  secondary: string;    // Supporting color
  background: string;   // Light background tint
  text: string;         // Text on primary
  gradient: string;     // CSS gradient string
}

// Type description and metadata
export interface MBTITypeInfo {
  type: MBTIType;
  name: string;         // e.g., "The Architect"
  group: MBTIGroup;
  shortDescription: string;
  fullDescription: string;
  inRelationships: string;
  strengths: string[];
  weaknesses: string[];
  bestMatches: MBTIType[];
  goodMatches: MBTIType[];
}

// Helper to get group from type
export const getMBTIGroup = (type: MBTIType): MBTIGroup => {
  if (['INTJ', 'INTP', 'ENTJ', 'ENTP'].includes(type)) return 'analysts';
  if (['INFJ', 'INFP', 'ENFJ', 'ENFP'].includes(type)) return 'diplomats';
  if (['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'].includes(type)) return 'sentinels';
  return 'explorers';
};

// All 16 types array for iteration
export const ALL_MBTI_TYPES: MBTIType[] = [
  'INTJ', 'INTP', 'ENTJ', 'ENTP',
  'INFJ', 'INFP', 'ENFJ', 'ENFP',
  'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
  'ISTP', 'ISFP', 'ESTP', 'ESFP',
];

// Tier question counts
export const TIER_QUESTION_COUNTS: Record<TestTier, number> = {
  none: 0,
  short: 20,
  medium: 50,
  full: 80,
};

// Tier confidence multipliers
export const TIER_CONFIDENCE_MULTIPLIERS: Record<TestTier, number> = {
  none: 0,
  short: 0.6,
  medium: 0.8,
  full: 1.0,
};
