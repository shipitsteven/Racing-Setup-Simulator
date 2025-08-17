import { SetupParameters, ParameterDefinition, CarType, UserLevel } from '../types';

// Default GT3 setup configuration
export const DEFAULT_GT3_SETUP: SetupParameters = {
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

// Parameter definitions with ranges and metadata
export const PARAMETER_DEFINITIONS: Record<string, ParameterDefinition> = {
  // Suspension parameters
  camberFront: {
    id: 'camberFront',
    name: 'Front Camber',
    description: 'Vertical inclination of front tires. Negative camber improves cornering grip.',
    category: 'suspension',
    range: { min: -5.0, max: 1.0, step: 0.1, unit: '°', defaultValue: -2.5 },
    affectedSystems: ['cornering', 'tire_wear', 'braking'],
    difficulty: 'beginner',
  },
  camberRear: {
    id: 'camberRear',
    name: 'Rear Camber',
    description: 'Vertical inclination of rear tires. Affects cornering balance and traction.',
    category: 'suspension',
    range: { min: -4.0, max: 1.0, step: 0.1, unit: '°', defaultValue: -1.8 },
    affectedSystems: ['cornering', 'tire_wear', 'acceleration'],
    difficulty: 'beginner',
  },
  toeFront: {
    id: 'toeFront',
    name: 'Front Toe',
    description: 'Angle of front tires when viewed from above. Affects turn-in response.',
    category: 'suspension',
    range: { min: -0.5, max: 0.5, step: 0.05, unit: '°', defaultValue: 0.1 },
    affectedSystems: ['handling', 'tire_wear', 'stability'],
    difficulty: 'intermediate',
  },
  toeRear: {
    id: 'toeRear',
    name: 'Rear Toe',
    description: 'Angle of rear tires when viewed from above. Affects stability and tire wear.',
    category: 'suspension',
    range: { min: -0.3, max: 0.3, step: 0.05, unit: '°', defaultValue: -0.1 },
    affectedSystems: ['stability', 'tire_wear', 'handling'],
    difficulty: 'intermediate',
  },
  springRateFront: {
    id: 'springRateFront',
    name: 'Front Spring Rate',
    description: 'Stiffness of front springs. Higher values reduce body roll but may hurt grip over bumps.',
    category: 'suspension',
    range: { min: 80, max: 200, step: 5, unit: ' N/mm', defaultValue: 120 },
    affectedSystems: ['handling', 'comfort', 'aerodynamics'],
    difficulty: 'expert',
  },
  // Add more parameter definitions...
};

// Setup category tabs
export const SETUP_CATEGORIES = [
  { id: 'tracks', name: 'Track Setup', icon: '🏁', color: 'indigo' },
  { id: 'suspension', name: 'Suspension', icon: '🔧', color: 'blue' },
  { id: 'aerodynamics', name: 'Aerodynamics', icon: '🛫', color: 'green' },
  { id: 'tires', name: 'Tires', icon: '⚫', color: 'orange' },
  { id: 'brakes', name: 'Brakes', icon: '🛑', color: 'red' },
  { id: 'transmission', name: 'Transmission', icon: '⚙️', color: 'purple' },
  { id: 'ballast', name: 'Ballast', icon: '⚖️', color: 'gray' },
];

// Car type configurations
export const CAR_CONFIGS: Record<CarType, { name: string; baseSetup: SetupParameters }> = {
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

// Physics calculation constants
export const PHYSICS_CONSTANTS = {
  GRAVITY: 9.81,
  AIR_DENSITY: 1.225,
  TIRE_FRICTION_BASE: 1.2,
  AERO_EFFICIENCY: 0.85,
  WEIGHT_TRANSFER_FACTOR: 0.6,
  TIRE_TEMPERATURE_OPTIMAL: 85,
  BRAKE_TEMPERATURE_OPTIMAL: 450,
};

// UI constants
export const UI_CONSTANTS = {
  ANIMATION_DURATION: 200,
  SLIDER_UPDATE_DELAY: 50,
  FEEDBACK_DELAY: 300,
  TOOLTIP_DELAY: 500,
  NOTIFICATION_DURATION: 5000,
};

// Track configurations for performance calculations
export const TRACK_CONFIGS = {
  'high-speed': {
    name: 'High-Speed Circuit',
    straightPercentage: 0.6,
    corneringPercentage: 0.4,
    averageSpeed: 180,
    lapLength: 5500,
  },
  'technical': {
    name: 'Technical Circuit',
    straightPercentage: 0.3,
    corneringPercentage: 0.7,
    averageSpeed: 140,
    lapLength: 4200,
  },
  'balanced': {
    name: 'Balanced Circuit',
    straightPercentage: 0.45,
    corneringPercentage: 0.55,
    averageSpeed: 160,
    lapLength: 4800,
  },
  'street': {
    name: 'Street Circuit',
    straightPercentage: 0.35,
    corneringPercentage: 0.65,
    averageSpeed: 130,
    lapLength: 3800,
  },
};