interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6 pb-3 border-b-2 border-blue-100 dark:border-blue-900">
      <h2 className="text-xl font-bold text-[#1a365d] dark:text-blue-300">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
    </div>
  );
}
