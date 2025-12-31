// ========================================
// MBTI TYPE DESCRIPTIONS
// ========================================

import { MBTIType, MBTITypeInfo } from './types';

/**
 * Detailed descriptions for all 16 MBTI types
 */
export const MBTI_TYPE_INFO: Record<MBTIType, MBTITypeInfo> = {
  // ===== ANALYSTS =====
  INTJ: {
    type: 'INTJ',
    name: 'The Architect',
    group: 'analysts',
    shortDescription: 'Imaginative and strategic thinkers with a plan for everything.',
    fullDescription: 'INTJs are analytical problem-solvers who approach life with a strategic mindset. They value knowledge, competence, and structure. With their combination of imagination and reliability, they can achieve their goals with both vision and determination.',
    inRelationships: 'In relationships, INTJs are loyal and dedicated partners who value intellectual connection. They may not be the most outwardly expressive, but they show love through actions and planning for a shared future. They need a partner who respects their need for independence and can engage in deep, meaningful conversations.',
    strengths: ['Strategic thinking', 'Self-confident', 'Independent', 'Determined', 'Loyal'],
    weaknesses: ['Overly analytical', 'Can be dismissive of emotions', 'Perfectionist'],
    bestMatches: ['ENFP', 'ENTP'],
    goodMatches: ['INTJ', 'INTP', 'ENTJ', 'INFJ'],
  },
  INTP: {
    type: 'INTP',
    name: 'The Logician',
    group: 'analysts',
    shortDescription: 'Innovative inventors with an unquenchable thirst for knowledge.',
    fullDescription: 'INTPs are quiet, analytical, and philosophical. They love exploring ideas and understanding how things work. Their innovative minds are constantly generating new theories and possibilities.',
    inRelationships: 'In relationships, INTPs value intellectual compatibility above all. They may struggle with expressing emotions but are deeply loyal partners. They need space for their thoughts and appreciate a partner who can engage in intellectual discussions while also helping them connect emotionally.',
    strengths: ['Analytical', 'Objective', 'Imaginative', 'Open-minded', 'Curious'],
    weaknesses: ['Disconnected from emotions', 'Can be insensitive', 'Absent-minded'],
    bestMatches: ['ENTJ', 'ENFJ'],
    goodMatches: ['INTJ', 'INTP', 'INFP', 'ENFP'],
  },
  ENTJ: {
    type: 'ENTJ',
    name: 'The Commander',
    group: 'analysts',
    shortDescription: 'Bold, imaginative, and strong-willed leaders who always find a way.',
    fullDescription: 'ENTJs are natural leaders who are driven, organized, and ambitious. They have a natural ability to see the big picture and create efficient systems to achieve their goals. Their confidence and charisma inspire others to follow.',
    inRelationships: 'In relationships, ENTJs are committed and take their partnerships seriously. They approach love with the same determination they apply to their careers. They value a partner who is equally ambitious and can challenge them intellectually.',
    strengths: ['Efficient', 'Confident', 'Strong-willed', 'Strategic', 'Charismatic'],
    weaknesses: ['Stubborn', 'Dominant', 'Impatient', 'Can be insensitive'],
    bestMatches: ['INTP', 'INFP'],
    goodMatches: ['INTJ', 'ENTJ', 'ENTP', 'INFJ'],
  },
  ENTP: {
    type: 'ENTP',
    name: 'The Debater',
    group: 'analysts',
    shortDescription: 'Smart and curious thinkers who love intellectual challenges.',
    fullDescription: 'ENTPs are innovative, strategic, and entrepreneurial. They love to explore new ideas and challenge conventional thinking. Their quick wit and love of debate make them engaging conversationalists.',
    inRelationships: 'In relationships, ENTPs are exciting partners who keep things interesting. They value mental stimulation and need a partner who can match their intellectual energy. They may struggle with routine but are deeply committed once they find the right match.',
    strengths: ['Quick thinking', 'Charismatic', 'Energetic', 'Knowledgeable', 'Original'],
    weaknesses: ['Argumentative', 'Can be insensitive', 'Intolerant of routine'],
    bestMatches: ['INFJ', 'INTJ'],
    goodMatches: ['INTP', 'ENTJ', 'ENTP', 'ENFP', 'ENFJ'],
  },

  // ===== DIPLOMATS =====
  INFJ: {
    type: 'INFJ',
    name: 'The Advocate',
    group: 'diplomats',
    shortDescription: 'Quiet and mystical, yet inspiring and idealistic.',
    fullDescription: 'INFJs are insightful, principled, and compassionate. They have a deep desire to help others and make the world a better place. Their combination of vision and practicality allows them to turn their ideals into reality.',
    inRelationships: 'In relationships, INFJs are deeply devoted and seek meaningful connections. They are selective about their partners but form incredibly deep bonds. They need a partner who appreciates their depth and shares their values.',
    strengths: ['Insightful', 'Principled', 'Compassionate', 'Creative', 'Altruistic'],
    weaknesses: ['Overly idealistic', 'Can burn out', 'Private to the point of secrecy'],
    bestMatches: ['ENFP', 'ENTP'],
    goodMatches: ['INFJ', 'INFP', 'INTJ', 'ENTJ', 'ENFJ'],
  },
  INFP: {
    type: 'INFP',
    name: 'The Mediator',
    group: 'diplomats',
    shortDescription: 'Poetic, kind, and altruistic, always seeking the good.',
    fullDescription: 'INFPs are idealistic and empathetic individuals who are guided by their values. They are creative souls who see beauty and potential in everything. Their sensitivity makes them attuned to others emotions.',
    inRelationships: 'In relationships, INFPs are romantic and devoted partners. They seek deep emotional connections and are incredibly supportive of their partners dreams. They need someone who understands their need for authenticity and emotional depth.',
    strengths: ['Empathetic', 'Creative', 'Passionate', 'Open-minded', 'Idealistic'],
    weaknesses: ['Overly idealistic', 'Can take things personally', 'Self-isolating'],
    bestMatches: ['ENFJ', 'ENTJ'],
    goodMatches: ['INFJ', 'INFP', 'INTP', 'ENFP'],
  },
  ENFJ: {
    type: 'ENFJ',
    name: 'The Protagonist',
    group: 'diplomats',
    shortDescription: 'Charismatic and inspiring leaders who captivate their listeners.',
    fullDescription: 'ENFJs are natural leaders who are driven by a desire to help others grow. They are charismatic, empathetic, and organized. Their ability to understand and inspire others makes them excellent mentors and partners.',
    inRelationships: 'In relationships, ENFJs are nurturing and supportive partners. They invest heavily in their relationships and are attentive to their partners needs. They thrive with a partner who appreciates their warmth and can reciprocate emotional support.',
    strengths: ['Charismatic', 'Empathetic', 'Reliable', 'Natural leaders', 'Altruistic'],
    weaknesses: ['Overly idealistic', 'Can be too selfless', 'Sensitive to criticism'],
    bestMatches: ['INFP', 'ISFP'],
    goodMatches: ['INFJ', 'ENFJ', 'ENFP', 'ESFJ', 'ISFJ'],
  },
  ENFP: {
    type: 'ENFP',
    name: 'The Campaigner',
    group: 'diplomats',
    shortDescription: 'Enthusiastic, creative, and sociable free spirits.',
    fullDescription: 'ENFPs are energetic, creative, and enthusiastic individuals who see life as full of possibilities. They are deeply caring and make everyone around them feel valued and understood.',
    inRelationships: 'In relationships, ENFPs are passionate and devoted partners. They bring excitement and warmth to their relationships. They need a partner who can match their enthusiasm and appreciate their need for exploration and growth.',
    strengths: ['Enthusiastic', 'Creative', 'Sociable', 'Optimistic', 'Perceptive'],
    weaknesses: ['Can be unfocused', 'Overly emotional', 'May overthink'],
    bestMatches: ['INTJ', 'INFJ'],
    goodMatches: ['INTP', 'ENTJ', 'ENTP', 'ENFJ', 'ENFP'],
  },

  // ===== SENTINELS =====
  ISTJ: {
    type: 'ISTJ',
    name: 'The Logistician',
    group: 'sentinels',
    shortDescription: 'Practical and fact-minded individuals who value reliability.',
    fullDescription: 'ISTJs are responsible, thorough, and dependable. They value tradition and loyalty, and approach life with a strong sense of duty. Their methodical approach ensures they complete whatever they start.',
    inRelationships: 'In relationships, ISTJs are committed and dependable partners. They may not be the most expressive, but they show love through actions and reliability. They need a partner who values stability and can appreciate their practical approach to life.',
    strengths: ['Honest', 'Responsible', 'Calm and practical', 'Dutiful', 'Jack-of-all-trades'],
    weaknesses: ['Stubborn', 'Insensitive at times', 'Resistant to change'],
    bestMatches: ['ESFJ', 'ESTJ'],
    goodMatches: ['ISTJ', 'ISFJ', 'ISTP', 'ESTP'],
  },
  ISFJ: {
    type: 'ISFJ',
    name: 'The Defender',
    group: 'sentinels',
    shortDescription: 'Dedicated and warm protectors, always ready to defend loved ones.',
    fullDescription: 'ISFJs are nurturing, reliable, and observant. They have a strong desire to protect and care for those they love. Their attention to detail and memory for personal information makes others feel truly valued.',
    inRelationships: 'In relationships, ISFJs are incredibly devoted and attentive partners. They remember the little things and go out of their way to make their partners feel special. They need a partner who appreciates their care and can provide emotional security.',
    strengths: ['Supportive', 'Reliable', 'Patient', 'Observant', 'Hardworking'],
    weaknesses: ['Shy', 'Takes things personally', 'Can overload themselves'],
    bestMatches: ['ESFJ', 'ESTJ', 'ESFP'],
    goodMatches: ['ISTJ', 'ISFJ', 'ISFP', 'ENFJ'],
  },
  ESTJ: {
    type: 'ESTJ',
    name: 'The Executive',
    group: 'sentinels',
    shortDescription: 'Excellent administrators who are unsurpassed at managing things and people.',
    fullDescription: 'ESTJs are organized, logical, and assertive. They value order and tradition, and have a clear vision of how things should be done. Their dedication makes them excellent at organizing people and projects.',
    inRelationships: 'In relationships, ESTJs are loyal and straightforward partners. They take their commitments seriously and expect the same in return. They need a partner who appreciates their reliability and can handle their direct communication style.',
    strengths: ['Dedicated', 'Strong-willed', 'Direct and honest', 'Loyal', 'Organized'],
    weaknesses: ['Inflexible', 'Uncomfortable with unconventional situations', 'Judgmental'],
    bestMatches: ['ISTJ', 'ISFJ', 'ISTP'],
    goodMatches: ['ESTJ', 'ESFJ', 'ESTP', 'ESFP'],
  },
  ESFJ: {
    type: 'ESFJ',
    name: 'The Consul',
    group: 'sentinels',
    shortDescription: 'Extraordinarily caring, social, and popular people.',
    fullDescription: 'ESFJs are warm, caring, and social. They have a strong desire to be helpful and ensure that everyone around them is happy. Their attentiveness to others needs makes them excellent at creating harmony.',
    inRelationships: 'In relationships, ESFJs are nurturing and devoted partners. They invest heavily in creating a warm and happy home life. They need a partner who appreciates their caring nature and can provide verbal affirmation and appreciation.',
    strengths: ['Caring', 'Loyal', 'Sensitive to others', 'Practical', 'Social'],
    weaknesses: ['Worried about social status', 'Vulnerable to criticism', 'Needy'],
    bestMatches: ['ISTJ', 'ISFJ', 'ISFP'],
    goodMatches: ['ESTJ', 'ESFJ', 'ENFJ', 'ESTP', 'ESFP'],
  },

  // ===== EXPLORERS =====
  ISTP: {
    type: 'ISTP',
    name: 'The Virtuoso',
    group: 'explorers',
    shortDescription: 'Bold and practical experimenters, masters of all kinds of tools.',
    fullDescription: 'ISTPs are observant, practical, and unpredictable. They love to explore with their hands and eyes, touching and examining the world around them with cool rationalism and spirited curiosity.',
    inRelationships: 'In relationships, ISTPs are adventurous and spontaneous partners. They may not be the most verbally expressive, but they show love through actions and shared experiences. They need a partner who respects their independence and can enjoy the moment.',
    strengths: ['Optimistic', 'Creative and practical', 'Spontaneous', 'Rational', 'Relaxed'],
    weaknesses: ['Stubborn', 'Insensitive', 'Private and reserved', 'Easily bored'],
    bestMatches: ['ESTJ', 'ESTP'],
    goodMatches: ['ISTJ', 'ISTP', 'ISFP', 'ESFJ'],
  },
  ISFP: {
    type: 'ISFP',
    name: 'The Adventurer',
    group: 'explorers',
    shortDescription: 'Flexible and charming artists, always ready to explore something new.',
    fullDescription: 'ISFPs are gentle, sensitive, and helpful. They are true artists who use their creativity to push the limits of social convention. Their warmth and enthusiasm for life makes them attractive to many.',
    inRelationships: 'In relationships, ISFPs are warm and supportive partners. They express love through actions and creating beautiful experiences. They need a partner who appreciates their artistic nature and can provide stability without being controlling.',
    strengths: ['Charming', 'Sensitive to others', 'Imaginative', 'Passionate', 'Artistic'],
    weaknesses: ['Fiercely independent', 'Unpredictable', 'Easily stressed'],
    bestMatches: ['ENFJ', 'ESFJ'],
    goodMatches: ['ISFJ', 'ISTP', 'ISFP', 'ENFP', 'ESTP', 'ESFP'],
  },
  ESTP: {
    type: 'ESTP',
    name: 'The Entrepreneur',
    group: 'explorers',
    shortDescription: 'Smart, energetic, and perceptive people who truly enjoy living on the edge.',
    fullDescription: 'ESTPs are energetic, action-oriented, and dramatic. They have a keen awareness of their surroundings and are excellent at reading people. Their enthusiasm and energy make them the life of the party.',
    inRelationships: 'In relationships, ESTPs are exciting and spontaneous partners. They keep things interesting and are generous with their time and energy. They need a partner who can keep up with their active lifestyle and appreciate their adventurous spirit.',
    strengths: ['Bold', 'Rational and practical', 'Original', 'Perceptive', 'Direct'],
    weaknesses: ['Impatient', 'Risk-prone', 'Unstructured', 'May miss bigger picture'],
    bestMatches: ['ISTP', 'ESFP'],
    goodMatches: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ENTP', 'ESTP'],
  },
  ESFP: {
    type: 'ESFP',
    name: 'The Entertainer',
    group: 'explorers',
    shortDescription: 'Spontaneous, energetic, and enthusiastic entertainers.',
    fullDescription: 'ESFPs are vibrant, fun, and encouraging. They love the spotlight and are skilled at bringing people together. Their enthusiasm is contagious and they make everyone around them feel included.',
    inRelationships: 'In relationships, ESFPs are affectionate and playful partners. They love to shower their partners with attention and create fun memories together. They need a partner who can appreciate their spontaneous nature and share in their love of life.',
    strengths: ['Bold', 'Original', 'Practical', 'Observant', 'Excellent people skills'],
    weaknesses: ['Sensitive', 'Conflict-averse', 'Easily bored', 'Unfocused'],
    bestMatches: ['ISFJ', 'ESTP'],
    goodMatches: ['ISTJ', 'ESFJ', 'ISFP', 'ENFP', 'ESFP'],
  },
};

/**
 * Get info for a specific type
 */
export const getMBTITypeInfo = (type: MBTIType): MBTITypeInfo => {
  return MBTI_TYPE_INFO[type];
};

/**
 * Get just the nickname/name for a type
 */
export const getMBTITypeName = (type: MBTIType): string => {
  return MBTI_TYPE_INFO[type].name;
};

/**
 * Get the full label (e.g., "ENFP - The Campaigner")
 */
export const getMBTIFullLabel = (type: MBTIType): string => {
  const info = MBTI_TYPE_INFO[type];
  return `${type} - ${info.name}`;
};

/**
 * Get relationship description for a type
 */
export const getRelationshipDescription = (type: MBTIType): string => {
  return MBTI_TYPE_INFO[type].inRelationships;
};

/**
 * Dimension explanations
 */
export const DIMENSION_EXPLANATIONS = {
  EI: {
    name: 'Energy',
    description: 'How you direct and receive energy',
    poles: {
      E: { name: 'Extraversion', description: 'Energized by interaction with others and the outside world' },
      I: { name: 'Introversion', description: 'Energized by reflection and the inner world of thoughts' },
    },
  },
  SN: {
    name: 'Information',
    description: 'How you take in and process information',
    poles: {
      S: { name: 'Sensing', description: 'Focus on concrete facts, details, and present realities' },
      N: { name: 'Intuition', description: 'Focus on patterns, possibilities, and future potential' },
    },
  },
  TF: {
    name: 'Decisions',
    description: 'How you make decisions',
    poles: {
      T: { name: 'Thinking', description: 'Decide based on logic, objectivity, and consistency' },
      F: { name: 'Feeling', description: 'Decide based on values, empathy, and personal impact' },
    },
  },
  JP: {
    name: 'Lifestyle',
    description: 'How you organize your outer life',
    poles: {
      J: { name: 'Judging', description: 'Prefer structure, planning, and decisiveness' },
      P: { name: 'Perceiving', description: 'Prefer flexibility, spontaneity, and keeping options open' },
    },
  },
};

/**
 * Get explanation for a dimension
 */
export const getDimensionExplanation = (dimension: 'EI' | 'SN' | 'TF' | 'JP') => {
  return DIMENSION_EXPLANATIONS[dimension];
};
