interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels: string[];
}

export function StepIndicator({ currentStep, totalSteps, labels }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: totalSteps }, (_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                i < currentStep
                  ? 'bg-green-500 text-white'
                  : i === currentStep
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-400'
              }`}
            >
              {i < currentStep ? '\u2713' : i + 1}
            </div>
            <span className={`text-xs mt-1 hidden sm:block ${i === currentStep ? 'text-blue-700 font-semibold' : 'text-gray-400'}`}>
              {labels[i]}
            </span>
          </div>
          {i < totalSteps - 1 && (
            <div className={`w-8 h-0.5 ${i < currentStep ? 'bg-green-400' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );
}
