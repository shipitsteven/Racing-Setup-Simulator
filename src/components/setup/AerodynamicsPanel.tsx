import React from 'react';
import { Card, Slider, Button } from '../ui';
import { useSetupStore } from '../../stores/setupStore';

const AerodynamicsPanel: React.FC = () => {
  const { currentSetup, updateParameter, resetToBaseline } = useSetupStore();
  const { aerodynamics } = currentSetup;

  const handleParameterChange = (parameter: string, value: number) => {
    updateParameter('aerodynamics', parameter, value);
  };

  const wingParams = [
    { key: 'frontWing', label: 'Front Wing Angle', min: 0, max: 50, step: 1, unit: '°' },
    { key: 'rearWing', label: 'Rear Wing Angle', min: 0, max: 60, step: 1, unit: '°' },
  ];

  const rideHeightParams = [
    { key: 'rideHeightFront', label: 'Front Ride Height', min: 50, max: 100, step: 1, unit: ' mm' },
    { key: 'rideHeightRear', label: 'Rear Ride Height', min: 55, max: 105, step: 1, unit: ' mm' },
    { key: 'rakeAngle', label: 'Rake Angle', min: -2.0, max: 3.0, step: 0.1, unit: '°' },
  ];

  const bodyworkParams = [
    { key: 'splitter', label: 'Front Splitter', min: 0, max: 30, step: 1, unit: ' mm' },
    { key: 'diffuser', label: 'Rear Diffuser', min: 0, max: 40, step: 1, unit: ' mm' },
  ];

  // Calculate total downforce and drag estimates
  const calculateAeroEffects = () => {
    const totalDownforce = aerodynamics.frontWing + aerodynamics.rearWing + (aerodynamics.splitter * 0.5) + (aerodynamics.diffuser * 0.3);
    const totalDrag = (aerodynamics.frontWing * 1.2) + (aerodynamics.rearWing * 1.5) + (aerodynamics.splitter * 0.3);
    const efficiency = totalDownforce > 0 ? (totalDownforce / totalDrag).toFixed(2) : '0';
    
    return {
      downforce: Math.round(totalDownforce),
      drag: Math.round(totalDrag),
      efficiency: efficiency
    };
  };

  const aeroEffects = calculateAeroEffects();

  const BalanceIndicator: React.FC = () => {
    const frontBalance = (aerodynamics.frontWing + aerodynamics.splitter * 0.5) / 
                       (aerodynamics.frontWing + aerodynamics.rearWing + aerodynamics.splitter * 0.5 + aerodynamics.diffuser * 0.3) * 100;
    
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Aero Balance</span>
          <span className="text-sm text-gray-600">{frontBalance.toFixed(1)}% Front</span>
        </div>
        <div className="relative w-full h-3 bg-gray-200 rounded-full">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-red-500 rounded-full"
            style={{ width: `${frontBalance}%` }}
          />
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-gray-800 transform -translate-x-0.5" />
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Rear Bias (Oversteer)</span>
          <span>Front Bias (Understeer)</span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Aerodynamics Setup</h2>
          <p className="text-gray-600 mt-1">
            Adjust downforce, drag, and aerodynamic balance for optimal performance
          </p>
        </div>
        <Button variant="outline" onClick={resetToBaseline}>
          Reset to Baseline
        </Button>
      </div>

      {/* Wings Configuration */}
      <Card title="Wings & Downforce" subtitle="Front and rear wing angle adjustments">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wingParams.map((param) => (
            <Slider
              key={param.key}
              label={param.label}
              value={aerodynamics[param.key as keyof typeof aerodynamics] as number}
              onChange={(value) => handleParameterChange(param.key, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              unit={param.unit}
              parameterKey={param.key}
              tooltip={param.key === 'frontWing' ? 
                'Front wing angle affects front downforce and turn-in response' : 
                'Rear wing angle affects rear downforce and straight-line speed'}
            />
          ))}
        </div>
      </Card>

      {/* Ride Height & Rake */}
      <Card title="Ride Height & Rake" subtitle="Vehicle height and pitch angle settings">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rideHeightParams.map((param) => (
            <Slider
              key={param.key}
              label={param.label}
              value={aerodynamics[param.key as keyof typeof aerodynamics] as number}
              onChange={(value) => handleParameterChange(param.key, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              unit={param.unit}
              parameterKey={param.key}
              tooltip={param.key === 'rakeAngle' ? 
                'Rake angle affects aerodynamic balance and underbody airflow' : 
                'Ride height affects ground effect and aerodynamic efficiency'}
            />
          ))}
        </div>
      </Card>

      {/* Bodywork Elements */}
      <Card title="Bodywork Elements" subtitle="Splitter and diffuser configurations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bodyworkParams.map((param) => (
            <Slider
              key={param.key}
              label={param.label}
              value={aerodynamics[param.key as keyof typeof aerodynamics] as number}
              onChange={(value) => handleParameterChange(param.key, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              unit={param.unit}
              parameterKey={param.key}
              tooltip={param.key === 'splitter' ? 
                'Front splitter generates front downforce and affects airflow' : 
                'Rear diffuser enhances underbody airflow and rear downforce'}
            />
          ))}
        </div>
      </Card>

      {/* Aerodynamic Performance */}
      <Card title="Aerodynamic Performance" subtitle="Real-time downforce and efficiency calculations">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Downforce</span>
              <span className="text-lg font-bold text-blue-600">{aeroEffects.downforce} units</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Drag</span>
              <span className="text-lg font-bold text-red-600">{aeroEffects.drag} units</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">L/D Efficiency</span>
              <span className="text-lg font-bold text-green-600">{aeroEffects.efficiency}</span>
            </div>
          </div>
          <BalanceIndicator />
        </div>
      </Card>

      {/* Aerodynamic Concepts */}
      <Card title="Aerodynamic Concepts" subtitle="Understanding downforce and drag trade-offs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Downforce Benefits</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Higher cornering speeds and grip</li>
                <li>• Improved braking performance</li>
                <li>• Better tire contact and control</li>
                <li>• Enhanced stability at high speed</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Drag Penalties</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• Reduced top speed on straights</li>
                <li>• Higher fuel consumption</li>
                <li>• Slower acceleration from low speeds</li>
                <li>• Need to balance for track characteristics</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AerodynamicsPanel;