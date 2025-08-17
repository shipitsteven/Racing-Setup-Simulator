// Export all types from setup module
export * from './setup';

// UI-specific types
export interface UIState {
  activeTab: string;
  selectedComponent: string | null;
  showTutorial: boolean;
  tutorialStep: number;
  isLoading: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    handler: () => void;
  };
}

// User progress and achievements
export interface UserProgress {
  completedTutorials: string[];
  setupExperience: number; // 0-100
  achievements: Achievement[];
  savedSetups: string[];
  favoritePresets: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: Date;
  category: 'setup' | 'learning' | 'performance' | 'social';
}

// Analytics and telemetry
export interface AnalyticsEvent {
  type: string;
  timestamp: Date;
  data: Record<string, any>;
  sessionId: string;
  userId?: string;
}

// Component props interfaces
export interface CustomSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  disabled?: boolean;
  tooltip?: string;
  className?: string;
}

export interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface CustomCardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}