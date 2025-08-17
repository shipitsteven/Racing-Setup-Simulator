import { create } from 'zustand';
import { TrackCharacteristics } from '../data/tracks';

interface Notification {
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

interface UIState {
  activeTab: string;
  selectedComponent: string | null;
  selectedTrack: TrackCharacteristics | null;
  showTutorial: boolean;
  tutorialStep: number;
  isLoading: boolean;
  notifications: Notification[];
}

interface UIStore extends UIState {
  // Actions
  setActiveTab: (tab: string) => void;
  setSelectedComponent: (component: string | null) => void;
  setSelectedTrack: (track: TrackCharacteristics | null) => void;
  setShowTutorial: (show: boolean) => void;
  setTutorialStep: (step: number) => void;
  setLoading: (loading: boolean) => void;
  
  // Notification actions
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // UI state actions
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set, get) => ({
  // Initial state
  activeTab: 'tracks',
  selectedComponent: null,
  selectedTrack: null,
  showTutorial: false,
  tutorialStep: 0,
  isLoading: false,
  notifications: [],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  
  setSelectedComponent: (component) => set({ selectedComponent: component }),
  
  setSelectedTrack: (track) => set({ selectedTrack: track }),
  
  setShowTutorial: (show) => set({ showTutorial: show }),
  
  setTutorialStep: (step) => set({ tutorialStep: step }),
  
  setLoading: (loading) => set({ isLoading: loading }),

  // Notification actions
  addNotification: (notification) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const newNotification: Notification = {
      ...notification,
      id,
    };

    set((state) => ({
      notifications: [...state.notifications, newNotification],
    }));

    // Auto-remove notification after duration
    if (notification.duration !== 0) {
      const duration = notification.duration || 5000;
      setTimeout(() => {
        get().removeNotification(id);
      }, duration);
    }
  },

  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter(n => n.id !== id),
    }));
  },

  clearNotifications: () => set({ notifications: [] }),

  // UI state actions
  toggleSidebar: () => {
    // Implementation would depend on sidebar state
    console.log('Toggle sidebar');
  },

  setTheme: (theme) => {
    // Update theme in localStorage and apply to document
    localStorage.setItem('racingSetupSimulator_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  },

  setMobileMenuOpen: (open) => {
    // Implementation for mobile menu state
    console.log('Set mobile menu:', open);
  },
}));

// Initialize theme from localStorage
if (typeof window !== 'undefined') {
  const savedTheme = localStorage.getItem('racingSetupSimulator_theme') as 'light' | 'dark' | null;
  if (savedTheme) {
    useUIStore.getState().setTheme(savedTheme);
  } else {
    // Use system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    useUIStore.getState().setTheme(prefersDark ? 'dark' : 'light');
  }
}