import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type {
  CarType,
  TrackType,
  WeatherCondition,
  SuspensionSettings,
  AerodynamicSettings,
  TireSettings,
  BrakeSettings,
  TransmissionSettings,
  BallastSettings,
  SetupParameters,
  SetupPreset,
} from '../types';
import { TrackCharacteristics } from '../data/tracks';

// Default setup data
const DEFAULT_GT3_SETUP: SetupParameters = {
  suspension: {
    camberFront: -2.5,
    camberRear: -1.8,
    toeFront: 0.1,
    toeRear: -0.1,
    caster: 6.5,
    springRateFront: 120,
    springRateRear: 130,
    bumpDampingFront: 20,
    bumpDampingRear: 22,
    reboundDampingFront: 18,
    reboundDampingRear: 20,
    antiRollBarFront: 25,
    antiRollBarRear: 28,
    rideHeightFront: 75,
    rideHeightRear: 80,
  },
  aerodynamics: {
    frontWing: 30,
    rearWing: 35,
    rideHeightFront: 75,
    rideHeightRear: 80,
    rakeAngle: 0.8,
    splitter: 15,
    diffuser: 25,
  },
  tires: {
    pressureFrontLeft: 27.5,
    pressureFrontRight: 27.5,
    pressureRearLeft: 26.0,
    pressureRearRight: 26.0,
    temperatureFrontLeft: 87,
    temperatureFrontRight: 87,
    temperatureRearLeft: 84,
    temperatureRearRight: 84,
    compoundFront: 'medium',
    compoundRear: 'medium',
  },
  brakes: {
    brakeBias: 56,
    brakePressure: 100,
    brakeTemperatureFront: 450,
    brakeTemperatureRear: 400,
    brakeDuctSizeFront: 3,
    brakeDuctSizeRear: 2,
  },
  transmission: {
    gear1: 3.5,
    gear2: 2.8,
    gear3: 2.2,
    gear4: 1.8,
    gear5: 1.5,
    gear6: 1.2,
    gear7: 1.0,
    finalDrive: 3.8,
    differentialOnThrottle: 60,
    differentialOffThrottle: 20,
    differentialCoast: 15,
  },
  ballast: {
    weight: 0,
    position: 0,
    leftRightBalance: 0,
  },
};

// Car configurations
const CAR_CONFIGS: Record<CarType, { name: string; baseSetup: SetupParameters }> = {
  f1: {
    name: 'Formula 1',
    baseSetup: {
      ...DEFAULT_GT3_SETUP,
      suspension: {
        ...DEFAULT_GT3_SETUP.suspension,
        camberFront: -3.5,
        camberRear: -2.5,
        springRateFront: 180,
        springRateRear: 200,
      },
    },
  },
  gt3: {
    name: 'GT3',
    baseSetup: DEFAULT_GT3_SETUP,
  },
  gt4: {
    name: 'GT4',
    baseSetup: {
      ...DEFAULT_GT3_SETUP,
      aerodynamics: {
        ...DEFAULT_GT3_SETUP.aerodynamics,
        frontWing: 20,
        rearWing: 25,
      },
    },
  },
  touring: {
    name: 'Touring Car',
    baseSetup: {
      ...DEFAULT_GT3_SETUP,
      suspension: {
        ...DEFAULT_GT3_SETUP.suspension,
        camberFront: -2.0,
        camberRear: -1.5,
      },
    },
  },
  prototype: {
    name: 'Prototype',
    baseSetup: {
      ...DEFAULT_GT3_SETUP,
      aerodynamics: {
        ...DEFAULT_GT3_SETUP.aerodynamics,
        frontWing: 40,
        rearWing: 45,
      },
    },
  },
};

interface SetupStore {
  // Current setup state
  currentSetup: SetupParameters;
  carType: CarType;
  trackType: TrackType;
  weatherCondition: WeatherCondition;
  
  // Presets
  presets: SetupPreset[];
  
  // History for undo/redo
  setupHistory: SetupParameters[];
  historyIndex: number;
  
  // Actions
  updateParameter: (category: keyof SetupParameters, parameter: string, value: number) => void;
  setCarType: (carType: CarType) => void;
  setTrackType: (trackType: TrackType) => void;
  setWeatherCondition: (weather: WeatherCondition) => void;
  loadPreset: (presetId: string) => void;
  saveSetup: (name: string, description?: string) => void;
  resetToBaseline: () => void;
  
  // History actions
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
  
  // Utility actions
  compareSetups: (setupA: SetupParameters, setupB: SetupParameters) => any;
  exportSetup: (format: 'json' | 'csv') => string;
  importSetup: (data: string, format: 'json' | 'csv') => boolean;
  applyTrackBasedSetup: (track: TrackCharacteristics) => void;
}

export const useSetupStore = create<SetupStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    currentSetup: DEFAULT_GT3_SETUP,
    carType: 'gt3',
    trackType: 'balanced',
    weatherCondition: 'dry',
    presets: [
      {
        id: 'gt3-baseline',
        name: 'GT3 Baseline',
        description: 'Balanced setup for GT3 cars on most tracks',
        carType: 'gt3',
        trackType: 'balanced',
        weatherCondition: 'dry',
        setup: DEFAULT_GT3_SETUP,
        createdAt: new Date(),
        isUserCreated: false,
        rating: 4.5,
        downloads: 1250,
      },
      {
        id: 'gt3-high-downforce',
        name: 'High Downforce',
        description: 'Maximum grip setup for technical tracks',
        carType: 'gt3',
        trackType: 'technical',
        weatherCondition: 'dry',
        setup: {
          ...DEFAULT_GT3_SETUP,
          aerodynamics: {
            ...DEFAULT_GT3_SETUP.aerodynamics,
            frontWing: 45,
            rearWing: 50,
          },
          suspension: {
            ...DEFAULT_GT3_SETUP.suspension,
            camberFront: -3.2,
            camberRear: -2.5,
          },
        },
        createdAt: new Date(),
        isUserCreated: false,
        rating: 4.2,
        downloads: 890,
      },
      {
        id: 'gt3-low-drag',
        name: 'Low Drag Speed',
        description: 'Optimized for high-speed circuits with long straights',
        carType: 'gt3',
        trackType: 'high-speed',
        weatherCondition: 'dry',
        setup: {
          ...DEFAULT_GT3_SETUP,
          aerodynamics: {
            ...DEFAULT_GT3_SETUP.aerodynamics,
            frontWing: 15,
            rearWing: 20,
          },
          suspension: {
            ...DEFAULT_GT3_SETUP.suspension,
            camberFront: -1.8,
            camberRear: -1.2,
          },
        },
        createdAt: new Date(),
        isUserCreated: false,
        rating: 4.0,
        downloads: 756,
      },
    ],
    setupHistory: [DEFAULT_GT3_SETUP],
    historyIndex: 0,

    // Actions
    updateParameter: (category, parameter, value) => {
      set((state) => {
        const newSetup = {
          ...state.currentSetup,
          [category]: {
            ...state.currentSetup[category],
            [parameter]: value,
          },
        };

        // Add to history for undo/redo
        const newHistory = state.setupHistory.slice(0, state.historyIndex + 1);
        newHistory.push(newSetup);
        
        // Limit history to 50 entries
        if (newHistory.length > 50) {
          newHistory.shift();
        }

        return {
          currentSetup: newSetup,
          setupHistory: newHistory,
          historyIndex: newHistory.length - 1,
        };
      });
    },

    setCarType: (carType) => {
      set((state) => {
        const newSetup = CAR_CONFIGS[carType].baseSetup;
        return {
          carType,
          currentSetup: newSetup,
          setupHistory: [newSetup],
          historyIndex: 0,
        };
      });
    },

    setTrackType: (trackType) => {
      set({ trackType });
    },

    setWeatherCondition: (weatherCondition) => {
      set({ weatherCondition });
    },

    loadPreset: (presetId) => {
      const state = get();
      const preset = state.presets.find(p => p.id === presetId);
      if (preset) {
        set({
          currentSetup: preset.setup,
          carType: preset.carType,
          trackType: preset.trackType,
          weatherCondition: preset.weatherCondition,
          setupHistory: [preset.setup],
          historyIndex: 0,
        });
      }
    },

    saveSetup: (name, description = '') => {
      set((state) => {
        const newPreset: SetupPreset = {
          id: `user-${Date.now()}`,
          name,
          description,
          carType: state.carType,
          trackType: state.trackType,
          weatherCondition: state.weatherCondition,
          setup: state.currentSetup,
          createdAt: new Date(),
          isUserCreated: true,
        };

        // Save to localStorage
        try {
          const savedSetups = JSON.parse(localStorage.getItem('racingSetupSimulator_userSetups') || '[]');
          savedSetups.push(newPreset);
          localStorage.setItem('racingSetupSimulator_userSetups', JSON.stringify(savedSetups));
        } catch (error) {
          console.error('Failed to save setup to localStorage:', error);
        }

        return {
          presets: [...state.presets, newPreset],
        };
      });
    },

    resetToBaseline: () => {
      set((state) => {
        const baseSetup = CAR_CONFIGS[state.carType].baseSetup;
        return {
          currentSetup: baseSetup,
          setupHistory: [baseSetup],
          historyIndex: 0,
        };
      });
    },

    // History actions
    undo: () => {
      set((state) => {
        if (state.historyIndex > 0) {
          const newIndex = state.historyIndex - 1;
          return {
            currentSetup: state.setupHistory[newIndex],
            historyIndex: newIndex,
          };
        }
        return state;
      });
    },

    redo: () => {
      set((state) => {
        if (state.historyIndex < state.setupHistory.length - 1) {
          const newIndex = state.historyIndex + 1;
          return {
            currentSetup: state.setupHistory[newIndex],
            historyIndex: newIndex,
          };
        }
        return state;
      });
    },

    canUndo: () => {
      const state = get();
      return state.historyIndex > 0;
    },

    canRedo: () => {
      const state = get();
      return state.historyIndex < state.setupHistory.length - 1;
    },

    // Utility actions
    compareSetups: (setupA, setupB) => {
      const differences: any = {};
      
      Object.keys(setupA).forEach(category => {
        const categoryA = setupA[category as keyof SetupParameters];
        const categoryB = setupB[category as keyof SetupParameters];
        
        if (typeof categoryA === 'object' && typeof categoryB === 'object') {
          Object.keys(categoryA).forEach(param => {
            const valueA = (categoryA as any)[param];
            const valueB = (categoryB as any)[param];
            
            if (valueA !== valueB) {
              if (!differences[category]) {
                differences[category] = {};
              }
              differences[category][param] = {
                current: valueA,
                compared: valueB,
                difference: valueA - valueB,
              };
            }
          });
        }
      });
      
      return differences;
    },

    exportSetup: (format) => {
      const state = get();
      const exportData = {
        name: `Custom Setup ${new Date().toISOString().split('T')[0]}`,
        carType: state.carType,
        trackType: state.trackType,
        weatherCondition: state.weatherCondition,
        setup: state.currentSetup,
        exportedAt: new Date().toISOString(),
        version: '1.0',
      };

      if (format === 'json') {
        return JSON.stringify(exportData, null, 2);
      } else if (format === 'csv') {
        // Convert setup to flat CSV format
        const flatData: any[] = [];
        Object.entries(state.currentSetup).forEach(([category, settings]) => {
          Object.entries(settings).forEach(([param, value]) => {
            flatData.push({
              category,
              parameter: param,
              value,
            });
          });
        });
        
        const csvHeader = 'Category,Parameter,Value\n';
        const csvData = flatData.map(row => `${row.category},${row.parameter},${row.value}`).join('\n');
        return csvHeader + csvData;
      }
      
      return '';
    },

    importSetup: (data, format) => {
      try {
        if (format === 'json') {
          const imported = JSON.parse(data);
          if (imported.setup && imported.carType) {
            set({
              currentSetup: imported.setup,
              carType: imported.carType,
              trackType: imported.trackType || 'balanced',
              weatherCondition: imported.weatherCondition || 'dry',
              setupHistory: [imported.setup],
              historyIndex: 0,
            });
            return true;
          }
        }
        return false;
      } catch (error) {
        console.error('Failed to import setup:', error);
        return false;
      }
    },

    applyTrackBasedSetup: (track) => {
      set((state) => {
        const currentSetup = { ...state.currentSetup };
        const recommendations = track.setupRecommendations;

        // Apply aerodynamic recommendations
        currentSetup.aerodynamics = {
          ...currentSetup.aerodynamics,
          frontWing: recommendations.aerodynamics.frontWing,
          rearWing: recommendations.aerodynamics.rearWing,
        };

        // Apply suspension recommendations
        const suspensionMultipliers = {
          'Soft': 0.8,
          'Medium': 1.0,
          'Stiff': 1.2,
        };
        const springMultiplier = suspensionMultipliers[recommendations.suspension.springs];
        const damperMultiplier = suspensionMultipliers[recommendations.suspension.dampers];

        currentSetup.suspension = {
          ...currentSetup.suspension,
          springRateFront: Math.round(DEFAULT_GT3_SETUP.suspension.springRateFront * springMultiplier),
          springRateRear: Math.round(DEFAULT_GT3_SETUP.suspension.springRateRear * springMultiplier),
          bumpDampingFront: Math.round(DEFAULT_GT3_SETUP.suspension.bumpDampingFront * damperMultiplier),
          bumpDampingRear: Math.round(DEFAULT_GT3_SETUP.suspension.bumpDampingRear * damperMultiplier),
          reboundDampingFront: Math.round(DEFAULT_GT3_SETUP.suspension.reboundDampingFront * damperMultiplier),
          reboundDampingRear: Math.round(DEFAULT_GT3_SETUP.suspension.reboundDampingRear * damperMultiplier),
        };

        // Apply transmission recommendations
        const gearingMultipliers = {
          'Short': 1.1,
          'Medium': 1.0,
          'Long': 0.9,
        };
        const diffMultipliers = {
          'Low': 0.7,
          'Medium': 1.0,
          'High': 1.3,
        };
        
        const gearMultiplier = gearingMultipliers[recommendations.transmission.gearing];
        const diffMultiplier = diffMultipliers[recommendations.transmission.differential];

        currentSetup.transmission = {
          ...currentSetup.transmission,
          finalDrive: Number((DEFAULT_GT3_SETUP.transmission.finalDrive * gearMultiplier).toFixed(2)),
          differentialOnThrottle: Math.round(DEFAULT_GT3_SETUP.transmission.differentialOnThrottle * diffMultiplier),
        };

        // Apply brake recommendations
        currentSetup.brakes = {
          ...currentSetup.brakes,
          brakeBias: recommendations.brakes.bias,
          brakeDuctSizeFront: recommendations.brakes.cooling === 'High' ? 5 : 
                              recommendations.brakes.cooling === 'Medium' ? 3 : 1,
          brakeDuctSizeRear: recommendations.brakes.cooling === 'High' ? 4 : 
                             recommendations.brakes.cooling === 'Medium' ? 2 : 1,
        };

        // Add to history for undo/redo
        const newHistory = state.setupHistory.slice(0, state.historyIndex + 1);
        newHistory.push(currentSetup);
        
        if (newHistory.length > 50) {
          newHistory.shift();
        }

        return {
          currentSetup,
          setupHistory: newHistory,
          historyIndex: newHistory.length - 1,
        };
      });
    },
  }))
);

// Load user setups from localStorage on initialization
if (typeof window !== 'undefined') {
  try {
    const savedSetups = JSON.parse(localStorage.getItem('racingSetupSimulator_userSetups') || '[]');
    if (savedSetups.length > 0) {
      useSetupStore.setState((state) => ({
        presets: [...state.presets, ...savedSetups],
      }));
    }
  } catch (error) {
    console.error('Failed to load saved setups:', error);
  }
}