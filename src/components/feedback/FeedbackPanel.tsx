import React from 'react';
import { Card } from '../ui';
import { useSetupStore } from '../../stores/setupStore';
import { useUIStore } from '../../stores/uiStore';

const FeedbackPanel: React.FC = () => {
  const { currentSetup, trackType } = useSetupStore();
  const { selectedTrack } = useUIStore();

  // Simplified feedback calculation
  const calculateFeedback = () => {
    const { suspension } = currentSetup;
    
    // Basic analysis based on camber settings
    const frontCamber = Math.abs(suspension.camberFront);
    const rearCamber = Math.abs(suspension.camberRear);
    
    let corneringGrip = 70;
    let straightLinePerf = 85;
    let tireWear = 60;
    
    // Adjust based on camber
    if (frontCamber > 2.5) {
      corneringGrip += 15;
      straightLinePerf -= 10;
      tireWear += 20;
    }
    
    if (rearCamber > 2.0) {
      corneringGrip += 10;
      tireWear += 15;
    }
    
    // Track type adjustments
    if (trackType === 'technical') {
      corneringGrip += 5;
    } else if (trackType === 'high-speed') {
      straightLinePerf += 10;
    }
    
    return {
      corneringGrip: Math.min(100, Math.max(0, corneringGrip)),
      straightLinePerf: Math.min(100, Math.max(0, straightLinePerf)),
      tireWear: Math.min(100, Math.max(0, tireWear)),
    };
  };

  const feedback = calculateFeedback();
  const { suspension } = currentSetup;

  const generateExplanation = () => {
    const frontCamber = suspension.camberFront;
    
    if (frontCamber < -3.0) {
      return {
        summary: "High negative front camber provides excellent cornering grip but reduces straight-line performance.",
        effects: [
          "Enhanced grip in high-speed corners",
          "Increased tire contact patch when cornering",
          "Reduced straight-line braking efficiency",
          "Higher front tire wear rate"
        ],
        recommendation: selectedTrack 
          ? `For ${selectedTrack.name} (${selectedTrack.downforceLevel} DF): ${selectedTrack.strategy} ${getTrackSpecificAdvice()}`
          : "Consider reducing camber for tracks with long straights or if experiencing excessive tire wear."
      };
    } else if (frontCamber > -1.5) {
      return {
        summary: "Low negative camber favors straight-line performance but may limit cornering potential.",
        effects: [
          "Optimal straight-line braking and acceleration",
          "Reduced cornering grip in high-speed turns",
          "Even tire wear distribution",
          "Better performance on high-speed circuits"
        ],
        recommendation: selectedTrack 
          ? `For ${selectedTrack.name} (${selectedTrack.downforceLevel} DF): ${selectedTrack.strategy} ${getTrackSpecificAdvice()}`
          : "Increase negative camber for technical tracks with many corners."
      };
    } else {
      return {
        summary: "Balanced camber setting provides good compromise between cornering and straight-line performance.",
        effects: [
          "Moderate cornering grip improvement",
          "Acceptable straight-line performance",
          "Reasonable tire wear characteristics",
          "Versatile for various track types"
        ],
        recommendation: selectedTrack 
          ? `For ${selectedTrack.name} (${selectedTrack.downforceLevel} DF): ${selectedTrack.strategy} ${getTrackSpecificAdvice()}`
          : "Fine-tune based on specific track characteristics and driving style."
      };
    }
  };

  const getTrackSpecificAdvice = () => {
    if (!selectedTrack) return "";
    
    const { aerodynamics, suspension, transmission, brakes } = selectedTrack.setupRecommendations;
    
    return `Key priorities: ${aerodynamics.priority.toLowerCase()}, ${suspension.priority.toLowerCase()}. Target wings: F${aerodynamics.frontWing}/R${aerodynamics.rearWing}, ${suspension.springs.toLowerCase()} springs, ${transmission.gearing.toLowerCase()} gearing.`;
  };

  const explanation = generateExplanation();

  const PerformanceBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Selected Track Info */}
      {selectedTrack && (
        <Card title={`🏁 ${selectedTrack.name}`} subtitle={`${selectedTrack.country} | ${selectedTrack.length.toFixed(1)}km`}>
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                selectedTrack.downforceLevel === 'Low' ? 'bg-blue-100 text-blue-600' :
                selectedTrack.downforceLevel === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                {selectedTrack.downforceLevel} DF
              </span>
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                selectedTrack.difficulty === 'Beginner' ? 'bg-green-100 text-green-600' :
                selectedTrack.difficulty === 'Intermediate' ? 'bg-blue-100 text-blue-600' :
                selectedTrack.difficulty === 'Advanced' ? 'bg-orange-100 text-orange-600' :
                'bg-red-100 text-red-600'
              }`}>
                {selectedTrack.difficulty}
              </span>
              <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-100 text-gray-600">
                {selectedTrack.trackType}
              </span>
            </div>
            <div className="text-xs text-gray-600">
              <strong>Strategy:</strong> {selectedTrack.strategy}
            </div>
          </div>
        </Card>
      )}

      <Card title="📊 Setup Analysis">
        <div className="space-y-4">
          {/* Performance Metrics */}
          <div>
            <h4 className="text-sm font-medium text-gray-900" style={{ marginTop: '-8px', marginBottom: '8px' }}>Performance Impact</h4>
            <PerformanceBar label="Cornering Grip" value={feedback.corneringGrip} color="bg-green-500" />
            <PerformanceBar label="Straight Line" value={feedback.straightLinePerf} color="bg-blue-500" />
            <PerformanceBar label="Tire Wear" value={feedback.tireWear} color="bg-red-500" />
          </div>

          {/* Explanation */}
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <div style={{ paddingLeft: '12px' }}>
              <p className="text-sm text-blue-800 mb-2 font-medium">
                {explanation.summary}
              </p>
              <ul className="text-xs text-blue-700 space-y-1">
                {explanation.effects.map((effect, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <div style={{ paddingLeft: '12px' }}>
              <h5 className="text-sm font-medium text-amber-800 mb-1">🎯 Track-Specific Advice</h5>
              <p className="text-xs text-amber-700">
                {explanation.recommendation}
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Current Values */}
      <Card title="📊 Current Values" subtitle="Key suspension parameters">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Front Camber:</span>
            <span className="font-mono ml-2 text-gray-900">{suspension.camberFront.toFixed(1)}°</span>
          </div>
          <div>
            <span className="text-gray-600">Rear Camber:</span>
            <span className="font-mono ml-2 text-gray-900">{suspension.camberRear.toFixed(1)}°</span>
          </div>
          <div>
            <span className="text-gray-600">Front Toe:</span>
            <span className="font-mono ml-2 text-gray-900">{suspension.toeFront.toFixed(2)}°</span>
          </div>
          <div>
            <span className="text-gray-600">Rear Toe:</span>
            <span className="font-mono ml-2 text-gray-900">{suspension.toeRear.toFixed(2)}°</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeedbackPanel;