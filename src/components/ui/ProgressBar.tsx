import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="mb-6">
      <div className="mb-2 flex justify-between text-sm text-gray-600">
        <span>Application Progress</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-gold to-amber-500 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="mt-2 flex justify-between">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div 
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs
                ${index + 1 <= currentStep ? 'bg-gold text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              {index + 1}
            </div>
            {index < totalSteps - 1 && (
              <div className="hidden md:block text-xs mt-1 font-light text-gray-500">
                {index === 0 && 'Personal'}
                {index === 1 && 'Professional'}
                {index === 2 && 'Skills'}
                {index === 3 && 'References'}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;