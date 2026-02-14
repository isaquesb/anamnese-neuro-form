import { describe, it, expect } from 'vitest';
import { defaultFormData } from './defaults';
import { fullFormSchema } from '../types/form';

describe('defaultFormData', () => {
  it('fails full validation because required text fields are empty', () => {
    const result = fullFormSchema.safeParse(defaultFormData);
    expect(result.success).toBe(false);
  });

  it('has empty strings for required text fields', () => {
    expect(defaultFormData.anamnese.patientName).toBe('');
    expect(defaultFormData.anamnese.birthDate).toBe('');
    expect(defaultFormData.anamnese.ageYearsMonths).toBe('');
    expect(defaultFormData.anamnese.education).toBe('');
    expect(defaultFormData.anamnese.gender).toBe('');
  });

  it('has all TDAH fields set to empty string (unselected)', () => {
    for (const [, value] of Object.entries(defaultFormData.tdah)) {
      expect(value).toBe('');
    }
  });

  it('has all TEA fields set to empty string (unselected)', () => {
    for (const [, value] of Object.entries(defaultFormData.tea)) {
      expect(value).toBe('');
    }
  });

  it('has the 3 top-level sections', () => {
    expect(defaultFormData).toHaveProperty('anamnese');
    expect(defaultFormData).toHaveProperty('tdah');
    expect(defaultFormData).toHaveProperty('tea');
  });
});
