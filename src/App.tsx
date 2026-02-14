import { useState, useCallback, useEffect } from 'react';
import type { FullFormData } from './types/form';
import { fullFormSchema } from './types/form';
import { defaultFormData } from './utils/defaults';
import { importJSON } from './utils/json-export';
import { HomePage } from './pages/HomePage';
import { FormPage } from './pages/FormPage';
import { ReviewPage } from './pages/ReviewPage';

type AppScreen = 'home' | 'form' | 'review';

const STORAGE_KEY = 'form-neuro-data';
const SCREEN_KEY = 'form-neuro-screen';

function loadSavedData(): { data: FullFormData; screen: AppScreen } | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    const screen = sessionStorage.getItem(SCREEN_KEY) as AppScreen | null;
    if (raw) {
      const parsed = JSON.parse(raw);
      const result = fullFormSchema.safeParse(parsed);
      if (result.success) {
        return { data: result.data, screen: screen || 'form' };
      }
    }
  } catch { /* ignore */ }
  return null;
}

function App() {
  const saved = loadSavedData();
  const [screen, setScreen] = useState<AppScreen>(saved?.screen || 'home');
  const [formData, setFormData] = useState<FullFormData>(saved?.data || structuredClone(defaultFormData));
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Auto-save to sessionStorage
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    sessionStorage.setItem(SCREEN_KEY, screen);
  }, [screen]);

  const handleImport = useCallback(async (file: File) => {
    try {
      const data = await importJSON(file);
      const result = fullFormSchema.safeParse(data);
      if (result.success) {
        setFormData(result.data);
        setScreen('form');
      } else {
        alert('O arquivo JSON não possui o formato esperado. Verifique e tente novamente.');
      }
    } catch {
      alert('Erro ao importar o arquivo JSON.');
    }
  }, []);

  const handleStartNew = useCallback(() => {
    setFormData(structuredClone(defaultFormData));
    setValidationErrors({});
    setScreen('form');
  }, []);

  const handleFinishForm = useCallback(() => {
    const result = fullFormSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path.join('.');
        errors[path] = issue.message;
      }
      setValidationErrors(errors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setValidationErrors({});
    setScreen('review');
  }, [formData]);

  const handleBackToForm = useCallback(() => {
    setScreen('form');
  }, []);

  const handleBackToHome = useCallback(() => {
    sessionStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(SCREEN_KEY);
    setScreen('home');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {screen === 'home' && (
        <HomePage onStartNew={handleStartNew} onImport={handleImport} />
      )}
      {screen === 'form' && (
        <FormPage
          formData={formData}
          setFormData={setFormData}
          validationErrors={validationErrors}
          onFinish={handleFinishForm}
          onBack={handleBackToHome}
        />
      )}
      {screen === 'review' && (
        <ReviewPage
          formData={formData}
          onBack={handleBackToForm}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;
