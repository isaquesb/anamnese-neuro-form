import type { FullFormData } from '../types/form';
import { headerQuestions, anamneseQuestions, tdahQuestions, tdahOptions, teaQuestions, teaSubSectionLabels } from '../data/questions';

function mark(selected: boolean): string {
  return selected ? '(X)' : '(  )';
}

export function formatAsText(data: FullFormData): string {
  const anamnese = data.anamnese as Record<string, string>;
  const tdah = data.tdah as Record<string, string>;
  const tea = data.tea as Record<string, string>;
  const lines: string[] = [];

  lines.push('ANAMNESE');
  lines.push('');

  // Header fields
  for (const q of headerQuestions) {
    const val = anamnese[q.fieldKey] || '';
    lines.push(`${q.label}: ${val}`);
  }
  lines.push('');

  // Anamnese questions
  for (const q of anamneseQuestions) {
    if (q.conditionalOn) {
      const parentVal = anamnese[q.conditionalOn.field];
      if (parentVal !== q.conditionalOn.value) continue;
    }

    const val = anamnese[q.fieldKey] || '';

    if (q.type === 'yesno') {
      lines.push(q.label);
      lines.push(`${mark(val === 'SIM')} SIM              ${mark(val === 'NÃO')} NÃO`);
    } else if (q.type === 'radio') {
      lines.push(q.label);
      const opts = q.options || [];
      lines.push(opts.map((o) => `${mark(val === o)} ${o}`).join('       '));
    } else if (q.type === 'text' || q.type === 'conditional-text') {
      if (q.label.startsWith('Se sim') || q.label.startsWith('Obs') || q.label.startsWith('Até que idade')) {
        lines.push(`${q.label} R: ${val || '___'}`);
      } else if (q.label.includes('?')) {
        lines.push(q.label);
        lines.push(`R: ${val || '___'}`);
      } else {
        lines.push(`${q.label}: ${val}`);
      }
    }
  }

  lines.push('');

  // TDAH
  lines.push('Rastreio para TDAH');
  lines.push('');

  for (const q of tdahQuestions) {
    const val = tdah[q.fieldKey] || '';
    lines.push(`${q.number}. ${q.label}`);
    for (const opt of tdahOptions) {
      lines.push(`${mark(val === opt)} ${opt}`);
    }
    lines.push('');
  }

  // TEA
  lines.push('RASTREIO PARA TEA');
  lines.push('');

  let currentSub = '';
  for (const q of teaQuestions) {
    if (q.subSection !== currentSub) {
      currentSub = q.subSection;
      lines.push('');
      lines.push(teaSubSectionLabels[q.subSection]);
      lines.push('');
    }
    const val = tea[q.fieldKey] || '';
    lines.push(`${q.number}. ${q.label} ${mark(val === 'Sim')} Sim   ${mark(val === 'Não')} Não`);
  }

  return lines.join('\n');
}
