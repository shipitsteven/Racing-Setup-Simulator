import React from 'react';
import { Card, Slider, Button } from '../ui';
import { useSetupStore } from '../../stores/setupStore';

const BallastPanel: React.FC = () => {
  const { currentSetup, updateParameter, resetToBaseline } = useSetupStore();
  const { ballast } = currentSetup;

  const handleParameterChange = (parameter: string, value: number) => {
    updateParameter('ballast', parameter, value);
  };

  const ballastParams = [
    { key: 'weight', label: 'Ballast Weight', min: 0, max: 100, step: 1, unit: ' kg' },
    { key: 'position', label: 'Front/Rear Position', min: -100, max: 100, step: 5, unit: '' },
    { key: 'leftRightBalance', label: 'Left/Right Balance', min: -100, max: 100, step: 5, unit: '' },
  ];

  // Calculate weight distribution and center of gravity effects
  const calculateBallastEffects = () => {
    const totalWeight = 1000 + ballast.weight; // Assuming base car weight of 1000kg
    const frontRearBias = ballast.position;
    const leftRightBias = ballast.leftRightBalance;
    
    // Calculate effective weight distribution percentages
    const frontWeight = 50 + (frontRearBias * 0.1); // Base 50/50, adjusted by position
    const rearWeight = 100 - frontWeight;
    const leftWeight = 50 - (leftRightBias * 0.1); // Negative bias = more left weight
    const rightWeight = 100 - leftWeight;
    
    return {
      totalWeight: totalWeight.toFixed(0),
      frontWeight: frontWeight.toFixed(1),
      rearWeight: rearWeight.toFixed(1),
      leftWeight: leftWeight.toFixed(1),
      rightWeight: rightWeight.toFixed(1),
      ballastWeight: ballast.weight,
      hasWeight: ballast.weight > 0
    };
  };

  const ballastEffects = calculateBallastEffects();

  const WeightDistributionVisualizer: React.FC = () => {
    const frontPercent = parseFloat(ballastEffects.frontWeight);
    const leftPercent = parseFloat(ballastEffects.leftWeight);
    
    return (
      <div className="space-y-6">
        {/* Car Top View */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700 text-center">Weight Distribution (Top View)</h4>
          <div className="relative w-48 h-32 mx-auto bg-gray-200 rounded-lg border-2 border-gray-300">
            {/* Car outline */}
            <div className="absolute inset-2 bg-white rounded border border-gray-400">
              {/* Front/Rear division line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-400 transform -translate-y-0.5" />
              {/* Left/Right division line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-400 transform -translate-x-0.5" />
              
              {/* Weight indicators */}
              <div className="absolute top-1 left-1 text-xs font-bold text-blue-600">
                FL: {((frontPercent * leftPercent) / 100).toFixed(1)}%
              </div>
              <div className="absolute top-1 right-1 text-xs font-bold text-green-600">
                FR: {((frontPercent * (100 - leftPercent)) / 100).toFixed(1)}%
              </div>
              <div className="absolute bottom-1 left-1 text-xs font-bold text-purple-600">
                RL: {(((100 - frontPercent) * leftPercent) / 100).toFixed(1)}%
              </div>
              <div className="absolute bottom-1 right-1 text-xs font-bold text-red-600">
                RR: {(((100 - frontPercent) * (100 - leftPercent)) / 100).toFixed(1)}%
              </div>
              
              {/* Ballast position indicator */}
              {ballastEffects.hasWeight && (
                <div 
                  className="absolute w-3 h-3 bg-yellow-500 rounded-full border-2 border-yellow-700 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${50 + (ballast.leftRightBalance * 0.3)}%`,
                    top: `${50 - (ballast.position * 0.3)}%`
                  }}
                />
              )}
            </div>
            
            {/* Labels */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
              FRONT
            </div>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-600">
              REAR
            </div>
            <div className="absolute top-1/2 -left-8 transform -translate-y-1/2 rotate-90 text-xs font-medium text-gray-600">
              LEFT
            </div>
            <div className="absolute top-1/2 -right-8 transform -translate-y-1/2 -rotate-90 text-xs font-medium text-gray-600">
              RIGHT
            </div>
          </div>
          
          {ballastEffects.hasWeight && (
            <div className="text-center">
              <div className="inline-flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-yellow-500 rounded-full border-2 border-yellow-700" />
                <span className="text-gray-600">{ballastEffects.ballastWeight}kg Ballast Position</span>
              </div>
            </div>
          )}
        </div>

        {/* Weight Distribution Bars */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Front/Rear Balance</div>
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-400 transition-all duration-300"
                style={{ width: `${frontPercent}%` }}
              />
              <div 
                className="absolute top-0 right-0 h-full bg-gradient-to-l from-red-500 to-red-400 transition-all duration-300"
                style={{ width: `${100 - frontPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>🔵 {ballastEffects.frontWeight}% Front</span>
              <span>🔴 {ballastEffects.rearWeight}% Rear</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-700">Left/Right Balance</div>
            <div className="relative w-full h-4 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-purple-400 transition-all duration-300"
                style={{ width: `${leftPercent}%` }}
              />
              <div 
                className="absolute top-0 right-0 h-full bg-gradient-to-l from-green-500 to-green-400 transition-all duration-300"
                style={{ width: `${100 - leftPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>🟣 {ballastEffects.leftWeight}% Left</span>
              <span>🟢 {ballastEffects.rightWeight}% Right</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PositionSlider: React.FC<{ 
    label: string; 
    value: number; 
    onChange: (value: number) => void;
    parameterKey: string;
    minLabel: string;
    maxLabel: string;
  }> = ({ label, value, onChange, parameterKey, minLabel, maxLabel }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded">
          {value > 0 ? '+' : ''}{value}
        </span>
      </div>
      
      <div className="relative">
        <input
          type="range"
          min={-100}
          max={100}
          step={5}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${(value + 100) / 2}%, #3b82f6 ${(value + 100) / 2}%, #3b82f6 100%)`,
          }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-gray-500">
        <span>{minLabel}</span>
        <span className="text-gray-700 font-medium">Neutral</span>
        <span>{maxLabel}</span>
      </div>
      
      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-800 font-medium leading-relaxed">
          💡 {getPositionFeedback(parameterKey, value)}
        </p>
      </div>
    </div>
  );

  const getPositionFeedback = (parameterKey: string, value: number): string => {
    if (parameterKey === 'position') {
      if (value < -50) {
        return "Heavy rear bias - improved acceleration traction but risk of oversteer";
      } else if (value < -20) {
        return "Moderate rear bias - better acceleration with slight oversteer tendency";
      } else if (value < 20) {
        return "Neutral balance - even weight distribution front to rear";
      } else if (value < 50) {
        return "Moderate front bias - improved braking but may reduce acceleration";
      } else {
        return "Heavy front bias - maximum braking stability but poor acceleration";
      }
    } else { // leftRightBalance
      if (value < -50) {
        return "Heavy left bias - compensates for left-turning tracks but hurts right turns";
      } else if (value < -20) {
        return "Moderate left bias - slight advantage for left-heavy track layouts";
      } else if (value < 20) {
        return "Neutral balance - even left-right weight distribution";
      } else if (value < 50) {
        return "Moderate right bias - slight advantage for right-heavy track layouts";
      } else {
        return "Heavy right bias - compensates for right-turning tracks but hurts left turns";
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ballast Setup</h2>
          <p className="text-gray-600 mt-1">
            Adjust weight amount and position to fine-tune weight distribution and handling balance
          </p>
        </div>
        <Button variant="outline" onClick={resetToBaseline}>
          Reset to Baseline
        </Button>
      </div>

      {/* Ballast Weight */}
      <Card title="Ballast Weight" subtitle="Additional weight for minimum weight compliance or balance adjustment">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Slider
            label="Ballast Weight"
            value={ballast.weight}
            onChange={(value) => handleParameterChange('weight', value)}
            min={0}
            max={100}
            step={1}
            unit=" kg"
            parameterKey="weight"
            tooltip="Additional weight affects acceleration, braking, and handling characteristics"
          />
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total Vehicle Weight</span>
              <span className="text-lg font-bold text-blue-600">{ballastEffects.totalWeight} kg</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Added Ballast</span>
              <span className="text-lg font-bold text-purple-600">{ballastEffects.ballastWeight} kg</span>
            </div>
            <div className="text-xs text-gray-500">
              {ballast.weight === 0 ? 
                'No ballast - running at minimum weight' : 
                `${((ballast.weight / parseFloat(ballastEffects.totalWeight)) * 100).toFixed(1)}% of total weight is ballast`
              }
            </div>
          </div>
        </div>
      </Card>

      {/* Weight Distribution Visualization */}
      <Card title="Weight Distribution" subtitle="Visual representation of current weight balance">
        <WeightDistributionVisualizer />
      </Card>

      {/* Position Controls */}
      <Card title="Ballast Position" subtitle="Fine-tune weight distribution with ballast placement">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PositionSlider
            label="Front/Rear Position"
            value={ballast.position}
            onChange={(value) => handleParameterChange('position', value)}
            parameterKey="position"
            minLabel="Rear (-100)"
            maxLabel="Front (+100)"
          />
          <PositionSlider
            label="Left/Right Balance"
            value={ballast.leftRightBalance}
            onChange={(value) => handleParameterChange('leftRightBalance', value)}
            parameterKey="leftRightBalance"
            minLabel="Left (-100)"
            maxLabel="Right (+100)"
          />
        </div>
      </Card>

      {/* Ballast Strategy Guide */}
      <Card title="Ballast Strategy Guide" subtitle="Understanding weight distribution effects">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Front/Rear Effects</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• <strong>More Front:</strong> Better braking, understeer tendency</li>
                <li>• <strong>More Rear:</strong> Better acceleration, oversteer tendency</li>
                <li>• <strong>Balanced:</strong> Neutral handling characteristics</li>
                <li>• <strong>Track-specific:</strong> Adjust for corner vs. straight balance</li>
              </ul>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Left/Right Effects</h4>
              <ul className="space-y-1 text-gray-600">
                <li>• <strong>Track Direction:</strong> Favor turn direction majority</li>
                <li>• <strong>Banking:</strong> Compensate for track banking effects</li>
                <li>• <strong>Fuel Load:</strong> Account for fuel consumption patterns</li>
                <li>• <strong>Driver Preference:</strong> Fine-tune for driving style</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BallastPanel;