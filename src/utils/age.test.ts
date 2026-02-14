import { describe, it, expect, vi, afterEach } from 'vitest';
import { calculateAge } from './age';

describe('calculateAge', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns empty string for empty input', () => {
    expect(calculateAge('')).toBe('');
  });

  it('returns empty string for invalid date', () => {
    expect(calculateAge('not-a-date')).toBe('');
  });

  it('calculates years and months correctly', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T12:00:00'));
    expect(calculateAge('2000-01-15')).toBe('24 anos e 5 meses');
  });

  it('returns only years when months is 0', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-20T12:00:00'));
    expect(calculateAge('2000-01-15')).toBe('24 anos');
  });

  it('uses singular "ano" for 1 year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-06-15T12:00:00'));
    expect(calculateAge('2023-01-15')).toBe('1 ano e 5 meses');
  });

  it('uses singular "mês" for 1 month', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-02-20T12:00:00'));
    expect(calculateAge('2020-01-15')).toBe('4 anos e 1 mês');
  });

  it('returns empty string for future dates', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2024-01-15T12:00:00'));
    expect(calculateAge('2025-06-01')).toBe('');
  });
});
