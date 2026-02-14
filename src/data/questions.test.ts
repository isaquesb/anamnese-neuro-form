import { describe, it, expect } from 'vitest';
import {
  headerQuestions,
  anamneseQuestions,
  tdahQuestions,
  tdahOptions,
  teaQuestions,
  teaSubSectionLabels,
} from './questions';

describe('headerQuestions', () => {
  it('has 6 header fields', () => {
    expect(headerQuestions).toHaveLength(6);
  });

  it('includes patientName, birthDate, ageYearsMonths, education, referralProfessional, gender', () => {
    const keys = headerQuestions.map((q) => q.fieldKey);
    expect(keys).toEqual([
      'patientName',
      'birthDate',
      'ageYearsMonths',
      'education',
      'referralProfessional',
      'gender',
    ]);
  });

  it('has unique ids', () => {
    const ids = headerQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe('anamneseQuestions', () => {
  it('has questions covering all expected topics', () => {
    expect(anamneseQuestions.length).toBeGreaterThan(30);
  });

  it('has unique ids', () => {
    const ids = anamneseQuestions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has unique fieldKeys', () => {
    const keys = anamneseQuestions.map((q) => q.fieldKey);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('all conditional-text fields reference a valid parent field', () => {
    const allKeys = new Set(anamneseQuestions.map((q) => q.fieldKey));
    const conditional = anamneseQuestions.filter((q) => q.type === 'conditional-text');
    for (const q of conditional) {
      expect(q.conditionalOn).toBeDefined();
      expect(allKeys.has(q.conditionalOn!.field)).toBe(true);
    }
  });

  it('conditional fields appear after their parent', () => {
    for (let i = 0; i < anamneseQuestions.length; i++) {
      const q = anamneseQuestions[i];
      if (q.conditionalOn) {
        const parentIdx = anamneseQuestions.findIndex((p) => p.fieldKey === q.conditionalOn!.field);
        expect(parentIdx).toBeLessThan(i);
      }
    }
  });

  it('all radio questions have options defined', () => {
    const radios = anamneseQuestions.filter((q) => q.type === 'radio');
    for (const q of radios) {
      expect(q.options).toBeDefined();
      expect(q.options!.length).toBeGreaterThanOrEqual(2);
    }
  });
});

describe('tdahQuestions', () => {
  it('has exactly 14 questions', () => {
    expect(tdahQuestions).toHaveLength(14);
  });

  it('questions are numbered 1-14 in order', () => {
    tdahQuestions.forEach((q, idx) => {
      expect(q.number).toBe(idx + 1);
    });
  });

  it('has unique fieldKeys matching tdah1..tdah14', () => {
    tdahQuestions.forEach((q, idx) => {
      expect(q.fieldKey).toBe(`tdah${idx + 1}`);
    });
  });
});

describe('tdahOptions', () => {
  it('has 4 frequency options', () => {
    expect(tdahOptions).toHaveLength(4);
  });

  it('starts with lowest frequency and ends with highest', () => {
    expect(tdahOptions[0]).toBe('Nunca / Raramente');
    expect(tdahOptions[3]).toBe('Muito frequentemente');
  });
});

describe('teaQuestions', () => {
  it('has exactly 12 questions', () => {
    expect(teaQuestions).toHaveLength(12);
  });

  it('questions are numbered 1-12 in order', () => {
    teaQuestions.forEach((q, idx) => {
      expect(q.number).toBe(idx + 1);
    });
  });

  it('covers all 3 sub-sections A, B, C', () => {
    const subs = new Set(teaQuestions.map((q) => q.subSection));
    expect(subs).toEqual(new Set(['A', 'B', 'C']));
  });

  it('sub-sections appear in order A → B → C', () => {
    let lastSub = 'A';
    for (const q of teaQuestions) {
      expect(q.subSection >= lastSub).toBe(true);
      lastSub = q.subSection;
    }
  });

  it('section A has 5 questions (1-5)', () => {
    const sectionA = teaQuestions.filter((q) => q.subSection === 'A');
    expect(sectionA).toHaveLength(5);
  });

  it('section B has 5 questions (6-10)', () => {
    const sectionB = teaQuestions.filter((q) => q.subSection === 'B');
    expect(sectionB).toHaveLength(5);
  });

  it('section C has 2 questions (11-12)', () => {
    const sectionC = teaQuestions.filter((q) => q.subSection === 'C');
    expect(sectionC).toHaveLength(2);
  });
});

describe('teaSubSectionLabels', () => {
  it('has labels for A, B, C', () => {
    expect(Object.keys(teaSubSectionLabels)).toEqual(['A', 'B', 'C']);
  });

  it('labels contain Portuguese descriptions', () => {
    expect(teaSubSectionLabels.A).toContain('comunicação social');
    expect(teaSubSectionLabels.B).toContain('Comportamentos repetitivos');
    expect(teaSubSectionLabels.C).toContain('Desenvolvimento');
  });
});
