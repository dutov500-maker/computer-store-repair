interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const StepIndicator = ({ currentStep, totalSteps }: StepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
          <div key={s} className="flex items-center flex-1">
            <div
              className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                currentStep >= s
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {s}
            </div>
            {s < totalSteps && (
              <div
                className={`flex-1 h-1 mx-1 md:mx-2 transition-colors ${
                  currentStep > s ? 'bg-primary' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
