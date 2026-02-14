import jsPDF from 'jspdf';
import type { FullFormData } from '../types/form';
import { anamneseQuestions, headerQuestions, tdahQuestions, teaQuestions, tdahOptions, teaSubSectionLabels } from '../data/questions';

const MARGIN_LEFT = 20;
const MARGIN_RIGHT = 20;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;
const LINE_HEIGHT = 6;
const SECTION_GAP = 10;

function addPageIfNeeded(doc: jsPDF, y: number, needed: number = 20): number {
  if (y + needed > 280) {
    doc.addPage();
    return 20;
  }
  return y;
}

function wrapText(doc: jsPDF, text: string, maxWidth: number): string[] {
  return doc.splitTextToSize(text, maxWidth);
}

export function generatePDF(data: FullFormData): void {
  const doc = new jsPDF('p', 'mm', 'a4');

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(26, 54, 93);
  doc.text('ANAMNESE', PAGE_WIDTH / 2, 25, { align: 'center' });

  let y = 40;

  // Header fields
  doc.setFontSize(10);
  for (const q of headerQuestions) {
    y = addPageIfNeeded(doc, y);
    const value = (data.anamnese as Record<string, unknown>)[q.fieldKey] as string || '\u2014';
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(`${q.label}:`, MARGIN_LEFT, y);
    const labelWidth = doc.getTextWidth(`${q.label}: `);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(37, 99, 235);
    doc.text(value, MARGIN_LEFT + labelWidth + 2, y);
    y += LINE_HEIGHT + 2;
  }

  y += SECTION_GAP;

  // Anamnese questions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(26, 54, 93);
  y = addPageIfNeeded(doc, y, 15);
  doc.text('Anamnese \u2014 Perguntas', MARGIN_LEFT, y);
  y += 10;

  doc.setFontSize(10);
  for (const q of anamneseQuestions) {
    const value = (data.anamnese as Record<string, unknown>)[q.fieldKey] as string || '\u2014';
    if (q.type === 'conditional-text' && (!value || value === '\u2014')) continue;

    y = addPageIfNeeded(doc, y, 14);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    const questionLines = wrapText(doc, q.label, CONTENT_WIDTH);
    for (const line of questionLines) {
      y = addPageIfNeeded(doc, y);
      doc.text(line, MARGIN_LEFT, y);
      y += LINE_HEIGHT;
    }

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(37, 99, 235);

    if (q.type === 'text' || q.type === 'conditional-text') {
      const answerLines = wrapText(doc, `R: ${value}`, CONTENT_WIDTH - 6);
      const boxH = answerLines.length * LINE_HEIGHT + 4;
      y = addPageIfNeeded(doc, y, boxH + 2);
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(248, 250, 252);
      doc.roundedRect(MARGIN_LEFT, y - 3, CONTENT_WIDTH, boxH, 1, 1, 'FD');
      doc.setTextColor(37, 99, 235);
      for (const line of answerLines) {
        doc.text(line, MARGIN_LEFT + 3, y + 2);
        y += LINE_HEIGHT;
      }
      y += 4;
    } else {
      y = addPageIfNeeded(doc, y);
      doc.text(`R: ${value}`, MARGIN_LEFT + 4, y);
      y += LINE_HEIGHT + 2;
    }
  }

  // TDAH Section
  y += SECTION_GAP;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(26, 54, 93);
  y = addPageIfNeeded(doc, y, 15);
  doc.text('Rastreio para TDAH', MARGIN_LEFT, y);
  y += 10;

  doc.setFontSize(10);
  for (const q of tdahQuestions) {
    const value = (data.tdah as Record<string, unknown>)[q.fieldKey] as string || '\u2014';
    y = addPageIfNeeded(doc, y, 20);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    const questionLines = wrapText(doc, `${q.number}. ${q.label}`, CONTENT_WIDTH);
    for (const line of questionLines) {
      y = addPageIfNeeded(doc, y);
      doc.text(line, MARGIN_LEFT, y);
      y += LINE_HEIGHT;
    }

    doc.setFontSize(9);
    for (const opt of tdahOptions) {
      y = addPageIfNeeded(doc, y);
      if (opt === value) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(37, 99, 235);
        doc.text(`  (X) ${opt}`, MARGIN_LEFT + 4, y);
      } else {
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(150, 150, 150);
        doc.text(`  (   ) ${opt}`, MARGIN_LEFT + 4, y);
      }
      y += LINE_HEIGHT - 1;
    }
    doc.setFontSize(10);
    y += 3;
  }

  // TEA Section
  y += SECTION_GAP;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(26, 54, 93);
  y = addPageIfNeeded(doc, y, 15);
  doc.text('Rastreio para TEA', MARGIN_LEFT, y);
  y += 10;

  let currentSub = '';
  doc.setFontSize(10);
  for (const q of teaQuestions) {
    if (q.subSection !== currentSub) {
      currentSub = q.subSection;
      y += 4;
      y = addPageIfNeeded(doc, y, 14);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(26, 54, 93);
      doc.text(teaSubSectionLabels[currentSub], MARGIN_LEFT, y);
      y += 8;
      doc.setFontSize(10);
    }

    const value = (data.tea as Record<string, unknown>)[q.fieldKey] as string || '\u2014';
    y = addPageIfNeeded(doc, y, 14);

    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    const questionLines = wrapText(doc, `${q.number}. ${q.label}`, CONTENT_WIDTH);
    for (const line of questionLines) {
      y = addPageIfNeeded(doc, y);
      doc.text(line, MARGIN_LEFT, y);
      y += LINE_HEIGHT;
    }

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(37, 99, 235);
    y = addPageIfNeeded(doc, y);
    doc.text(`R: ${value}`, MARGIN_LEFT + 4, y);
    y += LINE_HEIGHT + 3;
  }

  // Footer on each page
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.setFont('helvetica', 'normal');
    doc.text(`Página ${i} de ${totalPages}`, PAGE_WIDTH / 2, 292, { align: 'center' });
    doc.text(
      `Gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}`,
      PAGE_WIDTH - MARGIN_RIGHT, 292, { align: 'right' }
    );
  }

  const name = data.anamnese.patientName || 'anamnese';
  doc.save(`anamnese_${name.replace(/\s+/g, '_').toLowerCase()}.pdf`);
}
