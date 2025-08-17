import React from 'react';
import { useUIStore } from '../../stores/uiStore';
import TracksPanel from '../tracks/TracksPanel';
import SuspensionPanel from '../setup/SuspensionPanel';
import TiresPanel from '../setup/TiresPanel';
import AerodynamicsPanel from '../setup/AerodynamicsPanel';
import BrakesPanel from '../setup/BrakesPanel';
import TransmissionPanel from '../setup/TransmissionPanel';
import BallastPanel from '../setup/BallastPanel';
import FeedbackPanel from '../feedback/FeedbackPanel';

const MainContent: React.FC = () => {
  const { activeTab } = useUIStore();

  const renderActivePanel = () => {
    switch (activeTab) {
      case 'tracks':
        return <TracksPanel />;
      case 'suspension':
        return <SuspensionPanel />;
      case 'aerodynamics':
        return <AerodynamicsPanel />;
      case 'tires':
        return <TiresPanel />;
      case 'brakes':
        return <BrakesPanel />;
      case 'transmission':
        return <TransmissionPanel />;
      case 'ballast':
        return <BallastPanel />;
      default:
        return <TracksPanel />;
    }
  };

  return (
    <main className="flex-1 flex">
      {/* Main Setup Panel */}
      <div className="flex-1 bg-white overflow-auto">
        {renderActivePanel()}
      </div>

      {/* Right Panel - Feedback (always visible but sticky) */}
      <div style={{ width: '450px' }} className="bg-gray-50 border-l border-gray-200 flex-shrink-0">
        {/* Sticky Feedback Panel */}
        <div className="sticky top-0 h-screen overflow-y-auto p-4">
          <FeedbackPanel />
        </div>
      </div>
    </main>
  );
};

export default MainContent;