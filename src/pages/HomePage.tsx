import { useRef } from 'react';
import { FileText, Upload, Plus } from 'lucide-react';

interface HomePageProps {
  onStartNew: () => void;
  onImport: (file: File) => void;
}

export function HomePage({ onStartNew, onImport }: HomePageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = '';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 text-white mb-4">
            <FileText size={32} />
          </div>
          <h1 className="text-3xl font-bold text-[#1a365d] dark:text-blue-300">Anamnese</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Formulário neuropsicológico</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={onStartNew}
            className="w-full flex items-center gap-4 px-6 py-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50 transition">
              <Plus size={24} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800 dark:text-gray-100">Nova Anamnese</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Iniciar um formulário em branco</p>
            </div>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-4 px-6 py-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:bg-green-100 dark:group-hover:bg-green-900/50 transition">
              <Upload size={24} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800 dark:text-gray-100">Importar JSON</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">Carregar respostas de um arquivo salvo</p>
            </div>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
