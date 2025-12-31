import React from 'react';
import { MBTIType } from '../mbti/types';
import { getMBTITheme, getMBTIThemeClass } from '../mbti/colors';
import { getMBTITypeName } from '../mbti/descriptions';

interface MBTIBadgeProps {
  type: MBTIType;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean; // Show full label like "ENFP - The Campaigner"
  variant?: 'filled' | 'outline';
  className?: string;
}

export const MBTIBadge: React.FC<MBTIBadgeProps> = ({
  type,
  size = 'md',
  showLabel = false,
  variant = 'filled',
  className = '',
}) => {
  const theme = getMBTITheme(type);
  const themeClass = getMBTIThemeClass(type);
  const typeName = getMBTITypeName(type);

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5',
    md: 'text-[11px] px-3 py-1',
    lg: 'text-sm px-4 py-1.5',
  };

  const baseStyles: React.CSSProperties = variant === 'filled'
    ? {
        backgroundColor: theme.primary,
        color: theme.text,
      }
    : {
        backgroundColor: 'transparent',
        color: theme.primary,
        border: `2px solid ${theme.primary}`,
      };

  return (
    <span
      className={`${themeClass} inline-flex items-center gap-1.5 rounded-full font-bold tracking-wide uppercase ${sizeClasses[size]} ${className}`}
      style={baseStyles}
    >
      {type}
      {showLabel && (
        <span className="font-normal opacity-90">- {typeName}</span>
      )}
    </span>
  );
};

// Compact version for profile cards
interface MBTIBadgeCompactProps {
  type: MBTIType;
  className?: string;
}

export const MBTIBadgeCompact: React.FC<MBTIBadgeCompactProps> = ({
  type,
  className = '',
}) => {
  const theme = getMBTITheme(type);

  return (
    <span
      className={`inline-flex items-center justify-center w-12 h-5 rounded text-[10px] font-bold tracking-wider ${className}`}
      style={{
        backgroundColor: theme.primary,
        color: theme.text,
      }}
    >
      {type}
    </span>
  );
};

export default MBTIBadge;
