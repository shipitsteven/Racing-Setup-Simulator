import { SetupParameters, CarType, TrackType, WeatherCondition } from '../types';

interface SetupChange {
  parameter: string;
  category: string;
  oldValue: number;
  newValue: number;
  delta: number;
}

interface EffectAnalysis {
  cornerEntry: number; // -100 to 100 (negative = worse, positive = better)
  midCorner: number;
  cornerExit: number;
  straightLine: number;
  braking: number;
  tireWear: number;
  stability: number;
  adjustability: number;
}

export function analyzeSetupChanges(
  oldSetup: SetupParameters,
  newSetup: SetupParameters,
  carType: CarType = 'gt3',
  trackType: TrackType = 'balanced',
  weatherCondition: WeatherCondition = 'dry'
): string {
  const changes = detectChanges(oldSetup, newSetup);
  if (changes.length === 0) return '';

  const effects = calculateEffects(changes, carType, trackType, weatherCondition);
  return generateSummary(changes, effects, trackType);
}

function detectChanges(oldSetup: SetupParameters, newSetup: SetupParameters): SetupChange[] {
  const changes: SetupChange[] = [];

  Object.keys(newSetup).forEach(category => {
    const oldCategory = oldSetup[category as keyof SetupParameters];
    const newCategory = newSetup[category as keyof SetupParameters];

    if (typeof oldCategory === 'object' && typeof newCategory === 'object') {
      Object.keys(newCategory).forEach(param => {
        const oldValue = (oldCategory as any)[param];
        const newValue = (newCategory as any)[param];
        
        if (typeof oldValue === 'number' && typeof newValue === 'number' && oldValue !== newValue) {
          changes.push({
            parameter: param,
            category,
            oldValue,
            newValue,
            delta: newValue - oldValue
          });
        }
      });
    }
  });

  return changes;
}

function calculateEffects(
  changes: SetupChange[], 
  carType: CarType, 
  trackType: TrackType, 
  weatherCondition: WeatherCondition
): EffectAnalysis {
  let effects: EffectAnalysis = {
    cornerEntry: 0,
    midCorner: 0,
    cornerExit: 0,
    straightLine: 0,
    braking: 0,
    tireWear: 0,
    stability: 0,
    adjustability: 0
  };

  changes.forEach(change => {
    const paramEffects = getParameterEffects(change);
    
    // Apply effects with modifiers based on context
    const trackModifier = getTrackModifier(trackType);
    const weatherModifier = getWeatherModifier(weatherCondition);
    const carModifier = getCarModifier(carType);

    Object.keys(paramEffects).forEach(effect => {
      const key = effect as keyof EffectAnalysis;
      effects[key] += paramEffects[key] * trackModifier[key] * weatherModifier[key] * carModifier[key];
    });
  });

  return effects;
}

function getParameterEffects(change: SetupChange): EffectAnalysis {
  const { parameter, category, delta } = change;
  
  // Base effects for each parameter (scaled by delta)
  const effectMagnitude = Math.abs(delta);
  const direction = delta > 0 ? 1 : -1;

  switch (category) {
    case 'suspension':
      return getSuspensionEffects(parameter, direction, effectMagnitude);
    case 'aerodynamics':
      return getAeroEffects(parameter, direction, effectMagnitude);
    case 'tires':
      return getTireEffects(parameter, direction, effectMagnitude);
    case 'brakes':
      return getBrakeEffects(parameter, direction, effectMagnitude);
    case 'transmission':
      return getTransmissionEffects(parameter, direction, effectMagnitude);
    default:
      return { cornerEntry: 0, midCorner: 0, cornerExit: 0, straightLine: 0, braking: 0, tireWear: 0, stability: 0, adjustability: 0 };
  }
}

function getSuspensionEffects(parameter: string, direction: number, magnitude: number): EffectAnalysis {
  const base = { cornerEntry: 0, midCorner: 0, cornerExit: 0, straightLine: 0, braking: 0, tireWear: 0, stability: 0, adjustability: 0 };
  
  switch (parameter) {
    case 'camberFront':
      // More negative camber improves cornering but hurts straight line
      return {
        ...base,
        cornerEntry: direction * -15 * magnitude, // More negative = better cornering
        midCorner: direction * -20 * magnitude,
        straightLine: direction * 8 * magnitude, // More negative = worse straight line
        braking: direction * -10 * magnitude,
        tireWear: direction * 12 * magnitude // More negative = more wear
      };
    
    case 'camberRear':
      return {
        ...base,
        midCorner: direction * -18 * magnitude,
        cornerExit: direction * -15 * magnitude,
        straightLine: direction * 6 * magnitude,
        tireWear: direction * 10 * magnitude
      };
    
    case 'toeFront':
      // Toe-in improves stability, toe-out improves turn-in
      return {
        ...base,
        cornerEntry: direction * 12 * magnitude, // Toe-out = better turn-in
        stability: direction * -10 * magnitude, // Toe-out = less stable
        tireWear: Math.abs(direction) * 15 * magnitude // Any toe = more wear
      };
    
    case 'springRateFront':
      // Stiffer springs improve handling but reduce comfort/grip over bumps
      return {
        ...base,
        cornerEntry: direction * 8 * magnitude,
        midCorner: direction * 12 * magnitude,
        stability: direction * 10 * magnitude,
        adjustability: direction * -6 * magnitude // Stiffer = less forgiving
      };
    
    case 'springRateRear':
      return {
        ...base,
        cornerExit: direction * 15 * magnitude,
        stability: direction * 8 * magnitude,
        adjustability: direction * -5 * magnitude
      };
    
    case 'antiRollBarFront':
      return {
        ...base,
        cornerEntry: direction * 10 * magnitude,
        midCorner: direction * 8 * magnitude,
        adjustability: direction * -4 * magnitude
      };
    
    default:
      return base;
  }
}

function getAeroEffects(parameter: string, direction: number, magnitude: number): EffectAnalysis {
  const base = { cornerEntry: 0, midCorner: 0, cornerExit: 0, straightLine: 0, braking: 0, tireWear: 0, stability: 0, adjustability: 0 };
  
  switch (parameter) {
    case 'frontWing':
      return {
        ...base,
        cornerEntry: direction * 20 * magnitude,
        midCorner: direction * 15 * magnitude,
        straightLine: direction * -25 * magnitude, // More downforce = more drag
        braking: direction * 10 * magnitude,
        stability: direction * 12 * magnitude
      };
    
    case 'rearWing':
      return {
        ...base,
        cornerExit: direction * 18 * magnitude,
        midCorner: direction * 12 * magnitude,
        straightLine: direction * -30 * magnitude,
        stability: direction * 15 * magnitude
      };
    
    default:
      return base;
  }
}

function getTireEffects(parameter: string, direction: number, magnitude: number): EffectAnalysis {
  const base = { cornerEntry: 0, midCorner: 0, cornerExit: 0, straightLine: 0, braking: 0, tireWear: 0, stability: 0, adjustability: 0 };
  
  if (parameter.includes('pressure')) {
    // Higher pressure = less grip but better wear
    return {
      ...base,
      cornerEntry: direction * -8 * magnitude,
      midCorner: direction * -10 * magnitude,
      cornerExit: direction * -8 * magnitude,
      tireWear: direction * -12 * magnitude, // Higher pressure = less wear
      straightLine: direction * 5 * magnitude // Less rolling resistance
    };
  }
  
  return base;
}

function getBrakeEffects(parameter: string, direction: number, magnitude: number): EffectAnalysis {
  const base = { cornerEntry: 0, midCorner: 0, cornerExit: 0, straightLine: 0, braking: 0, tireWear: 0, stability: 0, adjustability: 0 };
  
  switch (parameter) {
    case 'brakeBias':
      // More front bias = better braking but less stable
      return {
        ...base,
        braking: direction * 15 * magnitude,
        cornerEntry: direction * 8 * magnitude,
        stability: direction * -10 * magnitude
      };
    
    default:
      return base;
  }
}

function getTransmissionEffects(parameter: string, direction: number, magnitude: number): EffectAnalysis {
  const base = { cornerEntry: 0, midCorner: 0, cornerExit: 0, straightLine: 0, braking: 0, tireWear: 0, stability: 0, adjustability: 0 };
  
  if (parameter.includes('differential')) {
    return {
      ...base,
      cornerExit: direction * 10 * magnitude,
      stability: direction * 8 * magnitude
    };
  }
  
  return base;
}

function getTrackModifier(trackType: TrackType) {
  switch (trackType) {
    case 'technical':
      return { cornerEntry: 1.3, midCorner: 1.4, cornerExit: 1.2, straightLine: 0.7, braking: 1.3, tireWear: 1.1, stability: 1.2, adjustability: 1.1 };
    case 'high-speed':
      return { cornerEntry: 0.8, midCorner: 0.9, cornerExit: 1.1, straightLine: 1.5, braking: 1.0, tireWear: 0.9, stability: 1.3, adjustability: 0.9 };
    case 'street':
      return { cornerEntry: 1.1, midCorner: 1.2, cornerExit: 1.0, straightLine: 0.8, braking: 1.2, tireWear: 1.3, stability: 1.4, adjustability: 1.2 };
    default: // balanced
      return { cornerEntry: 1.0, midCorner: 1.0, cornerExit: 1.0, straightLine: 1.0, braking: 1.0, tireWear: 1.0, stability: 1.0, adjustability: 1.0 };
  }
}

function getWeatherModifier(weatherCondition: WeatherCondition) {
  switch (weatherCondition) {
    case 'wet':
      return { cornerEntry: 1.2, midCorner: 1.3, cornerExit: 1.2, straightLine: 0.9, braking: 1.4, tireWear: 0.8, stability: 1.5, adjustability: 1.3 };
    case 'mixed':
      return { cornerEntry: 1.1, midCorner: 1.1, cornerExit: 1.1, straightLine: 0.95, braking: 1.2, tireWear: 0.9, stability: 1.2, adjustability: 1.1 };
    default: // dry
      return { cornerEntry: 1.0, midCorner: 1.0, cornerExit: 1.0, straightLine: 1.0, braking: 1.0, tireWear: 1.0, stability: 1.0, adjustability: 1.0 };
  }
}

function getCarModifier(carType: CarType) {
  switch (carType) {
    case 'f1':
      return { cornerEntry: 1.3, midCorner: 1.4, cornerExit: 1.3, straightLine: 1.2, braking: 1.3, tireWear: 1.2, stability: 0.9, adjustability: 0.8 };
    case 'gt4':
      return { cornerEntry: 0.9, midCorner: 0.9, cornerExit: 0.9, straightLine: 0.9, braking: 0.9, tireWear: 0.8, stability: 1.1, adjustability: 1.2 };
    case 'touring':
      return { cornerEntry: 0.8, midCorner: 0.8, cornerExit: 0.8, straightLine: 0.8, braking: 0.8, tireWear: 0.7, stability: 1.2, adjustability: 1.3 };
    case 'prototype':
      return { cornerEntry: 1.2, midCorner: 1.3, cornerExit: 1.2, straightLine: 1.1, braking: 1.2, tireWear: 1.1, stability: 1.0, adjustability: 0.9 };
    default: // gt3
      return { cornerEntry: 1.0, midCorner: 1.0, cornerExit: 1.0, straightLine: 1.0, braking: 1.0, tireWear: 1.0, stability: 1.0, adjustability: 1.0 };
  }
}

function generateSummary(changes: SetupChange[], effects: EffectAnalysis, trackType: TrackType): string {
  const positives: string[] = [];
  const negatives: string[] = [];
  
  // Analyze significant effects (threshold: 10)
  const threshold = 10;
  
  if (effects.cornerEntry > threshold) positives.push('corner entry responsiveness');
  if (effects.cornerEntry < -threshold) negatives.push('corner entry responsiveness');
  
  if (effects.midCorner > threshold) positives.push('mid-corner grip');
  if (effects.midCorner < -threshold) negatives.push('mid-corner grip');
  
  if (effects.cornerExit > threshold) positives.push('corner exit traction');
  if (effects.cornerExit < -threshold) negatives.push('corner exit traction');
  
  if (effects.straightLine > threshold) positives.push('straight-line speed');
  if (effects.straightLine < -threshold) negatives.push('straight-line speed');
  
  if (effects.braking > threshold) positives.push('braking performance');
  if (effects.braking < -threshold) negatives.push('braking performance');
  
  if (effects.stability > threshold) positives.push('overall stability');
  if (effects.stability < -threshold) negatives.push('overall stability');
  
  if (effects.tireWear < -threshold) positives.push('tire longevity');
  if (effects.tireWear > threshold) negatives.push('tire longevity');
  
  if (effects.adjustability > threshold) positives.push('car adjustability');
  if (effects.adjustability < -threshold) negatives.push('car adjustability');

  // Build summary
  let summary = 'Your setup changes will';
  
  if (positives.length > 0) {
    summary += ` improve ${formatList(positives)}`;
  }
  
  if (negatives.length > 0) {
    if (positives.length > 0) {
      summary += ' but reduce';
    } else {
      summary += ' reduce';
    }
    summary += ` ${formatList(negatives)}`;
  }
  
  if (positives.length === 0 && negatives.length === 0) {
    summary = 'Your setup changes have minimal impact on overall performance.';
  } else {
    // Add track-specific context
    const trackContext = getTrackContext(trackType, effects);
    if (trackContext) {
      summary += `. ${trackContext}`;
    } else {
      summary += '.';
    }
  }
  
  return summary;
}

function formatList(items: string[]): string {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

function getTrackContext(trackType: TrackType, effects: EffectAnalysis): string {
  switch (trackType) {
    case 'technical':
      if (effects.midCorner > 15) return 'This setup should work well on technical circuits with lots of corners';
      if (effects.straightLine > 15) return 'However, this may not be optimal for a technical track layout';
      break;
    case 'high-speed':
      if (effects.straightLine > 15) return 'This setup is well-suited for high-speed circuits';
      if (effects.midCorner > 15 && effects.straightLine < 0) return 'However, you may be sacrificing valuable straight-line speed';
      break;
    case 'street':
      if (effects.stability > 10) return 'The improved stability will help on street circuits with limited run-off areas';
      if (effects.adjustability < -10) return 'Be careful as this setup may be less forgiving on bumpy street circuits';
      break;
  }
  return '';
}