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
          <h1 className="text-3xl font-bold text-[#1a365d]">Anamnese</h1>
          <p className="text-gray-500 mt-2">Formulário neuropsicológico</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={onStartNew}
            className="w-full flex items-center gap-4 px-6 py-5 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-600 group-hover:bg-blue-100 transition">
              <Plus size={24} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Nova Anamnese</p>
              <p className="text-sm text-gray-500">Iniciar um formulário em branco</p>
            </div>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-4 px-6 py-5 bg-white rounded-xl border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 text-green-600 group-hover:bg-green-100 transition">
              <Upload size={24} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-800">Importar JSON</p>
              <p className="text-sm text-gray-500">Carregar respostas de um arquivo salvo</p>
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
