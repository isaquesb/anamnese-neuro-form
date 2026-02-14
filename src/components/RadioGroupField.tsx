interface RadioGroupFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  number?: number;
}

export function RadioGroupField({ label, value, onChange, options, number }: RadioGroupFieldProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
        {number !== undefined && <span className="text-blue-700 dark:text-blue-400 mr-1">{number}.</span>}
        {label}
      </label>
      <div className="flex flex-col gap-2 pl-2">
        {options.map((opt) => (
          <label
            key={opt}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border cursor-pointer transition-all text-sm ${
              value === opt
                ? 'bg-blue-50 dark:bg-blue-900/30 border-blue-400 text-blue-800 dark:text-blue-300 font-medium'
                : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-blue-300'
            }`}
          >
            <input
              type="radio"
              checked={value === opt}
              onChange={() => onChange(opt)}
              className="accent-blue-600"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
