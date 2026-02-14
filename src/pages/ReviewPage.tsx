import type { FullFormData } from '../types/form';
import { headerQuestions, anamneseQuestions, tdahQuestions, tdahOptions, teaQuestions, teaSubSectionLabels } from '../data/questions';
import { generatePDF } from '../utils/pdf';
import { exportJSON } from '../utils/json-export';
import { ArrowLeft, Download, FileJson, Home } from 'lucide-react';

interface ReviewPageProps {
  formData: FullFormData;
  onBack: () => void;
  onBackToHome: () => void;
}

function ReviewItem({ label, value, isText }: { label: string; value: string; isText?: boolean }) {
  return (
    <div className="py-3 border-b border-gray-50 last:border-0">
      <p className="text-sm font-semibold text-gray-800">{label}</p>
      {isText ? (
        <div className="mt-1 px-3 py-2 bg-slate-50 rounded-lg border border-gray-100">
          <p className="text-sm text-blue-700">{value || '\u2014'}</p>
        </div>
      ) : (
        <p className="text-sm text-blue-700 mt-0.5">{value || '\u2014'}</p>
      )}
    </div>
  );
}

export function ReviewPage({ formData, onBack, onBackToHome }: ReviewPageProps) {
  const anamnese = formData.anamnese as Record<string, string>;
  const tdah = formData.tdah as Record<string, string>;
  const tea = formData.tea as Record<string, string>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-[#1a365d]">Revisão das Respostas</h1>
        <p className="text-gray-500 text-sm mt-1">Confira todas as respostas antes de exportar</p>
      </div>

      {/* Header data */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-[#1a365d] mb-4 pb-2 border-b-2 border-blue-100">
          Dados do Avaliado
        </h2>
        {headerQuestions.map((q) => (
          <ReviewItem key={q.id} label={q.label} value={anamnese[q.fieldKey]} />
        ))}
      </div>

      {/* Anamnese */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-[#1a365d] mb-4 pb-2 border-b-2 border-blue-100">
          Anamnese
        </h2>
        {anamneseQuestions.map((q) => {
          if (q.conditionalOn) {
            const parentVal = anamnese[q.conditionalOn.field];
            if (parentVal !== q.conditionalOn.value) return null;
          }
          return (
            <ReviewItem
              key={q.id}
              label={q.label}
              value={anamnese[q.fieldKey]}
              isText={q.type === 'text' || q.type === 'conditional-text'}
            />
          );
        })}
      </div>

      {/* TDAH */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-[#1a365d] mb-4 pb-2 border-b-2 border-blue-100">
          Rastreio para TDAH
        </h2>
        {tdahQuestions.map((q) => (
          <div key={q.id} className="py-3 border-b border-gray-50 last:border-0">
            <p className="text-sm font-semibold text-gray-800">
              <span className="text-blue-700 mr-1">{q.number}.</span>
              {q.label}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              {tdahOptions.map((opt) => (
                <span
                  key={opt}
                  className={`text-xs px-3 py-1 rounded-full ${
                    tdah[q.fieldKey] === opt
                      ? 'bg-blue-100 text-blue-800 font-semibold border border-blue-300'
                      : 'bg-gray-50 text-gray-400 border border-gray-100'
                  }`}
                >
                  {opt}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* TEA */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-bold text-[#1a365d] mb-4 pb-2 border-b-2 border-blue-100">
          Rastreio para TEA
        </h2>
        {(() => {
          let currentSub = '';
          return teaQuestions.map((q) => {
            const showSubHeader = q.subSection !== currentSub;
            if (showSubHeader) currentSub = q.subSection;
            return (
              <div key={q.id}>
                {showSubHeader && (
                  <h3 className="text-sm font-bold text-[#1a365d] mt-4 mb-2 pb-1 border-b border-blue-50">
                    {teaSubSectionLabels[q.subSection]}
                  </h3>
                )}
                <ReviewItem
                  label={`${q.number}. ${q.label}`}
                  value={tea[q.fieldKey]}
                />
              </div>
            );
          });
        })()}
      </div>

      {/* Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-bold text-[#1a365d] mb-4">Exportar</h2>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => generatePDF(formData)}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition shadow-sm cursor-pointer"
          >
            <Download size={18} /> Baixar PDF
          </button>
          <button
            onClick={() => exportJSON(formData)}
            className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition shadow-sm cursor-pointer"
          >
            <FileJson size={18} /> Exportar JSON
          </button>
        </div>

        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
          >
            <ArrowLeft size={16} /> Editar Respostas
          </button>
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition cursor-pointer"
          >
            <Home size={16} /> Início
          </button>
        </div>
      </div>
    </div>
  );
}
