import { useState, useEffect } from 'react';
import type { FullFormData, AnamneseData, TdahData, TeaData } from '../types/form';
import { headerQuestions, anamneseQuestions, tdahQuestions, tdahOptions, teaQuestions, teaSubSectionLabels } from '../data/questions';
import { TextField } from '../components/TextField';
import { YesNoField } from '../components/YesNoField';
import { RadioGroupField } from '../components/RadioGroupField';
import { SectionHeader } from '../components/SectionHeader';
import { StepIndicator } from '../components/StepIndicator';
import { calculateAge } from '../utils/age';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

interface FormPageProps {
  formData: FullFormData;
  setFormData: React.Dispatch<React.SetStateAction<FullFormData>>;
  validationErrors: Record<string, string>;
  onFinish: () => void;
  onBack: () => void;
}

const STEP_LABELS = ['Dados', 'Anamnese', 'TDAH', 'TEA'];

export function FormPage({ formData, setFormData, validationErrors, onFinish, onBack }: FormPageProps) {
  const [step, setStep] = useState(0);

  const updateAnamnese = (field: keyof AnamneseData, value: AnamneseData[keyof AnamneseData]) => {
    setFormData((prev) => ({
      ...prev,
      anamnese: { ...prev.anamnese, [field]: value },
    }));
  };

  const updateTdah = (field: keyof TdahData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      tdah: { ...prev.tdah, [field]: value },
    }));
  };

  const updateTea = (field: keyof TeaData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      tea: { ...prev.tea, [field]: value },
    }));
  };

  // Auto-calculate age when birthDate changes
  useEffect(() => {
    const birthDate = formData.anamnese.birthDate;
    const computed = calculateAge(birthDate);
    if (computed && computed !== formData.anamnese.ageYearsMonths) {
      updateAnamnese('ageYearsMonths', computed);
    }
  }, [formData.anamnese.birthDate]);

  const hasErrors = Object.keys(validationErrors).length > 0;

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <StepIndicator currentStep={step} totalSteps={4} labels={STEP_LABELS} />

      {hasErrors && step === 0 && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
          Por favor, preencha todos os campos obrigatórios marcados.
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 sm:p-8">
        {/* STEP 0: Header data */}
        {step === 0 && (
          <>
            <SectionHeader title="ANAMNESE" subtitle="Dados do avaliado" />
            {headerQuestions.map((q) => (
              <TextField
                key={q.id}
                label={q.label}
                type={q.type === 'date' ? 'date' : 'text'}
                value={(formData.anamnese as Record<string, string>)[q.fieldKey] || ''}
                onChange={(val) => updateAnamnese(q.fieldKey as keyof AnamneseData, val)}
                error={validationErrors[`anamnese.${q.fieldKey}`]}
                readOnly={q.fieldKey === 'ageYearsMonths' && !!formData.anamnese.birthDate}
              />
            ))}
          </>
        )}

        {/* STEP 1: Anamnese questions */}
        {step === 1 && (
          <>
            <SectionHeader title="ANAMNESE" subtitle="Histórico clínico e desenvolvimento" />
            {anamneseQuestions.map((q) => {
              // Handle conditional fields
              if (q.conditionalOn) {
                const parentVal = (formData.anamnese as Record<string, string>)[q.conditionalOn.field];
                if (parentVal !== q.conditionalOn.value) return null;
              }

              if (q.type === 'yesno') {
                return (
                  <YesNoField
                    key={q.id}
                    label={q.label}
                    value={(formData.anamnese as Record<string, string>)[q.fieldKey] || ''}
                    onChange={(val) => updateAnamnese(q.fieldKey as keyof AnamneseData, val)}
                  />
                );
              }

              if (q.type === 'radio') {
                return (
                  <RadioGroupField
                    key={q.id}
                    label={q.label}
                    value={(formData.anamnese as Record<string, string>)[q.fieldKey] || ''}
                    onChange={(val) => updateAnamnese(q.fieldKey as keyof AnamneseData, val)}
                    options={q.options!}
                  />
                );
              }

              return (
                <TextField
                  key={q.id}
                  label={q.label}
                  value={(formData.anamnese as Record<string, string>)[q.fieldKey] || ''}
                  onChange={(val) => updateAnamnese(q.fieldKey as keyof AnamneseData, val)}
                />
              );
            })}
          </>
        )}

        {/* STEP 2: TDAH */}
        {step === 2 && (
          <>
            <SectionHeader title="Rastreio para TDAH" />
            {tdahQuestions.map((q) => (
              <RadioGroupField
                key={q.id}
                label={q.label}
                number={q.number}
                value={(formData.tdah as Record<string, string>)[q.fieldKey] || ''}
                onChange={(val) => updateTdah(q.fieldKey as keyof TdahData, val)}
                options={tdahOptions}
              />
            ))}
          </>
        )}

        {/* STEP 3: TEA */}
        {step === 3 && (
          <>
            <SectionHeader title="Rastreio para TEA" />
            {(() => {
              let currentSub = '';
              return teaQuestions.map((q) => {
                const showSubHeader = q.subSection !== currentSub;
                if (showSubHeader) currentSub = q.subSection;
                return (
                  <div key={q.id}>
                    {showSubHeader && (
                      <h3 className="text-base font-bold text-[#1a365d] dark:text-blue-300 mt-6 mb-4 pb-2 border-b border-blue-50 dark:border-blue-900">
                        {teaSubSectionLabels[q.subSection]}
                      </h3>
                    )}
                    <YesNoField
                      label={`${q.number}. ${q.label}`}
                      value={(formData.tea as Record<string, string>)[q.fieldKey] || ''}
                      onChange={(val) => updateTea(q.fieldKey as keyof TeaData, val)}
                      options={['Sim', 'Não']}
                    />
                  </div>
                );
              });
            })()}
          </>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
          {step > 0 ? (
            <button
              type="button"
              onClick={prevStep}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer"
            >
              <ArrowLeft size={16} /> Voltar
            </button>
          ) : (
            <button
              type="button"
              onClick={onBack}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition cursor-pointer"
            >
              <ArrowLeft size={16} /> Início
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-sm cursor-pointer"
            >
              Próximo <ArrowRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              onClick={onFinish}
              className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition shadow-sm cursor-pointer"
            >
              <CheckCircle size={16} /> Revisar e Finalizar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
