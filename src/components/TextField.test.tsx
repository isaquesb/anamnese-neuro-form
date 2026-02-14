import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from './TextField';

describe('TextField', () => {
  it('renders label and input', () => {
    render(<TextField label="Nome" value="" onChange={() => {}} />);
    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    render(<TextField label="Nome" value="João" onChange={() => {}} />);
    expect(screen.getByRole('textbox')).toHaveValue('João');
  });

  it('calls onChange when typing', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TextField label="Nome" value="" onChange={onChange} />);

    await user.type(screen.getByRole('textbox'), 'A');
    expect(onChange).toHaveBeenCalledWith('A');
  });

  it('shows error message when provided', () => {
    render(<TextField label="Nome" value="" onChange={() => {}} error="Campo obrigatório" />);
    expect(screen.getByText('Campo obrigatório')).toBeInTheDocument();
  });

  it('does not show error when not provided', () => {
    render(<TextField label="Nome" value="" onChange={() => {}} />);
    expect(screen.queryByText('Campo obrigatório')).not.toBeInTheDocument();
  });

  it('can be found by label text', () => {
    render(<TextField label="Nome do avaliado" value="Test" onChange={() => {}} />);
    expect(screen.getByLabelText('Nome do avaliado')).toHaveValue('Test');
  });

  it('renders as date input when type is date', () => {
    render(<TextField label="Data" value="" onChange={() => {}} type="date" />);
    const input = document.querySelector('input[type="date"]');
    expect(input).toBeInTheDocument();
  });
});
