import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RadioGroupField } from './RadioGroupField';

const options = ['Nunca / Raramente', 'Algumas vezes', 'Frequentemente', 'Muito frequentemente'];

describe('RadioGroupField', () => {
  it('renders label and all options', () => {
    render(<RadioGroupField label="Pergunta TDAH" value="" onChange={() => {}} options={options} />);
    expect(screen.getByText('Pergunta TDAH')).toBeInTheDocument();
    for (const opt of options) {
      expect(screen.getByText(opt)).toBeInTheDocument();
    }
  });

  it('renders with question number', () => {
    render(<RadioGroupField label="Pergunta" value="" onChange={() => {}} options={options} number={5} />);
    expect(screen.getByText('5.')).toBeInTheDocument();
  });

  it('has the correct option checked', () => {
    render(<RadioGroupField label="Pergunta" value="Frequentemente" onChange={() => {}} options={options} />);
    const radios = screen.getAllByRole('radio');
    const frequentementeRadio = radios[2]; // third option
    expect(frequentementeRadio).toBeChecked();
  });

  it('calls onChange when selecting an option', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<RadioGroupField label="Pergunta" value="" onChange={onChange} options={options} />);

    await user.click(screen.getByText('Algumas vezes'));
    expect(onChange).toHaveBeenCalledWith('Algumas vezes');
  });

  it('renders all 4 radio inputs', () => {
    render(<RadioGroupField label="Pergunta" value="" onChange={() => {}} options={options} />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(4);
  });
});
