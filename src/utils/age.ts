export function calculateAge(birthDateStr: string): string {
  if (!birthDateStr) return '';
  const birth = new Date(birthDateStr + 'T00:00:00');
  if (isNaN(birth.getTime())) return '';

  const today = new Date();
  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (months < 0 || (months === 0 && today.getDate() < birth.getDate())) {
    years--;
    months += 12;
  }
  if (today.getDate() < birth.getDate()) {
    months--;
    if (months < 0) months += 12;
  }

  if (years < 0) return '';

  const yLabel = years === 1 ? 'ano' : 'anos';
  const mLabel = months === 1 ? 'mês' : 'meses';

  if (months === 0) return `${years} ${yLabel}`;
  return `${years} ${yLabel} e ${months} ${mLabel}`;
}
