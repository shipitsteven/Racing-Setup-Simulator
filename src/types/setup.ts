// Core setup parameter types
export interface SuspensionSettings {
  camberFront: number;
  camberRear: number;
  toeFront: number;
  toeRear: number;
  caster: number;
  springRateFront: number;
  springRateRear: number;
  bumpDampingFront: number;
  bumpDampingRear: number;
  reboundDampingFront: number;
  reboundDampingRear: number;
  antiRollBarFront: number;
  antiRollBarRear: number;
  rideHeightFront: number;
  rideHeightRear: number;
}

export interface AerodynamicSettings {
  frontWing: number;
  rearWing: number;
  rideHeightFront: number;
  rideHeightRear: number;
  rakeAngle: number;
  splitter: number;
  diffuser: number;
}

export interface TireSettings {
  pressureFrontLeft: number;
  pressureFrontRight: number;
  pressureRearLeft: number;
  pressureRearRight: number;
  temperatureFrontLeft: number;
  temperatureFrontRight: number;
  temperatureRearLeft: number;
  temperatureRearRight: number;
  compoundFront: 'soft' | 'medium' | 'hard';
  compoundRear: 'soft' | 'medium' | 'hard';
}

export interface BrakeSettings {
  brakeBias: number;
  brakePressure: number;
  brakeTemperatureFront: number;
  brakeTemperatureRear: number;
  brakeDuctSizeFront: number;
  brakeDuctSizeRear: number;
}

export interface TransmissionSettings {
  gear1: number;
  gear2: number;
  gear3: number;
  gear4: number;
  gear5: number;
  gear6: number;
  gear7: number;
  finalDrive: number;
  differentialOnThrottle: number;
  differentialOffThrottle: number;
  differentialCoast: number;
}

export interface BallastSettings {
  weight: number;
  position: number; // -100 (rear) to +100 (front)
  leftRightBalance: number; // -100 (left) to +100 (right)
}

export interface SetupParameters {
  suspension: SuspensionSettings;
  aerodynamics: AerodynamicSettings;
  tires: TireSettings;
  brakes: BrakeSettings;
  transmission: TransmissionSettings;
  ballast: BallastSettings;
}

// Performance metrics
export interface PerformanceMetrics {
  corneringGrip: number; // 0-100 scale
  straightLineSpeed: number; // km/h
  brakeDistance: number; // meters
  estimatedLapTime: number; // seconds
  handlingBalance: number; // -100 (understeer) to +100 (oversteer)
  tireWearRate: number; // 0-100 scale
  fuelEfficiency: number; // 0-100 scale
}

// Delta metrics for real-time updates
export interface DeltaMetrics {
  corneringGripDelta: number;
  straightLineSpeedDelta: number;
  brakeDistanceDelta: number;
  lapTimeDelta: number;
  handlingBalanceDelta: number;
}

// Car types
export type CarType = 'f1' | 'gt3' | 'gt4' | 'touring' | 'prototype';

// Track types
export type TrackType = 'high-speed' | 'technical' | 'balanced' | 'street';

// Weather conditions
export type WeatherCondition = 'dry' | 'wet' | 'mixed';

// User skill levels
export type UserLevel = 'beginner' | 'intermediate' | 'expert';

// Setup presets
export interface SetupPreset {
  id: string;
  name: string;
  description: string;
  carType: CarType;
  trackType: TrackType;
  weatherCondition: WeatherCondition;
  setup: SetupParameters;
  createdAt: Date;
  isUserCreated: boolean;
  author?: string;
  rating?: number;
  downloads?: number;
}

// Parameter ranges and metadata
export interface ParameterRange {
  min: number;
  max: number;
  step: number;
  unit: string;
  defaultValue: number;
}

export interface ParameterDefinition {
  id: string;
  name: string;
  description: string;
  category: keyof SetupParameters;
  range: ParameterRange;
  affectedSystems: string[];
  difficulty: UserLevel;
}

// Feedback and explanations
export interface DetailedExplanation {
  summary: string;
  detailedEffects: string[];
  handlingChanges: string[];
  recommendations: string[];
  relatedAdjustments: string[];
  visualCues: string[];
}

export interface ExplanationContext {
  userLevel: UserLevel;
  trackType: TrackType;
  carType: CarType;
  weatherConditions: WeatherCondition;
}