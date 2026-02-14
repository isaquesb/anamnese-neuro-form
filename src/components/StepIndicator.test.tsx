import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StepIndicator } from './StepIndicator';

describe('StepIndicator', () => {
  const labels = ['Dados', 'Anamnese', 'TDAH', 'TEA'];

  it('renders all step numbers', () => {
    render(<StepIndicator currentStep={0} totalSteps={4} labels={labels} />);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('4')).toBeInTheDocument();
  });

  it('shows checkmark for completed steps', () => {
    render(<StepIndicator currentStep={2} totalSteps={4} labels={labels} />);
    // Steps 0 and 1 are completed (before current step 2)
    const checkmarks = screen.getAllByText('\u2713');
    expect(checkmarks).toHaveLength(2);
  });

  it('highlights current step label', () => {
    render(<StepIndicator currentStep={1} totalSteps={4} labels={labels} />);
    const anamneseLabel = screen.getByText('Anamnese');
    expect(anamneseLabel.className).toContain('text-blue-700');
  });
});
