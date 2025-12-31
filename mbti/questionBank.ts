// ========================================
// MBTI QUESTION BANK
// 80 questions: 20 short + 30 medium + 30 full
// ========================================

import { MBTIQuestion, TestTier } from './types';

export const MBTI_QUESTIONS: MBTIQuestion[] = [
  // ============================================
  // SHORT TIER QUESTIONS (20 total, 5 per dimension)
  // ============================================

  // === E/I Dimension - Short Tier (5 questions) ===
  {
    id: 'short-ei-01',
    tier: 'short',
    dimension: 'EI',
    text: 'At a social gathering, you typically:',
    optionA: { text: 'Talk to many people, including strangers', pole: 'E' },
    optionB: { text: 'Talk mainly to people you already know', pole: 'I' },
  },
  {
    id: 'short-ei-02',
    tier: 'short',
    dimension: 'EI',
    text: 'When you need to recharge after a busy week, you prefer to:',
    optionA: { text: 'Go out with friends or attend a social event', pole: 'E' },
    optionB: { text: 'Stay home alone or with one close person', pole: 'I' },
  },
  {
    id: 'short-ei-03',
    tier: 'short',
    dimension: 'EI',
    text: 'In conversations, you usually:',
    optionA: { text: 'Think out loud and talk through ideas', pole: 'E' },
    optionB: { text: 'Think before speaking and choose words carefully', pole: 'I' },
  },
  {
    id: 'short-ei-04',
    tier: 'short',
    dimension: 'EI',
    text: 'You feel most energized when:',
    optionA: { text: 'Surrounded by people and activity', pole: 'E' },
    optionB: { text: 'Having quiet time for reflection', pole: 'I' },
  },
  {
    id: 'short-ei-05',
    tier: 'short',
    dimension: 'EI',
    text: 'When meeting someone new, you:',
    optionA: { text: 'Easily share personal information and stories', pole: 'E' },
    optionB: { text: 'Reveal yourself gradually over time', pole: 'I' },
  },

  // === S/N Dimension - Short Tier (5 questions) ===
  {
    id: 'short-sn-01',
    tier: 'short',
    dimension: 'SN',
    text: 'When learning something new, you prefer:',
    optionA: { text: 'Hands-on experience and concrete examples', pole: 'S' },
    optionB: { text: 'Understanding the underlying theory first', pole: 'N' },
  },
  {
    id: 'short-sn-02',
    tier: 'short',
    dimension: 'SN',
    text: 'You are more interested in:',
    optionA: { text: 'What is actual and present', pole: 'S' },
    optionB: { text: 'What is possible and future', pole: 'N' },
  },
  {
    id: 'short-sn-03',
    tier: 'short',
    dimension: 'SN',
    text: 'When reading, you prefer:',
    optionA: { text: 'Literal, straightforward descriptions', pole: 'S' },
    optionB: { text: 'Figurative language and deeper meanings', pole: 'N' },
  },
  {
    id: 'short-sn-04',
    tier: 'short',
    dimension: 'SN',
    text: 'You tend to focus more on:',
    optionA: { text: 'Specific details and facts', pole: 'S' },
    optionB: { text: 'Patterns and the big picture', pole: 'N' },
  },
  {
    id: 'short-sn-05',
    tier: 'short',
    dimension: 'SN',
    text: 'In your daily life, you prefer:',
    optionA: { text: 'Following established routines and methods', pole: 'S' },
    optionB: { text: 'Trying new approaches and experimenting', pole: 'N' },
  },

  // === T/F Dimension - Short Tier (5 questions) ===
  {
    id: 'short-tf-01',
    tier: 'short',
    dimension: 'TF',
    text: 'When making important decisions, you rely more on:',
    optionA: { text: 'Logic and objective analysis', pole: 'T' },
    optionB: { text: 'Personal values and how others will feel', pole: 'F' },
  },
  {
    id: 'short-tf-02',
    tier: 'short',
    dimension: 'TF',
    text: 'When a friend is upset, you typically:',
    optionA: { text: 'Help them analyze the problem and find solutions', pole: 'T' },
    optionB: { text: 'Listen and offer emotional support first', pole: 'F' },
  },
  {
    id: 'short-tf-03',
    tier: 'short',
    dimension: 'TF',
    text: 'In disagreements, you value:',
    optionA: { text: 'Being truthful, even if it hurts', pole: 'T' },
    optionB: { text: 'Maintaining harmony and relationships', pole: 'F' },
  },
  {
    id: 'short-tf-04',
    tier: 'short',
    dimension: 'TF',
    text: 'You are more convinced by:',
    optionA: { text: 'Facts, data, and logical arguments', pole: 'T' },
    optionB: { text: 'Emotional appeals and personal stories', pole: 'F' },
  },
  {
    id: 'short-tf-05',
    tier: 'short',
    dimension: 'TF',
    text: 'When giving feedback, you prioritize:',
    optionA: { text: 'Being direct and honest about issues', pole: 'T' },
    optionB: { text: 'Being encouraging and considerate of feelings', pole: 'F' },
  },

  // === J/P Dimension - Short Tier (5 questions) ===
  {
    id: 'short-jp-01',
    tier: 'short',
    dimension: 'JP',
    text: 'You prefer your daily life to be:',
    optionA: { text: 'Planned and organized in advance', pole: 'J' },
    optionB: { text: 'Flexible and spontaneous', pole: 'P' },
  },
  {
    id: 'short-jp-02',
    tier: 'short',
    dimension: 'JP',
    text: 'When working on a project, you tend to:',
    optionA: { text: 'Create a schedule and stick to deadlines', pole: 'J' },
    optionB: { text: 'Work in bursts of energy as inspiration strikes', pole: 'P' },
  },
  {
    id: 'short-jp-03',
    tier: 'short',
    dimension: 'JP',
    text: 'You feel more comfortable when:',
    optionA: { text: 'Decisions are made and things are settled', pole: 'J' },
    optionB: { text: 'Options are kept open for as long as possible', pole: 'P' },
  },
  {
    id: 'short-jp-04',
    tier: 'short',
    dimension: 'JP',
    text: 'Your workspace is usually:',
    optionA: { text: 'Neat and organized with everything in its place', pole: 'J' },
    optionB: { text: 'More casual with items where you last used them', pole: 'P' },
  },
  {
    id: 'short-jp-05',
    tier: 'short',
    dimension: 'JP',
    text: 'When planning a vacation, you prefer:',
    optionA: { text: 'Having a detailed itinerary planned ahead', pole: 'J' },
    optionB: { text: 'Deciding activities as you go based on mood', pole: 'P' },
  },

  // ============================================
  // MEDIUM TIER QUESTIONS (30 additional, ~8 per dimension)
  // ============================================

  // === E/I Dimension - Medium Tier (8 questions) ===
  {
    id: 'medium-ei-01',
    tier: 'medium',
    dimension: 'EI',
    text: 'After a long meeting with many people, you feel:',
    optionA: { text: 'Energized and want to continue socializing', pole: 'E' },
    optionB: { text: 'Drained and need some alone time', pole: 'I' },
  },
  {
    id: 'medium-ei-02',
    tier: 'medium',
    dimension: 'EI',
    text: 'In romantic relationships, you prefer:',
    optionA: { text: 'Going out together and meeting other couples', pole: 'E' },
    optionB: { text: 'Quiet evenings at home just the two of you', pole: 'I' },
  },
  {
    id: 'medium-ei-03',
    tier: 'medium',
    dimension: 'EI',
    text: 'When you have a problem, you usually:',
    optionA: { text: 'Talk it through with several people', pole: 'E' },
    optionB: { text: 'Think about it quietly on your own', pole: 'I' },
  },
  {
    id: 'medium-ei-04',
    tier: 'medium',
    dimension: 'EI',
    text: 'At a party, you are more likely to:',
    optionA: { text: 'Stay until the end and be the life of the party', pole: 'E' },
    optionB: { text: 'Leave early after meaningful conversations with a few', pole: 'I' },
  },
  {
    id: 'medium-ei-05',
    tier: 'medium',
    dimension: 'EI',
    text: 'You prefer phone calls that are:',
    optionA: { text: 'Long conversations covering many topics', pole: 'E' },
    optionB: { text: 'Brief and to the point', pole: 'I' },
  },
  {
    id: 'medium-ei-06',
    tier: 'medium',
    dimension: 'EI',
    text: 'Your ideal weekend includes:',
    optionA: { text: 'Social activities with groups of friends', pole: 'E' },
    optionB: { text: 'Time for hobbies and relaxation alone', pole: 'I' },
  },
  {
    id: 'medium-ei-07',
    tier: 'medium',
    dimension: 'EI',
    text: 'When expressing love, you prefer to:',
    optionA: { text: 'Show affection publicly and verbally', pole: 'E' },
    optionB: { text: 'Express feelings privately and through actions', pole: 'I' },
  },
  {
    id: 'medium-ei-08',
    tier: 'medium',
    dimension: 'EI',
    text: 'You are more comfortable:',
    optionA: { text: 'Being the center of attention', pole: 'E' },
    optionB: { text: 'Observing from the sidelines', pole: 'I' },
  },

  // === S/N Dimension - Medium Tier (7 questions) ===
  {
    id: 'medium-sn-01',
    tier: 'medium',
    dimension: 'SN',
    text: 'When telling a story, you typically include:',
    optionA: { text: 'Specific details about who, what, where, and when', pole: 'S' },
    optionB: { text: 'The overall theme and how it connects to bigger ideas', pole: 'N' },
  },
  {
    id: 'medium-sn-02',
    tier: 'medium',
    dimension: 'SN',
    text: 'In conversations about the future, you focus on:',
    optionA: { text: 'Practical plans and realistic expectations', pole: 'S' },
    optionB: { text: 'Possibilities and dream scenarios', pole: 'N' },
  },
  {
    id: 'medium-sn-03',
    tier: 'medium',
    dimension: 'SN',
    text: 'When cooking, you prefer to:',
    optionA: { text: 'Follow recipes exactly as written', pole: 'S' },
    optionB: { text: 'Use recipes as inspiration and improvise', pole: 'N' },
  },
  {
    id: 'medium-sn-04',
    tier: 'medium',
    dimension: 'SN',
    text: 'You are more drawn to:',
    optionA: { text: 'Proven, time-tested methods', pole: 'S' },
    optionB: { text: 'Innovative, cutting-edge approaches', pole: 'N' },
  },
  {
    id: 'medium-sn-05',
    tier: 'medium',
    dimension: 'SN',
    text: 'When watching movies, you enjoy:',
    optionA: { text: 'Realistic dramas based on true stories', pole: 'S' },
    optionB: { text: 'Fantasy or sci-fi with imaginative worlds', pole: 'N' },
  },
  {
    id: 'medium-sn-06',
    tier: 'medium',
    dimension: 'SN',
    text: 'In a relationship, you value:',
    optionA: { text: 'Shared daily routines and practical compatibility', pole: 'S' },
    optionB: { text: 'Intellectual connection and shared dreams', pole: 'N' },
  },
  {
    id: 'medium-sn-07',
    tier: 'medium',
    dimension: 'SN',
    text: 'When remembering the past, you recall:',
    optionA: { text: 'Specific events and concrete details', pole: 'S' },
    optionB: { text: 'General impressions and how things felt', pole: 'N' },
  },

  // === T/F Dimension - Medium Tier (8 questions) ===
  {
    id: 'medium-tf-01',
    tier: 'medium',
    dimension: 'TF',
    text: 'When choosing a gift for your partner, you prioritize:',
    optionA: { text: 'Something practical they mentioned needing', pole: 'T' },
    optionB: { text: 'Something meaningful that shows you understand them', pole: 'F' },
  },
  {
    id: 'medium-tf-02',
    tier: 'medium',
    dimension: 'TF',
    text: 'In an argument with your partner, you tend to:',
    optionA: { text: 'Focus on what is logical and fair', pole: 'T' },
    optionB: { text: 'Focus on feelings and the relationship impact', pole: 'F' },
  },
  {
    id: 'medium-tf-03',
    tier: 'medium',
    dimension: 'TF',
    text: 'You believe it is more important to be:',
    optionA: { text: 'Respected for your competence', pole: 'T' },
    optionB: { text: 'Liked for who you are', pole: 'F' },
  },
  {
    id: 'medium-tf-04',
    tier: 'medium',
    dimension: 'TF',
    text: 'When your partner is wrong about something, you:',
    optionA: { text: 'Point it out so they can correct their understanding', pole: 'T' },
    optionB: { text: 'Consider whether it is worth mentioning', pole: 'F' },
  },
  {
    id: 'medium-tf-05',
    tier: 'medium',
    dimension: 'TF',
    text: 'You handle criticism by:',
    optionA: { text: 'Evaluating if it is valid and useful', pole: 'T' },
    optionB: { text: 'Feeling hurt but trying to understand their point', pole: 'F' },
  },
  {
    id: 'medium-tf-06',
    tier: 'medium',
    dimension: 'TF',
    text: 'In a debate, you are more likely to:',
    optionA: { text: 'Argue your position forcefully to win', pole: 'T' },
    optionB: { text: 'Find common ground to maintain peace', pole: 'F' },
  },
  {
    id: 'medium-tf-07',
    tier: 'medium',
    dimension: 'TF',
    text: 'When making relationship decisions, you consider:',
    optionA: { text: 'Practical factors like finances and logistics', pole: 'T' },
    optionB: { text: 'Emotional factors like happiness and fulfillment', pole: 'F' },
  },
  {
    id: 'medium-tf-08',
    tier: 'medium',
    dimension: 'TF',
    text: 'You show love primarily through:',
    optionA: { text: 'Solving problems and fixing things for them', pole: 'T' },
    optionB: { text: 'Expressing affection and emotional support', pole: 'F' },
  },

  // === J/P Dimension - Medium Tier (7 questions) ===
  {
    id: 'medium-jp-01',
    tier: 'medium',
    dimension: 'JP',
    text: 'When making plans with your partner, you prefer:',
    optionA: { text: 'Booking everything in advance', pole: 'J' },
    optionB: { text: 'Keeping options open until the last minute', pole: 'P' },
  },
  {
    id: 'medium-jp-02',
    tier: 'medium',
    dimension: 'JP',
    text: 'You feel stressed when:',
    optionA: { text: 'Plans change unexpectedly', pole: 'J' },
    optionB: { text: 'You have too many commitments locked in', pole: 'P' },
  },
  {
    id: 'medium-jp-03',
    tier: 'medium',
    dimension: 'JP',
    text: 'In your home, you prefer:',
    optionA: { text: 'Everything clean and organized regularly', pole: 'J' },
    optionB: { text: 'A relaxed approach with occasional deep cleaning', pole: 'P' },
  },
  {
    id: 'medium-jp-04',
    tier: 'medium',
    dimension: 'JP',
    text: 'When shopping, you typically:',
    optionA: { text: 'Know exactly what you want before going', pole: 'J' },
    optionB: { text: 'Browse and see what catches your eye', pole: 'P' },
  },
  {
    id: 'medium-jp-05',
    tier: 'medium',
    dimension: 'JP',
    text: 'You prefer a partner who:',
    optionA: { text: 'Is reliable and follows through on plans', pole: 'J' },
    optionB: { text: 'Is spontaneous and full of surprises', pole: 'P' },
  },
  {
    id: 'medium-jp-06',
    tier: 'medium',
    dimension: 'JP',
    text: 'Regarding rules and traditions, you:',
    optionA: { text: 'Value them and see them as important guides', pole: 'J' },
    optionB: { text: 'View them as flexible guidelines to adapt', pole: 'P' },
  },
  {
    id: 'medium-jp-07',
    tier: 'medium',
    dimension: 'JP',
    text: 'When starting a new project together, you prefer to:',
    optionA: { text: 'Plan out all the steps before beginning', pole: 'J' },
    optionB: { text: 'Jump in and figure it out as you go', pole: 'P' },
  },

  // ============================================
  // FULL TIER QUESTIONS (30 additional, ~8 per dimension)
  // ============================================

  // === E/I Dimension - Full Tier (8 questions) ===
  {
    id: 'full-ei-01',
    tier: 'full',
    dimension: 'EI',
    text: 'In a new romantic relationship, you prefer to:',
    optionA: { text: 'Introduce them to your friends and family quickly', pole: 'E' },
    optionB: { text: 'Keep the relationship private at first', pole: 'I' },
  },
  {
    id: 'full-ei-02',
    tier: 'full',
    dimension: 'EI',
    text: 'When you disagree with someone, you:',
    optionA: { text: 'Address it immediately and openly', pole: 'E' },
    optionB: { text: 'Take time to think before responding', pole: 'I' },
  },
  {
    id: 'full-ei-03',
    tier: 'full',
    dimension: 'EI',
    text: 'Your ideal living situation would be:',
    optionA: { text: 'In a busy neighborhood with lots of activity', pole: 'E' },
    optionB: { text: 'In a quiet area with privacy and peace', pole: 'I' },
  },
  {
    id: 'full-ei-04',
    tier: 'full',
    dimension: 'EI',
    text: 'When celebrating an anniversary, you would prefer:',
    optionA: { text: 'A party with friends and family', pole: 'E' },
    optionB: { text: 'An intimate dinner for just the two of you', pole: 'I' },
  },
  {
    id: 'full-ei-05',
    tier: 'full',
    dimension: 'EI',
    text: 'You process emotions best by:',
    optionA: { text: 'Talking them through with others', pole: 'E' },
    optionB: { text: 'Reflecting on them privately', pole: 'I' },
  },
  {
    id: 'full-ei-06',
    tier: 'full',
    dimension: 'EI',
    text: 'When traveling with a partner, you prefer:',
    optionA: { text: 'Group tours and social activities', pole: 'E' },
    optionB: { text: 'Exploring together without a crowd', pole: 'I' },
  },
  {
    id: 'full-ei-07',
    tier: 'full',
    dimension: 'EI',
    text: 'In social media, you:',
    optionA: { text: 'Share frequently and enjoy the interaction', pole: 'E' },
    optionB: { text: 'Prefer to observe rather than post', pole: 'I' },
  },
  {
    id: 'full-ei-08',
    tier: 'full',
    dimension: 'EI',
    text: 'When stressed about the relationship, you:',
    optionA: { text: 'Want to talk about it right away', pole: 'E' },
    optionB: { text: 'Need space to process before discussing', pole: 'I' },
  },

  // === S/N Dimension - Full Tier (7 questions) ===
  {
    id: 'full-sn-01',
    tier: 'full',
    dimension: 'SN',
    text: 'When discussing relationship goals, you focus on:',
    optionA: { text: 'Concrete milestones like moving in, marriage, etc.', pole: 'S' },
    optionB: { text: 'The vision of your life together long-term', pole: 'N' },
  },
  {
    id: 'full-sn-02',
    tier: 'full',
    dimension: 'SN',
    text: 'You notice your partner is upset because:',
    optionA: { text: 'You observe specific changes in their behavior', pole: 'S' },
    optionB: { text: 'You sense a shift in their energy or mood', pole: 'N' },
  },
  {
    id: 'full-sn-03',
    tier: 'full',
    dimension: 'SN',
    text: 'When solving relationship problems, you prefer:',
    optionA: { text: 'Addressing specific behaviors that need to change', pole: 'S' },
    optionB: { text: 'Understanding the deeper patterns and meanings', pole: 'N' },
  },
  {
    id: 'full-sn-04',
    tier: 'full',
    dimension: 'SN',
    text: 'Your ideal date would be:',
    optionA: { text: 'A well-planned activity you both enjoy', pole: 'S' },
    optionB: { text: 'An adventure that could lead anywhere', pole: 'N' },
  },
  {
    id: 'full-sn-05',
    tier: 'full',
    dimension: 'SN',
    text: 'When your partner shares a dream, you respond by:',
    optionA: { text: 'Helping them create actionable steps', pole: 'S' },
    optionB: { text: 'Exploring and expanding the possibilities with them', pole: 'N' },
  },
  {
    id: 'full-sn-06',
    tier: 'full',
    dimension: 'SN',
    text: 'You prefer romantic gestures that are:',
    optionA: { text: 'Thoughtful and practical', pole: 'S' },
    optionB: { text: 'Symbolic and meaningful', pole: 'N' },
  },
  {
    id: 'full-sn-07',
    tier: 'full',
    dimension: 'SN',
    text: 'When planning your future together, you discuss:',
    optionA: { text: 'Specific financial and lifestyle details', pole: 'S' },
    optionB: { text: 'Shared values and life philosophy', pole: 'N' },
  },

  // === T/F Dimension - Full Tier (8 questions) ===
  {
    id: 'full-tf-01',
    tier: 'full',
    dimension: 'TF',
    text: 'When your partner makes a mistake, you:',
    optionA: { text: 'Help them understand what went wrong logically', pole: 'T' },
    optionB: { text: 'Reassure them and focus on their feelings', pole: 'F' },
  },
  {
    id: 'full-tf-02',
    tier: 'full',
    dimension: 'TF',
    text: 'You feel most loved when your partner:',
    optionA: { text: 'Respects your opinions and competence', pole: 'T' },
    optionB: { text: 'Shows warmth and emotional connection', pole: 'F' },
  },
  {
    id: 'full-tf-03',
    tier: 'full',
    dimension: 'TF',
    text: 'In a serious discussion about the relationship, you:',
    optionA: { text: 'Try to stay calm and objective', pole: 'T' },
    optionB: { text: 'Express your emotions openly', pole: 'F' },
  },
  {
    id: 'full-tf-04',
    tier: 'full',
    dimension: 'TF',
    text: 'When choosing where to live together, you prioritize:',
    optionA: { text: 'Practical factors like commute and cost', pole: 'T' },
    optionB: { text: 'How it feels and the emotional fit', pole: 'F' },
  },
  {
    id: 'full-tf-05',
    tier: 'full',
    dimension: 'TF',
    text: 'After a disagreement, you need:',
    optionA: { text: 'To understand what happened and resolve it', pole: 'T' },
    optionB: { text: 'To feel emotionally reconnected', pole: 'F' },
  },
  {
    id: 'full-tf-06',
    tier: 'full',
    dimension: 'TF',
    text: 'You express appreciation to your partner by:',
    optionA: { text: 'Acknowledging their achievements and abilities', pole: 'T' },
    optionB: { text: 'Expressing how much they mean to you emotionally', pole: 'F' },
  },
  {
    id: 'full-tf-07',
    tier: 'full',
    dimension: 'TF',
    text: 'When your partner is being unreasonable, you:',
    optionA: { text: 'Point out the flaws in their reasoning', pole: 'T' },
    optionB: { text: 'Try to understand what is really bothering them', pole: 'F' },
  },
  {
    id: 'full-tf-08',
    tier: 'full',
    dimension: 'TF',
    text: 'You believe a strong relationship requires:',
    optionA: { text: 'Clear communication and logical problem-solving', pole: 'T' },
    optionB: { text: 'Deep emotional understanding and empathy', pole: 'F' },
  },

  // === J/P Dimension - Full Tier (7 questions) ===
  {
    id: 'full-jp-01',
    tier: 'full',
    dimension: 'JP',
    text: 'When it comes to household chores, you prefer:',
    optionA: { text: 'A schedule so everything gets done on time', pole: 'J' },
    optionB: { text: 'Doing things when they need to be done', pole: 'P' },
  },
  {
    id: 'full-jp-02',
    tier: 'full',
    dimension: 'JP',
    text: 'In terms of relationship milestones, you:',
    optionA: { text: 'Have a timeline in mind for major steps', pole: 'J' },
    optionB: { text: 'Let things happen naturally without pressure', pole: 'P' },
  },
  {
    id: 'full-jp-03',
    tier: 'full',
    dimension: 'JP',
    text: 'When your partner suggests a sudden trip, you:',
    optionA: { text: 'Want to plan logistics before agreeing', pole: 'J' },
    optionB: { text: 'Get excited and pack quickly', pole: 'P' },
  },
  {
    id: 'full-jp-04',
    tier: 'full',
    dimension: 'JP',
    text: 'You handle joint finances by:',
    optionA: { text: 'Creating budgets and tracking expenses', pole: 'J' },
    optionB: { text: 'Managing more loosely with general awareness', pole: 'P' },
  },
  {
    id: 'full-jp-05',
    tier: 'full',
    dimension: 'JP',
    text: 'When making big decisions together, you prefer to:',
    optionA: { text: 'Research thoroughly before committing', pole: 'J' },
    optionB: { text: 'Trust your instincts and adapt as needed', pole: 'P' },
  },
  {
    id: 'full-jp-06',
    tier: 'full',
    dimension: 'JP',
    text: 'Your approach to time is:',
    optionA: { text: 'Punctual and respectful of schedules', pole: 'J' },
    optionB: { text: 'Flexible with approximate times', pole: 'P' },
  },
  {
    id: 'full-jp-07',
    tier: 'full',
    dimension: 'JP',
    text: 'When something is not working in the relationship, you:',
    optionA: { text: 'Want to address and resolve it immediately', pole: 'J' },
    optionB: { text: 'Give it time to see if it resolves itself', pole: 'P' },
  },
];

// Helper function to get questions by tier
export const getQuestionsByTier = (tier: TestTier): MBTIQuestion[] => {
  if (tier === 'none') return [];
  if (tier === 'short') {
    return MBTI_QUESTIONS.filter(q => q.tier === 'short');
  }
  if (tier === 'medium') {
    return MBTI_QUESTIONS.filter(q => q.tier === 'short' || q.tier === 'medium');
  }
  // full includes all
  return MBTI_QUESTIONS;
};

// Get questions for a specific tier only (not cumulative)
export const getQuestionsForTierOnly = (tier: TestTier): MBTIQuestion[] => {
  if (tier === 'none') return [];
  return MBTI_QUESTIONS.filter(q => q.tier === tier);
};

// Get question count by tier
export const getQuestionCountByTier = (tier: TestTier): number => {
  return getQuestionsByTier(tier).length;
};

// Shuffle questions (Fisher-Yates algorithm)
export const shuffleQuestions = (questions: MBTIQuestion[]): MBTIQuestion[] => {
  const shuffled = [...questions];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
