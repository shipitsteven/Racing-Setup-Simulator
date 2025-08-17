import React, { useState } from 'react';
import { Card, Button } from '../ui';
import { TrackCharacteristics } from '../../data/tracks';
import { useUIStore } from '../../stores/uiStore';
import TrackSelector from './TrackSelector';
import TrackDetailsPanel from './TrackDetailsPanel';

const TracksPanel: React.FC = () => {
  const [selectedTrack, setSelectedTrack] = useState<TrackCharacteristics | null>(null);
  const [showSetupApplied, setShowSetupApplied] = useState(false);
  const { setSelectedTrack: setGlobalSelectedTrack } = useUIStore();

  const handleTrackSelect = (track: TrackCharacteristics) => {
    setSelectedTrack(track);
    setGlobalSelectedTrack(track); // Set in global store for feedback panel
    setShowSetupApplied(false);
  };

  const handleSetupApplied = () => {
    setShowSetupApplied(true);
    setTimeout(() => setShowSetupApplied(false), 3000);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Track Selection & Setup</h2>
          <p className="text-gray-600 mt-1">
            Choose a track and get optimized setup recommendations for AC and ACC
          </p>
        </div>
        {selectedTrack && (
          <Button 
            variant="outline" 
            onClick={() => setSelectedTrack(null)}
            className="flex items-center gap-2"
          >
            ← Back to Track List
          </Button>
        )}
      </div>

      {/* Success Message */}
      {showSetupApplied && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-green-600">✅</span>
            <div>
              <h4 className="font-medium text-green-800">Setup Applied Successfully!</h4>
              <p className="text-sm text-green-600">
                Your car has been configured with {selectedTrack?.name} recommendations. 
                Check the setup tabs to see the changes.
              </p>
            </div>
          </div>
        </div>
      )}

      {!selectedTrack ? (
        /* Track Selection View */
        <TrackSelector 
          onTrackSelect={handleTrackSelect}
          selectedTrack={selectedTrack || undefined}
        />
      ) : (
        /* Track Details View */
        <TrackDetailsPanel 
          track={selectedTrack} 
          onApplySetup={handleSetupApplied}
        />
      )}
    </div>
  );
};

export default TracksPanel;