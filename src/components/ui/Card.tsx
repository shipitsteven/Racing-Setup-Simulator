import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  actions,
  className,
  onClick,
  ...props
}) => {
  const isClickable = !!onClick;
  
  return (
    <div
      className={clsx(
        'card px-4 py-4',
        isClickable && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      onClick={onClick}
      {...props}
    >
      {(title || subtitle || actions) && (
        <div className="flex items-start justify-between mb-2">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600">
                {subtitle}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2 ml-4">
              {actions}
            </div>
          )}
        </div>
      )}
      
      <div className="space-y-2" style={{ paddingBottom: '24px' }}>
        {children}
      </div>
    </div>
  );
};

export default Card;