import { describe, it, expect, vi, beforeEach } from 'vitest';
import { exportJSON, importJSON } from './json-export';
import { defaultFormData } from './defaults';

describe('exportJSON', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('creates a download with correct filename', () => {
    const clickSpy = vi.fn();
    const createElementSpy = vi.spyOn(document, 'createElement').mockReturnValue({
      click: clickSpy,
      set href(_: string) {},
      set download(val: string) {
        (this as Record<string, string>)._download = val;
      },
      get download() {
        return (this as Record<string, string>)._download || '';
      },
    } as unknown as HTMLAnchorElement);

    const revokeURL = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => {});
    const createURL = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:test');

    const data = { ...defaultFormData, anamnese: { ...defaultFormData.anamnese, patientName: 'João Silva' } };
    exportJSON(data);

    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
    expect(createURL).toHaveBeenCalled();
    expect(revokeURL).toHaveBeenCalledWith('blob:test');
  });
});

describe('importJSON', () => {
  it('parses a valid JSON file', async () => {
    const json = JSON.stringify(defaultFormData);
    const file = new File([json], 'test.json', { type: 'application/json' });

    const result = await importJSON(file);
    expect(result).toEqual(defaultFormData);
  });

  it('rejects invalid JSON', async () => {
    const file = new File(['not json'], 'bad.json', { type: 'application/json' });

    await expect(importJSON(file)).rejects.toThrow('Arquivo JSON inválido');
  });

  it('parses a fully filled form correctly', async () => {
    const data = {
      ...defaultFormData,
      anamnese: {
        ...defaultFormData.anamnese,
        patientName: 'Ana Costa',
        birthDate: '1995-03-20',
        ageYearsMonths: '30 anos e 11 meses',
        education: 'Pós-graduação',
        gender: 'Feminino',
      },
    };
    const json = JSON.stringify(data);
    const file = new File([json], 'filled.json', { type: 'application/json' });

    const result = await importJSON(file);
    expect(result.anamnese.patientName).toBe('Ana Costa');
    expect(result.anamnese.education).toBe('Pós-graduação');
  });
});
