import React from 'react';
import { Card, Slider, Button } from '../ui';
import { useSetupStore } from '../../stores/setupStore';
import { PARAMETER_DEFINITIONS } from '../../utils/constants';

const SuspensionPanel: React.FC = () => {
  const { currentSetup, updateParameter, resetToBaseline } = useSetupStore();
  const { suspension } = currentSetup;

  const handleParameterChange = (parameter: string, value: number) => {
    updateParameter('suspension', parameter, value);
  };

  const suspensionParams = [
    { key: 'camberFront', label: 'Front Camber', min: -5, max: 1, step: 0.1, unit: '°' },
    { key: 'camberRear', label: 'Rear Camber', min: -4, max: 1, step: 0.1, unit: '°' },
    { key: 'toeFront', label: 'Front Toe', min: -0.5, max: 0.5, step: 0.05, unit: '°' },
    { key: 'toeRear', label: 'Rear Toe', min: -0.3, max: 0.3, step: 0.05, unit: '°' },
    { key: 'caster', label: 'Caster', min: 3, max: 8, step: 0.1, unit: '°' },
  ];

  const springParams = [
    { key: 'springRateFront', label: 'Front Spring Rate', min: 80, max: 200, step: 5, unit: ' N/mm' },
    { key: 'springRateRear', label: 'Rear Spring Rate', min: 85, max: 220, step: 5, unit: ' N/mm' },
    { key: 'bumpDampingFront', label: 'Front Bump Damping', min: 10, max: 40, step: 1, unit: ' clicks' },
    { key: 'bumpDampingRear', label: 'Rear Bump Damping', min: 10, max: 45, step: 1, unit: ' clicks' },
    { key: 'reboundDampingFront', label: 'Front Rebound Damping', min: 8, max: 35, step: 1, unit: ' clicks' },
    { key: 'reboundDampingRear', label: 'Rear Rebound Damping', min: 8, max: 40, step: 1, unit: ' clicks' },
  ];

  const antiRollParams = [
    { key: 'antiRollBarFront', label: 'Front Anti-Roll Bar', min: 10, max: 40, step: 1, unit: ' N·m/deg' },
    { key: 'antiRollBarRear', label: 'Rear Anti-Roll Bar', min: 10, max: 45, step: 1, unit: ' N·m/deg' },
    { key: 'rideHeightFront', label: 'Front Ride Height', min: 60, max: 90, step: 1, unit: ' mm' },
    { key: 'rideHeightRear', label: 'Rear Ride Height', min: 65, max: 95, step: 1, unit: ' mm' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Suspension Setup</h2>
          <p className="text-gray-600 mt-1">
            Adjust suspension geometry, springs, dampers, and anti-roll bars
          </p>
        </div>
        <Button variant="outline" onClick={resetToBaseline}>
          Reset to Baseline
        </Button>
      </div>

      {/* Geometry Section */}
      <Card title="Geometry" subtitle="Camber, toe, and caster adjustments">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {suspensionParams.map((param) => (
            <Slider
              key={param.key}
              label={param.label}
              value={suspension[param.key as keyof typeof suspension] as number}
              onChange={(value) => handleParameterChange(param.key, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              unit={param.unit}
              tooltip={PARAMETER_DEFINITIONS[param.key]?.description}
              parameterKey={param.key}
            />
          ))}
        </div>
      </Card>

      {/* Springs & Dampers Section */}
      <Card title="Springs & Dampers" subtitle="Spring rates and damper settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {springParams.map((param) => (
            <Slider
              key={param.key}
              label={param.label}
              value={suspension[param.key as keyof typeof suspension] as number}
              onChange={(value) => handleParameterChange(param.key, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              unit={param.unit}
              tooltip={PARAMETER_DEFINITIONS[param.key]?.description}
              parameterKey={param.key}
            />
          ))}
        </div>
      </Card>

      {/* Anti-Roll Bars Section */}
      <Card title="Anti-Roll Bars & Ride Height" subtitle="Roll stiffness and vehicle height">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {antiRollParams.map((param) => (
            <Slider
              key={param.key}
              label={param.label}
              value={suspension[param.key as keyof typeof suspension] as number}
              onChange={(value) => handleParameterChange(param.key, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              unit={param.unit}
              tooltip={PARAMETER_DEFINITIONS[param.key]?.description}
              parameterKey={param.key}
            />
          ))}
        </div>
      </Card>

    </div>
  );
};

export default SuspensionPanel;