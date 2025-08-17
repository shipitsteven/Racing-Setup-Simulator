import React, { useState, useMemo } from 'react';
import { Card, Button } from '../ui';
import { trackDatabase, TrackCharacteristics, getTracksByDownforce, getTracksByDifficulty } from '../../data/tracks';

interface TrackSelectorProps {
  onTrackSelect: (track: TrackCharacteristics) => void;
  selectedTrack?: TrackCharacteristics;
}

const TrackSelector: React.FC<TrackSelectorProps> = ({ onTrackSelect, selectedTrack }) => {
  const [downforceFilter, setDownforceFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'>('All');
  const [quickSelectTrack, setQuickSelectTrack] = useState('');

  const filteredTracks = useMemo(() => {
    let tracks = trackDatabase;

    if (downforceFilter !== 'All') {
      tracks = tracks.filter(track => track.downforceLevel === downforceFilter);
    }

    if (difficultyFilter !== 'All') {
      tracks = tracks.filter(track => track.difficulty === difficultyFilter);
    }


    return tracks.sort((a, b) => a.name.localeCompare(b.name));
  }, [downforceFilter, difficultyFilter]);



  const handleQuickSelect = (trackId: string) => {
    const track = trackDatabase.find(t => t.id === trackId);
    if (track) {
      onTrackSelect(track);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100';
      case 'Intermediate': return 'text-blue-600 bg-blue-100';
      case 'Advanced': return 'text-orange-600 bg-orange-100';
      case 'Expert': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDownforceColor = (level: string) => {
    switch (level) {
      case 'Low': return 'text-blue-600 bg-blue-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrackTypeIcon = (type: string) => {
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
      {/* Track Selection and Filters */}
      <Card title="Track Selection" subtitle="Quick select and filter tracks">
        <div className="space-y-4">
          {/* Quick Select Dropdown */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Quick Select Track</label>
            <select 
              value={quickSelectTrack} 
              onChange={(e) => {
                setQuickSelectTrack(e.target.value);
                if (e.target.value) {
                  handleQuickSelect(e.target.value);
                }
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a track...</option>
              {trackDatabase.map((track) => (
                <option key={track.id} value={track.id}>
                  {track.name} ({track.country}) - {track.downforceLevel} DF
                </option>
              ))}
            </select>
          </div>
          {/* Filter Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Downforce Level</label>
              <select 
                value={downforceFilter} 
                onChange={(e) => setDownforceFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Levels</option>
                <option value="Low">Low Downforce</option>
                <option value="Medium">Medium Downforce</option>
                <option value="High">High Downforce</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Difficulty</label>
              <select 
                value={difficultyFilter} 
                onChange={(e) => setDifficultyFilter(e.target.value as any)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="All">All Difficulties</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="text-sm text-gray-600">
            Showing {filteredTracks.length} of {trackDatabase.length} tracks
          </div>
        </div>
      </Card>

      {/* Track Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTracks.map((track) => (
          <Card key={track.id} className="h-full">
            <div
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                selectedTrack?.id === track.id 
                  ? 'bg-blue-50 ring-2 ring-blue-500 ring-inset' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onTrackSelect(track)}
            >
              {/* Track Image (if available) */}
              {track.imageUrl && (
                <div className="mb-3 relative group">
                  <img 
                    src={track.imageUrl} 
                    alt={`${track.name} circuit layout`}
                    className="w-full h-24 object-contain bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors"
                  />
                  {track.circuitInfoUrl && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a 
                        href={track.circuitInfoUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs bg-black bg-opacity-50 text-white px-2 py-1 rounded hover:bg-opacity-70 transition-all"
                      >
                        View on RacingCircuits.info ↗
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Track Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-xl leading-tight">{track.name}</h3>
                  <p className="text-base text-gray-600">{track.country}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{getTrackTypeIcon(track.trackType)}</span>
                    <span className="text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full font-medium">
                      {track.trackType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Track Stats */}
              <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Length:</span>
                  <span className="font-medium">{track.length.toFixed(1)}km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Corners:</span>
                  <span className="font-medium">{track.corners}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Elevation:</span>
                  <span className="font-medium">{track.elevation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{track.trackType}</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-3">
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${getDownforceColor(track.downforceLevel)}`}>
                  {track.downforceLevel} DF
                </span>
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${getDifficultyColor(track.difficulty)}`}>
                  {track.difficulty}
                </span>
              </div>

              {/* Quick Setup Hint */}
              <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                <strong>Setup Focus:</strong> {track.setupRecommendations.aerodynamics.priority}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* No results */}
      {filteredTracks.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🏁</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No tracks found</h3>
          <p className="text-gray-600">Try adjusting your filters or search terms</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setDownforceFilter('All');
              setDifficultyFilter('All');
              setQuickSelectTrack('');
            }}
            className="mt-4"
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default TrackSelector;