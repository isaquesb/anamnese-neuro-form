import { describe, it, expect, vi } from 'vitest';
import { generatePDF } from './pdf';
import { defaultFormData } from './defaults';

const mockSave = vi.fn();

vi.mock('jspdf', () => {
  return {
    default: vi.fn().mockImplementation(function () {
      return {
        setFont: vi.fn(),
        setFontSize: vi.fn(),
        setTextColor: vi.fn(),
        text: vi.fn(),
        getTextWidth: vi.fn().mockReturnValue(50),
        splitTextToSize: vi.fn((text: string) => [text]),
        addPage: vi.fn(),
        getNumberOfPages: vi.fn().mockReturnValue(1),
        setPage: vi.fn(),
        setDrawColor: vi.fn(),
        setFillColor: vi.fn(),
        roundedRect: vi.fn(),
        save: mockSave,
      };
    }),
  };
});

const filledAnamnese = {
  ...defaultFormData.anamnese,
  patientName: 'Teste',
  birthDate: '2000-01-01',
  ageYearsMonths: '25 anos',
  education: 'Superior',
  gender: 'Masculino',
};

describe('generatePDF', () => {
  it('generates a PDF without errors', () => {
    const data = { ...defaultFormData, anamnese: filledAnamnese };
    expect(() => generatePDF(data)).not.toThrow();
  });

  it('calls save with filename containing patient name', () => {
    mockSave.mockClear();
    const data = {
      ...defaultFormData,
      anamnese: { ...filledAnamnese, patientName: 'Maria Souza' },
    };
    generatePDF(data);
    expect(mockSave).toHaveBeenCalledWith(expect.stringContaining('maria_souza'));
  });

  it('generates PDF for fully filled form data', () => {
    const data = {
      anamnese: {
        ...filledAnamnese,
        patientName: 'Carlos Lima',
        hasSiblings: 'SIM' as const,
        siblingsCount: '2',
        dictionProblems: 'SIM' as const,
        dictionNotes: 'Troca de letras R e L',
        otherDiagnoses: 'SIM' as const,
        whichDiagnoses: 'TDAH',
        takesMedication: 'SIM' as const,
        whichMedication: 'Ritalina',
      },
      tdah: {
        ...defaultFormData.tdah,
        tdah1: 'Frequentemente' as const,
        tdah5: 'Muito frequentemente' as const,
      },
      tea: {
        ...defaultFormData.tea,
        tea1: 'Sim' as const,
        tea4: 'Sim' as const,
      },
    };
    expect(() => generatePDF(data)).not.toThrow();
  });
});
