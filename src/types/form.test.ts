import { describe, it, expect } from 'vitest';
import { fullFormSchema, anamneseSchema, tdahSchema, teaSchema } from './form';
import { defaultFormData } from '../utils/defaults';

const validAnamnese = {
  ...defaultFormData.anamnese,
  patientName: 'Maria Silva',
  birthDate: '1990-05-15',
  ageYearsMonths: '35 anos e 9 meses',
  education: 'Ensino Superior',
  gender: 'Feminino',
};

describe('anamneseSchema', () => {
  it('validates a complete anamnese with required fields filled', () => {
    const result = anamneseSchema.safeParse(validAnamnese);
    expect(result.success).toBe(true);
  });

  it('fails when patientName is empty', () => {
    const data = { ...validAnamnese, patientName: '' };
    const result = anamneseSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('fails when birthDate is empty', () => {
    const data = { ...validAnamnese, birthDate: '' };
    const result = anamneseSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('fails when education is empty', () => {
    const data = { ...validAnamnese, education: '' };
    const result = anamneseSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('fails when gender is empty', () => {
    const data = { ...validAnamnese, gender: '' };
    const result = anamneseSchema.safeParse(data);
    expect(result.success).toBe(false);
  });

  it('accepts SIM and NÃO for enum fields', () => {
    const sim = anamneseSchema.safeParse({ ...validAnamnese, plannedPregnancy: 'SIM' });
    const nao = anamneseSchema.safeParse({ ...validAnamnese, plannedPregnancy: 'NÃO' });
    expect(sim.success).toBe(true);
    expect(nao.success).toBe(true);
  });

  it('uses catch default for invalid enum value', () => {
    const data = { ...validAnamnese, plannedPregnancy: 'INVALID' };
    const result = anamneseSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.plannedPregnancy).toBe('');
    }
  });

  it('allows optional fields to be empty', () => {
    const data = { ...validAnamnese, referralProfessional: '', siblingsCount: '' };
    const result = anamneseSchema.safeParse(data);
    expect(result.success).toBe(true);
  });
});

describe('tdahSchema', () => {
  it('validates a complete TDAH object', () => {
    const result = tdahSchema.safeParse(defaultFormData.tdah);
    expect(result.success).toBe(true);
  });

  it('accepts all valid frequency options', () => {
    const options = ['Nunca / Raramente', 'Algumas vezes', 'Frequentemente', 'Muito frequentemente'];
    for (const opt of options) {
      const data = { ...defaultFormData.tdah, tdah1: opt };
      const result = tdahSchema.safeParse(data);
      expect(result.success).toBe(true);
    }
  });

  it('uses catch default for invalid frequency value', () => {
    const data = { ...defaultFormData.tdah, tdah1: 'INVALID' };
    const result = tdahSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tdah1).toBe('');
    }
  });

  it('validates all 14 TDAH questions exist', () => {
    const keys = Object.keys(defaultFormData.tdah);
    expect(keys).toHaveLength(14);
    for (let i = 1; i <= 14; i++) {
      expect(keys).toContain(`tdah${i}`);
    }
  });
});

describe('teaSchema', () => {
  it('validates a complete TEA object', () => {
    const result = teaSchema.safeParse(defaultFormData.tea);
    expect(result.success).toBe(true);
  });

  it('accepts Sim and Não values', () => {
    const sim = teaSchema.safeParse({ ...defaultFormData.tea, tea1: 'Sim' });
    const nao = teaSchema.safeParse({ ...defaultFormData.tea, tea1: 'Não' });
    expect(sim.success).toBe(true);
    expect(nao.success).toBe(true);
  });

  it('uses catch default for invalid value', () => {
    const data = { ...defaultFormData.tea, tea1: 'INVALID' };
    const result = teaSchema.safeParse(data);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tea1).toBe('');
    }
  });

  it('validates all 12 TEA questions exist', () => {
    const keys = Object.keys(defaultFormData.tea);
    expect(keys).toHaveLength(12);
    for (let i = 1; i <= 12; i++) {
      expect(keys).toContain(`tea${i}`);
    }
  });
});

describe('fullFormSchema', () => {
  it('validates a fully filled form', () => {
    const filledData = {
      anamnese: validAnamnese,
      tdah: defaultFormData.tdah,
      tea: defaultFormData.tea,
    };
    const result = fullFormSchema.safeParse(filledData);
    expect(result.success).toBe(true);
  });

  it('fails when anamnese is missing', () => {
    const result = fullFormSchema.safeParse({ tdah: defaultFormData.tdah, tea: defaultFormData.tea });
    expect(result.success).toBe(false);
  });

  it('fails when tdah is missing', () => {
    const result = fullFormSchema.safeParse({ anamnese: validAnamnese, tea: defaultFormData.tea });
    expect(result.success).toBe(false);
  });

  it('fails when tea is missing', () => {
    const result = fullFormSchema.safeParse({ anamnese: validAnamnese, tdah: defaultFormData.tdah });
    expect(result.success).toBe(false);
  });

  it('fails when required text fields are empty', () => {
    const result = fullFormSchema.safeParse(defaultFormData);
    expect(result.success).toBe(false);
  });
});
