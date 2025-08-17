import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { getParameterFeedback } from '../../utils/parameterFeedback';

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
  unit: string;
  disabled?: boolean;
  tooltip?: string;
  className?: string;
  parameterKey?: string; // For real-time feedback
}

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  step,
  unit,
  disabled = false,
  tooltip,
  className,
  parameterKey,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const sliderRef = useRef<HTMLInputElement>(null);
  
  const percentage = ((value - min) / (max - min)) * 100;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    onChange(newValue);
  };
  
  const handleMouseDown = () => {
    setIsDragging(true);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);
  
  const formatValue = (val: number) => {
    if (step < 1) {
      return val.toFixed(1);
    }
    return Math.round(val).toString();
  };
  
  return (
    <div className={clsx('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex-1">
          <label className="text-sm font-medium text-gray-700">
            {label}
          </label>
          {tooltip && (
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">
              {tooltip}
            </p>
          )}
        </div>
        <span className="text-sm font-mono text-gray-600 bg-gray-100 px-2 py-1 rounded ml-4">
          {formatValue(value)}{unit}
        </span>
      </div>
      
      <div className="relative">
        <input
          ref={sliderRef}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          disabled={disabled}
          className={clsx(
            'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            isDragging && 'ring-2 ring-primary-500 ring-offset-2'
          )}
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
        />
        
        {/* Custom thumb styling */}
        <style>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
          }
          
          input[type="range"]::-webkit-slider-thumb:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
          }
          
          input[type="range"]::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #3b82f6;
            cursor: pointer;
            border: 2px solid white;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
          }
          
          input[type="range"]:disabled::-webkit-slider-thumb {
            background: #9ca3af;
            cursor: not-allowed;
          }
          
          input[type="range"]:disabled::-moz-range-thumb {
            background: #9ca3af;
            cursor: not-allowed;
          }
        `}</style>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>{formatValue(min)}{unit}</span>
        <span>{formatValue(max)}{unit}</span>
      </div>
      
      {/* Real-time parameter feedback */}
      {parameterKey && (
        <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 font-medium leading-relaxed">
            💡 {getParameterFeedback(parameterKey, value)}
          </p>
        </div>
      )}
    </div>
  );
};

export default Slider;