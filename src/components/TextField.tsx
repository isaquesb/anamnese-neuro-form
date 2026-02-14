interface TextFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  type?: 'text' | 'date';
  error?: string;
}

export function TextField({ label, value, onChange, type = 'text', error }: TextFieldProps) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-semibold text-gray-800 mb-1">
        {label}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`mt-1 block w-full px-4 py-2.5 rounded-lg border bg-white text-gray-800 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ${
            error ? 'border-red-400' : 'border-gray-300'
          }`}
        />
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
