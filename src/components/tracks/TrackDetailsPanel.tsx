import React from 'react';
import { Card, Button } from '../ui';
import { TrackCharacteristics } from '../../data/tracks';
import { useSetupStore } from '../../stores/setupStore';

interface TrackDetailsPanelProps {
  track: TrackCharacteristics;
  onApplySetup?: () => void;
}

const TrackDetailsPanel: React.FC<TrackDetailsPanelProps> = ({ track, onApplySetup }) => {
  const { applyTrackBasedSetup } = useSetupStore();

  const handleApplyRecommendations = () => {
    // Apply basic recommendations to the current setup
    applyTrackBasedSetup(track);
    onApplySetup?.();
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 border-green-200';
      case 'Intermediate': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Advanced': return 'text-orange-600 bg-orange-100 border-orange-200';
      case 'Expert': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getDownforceColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-blue-600 bg-blue-100 border-blue-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'High': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };


  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Power': return '🚀';
      case 'Technical': return '🎯';
      case 'Balanced': return '⚖️';
      case 'High-Speed': return '💨';
      default: return '🏁';
    }
  };

  return (
    <div className="space-y-6">
      {/* Track Overview */}
      <Card title={`${track.name} - Track Overview`} subtitle={`${track.country} | ${track.length.toFixed(1)}km`}>
        <div className="space-y-6">
          {/* Track Layout Image */}
          {track.imageUrl && (
            <div className="relative w-32 h-24 ml-auto">
              <img 
                src={track.imageUrl} 
                alt={`${track.name} circuit layout`}
                className="w-full h-full object-contain bg-gray-50 rounded border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer"
              />
            </div>
          )}

          {/* Basic Info and Badges */}
          <div className="flex flex-wrap items-center gap-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDownforceColor(track.downforceLevel)}`}>
              {track.downforceLevel} Downforce
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(track.difficulty)}`}>
              {track.difficulty}
            </span>
            <span className="flex items-center gap-2 text-lg">
              {getTypeIcon(track.trackType)} {track.trackType} Track
            </span>
          </div>

          {/* Track Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">{track.length.toFixed(1)}</div>
              <div className="text-sm text-gray-600">Kilometers</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">{track.corners}</div>
              <div className="text-sm text-gray-600">Corners</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">{track.elevation}</div>
              <div className="text-sm text-gray-600">Elevation</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">{track.trackType}</div>
              <div className="text-sm text-gray-600">Track Type</div>
            </div>
          </div>

          {/* Key Characteristics */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Track Characteristics</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {track.keyCharacteristics.map((characteristic, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-blue-500">•</span>
                  {characteristic}
                </div>
              ))}
            </div>
            {track.circuitInfoUrl && (
              <div className="mt-3 text-right">
                <a 
                  href={track.circuitInfoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  View on RacingCircuits.info →
                </a>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Strategy Overview */}
      <Card title="Track Strategy" subtitle="Overall approach for this circuit">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 leading-relaxed">{track.strategy}</p>
        </div>
      </Card>

      {/* Setup Recommendations */}
      <Card title="Setup Recommendations" subtitle="Optimal configuration for this track">
        <div className="space-y-6">
          {/* Quick Apply Button */}
          <div className="flex justify-between items-center p-4 bg-green-50 border border-green-200 rounded-lg">
            <div>
              <h4 className="font-medium text-green-800">Apply Track Setup</h4>
              <p className="text-sm text-green-600">Automatically configure your car for this track</p>
            </div>
            <Button onClick={handleApplyRecommendations} className="bg-green-600 hover:bg-green-700">
              Apply Setup
            </Button>
          </div>

          {/* Aerodynamics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <span className="text-blue-500">🛫</span> Aerodynamics
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Front Wing:</span>
                  <span className="font-medium text-blue-600">{track.setupRecommendations.aerodynamics.frontWing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Rear Wing:</span>
                  <span className="font-medium text-blue-600">{track.setupRecommendations.aerodynamics.rearWing}</span>
                </div>
                <div className="text-xs text-gray-600 border-t pt-2">
                  <strong>Priority:</strong> {track.setupRecommendations.aerodynamics.priority}
                </div>
              </div>
            </div>

            {/* Suspension */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <span className="text-purple-500">🔧</span> Suspension
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Springs:</span>
                  <span className="font-medium text-purple-600">{track.setupRecommendations.suspension.springs}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Dampers:</span>
                  <span className="font-medium text-purple-600">{track.setupRecommendations.suspension.dampers}</span>
                </div>
                <div className="text-xs text-gray-600 border-t pt-2">
                  <strong>Priority:</strong> {track.setupRecommendations.suspension.priority}
                </div>
              </div>
            </div>

            {/* Transmission */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <span className="text-green-500">⚙️</span> Transmission
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Gearing:</span>
                  <span className="font-medium text-green-600">{track.setupRecommendations.transmission.gearing}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Differential:</span>
                  <span className="font-medium text-green-600">{track.setupRecommendations.transmission.differential}</span>
                </div>
                <div className="text-xs text-gray-600 border-t pt-2">
                  <strong>Priority:</strong> {track.setupRecommendations.transmission.priority}
                </div>
              </div>
            </div>

            {/* Brakes */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900 flex items-center gap-2">
                <span className="text-red-500">🛑</span> Brakes
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Brake Bias:</span>
                  <span className="font-medium text-red-600">{track.setupRecommendations.brakes.bias}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Cooling:</span>
                  <span className="font-medium text-red-600">{track.setupRecommendations.brakes.cooling}</span>
                </div>
                <div className="text-xs text-gray-600 border-t pt-2">
                  <strong>Priority:</strong> {track.setupRecommendations.brakes.priority}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Track-Specific Tips */}
      <Card title="Track-Specific Setup Tips" subtitle="Advanced guidance for this circuit">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Aerodynamic Considerations</h4>
              <ul className="space-y-1 text-gray-600">
                {track.downforceLevel === 'Low' && (
                  <>
                    <li>• Minimize wing angles for straight-line speed</li>
                    <li>• Focus on drag reduction over cornering grip</li>
                    <li>• Consider ride height for ground effect</li>
                    <li>• Balance aero efficiency with stability</li>
                  </>
                )}
                {track.downforceLevel === 'Medium' && (
                  <>
                    <li>• Balance cornering grip with straight-line speed</li>
                    <li>• Adjust wings based on corner-to-straight ratio</li>
                    <li>• Consider track-specific balance needs</li>
                    <li>• Optimize for consistent lap times</li>
                  </>
                )}
                {track.downforceLevel === 'High' && (
                  <>
                    <li>• Maximize downforce for cornering performance</li>
                    <li>• Sacrifice straight-line speed for grip</li>
                    <li>• Focus on corner entry and exit stability</li>
                    <li>• Consider tire temperature management</li>
                  </>
                )}
              </ul>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Key Setup Priorities</h4>
              <ul className="space-y-1 text-gray-600">
                {track.trackType === 'Power' && (
                  <>
                    <li>• Optimize for maximum straight-line speed</li>
                    <li>• Setup for strong acceleration out of slow corners</li>
                    <li>• Minimize drag at all costs</li>
                    <li>• Consider brake cooling for high-speed stops</li>
                  </>
                )}
                {track.trackType === 'Technical' && (
                  <>
                    <li>• Prioritize cornering grip and precision</li>
                    <li>• Setup for consistency and predictability</li>
                    <li>• Focus on low-speed balance and rotation</li>
                    <li>• Consider tire wear management</li>
                  </>
                )}
                {track.trackType === 'Balanced' && (
                  <>
                    <li>• Find optimal compromise between all aspects</li>
                    <li>• Adjust based on personal driving style</li>
                    <li>• Focus on overall lap time consistency</li>
                    <li>• Consider race distance requirements</li>
                  </>
                )}
                {track.trackType === 'High-Speed' && (
                  <>
                    <li>• Setup for high-speed stability</li>
                    <li>• Balance low drag with sufficient downforce</li>
                    <li>• Consider elevation change handling</li>
                    <li>• Focus on confidence at speed</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrackDetailsPanel;