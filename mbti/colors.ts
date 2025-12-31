// ========================================
// MBTI COLOR THEME SYSTEM
// ========================================

import { MBTIType, MBTIColorTheme, MBTIGroup } from './types';

/**
 * Color themes for each of the 16 MBTI types
 * Organized by group:
 * - Analysts (NT): Purple/Indigo family - Strategic, Logical
 * - Diplomats (NF): Green/Teal family - Empathetic, Idealistic
 * - Sentinels (SJ): Blue family - Reliable, Practical
 * - Explorers (SP): Orange/Amber family - Spontaneous, Energetic
 */
export const MBTI_COLORS: Record<MBTIType, MBTIColorTheme> = {
  // ===== ANALYSTS (Purple/Indigo) =====
  INTJ: {
    primary: '#6366F1',     // Indigo
    secondary: '#818CF8',
    background: '#EEF2FF',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)',
  },
  INTP: {
    primary: '#8B5CF6',     // Violet
    secondary: '#A78BFA',
    background: '#F5F3FF',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
  },
  ENTJ: {
    primary: '#4F46E5',     // Deep Indigo
    secondary: '#6366F1',
    background: '#E0E7FF',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #4F46E5 0%, #3730A3 100%)',
  },
  ENTP: {
    primary: '#7C3AED',     // Purple
    secondary: '#8B5CF6',
    background: '#EDE9FE',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)',
  },

  // ===== DIPLOMATS (Green/Teal) =====
  INFJ: {
    primary: '#059669',     // Emerald
    secondary: '#10B981',
    background: '#D1FAE5',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
  },
  INFP: {
    primary: '#14B8A6',     // Teal
    secondary: '#2DD4BF',
    background: '#CCFBF1',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #14B8A6 0%, #0D9488 100%)',
  },
  ENFJ: {
    primary: '#047857',     // Dark Emerald
    secondary: '#059669',
    background: '#A7F3D0',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #047857 0%, #065F46 100%)',
  },
  ENFP: {
    primary: '#0D9488',     // Dark Teal
    secondary: '#14B8A6',
    background: '#99F6E4',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #0D9488 0%, #0F766E 100%)',
  },

  // ===== SENTINELS (Blue) =====
  ISTJ: {
    primary: '#2563EB',     // Blue
    secondary: '#3B82F6',
    background: '#DBEAFE',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
  },
  ISFJ: {
    primary: '#0EA5E9',     // Sky Blue
    secondary: '#38BDF8',
    background: '#E0F2FE',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 100%)',
  },
  ESTJ: {
    primary: '#1D4ED8',     // Deep Blue
    secondary: '#2563EB',
    background: '#BFDBFE',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #1D4ED8 0%, #1E40AF 100%)',
  },
  ESFJ: {
    primary: '#0284C7',     // Dark Sky
    secondary: '#0EA5E9',
    background: '#BAE6FD',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)',
  },

  // ===== EXPLORERS (Orange/Amber) =====
  ISTP: {
    primary: '#EA580C',     // Orange
    secondary: '#F97316',
    background: '#FFEDD5',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #EA580C 0%, #C2410C 100%)',
  },
  ISFP: {
    primary: '#F59E0B',     // Amber
    secondary: '#FBBF24',
    background: '#FEF3C7',
    text: '#1F2937',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
  },
  ESTP: {
    primary: '#C2410C',     // Dark Orange
    secondary: '#EA580C',
    background: '#FED7AA',
    text: '#FFFFFF',
    gradient: 'linear-gradient(135deg, #C2410C 0%, #9A3412 100%)',
  },
  ESFP: {
    primary: '#D97706',     // Dark Amber
    secondary: '#F59E0B',
    background: '#FDE68A',
    text: '#1F2937',
    gradient: 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
  },
};

/**
 * Group colors for broader categorization
 */
export const GROUP_COLORS: Record<MBTIGroup, { primary: string; name: string }> = {
  analysts: { primary: '#6366F1', name: 'Analysts' },
  diplomats: { primary: '#059669', name: 'Diplomats' },
  sentinels: { primary: '#2563EB', name: 'Sentinels' },
  explorers: { primary: '#EA580C', name: 'Explorers' },
};

/**
 * Get theme for a specific MBTI type
 */
export const getMBTITheme = (type: MBTIType): MBTIColorTheme => {
  return MBTI_COLORS[type];
};

/**
 * Generate CSS class name for a type
 */
export const getMBTIThemeClass = (type: MBTIType): string => {
  return `mbti-${type.toLowerCase()}`;
};

/**
 * Get inline style object for a type's primary color
 */
export const getMBTIPrimaryStyle = (type: MBTIType): React.CSSProperties => {
  const theme = MBTI_COLORS[type];
  return {
    backgroundColor: theme.primary,
    color: theme.text,
  };
};

/**
 * Get inline style object for a type's gradient
 */
export const getMBTIGradientStyle = (type: MBTIType): React.CSSProperties => {
  const theme = MBTI_COLORS[type];
  return {
    background: theme.gradient,
    color: theme.text,
  };
};

/**
 * Get inline style for badge with type color
 */
export const getMBTIBadgeStyle = (type: MBTIType): React.CSSProperties => {
  const theme = MBTI_COLORS[type];
  return {
    backgroundColor: theme.primary,
    color: theme.text,
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '12px',
    fontWeight: 700,
    letterSpacing: '0.5px',
  };
};

/**
 * Get border accent style for cards
 */
export const getMBTIBorderStyle = (type: MBTIType): React.CSSProperties => {
  const theme = MBTI_COLORS[type];
  return {
    borderLeft: `4px solid ${theme.primary}`,
  };
};

/**
 * Get glow/shadow style for highlighted elements
 */
export const getMBTIGlowStyle = (type: MBTIType): React.CSSProperties => {
  const theme = MBTI_COLORS[type];
  return {
    boxShadow: `0 0 20px ${theme.primary}4D`, // 30% opacity
  };
};

/**
 * Compatibility tier colors
 */
export const COMPATIBILITY_TIER_COLORS: Record<string, { bg: string; text: string }> = {
  ideal: { bg: '#059669', text: '#FFFFFF' },
  great: { bg: '#10B981', text: '#FFFFFF' },
  good: { bg: '#3B82F6', text: '#FFFFFF' },
  moderate: { bg: '#F59E0B', text: '#1F2937' },
  challenging: { bg: '#EF4444', text: '#FFFFFF' },
};

/**
 * Get style for compatibility tier badge
 */
export const getCompatibilityTierStyle = (tier: string): React.CSSProperties => {
  const colors = COMPATIBILITY_TIER_COLORS[tier] || COMPATIBILITY_TIER_COLORS.moderate;
  return {
    backgroundColor: colors.bg,
    color: colors.text,
    padding: '4px 10px',
    borderRadius: '9999px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.5px',
  };
};

/**
 * Generate CSS variables string for embedding in style tags
 */
export const generateCSSVariables = (): string => {
  let css = ':root {\n';

  for (const [type, theme] of Object.entries(MBTI_COLORS)) {
    const prefix = `--mbti-${type.toLowerCase()}`;
    css += `  ${prefix}-primary: ${theme.primary};\n`;
    css += `  ${prefix}-secondary: ${theme.secondary};\n`;
    css += `  ${prefix}-bg: ${theme.background};\n`;
    css += `  ${prefix}-text: ${theme.text};\n`;
  }

  css += '}\n';
  return css;
};
