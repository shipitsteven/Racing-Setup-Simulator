import React from 'react';
import { Card, Slider, Button } from '../ui';
import { useSetupStore } from '../../stores/setupStore';

const BrakesPanel: React.FC = () => {
  const { currentSetup, updateParameter, resetToBaseline } = useSetupStore();
  const { brakes } = currentSetup;

  const handleParameterChange = (parameter: string, value: number) => {
    updateParameter('brakes', parameter, value);
  };

  const biasAndPressureParams = [
    { key: 'brakeBias', label: 'Brake Bias', min: 45, max: 70, step: 0.5, unit: '% Front' },
    { key: 'brakePressure', label: 'Master Cylinder Pressure', min: 80, max: 120, step: 1, unit: ' bar' },
  ];

  const temperatureParams = [
    { key: 'brakeTemperatureFront', label: 'Front Brake Temperature', min: 300, max: 600, step: 5, unit: '°C' },
    { key: 'brakeTemperatureRear', label: 'Rear Brake Temperature', min: 280, max: 580, step: 5, unit: '°C' },
  ];

  const coolingParams = [
    { key: 'brakeDuctSizeFront', label: 'Front Brake Duct Size', min: 0, max: 6, step: 1, unit: '' },
    { key: 'brakeDuctSizeRear', label: 'Rear Brake Duct Size', min: 0, max: 5, step: 1, unit: '' },
  ];

  // Calculate brake balance and performance metrics
  const calculateBrakeMetrics = () => {
    const frontBias = brakes.brakeBias;
    const rearBias = 100 - frontBias;
    const frontTemp = brakes.brakeTemperatureFront;
    const rearTemp = brakes.brakeTemperatureRear;
    
    // Optimal temperature range for brakes is typically 400-500°C
    const frontTempStatus = frontTemp < 350 ? 'cold' : frontTemp > 550 ? 'hot' : 'optimal';
    const rearTempStatus = rearTemp < 330 ? 'cold' : rearTemp > 530 ? 'hot' : 'optimal';
    
    return {
      frontBias: frontBias.toFixed(1),
      rearBias: rearBias.toFixed(1),
      frontTempStatus,
      rearTempStatus,
      overallBalance: frontBias > 60 ? 'front-biased' : frontBias < 50 ? 'rear-biased' : 'balanced'
    };
  };

  const brakeMetrics = calculateBrakeMetrics();

  const BalanceVisualizer: React.FC = () => {
    const frontPercentage = brakes.brakeBias;
    
    return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-700">Brake Force Distribution</span>
          <span className="text-sm text-gray-600">{frontPercentage.toFixed(1)}% / {(100 - frontPercentage).toFixed(1)}%</span>
        </div>
        <div className="relative w-full h-4 bg-gray-200 rounded-lg overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
            style={{ width: `${frontPercentage}%` }}
          />
          <div 
            className="absolute top-0 right-0 h-full bg-gradient-to-l from-red-500 to-red-400 transition-all duration-300"
            style={{ width: `${100 - frontPercentage}%` }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-0.5 h-full bg-white opacity-75" />
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-600">
          <span>🔵 Front Brakes</span>
          <span>🔴 Rear Brakes</span>
        </div>
        <div className="text-center text-xs text-gray-500">
          {brakeMetrics.overallBalance === 'front-biased' && 'Front-biased: More stable but longer braking distances'}
          {brakeMetrics.overallBalance === 'rear-biased' && 'Rear-biased: Shorter distances but risk of instability'}
          {brakeMetrics.overallBalance === 'balanced' && 'Well-balanced brake distribution'}
        </div>
      </div>
    );
  };

  const TemperatureIndicator: React.FC<{ label: string; temperature: number; status: string }> = ({ 
    label, 
    temperature, 
    status 
  }) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'cold': return 'text-blue-600 bg-blue-50';
        case 'optimal': return 'text-green-600 bg-green-50';
        case 'hot': return 'text-red-600 bg-red-50';
        default: return 'text-gray-600 bg-gray-50';
      }
    };

    const getStatusIcon = (status: string) => {
      switch (status) {
        case 'cold': return '🧊';
        case 'optimal': return '✅';
        case 'hot': return '🔥';
        default: return '⚪';
      }
    };

    return (
      <div className={`p-3 rounded-lg border ${getStatusColor(status)}`}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{label}</span>
          <span className="text-lg">{getStatusIcon(status)}</span>
        </div>
        <div className="text-lg font-bold">{temperature}°C</div>
        <div className="text-xs capitalize">{status} Range</div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Brake Setup</h2>
          <p className="text-gray-600 mt-1">
            Adjust brake bias, pressure, temperatures, and cooling for optimal braking performance
          </p>
        </div>
        <Button variant="outline" onClick={resetToBaseline}>
          Reset to Baseline
        </Button>
      </div>

      {/* Brake Bias & Pressure */}
      <Card title="Bias & Pressure" subtitle="Brake force distribution and hydraulic pressure">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {biasAndPressureParams.map((param) => (
            <Slider
              key={param.key}
              label={param.label}
              value={brakes[param.key as keyof typeof brakes] as number}
              onChange={(value) => handleParameterChange(param.key, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              unit={param.unit}
              parameterKey={param.key}
              tooltip={param.key === 'brakeBias' ? 
                'Percentage of braking force applied to front wheels - affects balance and stability' : 
                'Master cylinder pressure affects overall braking power and pedal feel'}
            />
          ))}
        </div>
      </Card>

      {/* Brake Balance Visualization */}
      <Card title="Brake Balance" subtitle="Visual representation of front/rear brake distribution">
        <BalanceVisualizer />
      </Card>

      {/* Brake Temperatures */}
      <Card title="Brake Temperatures" subtitle="Target operating temperatures for optimal performance">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {temperatureParams.map((param) => (
              <Slider
                key={param.key}
                label={param.label}
                value={brakes[param.key as keyof typeof brakes] as number}
                onChange={(value) => handleParameterChange(param.key, value)}
                min={param.min}
                max={param.max}
                step={param.step}
                unit={param.unit}
                parameterKey={param.key}
                tooltip="Brake temperature affects friction, fade resistance, and component longevity"
              />
            ))}
          </div>
          
          {/* Temperature Status Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TemperatureIndicator 
              label="Front Brakes"
              temperature={brakes.brakeTemperatureFront}
              status={brakeMetrics.frontTempStatus}
            />
            <TemperatureIndicator 
              label="Rear Brakes"
              temperature={brakes.brakeTemperatureRear}
              status={brakeMetrics.rearTempStatus}
            />
          </div>
        </div>
      </Card>

      {/* Brake Cooling */}
      <Card title="Brake Cooling" subtitle="Cooling duct sizes for temperature management">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {coolingParams.map((param) => (
            <Slider
              key={param.key}
              label={param.label}
              value={brakes[param.key as keyof typeof brakes] as number}
              onChange={(value) => handleParameterChange(param.key, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              unit={param.unit}
              parameterKey={param.key}
              tooltip="Larger brake ducts provide more cooling but increase aerodynamic drag"
            />
          ))}
        </div>
      </Card>

      {/* Brake Performance Guide */}
      <Card title="Brake Performance Guide" subtitle="Understanding brake setup principles">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Brake Bias Effects</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• <strong>More Front:</strong> Stable but longer distances</li>
                <li>• <strong>More Rear:</strong> Shorter distances but less stable</li>
                <li>• <strong>Balanced:</strong> Optimal for most conditions</li>
                <li>• <strong>Track-specific:</strong> Adjust for corner characteristics</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Temperature Management</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• <strong>Optimal:</strong> 400-500°C for peak performance</li>
                <li>• <strong>Too Cold:</strong> Poor initial bite and feel</li>
                <li>• <strong>Too Hot:</strong> Brake fade and rapid wear</li>
                <li>• <strong>Cooling:</strong> Balance temperature vs. drag</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BrakesPanel;