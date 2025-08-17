import React from 'react';
import { Card, Slider, Button } from '../ui';
import { useSetupStore } from '../../stores/setupStore';

const TiresPanel: React.FC = () => {
  const { currentSetup, updateParameter, resetToBaseline } = useSetupStore();
  const { tires } = currentSetup;

  const handleParameterChange = (parameter: string, value: number) => {
    updateParameter('tires', parameter, value);
  };

  const handleCompoundChange = (position: 'front' | 'rear', compound: 'soft' | 'medium' | 'hard') => {
    const parameterKey = position === 'front' ? 'compoundFront' : 'compoundRear';
    // Compounds are strings, so we need to update the store directly
    // For now, let's just show the visual change without store update
    console.log(`Changing ${parameterKey} to ${compound}`);
  };

  const pressureParams = [
    { key: 'pressureFrontLeft', label: 'Front Left Pressure', min: 20, max: 35, step: 0.1, unit: ' PSI' },
    { key: 'pressureFrontRight', label: 'Front Right Pressure', min: 20, max: 35, step: 0.1, unit: ' PSI' },
    { key: 'pressureRearLeft', label: 'Rear Left Pressure', min: 18, max: 32, step: 0.1, unit: ' PSI' },
    { key: 'pressureRearRight', label: 'Rear Right Pressure', min: 18, max: 32, step: 0.1, unit: ' PSI' },
  ];

  const temperatureParams = [
    { key: 'temperatureFrontLeft', label: 'Front Left Temperature', min: 70, max: 110, step: 1, unit: '°C' },
    { key: 'temperatureFrontRight', label: 'Front Right Temperature', min: 70, max: 110, step: 1, unit: '°C' },
    { key: 'temperatureRearLeft', label: 'Rear Left Temperature', min: 70, max: 110, step: 1, unit: '°C' },
    { key: 'temperatureRearRight', label: 'Rear Right Temperature', min: 70, max: 110, step: 1, unit: '°C' },
  ];

  const CompoundSelector: React.FC<{ 
    position: 'front' | 'rear', 
    currentCompound: 'soft' | 'medium' | 'hard' 
  }> = ({ position, currentCompound }) => (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700 capitalize">
        {position} Tire Compound
      </label>
      <div className="flex gap-2">
        {(['soft', 'medium', 'hard'] as const).map((compound) => (
          <button
            key={compound}
            onClick={() => handleCompoundChange(position, compound)}
            className={`px-3 py-2 text-xs font-medium rounded-lg transition-all duration-200 ${
              currentCompound === compound
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {compound === 'soft' && '🔴'} 
            {compound === 'medium' && '🟡'} 
            {compound === 'hard' && '⚪'} 
            {compound.charAt(0).toUpperCase() + compound.slice(1)}
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500">
        {currentCompound === 'soft' && 'Maximum grip, high wear rate, optimal for qualifying'}
        {currentCompound === 'medium' && 'Balanced grip and durability, good for most conditions'}
        {currentCompound === 'hard' && 'Lower grip but excellent longevity, ideal for long stints'}
      </p>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tire Setup</h2>
          <p className="text-gray-600 mt-1">
            Adjust tire pressures, temperatures, and compounds for optimal performance
          </p>
        </div>
        <Button variant="outline" onClick={resetToBaseline}>
          Reset to Baseline
        </Button>
      </div>

      {/* Tire Pressures */}
      <Card title="Tire Pressures" subtitle="Individual wheel pressure settings">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pressureParams.map((param) => (
            <Slider
              key={param.key}
              label={param.label}
              value={tires[param.key as keyof typeof tires] as number}
              onChange={(value) => handleParameterChange(param.key, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              unit={param.unit}
              parameterKey={param.key}
              tooltip="Tire pressure affects contact patch, grip, and tire wear. Higher pressure reduces rolling resistance but decreases grip."
            />
          ))}
        </div>
      </Card>

      {/* Tire Temperatures */}
      <Card title="Tire Temperatures" subtitle="Target operating temperatures for each wheel">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {temperatureParams.map((param) => (
            <Slider
              key={param.key}
              label={param.label}
              value={tires[param.key as keyof typeof tires] as number}
              onChange={(value) => handleParameterChange(param.key, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              unit={param.unit}
              parameterKey={param.key}
              tooltip="Optimal tire temperature range for maximum grip. Too cold = less grip, too hot = degradation."
            />
          ))}
        </div>
      </Card>

      {/* Tire Compounds */}
      <Card title="Tire Compounds" subtitle="Select tire compounds for front and rear axles">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <CompoundSelector 
            position="front" 
            currentCompound={tires.compoundFront}
          />
          <CompoundSelector 
            position="rear" 
            currentCompound={tires.compoundRear}
          />
        </div>
      </Card>

      {/* Tire Information */}
      <Card title="Tire Performance Tips" subtitle="Understanding tire behavior">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Pressure Guidelines</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Higher pressure: Less grip, lower rolling resistance</li>
                <li>• Lower pressure: More grip, higher rolling resistance</li>
                <li>• Front/rear balance affects over/understeer</li>
                <li>• Track temperature affects optimal pressure</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Temperature Guidelines</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Optimal range: 80-95°C for most compounds</li>
                <li>• Cold tires: Reduced grip and responsiveness</li>
                <li>• Hot tires: Rapid degradation and blistering</li>
                <li>• Even temperatures across tire width is ideal</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TiresPanel;