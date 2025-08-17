import React from 'react';
import { Card, Slider, Button } from '../ui';
import { useSetupStore } from '../../stores/setupStore';

const TransmissionPanel: React.FC = () => {
  const { currentSetup, updateParameter, resetToBaseline } = useSetupStore();
  const { transmission } = currentSetup;

  const handleParameterChange = (parameter: string, value: number) => {
    updateParameter('transmission', parameter, value);
  };

  const gearParams = [
    { key: 'gear1', label: '1st Gear', min: 2.8, max: 4.2, step: 0.05, unit: ':1' },
    { key: 'gear2', label: '2nd Gear', min: 2.2, max: 3.4, step: 0.05, unit: ':1' },
    { key: 'gear3', label: '3rd Gear', min: 1.8, max: 2.8, step: 0.05, unit: ':1' },
    { key: 'gear4', label: '4th Gear', min: 1.4, max: 2.2, step: 0.05, unit: ':1' },
    { key: 'gear5', label: '5th Gear', min: 1.1, max: 1.8, step: 0.05, unit: ':1' },
    { key: 'gear6', label: '6th Gear', min: 0.9, max: 1.4, step: 0.05, unit: ':1' },
    { key: 'gear7', label: '7th Gear', min: 0.8, max: 1.2, step: 0.05, unit: ':1' },
  ];

  const finalDriveParams = [
    { key: 'finalDrive', label: 'Final Drive Ratio', min: 2.5, max: 5.0, step: 0.05, unit: ':1' },
  ];

  const differentialParams = [
    { key: 'differentialOnThrottle', label: 'Differential Lock (On Throttle)', min: 0, max: 100, step: 5, unit: '%' },
    { key: 'differentialOffThrottle', label: 'Differential Lock (Off Throttle)', min: 0, max: 60, step: 5, unit: '%' },
    { key: 'differentialCoast', label: 'Differential Lock (Coast)', min: 0, max: 40, step: 5, unit: '%' },
  ];

  // Calculate transmission performance metrics
  const calculateTransmissionMetrics = () => {
    const gears = [transmission.gear1, transmission.gear2, transmission.gear3, transmission.gear4, transmission.gear5, transmission.gear6, transmission.gear7];
    const finalDrive = transmission.finalDrive;
    
    // Calculate gear spacing (closer ratios = smoother shifts)
    const gearSpacing = gears.slice(1).map((gear, index) => ((gears[index] / gear) - 1) * 100);
    const averageSpacing = gearSpacing.reduce((a, b) => a + b, 0) / gearSpacing.length;
    
    // Calculate top speed factor (lower ratios = higher top speed)
    const topSpeedFactor = (1 / (transmission.gear7 * finalDrive)) * 100;
    
    // Calculate acceleration factor (higher ratios = better acceleration)
    const accelerationFactor = (transmission.gear1 * finalDrive) * 10;
    
    return {
      averageSpacing: averageSpacing.toFixed(1),
      topSpeedFactor: topSpeedFactor.toFixed(1),
      accelerationFactor: accelerationFactor.toFixed(1),
      gearSpacing
    };
  };

  const transmissionMetrics = calculateTransmissionMetrics();

  const GearRatioVisualizer: React.FC = () => {
    const gears = [transmission.gear1, transmission.gear2, transmission.gear3, transmission.gear4, transmission.gear5, transmission.gear6, transmission.gear7];
    const maxRatio = Math.max(...gears);
    
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Gear Ratio Visualization</h4>
        <div className="grid grid-cols-7 gap-2">
          {gears.map((ratio, index) => {
            const height = (ratio / maxRatio) * 100;
            return (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full h-20 bg-gray-200 rounded-t-lg relative overflow-hidden">
                  <div 
                    className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 transition-all duration-300"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <div className="text-xs font-medium text-gray-600 mt-1">{index + 1}</div>
                <div className="text-xs text-gray-500">{ratio.toFixed(2)}</div>
              </div>
            );
          })}
        </div>
        <div className="text-xs text-gray-500 text-center">
          Taller bars = higher ratios (better acceleration), Shorter bars = lower ratios (higher top speed)
        </div>
      </div>
    );
  };

  const DifferentialVisualizer: React.FC = () => {
    const onThrottle = transmission.differentialOnThrottle;
    const offThrottle = transmission.differentialOffThrottle;
    const coast = transmission.differentialCoast;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700 mb-2">On Throttle</div>
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 bg-gray-200 rounded-full" />
              <div 
                className="absolute inset-0 bg-green-500 rounded-full transition-all duration-300"
                style={{ 
                  background: `conic-gradient(from 0deg, #10b981 ${onThrottle * 3.6}deg, #e5e7eb ${onThrottle * 3.6}deg)` 
                }}
              />
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">{onThrottle}%</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Acceleration traction</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700 mb-2">Off Throttle</div>
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 bg-gray-200 rounded-full" />
              <div 
                className="absolute inset-0 bg-blue-500 rounded-full transition-all duration-300"
                style={{ 
                  background: `conic-gradient(from 0deg, #3b82f6 ${offThrottle * 3.6}deg, #e5e7eb ${offThrottle * 3.6}deg)` 
                }}
              />
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">{offThrottle}%</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Engine braking</div>
          </div>
          
          <div className="text-center">
            <div className="text-sm font-medium text-gray-700 mb-2">Coast</div>
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 bg-gray-200 rounded-full" />
              <div 
                className="absolute inset-0 bg-purple-500 rounded-full transition-all duration-300"
                style={{ 
                  background: `conic-gradient(from 0deg, #8b5cf6 ${coast * 3.6}deg, #e5e7eb ${coast * 3.6}deg)` 
                }}
              />
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">{coast}%</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Neutral throttle</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Transmission Setup</h2>
          <p className="text-gray-600 mt-1">
            Adjust gear ratios, final drive, and differential settings for optimal power delivery
          </p>
        </div>
        <Button variant="outline" onClick={resetToBaseline}>
          Reset to Baseline
        </Button>
      </div>

      {/* Gear Ratios */}
      <Card title="Gear Ratios" subtitle="Individual gear ratio adjustments">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gearParams.map((param) => (
              <Slider
                key={param.key}
                label={param.label}
                value={transmission[param.key as keyof typeof transmission] as number}
                onChange={(value) => handleParameterChange(param.key, value)}
                min={param.min}
                max={param.max}
                step={param.step}
                unit={param.unit}
                parameterKey={param.key}
                tooltip="Higher ratios provide better acceleration, lower ratios increase top speed"
              />
            ))}
          </div>
          <GearRatioVisualizer />
        </div>
      </Card>

      {/* Final Drive */}
      <Card title="Final Drive" subtitle="Overall transmission ratio multiplier">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {finalDriveParams.map((param) => (
            <Slider
              key={param.key}
              label={param.label}
              value={transmission[param.key as keyof typeof transmission] as number}
              onChange={(value) => handleParameterChange(param.key, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              unit={param.unit}
              parameterKey={param.key}
              tooltip="Final drive ratio affects all gears equally - higher values improve acceleration but reduce top speed"
            />
          ))}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Transmission Character</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Acceleration Factor:</span>
                <span className="font-mono text-blue-600">{transmissionMetrics.accelerationFactor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Top Speed Factor:</span>
                <span className="font-mono text-green-600">{transmissionMetrics.topSpeedFactor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Average Gear Spacing:</span>
                <span className="font-mono text-purple-600">{transmissionMetrics.averageSpacing}%</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Differential */}
      <Card title="Limited Slip Differential" subtitle="Differential locking percentages for different driving conditions">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentialParams.map((param) => (
              <Slider
                key={param.key}
                label={param.label}
                value={transmission[param.key as keyof typeof transmission] as number}
                onChange={(value) => handleParameterChange(param.key, value)}
                min={param.min}
                max={param.max}
                step={param.step}
                unit={param.unit}
                parameterKey={param.key}
                tooltip="Higher lock percentage provides more traction but reduces cornering ability"
              />
            ))}
          </div>
          <DifferentialVisualizer />
        </div>
      </Card>

      {/* Transmission Concepts */}
      <Card title="Transmission Concepts" subtitle="Understanding gear ratios and differential behavior">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Gear Ratio Principles</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• <strong>Higher Ratios:</strong> Better acceleration, lower top speed</li>
                <li>• <strong>Lower Ratios:</strong> Higher top speed, slower acceleration</li>
                <li>• <strong>Close Ratios:</strong> Smoother power delivery</li>
                <li>• <strong>Wide Ratios:</strong> Broader speed range per gear</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Differential Settings</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• <strong>On Throttle:</strong> Acceleration traction out of corners</li>
                <li>• <strong>Off Throttle:</strong> Engine braking and turn-in stability</li>
                <li>• <strong>Coast:</strong> Mid-corner balance and rotation</li>
                <li>• <strong>Higher Lock:</strong> More traction, less agility</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TransmissionPanel;