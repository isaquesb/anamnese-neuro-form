interface YesNoFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  options?: [string, string];
}

export function YesNoField({ label, value, onChange, options = ['SIM', 'NÃO'] }: YesNoFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">{label}</label>
      <div className="flex gap-4">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`px-5 py-2 rounded-lg text-sm font-medium border transition-all cursor-pointer ${
              value === opt
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
