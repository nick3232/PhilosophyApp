// Existing biographies remain in data.js; only the two new figures are defined here.
window.PHILOSOPHY_NETWORK = {
  additionalPhilosophers: [
    {
      id: 'philosopher-cleanthes', name: 'Cleanthes', birth: -331, death: -232,
      dateNotes: 'Dates approximate; ancient chronologies vary.', tradition: 'Stoicism',
      summary: 'A pupil of Zeno and his successor as head of the Stoic school. Cleanthes preserved and developed early Stoic teaching and taught Chrysippus.',
      source: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diogenes_Laertius/Lives_of_the_Eminent_Philosophers/7/Cleanthes*.html'
    },
    {
      id: 'philosopher-chrysippus', name: 'Chrysippus', birth: -280, death: -206,
      dateNotes: 'Dates approximate; birth dates vary by source.', tradition: 'Stoicism',
      summary: 'A pupil of Cleanthes and a major architect of Stoic logic and doctrine. His writings became important texts for later Stoic study.',
      source: 'https://penelope.uchicago.edu/Thayer/E/Roman/Texts/Diogenes_Laertius/Lives_of_the_Eminent_Philosophers/7/Chrysippus*.html'
    }
  ],
  // Schematic positions run approximately by birth order, not a proportional time scale.
  layout: {
    width: 1540, height: 660, nodeWidth: 170, nodeHeight: 90,
    nodes: [
      { id: 'philosopher-1', x: 20, y: 90 },
      { id: 'philosopher-2', x: 210, y: 90 },
      { id: 'philosopher-3', x: 210, y: 360 },
      { id: 'philosopher-4', x: 400, y: 90 },
      { id: 'philosopher-5', x: 590, y: 530 },
      { id: 'philosopher-6', x: 590, y: 230 },
      { id: 'philosopher-cleanthes', x: 780, y: 230 },
      { id: 'philosopher-chrysippus', x: 970, y: 230 },
      { id: 'philosopher-8', x: 1160, y: 530 },
      { id: 'philosopher-9', x: 1160, y: 350 },
      { id: 'philosopher-10', x: 1350, y: 350 }
    ],
    // Optional routes keep long cross-generational arrows clear of node labels.
    routes: {
      'socrates-epictetus': 'M 105 90 V 45 Q 105 20 130 20 H 1220 Q 1245 20 1245 45 V 350',
      'zeno-seneca': 'M 675 320 C 675 465 1245 425 1245 530',
      'chrysippus-seneca': 'M 1055 320 C 1055 440 1200 435 1200 530'
    }
  },
  relationships: [
    {
      id: 'socrates-plato', source: 'philosopher-1', target: 'philosopher-2', category: 'direct',
      explanation: 'Plato was a pupil and associate of Socrates. His dialogues made Socrates a central philosophical figure, although their dramatic conversations should not be treated as verbatim records.',
      reference: 'Diogenes Laertius, Lives of the Eminent Philosophers 3.6.',
      url: 'https://en.wikisource.org/wiki/Lives_of_the_Eminent_Philosophers/Book_III'
    },
    {
      id: 'plato-aristotle', source: 'philosopher-2', target: 'philosopher-4', category: 'direct',
      explanation: 'Aristotle studied with Plato for approximately twenty years. This educational relationship shaped his development, even though he later challenged important Platonic doctrines.',
      reference: 'Diogenes Laertius, Lives of the Eminent Philosophers 5.9.',
      url: 'https://en.wikisource.org/wiki/Lives_of_the_Eminent_Philosophers/Book_V'
    },
    {
      id: 'zeno-cleanthes', source: 'philosopher-6', target: 'philosopher-cleanthes', category: 'direct',
      explanation: 'Cleanthes studied with Zeno and continued his Stoic teaching. Ancient testimony identifies him as Zeno’s pupil and successor as head of the school.',
      reference: 'Diogenes Laertius, Lives of the Eminent Philosophers 7.37 and 7.168.',
      url: 'https://en.wikisource.org/wiki/Lives_of_the_Eminent_Philosophers/Book_VII'
    },
    {
      id: 'cleanthes-chrysippus', source: 'philosopher-cleanthes', target: 'philosopher-chrysippus', category: 'direct',
      explanation: 'Chrysippus was a pupil of Cleanthes. Diogenes Laertius also records disagreements between them, showing that a teaching relationship did not require agreement on every doctrine.',
      reference: 'Diogenes Laertius, Lives of the Eminent Philosophers 7.179.',
      url: 'https://en.wikisource.org/wiki/Lives_of_the_Eminent_Philosophers/Book_VII'
    },
    {
      id: 'epicurus-seneca', source: 'philosopher-5', target: 'philosopher-8', category: 'intellectual',
      explanation: 'Seneca quotes Epicurus on contentment in Letter 2 and uses his insight in an ethical argument. He explicitly presents this as learning from another school while retaining his own philosophical allegiance, rather than adopting Epicureanism.',
      reference: 'Seneca, Moral Letters to Lucilius 2.5–6.',
      url: 'https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_2'
    },
    {
      id: 'zeno-seneca', source: 'philosopher-6', target: 'philosopher-8', category: 'intellectual',
      explanation: 'Seneca recommends Zeno as an intellectual companion and ethical example. This is an invitation to learn from an earlier thinker’s philosophy, not evidence that the two met.',
      reference: 'Seneca, Moral Letters to Lucilius 104.21.',
      url: 'https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_104'
    },
    {
      id: 'chrysippus-seneca', source: 'philosopher-chrysippus', target: 'philosopher-8', category: 'intellectual',
      explanation: 'Seneca recommends studying Chrysippus for understanding nature and developing moral resolve. His endorsement treats the earlier Stoic as a guide to living, rather than merely a source of elegant language.',
      reference: 'Seneca, Moral Letters to Lucilius 104.22.',
      url: 'https://en.wikisource.org/wiki/Moral_letters_to_Lucilius/Letter_104'
    },
    {
      id: 'chrysippus-epictetus', source: 'philosopher-chrysippus', target: 'philosopher-9', category: 'intellectual',
      explanation: 'Epictetus treats Chrysippus’s writings as an important guide to understanding nature. He insists that students must put the teachings into practice rather than take pride in explaining difficult texts.',
      reference: 'Epictetus, Enchiridion 49, compiled by Arrian.',
      url: 'https://en.wikisource.org/wiki/The_Discourses_of_Epictetus;_with_the_Encheiridion_and_Fragments/The_Encheiridion_or_Manual'
    },
    {
      id: 'diogenes-epictetus', source: 'philosopher-3', target: 'philosopher-9', category: 'intellectual',
      explanation: 'Epictetus presents Diogenes as an example of freedom from dependence on places, possessions, and other people. This is a Stoic teacher’s admiring interpretation of a Cynic exemplar, not a personal teaching relationship.',
      reference: 'Epictetus, Discourses 3.24, recorded by Arrian.',
      url: 'https://en.wikisource.org/wiki/The_Discourses_of_Epictetus;_with_the_Encheiridion_and_Fragments/Book_3/Chapter_24'
    },
    {
      id: 'socrates-epictetus', source: 'philosopher-1', target: 'philosopher-9', category: 'intellectual',
      explanation: 'Epictetus holds up Socrates as a model of following reason. He urges the learner to strive toward that example, demonstrating ethical influence across centuries rather than direct contact.',
      reference: 'Epictetus, Enchiridion 51.3, compiled by Arrian (standard chapter numbering).',
      url: 'https://dcc.dickinson.edu/epictetus-encheiridion/chapter-51'
    },
    {
      id: 'epictetus-marcus', source: 'philosopher-9', target: 'philosopher-10', category: 'intellectual',
      explanation: 'Marcus Aurelius thanks Rusticus for introducing him to records of Epictetus’s teaching. The influence was mediated through these texts; this passage does not establish a personal meeting with Epictetus.',
      reference: 'Marcus Aurelius, Meditations 1.7.',
      url: 'https://en.wikisource.org/wiki/The_Thoughts_of_the_Emperor_Marcus_Aurelius_Antoninus/Book_I'
    }
  ]
};
