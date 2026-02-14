import { z } from 'zod';

const simNaoEnum = z.enum(['SIM', 'NÃO', '']).catch('');

export const anamneseSchema = z.object({
  patientName: z.string().min(1, 'Nome do avaliado é obrigatório'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  ageYearsMonths: z.string().min(1, 'Idade é obrigatória'),
  education: z.string().min(1, 'Escolaridade é obrigatória'),
  referralProfessional: z.string().optional().default(''),
  gender: z.string().min(1, 'Gênero é obrigatório'),

  plannedPregnancy: simNaoEnum,
  motherAgeAtPregnancy: z.string().optional().default(''),
  fatherAgeAtPregnancy: z.string().optional().default(''),
  calmPregnancy: simNaoEnum,
  familyAccepted: simNaoEnum,
  prenatalCare: simNaoEnum,
  deliveryType: z.enum(['CESÁRIA', 'NORMAL', '']).catch(''),
  deliveryComplications: simNaoEnum,
  prematureOrFullTerm: z.enum(['PREMATURO', 'A TERMO', '']).catch(''),
  cryingBaby: simNaoEnum,
  hasSiblings: simNaoEnum,
  siblingsCount: z.string().optional().default(''),
  parentsDrugUse: simNaoEnum,
  breastfeedingDuration: z.string().optional().default(''),
  crawled: simNaoEnum,
  usedWalker: simNaoEnum,
  ageStartedWalking: z.string().optional().default(''),
  speechDelay: simNaoEnum,
  dictionProblems: simNaoEnum,
  dictionNotes: z.string().optional().default(''),
  ageStartedSchool: z.string().optional().default(''),
  smoothSchoolAdaptation: simNaoEnum,
  favoriteChildhoodGames: z.string().optional().default(''),
  neonatalJaundice: simNaoEnum,
  hadCovid: z.string().optional().default(''),
  motherCandidiasis: z.string().optional().default(''),
  usedPacifier: simNaoEnum,
  pacifierUntilAge: z.string().optional().default(''),
  transitionalObject: simNaoEnum,
  phoneCallDifficulty: simNaoEnum,
  gastrointestinalProblems: simNaoEnum,
  diabetes: simNaoEnum,
  sleepProblems: simNaoEnum,
  bodyPain: simNaoEnum,
  familyAutism: simNaoEnum,
  dizziness: simNaoEnum,
  fearfulChild: simNaoEnum,
  noDangerAwareness: simNaoEnum,
  interestInOthers: simNaoEnum,
  otherDiagnoses: simNaoEnum,
  whichDiagnoses: z.string().optional().default(''),
  takesMedication: simNaoEnum,
  whichMedication: z.string().optional().default(''),
  alwaysTired: simNaoEnum,
});

const frequencyOption = z.enum([
  'Nunca / Raramente',
  'Algumas vezes',
  'Frequentemente',
  'Muito frequentemente',
  '',
]).catch('');

export const tdahSchema = z.object({
  tdah1: frequencyOption,
  tdah2: frequencyOption,
  tdah3: frequencyOption,
  tdah4: frequencyOption,
  tdah5: frequencyOption,
  tdah6: frequencyOption,
  tdah7: frequencyOption,
  tdah8: frequencyOption,
  tdah9: frequencyOption,
  tdah10: frequencyOption,
  tdah11: frequencyOption,
  tdah12: frequencyOption,
  tdah13: frequencyOption,
  tdah14: frequencyOption,
});

const yesNoTea = z.enum(['Sim', 'Não', '']).catch('');

export const teaSchema = z.object({
  tea1: yesNoTea,
  tea2: yesNoTea,
  tea3: yesNoTea,
  tea4: yesNoTea,
  tea5: yesNoTea,
  tea6: yesNoTea,
  tea7: yesNoTea,
  tea8: yesNoTea,
  tea9: yesNoTea,
  tea10: yesNoTea,
  tea11: yesNoTea,
  tea12: yesNoTea,
});

export const fullFormSchema = z.object({
  anamnese: anamneseSchema,
  tdah: tdahSchema,
  tea: teaSchema,
});

export type AnamneseData = z.infer<typeof anamneseSchema>;
export type TdahData = z.infer<typeof tdahSchema>;
export type TeaData = z.infer<typeof teaSchema>;
export type FullFormData = z.infer<typeof fullFormSchema>;
