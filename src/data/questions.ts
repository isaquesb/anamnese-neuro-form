export interface QuestionDef {
  id: string;
  label: string;
  type: 'text' | 'date' | 'yesno' | 'radio' | 'conditional-text';
  options?: string[];
  conditionalOn?: { field: string; value: string };
  fieldKey: string;
}

export const headerQuestions: QuestionDef[] = [
  { id: 'h1', label: 'Nome do avaliado(a)', type: 'text', fieldKey: 'patientName' },
  { id: 'h2', label: 'Data de nascimento', type: 'date', fieldKey: 'birthDate' },
  { id: 'h3', label: 'Idade em anos e meses', type: 'text', fieldKey: 'ageYearsMonths' },
  { id: 'h4', label: 'Escolaridade', type: 'text', fieldKey: 'education' },
  { id: 'h5', label: 'Nome do profissional caso tenha sido encaminhado', type: 'text', fieldKey: 'referralProfessional' },
  { id: 'h6', label: 'Gênero', type: 'text', fieldKey: 'gender' },
];

export const anamneseQuestions: QuestionDef[] = [
  { id: 'a1', label: 'Nasceu de gestação planejada?', type: 'yesno', fieldKey: 'plannedPregnancy' },
  { id: 'a2a', label: 'Qual idade dos pais na ocasião da gestação? - Mãe', type: 'text', fieldKey: 'motherAgeAtPregnancy' },
  { id: 'a2b', label: 'Qual idade dos pais na ocasião da gestação? - Pai', type: 'text', fieldKey: 'fatherAgeAtPregnancy' },
  { id: 'a3', label: 'A gestação foi tranquila?', type: 'yesno', fieldKey: 'calmPregnancy' },
  { id: 'a4', label: 'Foi bem aceito(a) no núcleo familiar?', type: 'yesno', fieldKey: 'familyAccepted' },
  { id: 'a5', label: 'A mãe fez o Pré-Natal?', type: 'yesno', fieldKey: 'prenatalCare' },
  { id: 'a6', label: 'Parto?', type: 'radio', options: ['CESÁRIA', 'NORMAL'], fieldKey: 'deliveryType' },
  { id: 'a7', label: 'Houve complicações no parto?', type: 'yesno', fieldKey: 'deliveryComplications' },
  { id: 'a8', label: 'Prematuro ou a termo?', type: 'radio', options: ['PREMATURO', 'A TERMO'], fieldKey: 'prematureOrFullTerm' },
  { id: 'a9', label: 'Foi um bebê choroso?', type: 'yesno', fieldKey: 'cryingBaby' },
  { id: 'a10', label: 'Possui Irmãos?', type: 'yesno', fieldKey: 'hasSiblings' },
  { id: 'a10b', label: 'Se sim, quantos?', type: 'conditional-text', conditionalOn: { field: 'hasSiblings', value: 'SIM' }, fieldKey: 'siblingsCount' },
  { id: 'a11', label: 'Algum dos pais era usuário de drogas ou alcoólatra?', type: 'yesno', fieldKey: 'parentsDrugUse' },
  { id: 'a12', label: 'Foi amamentado(a) por quanto tempo?', type: 'text', fieldKey: 'breastfeedingDuration' },
  { id: 'a13', label: 'Engatinhou?', type: 'yesno', fieldKey: 'crawled' },
  { id: 'a14', label: 'Usou andador?', type: 'yesno', fieldKey: 'usedWalker' },
  { id: 'a15', label: 'Andou com que idade?', type: 'text', fieldKey: 'ageStartedWalking' },
  { id: 'a16', label: 'Teve atraso na fala?', type: 'yesno', fieldKey: 'speechDelay' },
  { id: 'a17', label: 'Tem/Teve problemas com dicção, troca de letras ou outros na fala?', type: 'yesno', fieldKey: 'dictionProblems' },
  { id: 'a17b', label: 'Obs (problemas na fala)', type: 'conditional-text', conditionalOn: { field: 'dictionProblems', value: 'SIM' }, fieldKey: 'dictionNotes' },
  { id: 'a18', label: 'Entrou na escola ou creche com que idade?', type: 'text', fieldKey: 'ageStartedSchool' },
  { id: 'a19', label: 'A adaptação foi tranquila?', type: 'yesno', fieldKey: 'smoothSchoolAdaptation' },
  { id: 'a20', label: 'Quais eram suas brincadeiras preferidas na infância?', type: 'text', fieldKey: 'favoriteChildhoodGames' },
  { id: 'a21', label: 'Teve icterícia neonatal?', type: 'yesno', fieldKey: 'neonatalJaundice' },
  { id: 'a22', label: 'Teve COVID?', type: 'text', fieldKey: 'hadCovid' },
  { id: 'a23', label: 'A mãe teve candidíase durante a gestação?', type: 'text', fieldKey: 'motherCandidiasis' },
  { id: 'a24', label: 'Usou chupeta ou chupou o dedo?', type: 'yesno', fieldKey: 'usedPacifier' },
  { id: 'a24b', label: 'Até que idade?', type: 'conditional-text', conditionalOn: { field: 'usedPacifier', value: 'SIM' }, fieldKey: 'pacifierUntilAge' },
  { id: 'a25', label: 'Tinha um objeto transicional, que ficava sempre com ele e tinha dependência para dormir ou se acalmar? (Cobertor, fraldinha, bichinho de pelúcia etc)', type: 'yesno', fieldKey: 'transitionalObject' },
  { id: 'a26', label: 'Tem dificuldade em atender telefonemas?', type: 'yesno', fieldKey: 'phoneCallDifficulty' },
  { id: 'a27', label: 'Tem problemas gastrointestinais?', type: 'yesno', fieldKey: 'gastrointestinalProblems' },
  { id: 'a28', label: 'Tem diabetes?', type: 'yesno', fieldKey: 'diabetes' },
  { id: 'a29', label: 'Tem problemas com o sono?', type: 'yesno', fieldKey: 'sleepProblems' },
  { id: 'a30', label: 'Tem dores no corpo?', type: 'yesno', fieldKey: 'bodyPain' },
  { id: 'a31', label: 'Tem casos de autismo na família?', type: 'yesno', fieldKey: 'familyAutism' },
  { id: 'a32', label: 'Costuma sentir vertigens ou tontura?', type: 'yesno', fieldKey: 'dizziness' },
  { id: 'a33', label: 'Foi uma criança medrosa?', type: 'yesno', fieldKey: 'fearfulChild' },
  { id: 'a34', label: 'Não tem noção de perigo? (atravessa a rua sem olhar etc.)', type: 'yesno', fieldKey: 'noDangerAwareness' },
  { id: 'a35', label: 'Tem interesse por outras pessoas?', type: 'yesno', fieldKey: 'interestInOthers' },
  { id: 'a36', label: 'Possui outros diagnósticos?', type: 'yesno', fieldKey: 'otherDiagnoses' },
  { id: 'a36b', label: 'Se sim, quais?', type: 'conditional-text', conditionalOn: { field: 'otherDiagnoses', value: 'SIM' }, fieldKey: 'whichDiagnoses' },
  { id: 'a37', label: 'Toma medicamentos?', type: 'yesno', fieldKey: 'takesMedication' },
  { id: 'a37b', label: 'Se sim, quais?', type: 'conditional-text', conditionalOn: { field: 'takesMedication', value: 'SIM' }, fieldKey: 'whichMedication' },
  { id: 'a38', label: 'Tem a sensação que está sempre cansado?', type: 'yesno', fieldKey: 'alwaysTired' },
];

export const tdahQuestions = [
  { id: 'tdah1', number: 1, label: 'Tem dificuldade em prestar atenção a detalhes ou comete erros por descuido em atividades do trabalho ou estudo?', fieldKey: 'tdah1' },
  { id: 'tdah2', number: 2, label: 'Tem dificuldade em manter a atenção em tarefas prolongadas ou tediosas?', fieldKey: 'tdah2' },
  { id: 'tdah3', number: 3, label: 'Parece não escutar quando falam com você, mesmo sem distrações óbvias?', fieldKey: 'tdah3' },
  { id: 'tdah4', number: 4, label: 'Tem dificuldade em seguir instruções ou concluir tarefas no prazo?', fieldKey: 'tdah4' },
  { id: 'tdah5', number: 5, label: 'Tem dificuldade em organizar tarefas ou atividades?', fieldKey: 'tdah5' },
  { id: 'tdah6', number: 6, label: 'Evita ou adia tarefas que exigem esforço mental prolongado?', fieldKey: 'tdah6' },
  { id: 'tdah7', number: 7, label: 'Perde objetos necessários para o trabalho, estudo ou atividades diárias (chaves, documentos, celular, etc.)?', fieldKey: 'tdah7' },
  { id: 'tdah8', number: 8, label: 'Distraí-se facilmente com estímulos externos ou pensamentos irrelevantes?', fieldKey: 'tdah8' },
  { id: 'tdah9', number: 9, label: 'Esquece compromissos, datas ou tarefas importantes com frequência?', fieldKey: 'tdah9' },
  { id: 'tdah10', number: 10, label: 'Sente-se inquieto, agitado ou incapaz de relaxar?', fieldKey: 'tdah10' },
  { id: 'tdah11', number: 11, label: 'Tem dificuldade em permanecer sentado em situações em que se espera que fique quieto?', fieldKey: 'tdah11' },
  { id: 'tdah12', number: 12, label: 'Fala excessivamente ou interrompe os outros com frequência?', fieldKey: 'tdah12' },
  { id: 'tdah13', number: 13, label: 'Age impulsivamente, tomando decisões rápidas sem considerar consequências?', fieldKey: 'tdah13' },
  { id: 'tdah14', number: 14, label: 'Tem dificuldade em esperar sua vez em filas, reuniões ou situações de grupo?', fieldKey: 'tdah14' },
];

export const tdahOptions = [
  'Nunca / Raramente',
  'Algumas vezes',
  'Frequentemente',
  'Muito frequentemente',
];

export const teaQuestions = [
  { id: 'tea1', number: 1, label: 'Tem dificuldade em iniciar ou manter conversas?', fieldKey: 'tea1', subSection: 'A' },
  { id: 'tea2', number: 2, label: 'Tem dificuldade em compreender ou usar gestos, expressões faciais ou tom de voz?', fieldKey: 'tea2', subSection: 'A' },
  { id: 'tea3', number: 3, label: 'Tem dificuldade em fazer amigos ou manter relações sociais significativas?', fieldKey: 'tea3', subSection: 'A' },
  { id: 'tea4', number: 4, label: 'Tem dificuldade em perceber sinais sociais sutis, como ironia, sarcasmo ou piadas?', fieldKey: 'tea4', subSection: 'A' },
  { id: 'tea5', number: 5, label: 'Dificuldade em compreender o ponto de vista ou sentimentos de outras pessoas?', fieldKey: 'tea5', subSection: 'A' },
  { id: 'tea6', number: 6, label: 'Realiza comportamentos repetitivos ou estereotipados (ex.: balançar, repetir palavras ou movimentos)?', fieldKey: 'tea6', subSection: 'B' },
  { id: 'tea7', number: 7, label: 'Possui interesses altamente focados ou intensos em temas específicos?', fieldKey: 'tea7', subSection: 'B' },
  { id: 'tea8', number: 8, label: 'Apresenta resistência a mudanças na rotina ou dificuldades em lidar com imprevistos?', fieldKey: 'tea8', subSection: 'B' },
  { id: 'tea9', number: 9, label: 'Tem sensibilidade sensorial (sons, texturas, luzes, cheiros) que interfere em atividades diárias?', fieldKey: 'tea9', subSection: 'B' },
  { id: 'tea10', number: 10, label: 'Dificuldade em alternar entre tarefas ou manter foco em atividades não relacionadas ao interesse principal?', fieldKey: 'tea10', subSection: 'B' },
  { id: 'tea11', number: 11, label: 'Observa diferenças significativas de comportamento ou habilidades em relação a outras pessoas da mesma idade?', fieldKey: 'tea11', subSection: 'C' },
  { id: 'tea12', number: 12, label: 'Demonstrou sinais de TEA na infância (mesmo que não diagnosticado)?', fieldKey: 'tea12', subSection: 'C' },
];

export const teaSubSectionLabels: Record<string, string> = {
  A: 'A. Déficits na comunicação social e interação',
  B: 'B. Comportamentos repetitivos e interesses restritos',
  C: 'C. Desenvolvimento e padrão de comportamento',
};
