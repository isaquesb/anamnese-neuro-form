import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { YesNoField } from './YesNoField';

describe('YesNoField', () => {
  it('renders label and two buttons by default', () => {
    render(<YesNoField label="Pergunta?" value="" onChange={() => {}} />);
    expect(screen.getByText('Pergunta?')).toBeInTheDocument();
    expect(screen.getByText('SIM')).toBeInTheDocument();
    expect(screen.getByText('NÃO')).toBeInTheDocument();
  });

  it('highlights the selected option', () => {
    render(<YesNoField label="Pergunta?" value="SIM" onChange={() => {}} />);
    const simBtn = screen.getByText('SIM');
    expect(simBtn.className).toContain('bg-blue-600');
  });

  it('calls onChange with the clicked option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<YesNoField label="Pergunta?" value="" onChange={onChange} />);

    await user.click(screen.getByText('NÃO'));
    expect(onChange).toHaveBeenCalledWith('NÃO');
  });

  it('supports custom options', () => {
    render(<YesNoField label="TEA?" value="" onChange={() => {}} options={['Sim', 'Não']} />);
    expect(screen.getByText('Sim')).toBeInTheDocument();
    expect(screen.getByText('Não')).toBeInTheDocument();
  });

  it('switches selection when clicking the other option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<YesNoField label="Pergunta?" value="SIM" onChange={onChange} />);

    await user.click(screen.getByText('NÃO'));
    expect(onChange).toHaveBeenCalledWith('NÃO');
  });
});
