interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: 'text' | 'date';
  error?: string;
  readOnly?: boolean;
}

export function TextField({ label, value, onChange, type = 'text', error, readOnly }: TextFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">
        {label}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readOnly}
          className={`mt-1 block w-full px-4 py-2.5 rounded-lg border bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
            error ? 'border-red-400' : 'border-gray-300 dark:border-gray-600'
          } ${readOnly ? 'bg-gray-50 dark:bg-gray-700 cursor-not-allowed' : ''}`}
        />
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
