import React from 'react';
import { Car, Undo, Redo } from 'lucide-react';
import { Button } from '../ui';
import { useSetupStore } from '../../stores/setupStore';
import { useUIStore } from '../../stores/uiStore';

const Header: React.FC = () => {
  const { carType, canUndo, canRedo, undo, redo, saveSetup } = useSetupStore();
  const { addNotification } = useUIStore();

  const handleSave = () => {
    const name = prompt('Enter setup name:');
    if (name) {
      saveSetup(name);
      addNotification({
        type: 'success',
        title: 'Setup Saved',
        message: `"${name}" has been saved to your presets.`,
      });
    }
  };

  const handleUndo = () => {
    if (canUndo()) {
      undo();
      addNotification({
        type: 'info',
        title: 'Undone',
        message: 'Reverted to previous setup.',
        duration: 2000,
      });
    }
  };

  const handleRedo = () => {
    if (canRedo()) {
      redo();
      addNotification({
        type: 'info',
        title: 'Redone',
        message: 'Applied next setup change.',
        duration: 2000,
      });
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary-600 rounded-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Racing Setup Simulator
              </h1>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleUndo}
              disabled={!canUndo()}
            >
              <Undo className="w-4 h-4" />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRedo}
              disabled={!canRedo()}
            >
              <Redo className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;