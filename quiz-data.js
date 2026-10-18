// Introductory questions based on the biographies, schools, and ideas in this app.
// Option IDs are stable; correctAnswerId must match exactly one option in its question.
window.PHILOSOPHY_QUIZ_QUESTIONS = [
  {
    id: 'aristotle-teacher', category: 'Philosophers and their lives',
    question: 'Which philosopher taught Aristotle at the Academy in Athens?',
    options: [{ id: 'socrates', text: 'Socrates' }, { id: 'plato', text: 'Plato' }, { id: 'epicurus', text: 'Epicurus' }, { id: 'seneca', text: 'Seneca' }],
    correctAnswerId: 'plato',
    explanation: 'Aristotle studied with Plato at the Academy for approximately twenty years before developing his own philosophical system.'
  },
  {
    id: 'meditations-author', category: 'Philosophers and their lives',
    question: 'Which Roman emperor wrote the personal reflections known as Meditations?',
    options: [{ id: 'seneca', text: 'Seneca' }, { id: 'cicero', text: 'Cicero' }, { id: 'marcus', text: 'Marcus Aurelius' }, { id: 'epictetus', text: 'Epictetus' }],
    correctAnswerId: 'marcus',
    explanation: 'Marcus Aurelius was a Roman emperor and Stoic practitioner. His Meditations contains reflections on judgment, duty, mortality, and self-discipline.'
  },
  {
    id: 'epictetus-life', category: 'Philosophers and their lives',
    question: 'Which Stoic teacher was formerly enslaved and had his teachings recorded by Arrian?',
    options: [{ id: 'epictetus', text: 'Epictetus' }, { id: 'aristotle', text: 'Aristotle' }, { id: 'marcus', text: 'Marcus Aurelius' }, { id: 'zeno', text: 'Zeno of Citium' }],
    correctAnswerId: 'epictetus',
    explanation: 'Epictetus was formerly enslaved and later taught philosophy. Arrian recorded his teachings, which emphasize judgment, character, and what lies within our control.'
  },
  {
    id: 'socrates-writings', category: 'Philosophers and their lives',
    question: 'Which philosopher left no writings and is known largely through accounts by Plato, Xenophon, and others?',
    options: [{ id: 'plato', text: 'Plato' }, { id: 'seneca', text: 'Seneca' }, { id: 'aristotle', text: 'Aristotle' }, { id: 'socrates', text: 'Socrates' }],
    correctAnswerId: 'socrates',
    explanation: 'Socrates left no philosophical writings of his own. Accounts by Plato, Xenophon, and other ancient authors preserve different perspectives on his life and teaching.'
  },
  {
    id: 'academy-founder', category: 'Philosophers and their lives',
    question: 'Who founded the Academy in Athens?',
    options: [{ id: 'epicurus', text: 'Epicurus' }, { id: 'plato', text: 'Plato' }, { id: 'aristotle', text: 'Aristotle' }, { id: 'diogenes', text: 'Diogenes of Sinope' }],
    correctAnswerId: 'plato',
    explanation: 'Plato founded the Academy, an important center of philosophical study in Athens. Aristotle was among those who studied there.'
  },
  {
    id: 'seneca-letters', category: 'Philosophers and their lives',
    question: 'Which Roman Stoic wrote the Moral Letters to Lucilius?',
    options: [{ id: 'marcus', text: 'Marcus Aurelius' }, { id: 'epictetus', text: 'Epictetus' }, { id: 'seneca', text: 'Seneca' }, { id: 'cicero', text: 'Cicero' }],
    correctAnswerId: 'seneca',
    explanation: 'Seneca wrote the Moral Letters to Lucilius. The letters explore how philosophy can guide everyday choices, emotional discipline, and the use of time.'
  },
  {
    id: 'stoicism-founder', category: 'Philosophical schools and traditions',
    question: 'Which philosophical school was founded by Zeno of Citium?',
    options: [{ id: 'stoicism', text: 'Stoicism' }, { id: 'epicureanism', text: 'Epicureanism' }, { id: 'platonism', text: 'Platonism' }, { id: 'aristotelianism', text: 'Aristotelianism' }],
    correctAnswerId: 'stoicism',
    explanation: 'Zeno of Citium founded Stoicism in Athens. The school emphasizes virtue, reason, and living in accordance with nature.'
  },
  {
    id: 'epicurus-school', category: 'Philosophical schools and traditions',
    question: 'Which tradition takes its name from Epicurus?',
    options: [{ id: 'cynicism', text: 'Cynicism' }, { id: 'stoicism', text: 'Stoicism' }, { id: 'platonism', text: 'Platonism' }, { id: 'epicureanism', text: 'Epicureanism' }],
    correctAnswerId: 'epicureanism',
    explanation: 'Epicureanism takes its name from Epicurus. It understands pleasure primarily in terms of freedom from bodily pain and mental disturbance.'
  },
  {
    id: 'diogenes-school', category: 'Philosophical schools and traditions',
    question: 'With which philosophical tradition is Diogenes of Sinope most closely associated?',
    options: [{ id: 'aristotelianism', text: 'Aristotelianism' }, { id: 'cynicism', text: 'Cynicism' }, { id: 'epicureanism', text: 'Epicureanism' }, { id: 'platonism', text: 'Platonism' }],
    correctAnswerId: 'cynicism',
    explanation: 'Diogenes is a leading figure of Cynicism. Ancient accounts portray him challenging convention and practicing radical simplicity and self-sufficiency.'
  },
  {
    id: 'forms-tradition', category: 'Philosophical schools and traditions',
    question: 'Which tradition is especially associated with the theory of Forms?',
    options: [{ id: 'stoicism', text: 'Stoicism' }, { id: 'cynicism', text: 'Cynicism' }, { id: 'platonism', text: 'Platonism' }, { id: 'epicureanism', text: 'Epicureanism' }],
    correctAnswerId: 'platonism',
    explanation: 'The theory of Forms is associated with Plato and Platonism. It distinguishes stable, intelligible realities from changing sensory appearances.'
  },
  {
    id: 'mean-tradition', category: 'Philosophical schools and traditions',
    question: 'Which tradition explains moral virtue through a mean between excess and deficiency?',
    options: [{ id: 'aristotelianism', text: 'Aristotelianism' }, { id: 'epicureanism', text: 'Epicureanism' }, { id: 'cynicism', text: 'Cynicism' }, { id: 'platonism', text: 'Platonism' }],
    correctAnswerId: 'aristotelianism',
    explanation: 'Aristotelian ethics describes moral virtue as a cultivated disposition guided by practical wisdom. The appropriate mean depends on the circumstances; it is not a simple arithmetic midpoint.'
  },
  {
    id: 'roman-stoics', category: 'Philosophical schools and traditions',
    question: 'Which tradition links Seneca, Epictetus, and Marcus Aurelius?',
    options: [{ id: 'cynicism', text: 'Cynicism' }, { id: 'platonism', text: 'Platonism' }, { id: 'epicureanism', text: 'Epicureanism' }, { id: 'stoicism', text: 'Stoicism' }],
    correctAnswerId: 'stoicism',
    explanation: 'Seneca, Epictetus, and Marcus Aurelius are important representatives of Stoicism in the Roman world, applying its teachings to judgment, duty, and daily life.'
  },
  {
    id: 'cynic-conventions', category: 'Philosophical schools and traditions',
    question: 'Which school is especially known for challenging social conventions through provocative behavior?',
    options: [{ id: 'platonism', text: 'Platonism' }, { id: 'cynicism', text: 'Cynicism' }, { id: 'aristotelianism', text: 'Aristotelianism' }, { id: 'epicureanism', text: 'Epicureanism' }],
    correctAnswerId: 'cynicism',
    explanation: 'Cynics such as Diogenes used provocative actions to expose hypocrisy and question dependence on wealth, status, and social approval.'
  },
  {
    id: 'eudaimonia', category: 'Philosophical ideas and teachings',
    question: 'In Aristotle’s ethics, what does eudaimonia broadly mean?',
    options: [{ id: 'wealth', text: 'Possessing wealth and political power' }, { id: 'sensation', text: 'Enjoying a brief pleasant sensation' }, { id: 'flourishing', text: 'Human flourishing through living and acting well' }, { id: 'withdrawal', text: 'Complete withdrawal from community life' }],
    correctAnswerId: 'flourishing',
    explanation: 'Eudaimonia is often translated as happiness or flourishing. For Aristotle, it involves rational activity in accordance with virtue across a life, rather than a passing feeling.'
  },
  {
    id: 'epicurean-happiness', category: 'Philosophical ideas and teachings',
    question: 'What did Epicurus emphasize as a path to a happy life?',
    options: [{ id: 'friendship', text: 'Friendship, moderation, and tranquility' }, { id: 'recognition', text: 'Political power and public recognition' }, { id: 'luxury', text: 'Continually increasing luxury and wealth' }, { id: 'competition', text: 'Winning social approval through competition' }],
    correctAnswerId: 'friendship',
    explanation: 'Epicurus emphasized simple pleasures, friendship, and freedom from unnecessary fears and desires. Pleasure did not require a life of luxury.'
  },
  {
    id: 'epictetus-control', category: 'Philosophical ideas and teachings',
    question: 'According to Epictetus, which of these belongs within our control?',
    options: [{ id: 'opinions', text: 'Other people’s opinions of us' }, { id: 'wealth', text: 'Whether we remain wealthy' }, { id: 'events', text: 'Everything that happens around us' }, { id: 'judgments', text: 'Our judgments and choices' }],
    correctAnswerId: 'judgments',
    explanation: 'Epictetus distinguishes our judgments and choices from external circumstances. Reputation, possessions, and events beyond our agency are not fully within our control.'
  },
  {
    id: 'socratic-inquiry', category: 'Philosophical ideas and teachings',
    question: 'What is a central aim of Socratic questioning?',
    options: [{ id: 'memorization', text: 'Memorizing accepted opinions without examining them' }, { id: 'examination', text: 'Examining beliefs and exposing contradictions' }, { id: 'reputation', text: 'Gaining a reputation without improving one’s character' }, { id: 'certainty', text: 'Treating every personal belief as certain knowledge' }],
    correctAnswerId: 'examination',
    explanation: 'Socratic inquiry tests definitions and assumptions through questioning. Recognizing the limits of one’s understanding can help a person pursue wisdom and live more thoughtfully.'
  },
  {
    id: 'aristotle-knowledge', category: 'Philosophical ideas and teachings',
    question: 'How does Aristotle connect experience with knowledge?',
    options: [{ id: 'opinion', text: 'Knowledge is simply whatever most people believe' }, { id: 'sensation', text: 'Sensory impressions alone explain every cause' }, { id: 'causes', text: 'Knowledge begins with experience and develops through reasoning about causes' }, { id: 'rejection', text: 'Observation must be rejected in every investigation' }],
    correctAnswerId: 'causes',
    explanation: 'Aristotle gives observation and experience an important role. Scientific understanding also requires reasoning about causes: knowing why something is true, not only that it is true.'
  },
  {
    id: 'plato-knowledge', category: 'Philosophical ideas and teachings',
    question: 'For Plato, what is needed to move beyond changing appearances toward genuine knowledge?',
    options: [{ id: 'reason', text: 'Reasoned inquiry into stable, intelligible realities' }, { id: 'senses', text: 'Reliance exclusively on immediate sensory impressions' }, { id: 'popularity', text: 'Agreement with the most popular opinion' }, { id: 'status', text: 'High social status and political authority' }],
    correctAnswerId: 'reason',
    explanation: 'Plato distinguishes opinion about changing appearances from understanding stable, intelligible realities. Reason and philosophical inquiry are central to this movement toward knowledge.'
  },
  {
    id: 'stoic-good', category: 'Philosophical ideas and teachings',
    question: 'What do Stoics regard as the only true good?',
    options: [{ id: 'health', text: 'Bodily health' }, { id: 'wealth', text: 'Material wealth' }, { id: 'reputation', text: 'A favorable reputation' }, { id: 'virtue', text: 'Virtue' }],
    correctAnswerId: 'virtue',
    explanation: 'For Stoics, virtue is the only true good. Health, wealth, and reputation may be preferred, but they do not determine a person’s moral worth.'
  }
];
