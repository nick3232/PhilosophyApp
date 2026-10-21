// Historical years: negative = BCE, positive = CE, no year zero.
// Sources are editorial references, not live requests or automatically rendered links.
window.HISTORICAL_EVENTS = [
  {
    id: 'athenian-reforms', name: 'Athenian Democratic Reforms',
    start: -508, end: -507, displayDate: '508/507 BCE', approximate: false, category: 'political',
    description: 'Cleisthenes reorganized the Athenian citizen body and political institutions in reforms conventionally dated to 508/507 BCE. They helped establish the framework of Athenian democracy, although political participation excluded women, enslaved people, and resident foreigners. This was the civic setting in which later Athenian philosophers debated justice and citizenship.',
    source: { title: 'Oxford Bibliographies, Cleisthenes', url: 'https://academic.oup.com/reference/62365/reference-article/554636006' }
  },
  {
    id: 'persian-wars', name: 'Persian Wars: Major Invasions',
    start: -490, end: -479, approximate: false, category: 'military',
    description: 'Persian campaigns against mainland Greece included Marathon in 490 BCE and the invasion of 480–479 BCE, resisted at battles such as Salamis and Plataea. These conflicts reshaped relations among the Greek city-states and preceded the growth of Athenian power. The displayed span focuses on the major invasions, not the entire longer history of Greek–Persian conflict.',
    source: { title: 'Encyclopedia.com, Introduction to the Greek-Persian Wars (490–479 BCE)', url: 'https://www.encyclopedia.com/history/encyclopedias-almanacs-transcripts-and-maps/introduction-greek-persian-wars-490-bce-479-bce' }
  },
  {
    id: 'peloponnesian-war', name: 'Peloponnesian War',
    start: -431, end: -404, approximate: false, category: 'military',
    description: 'Athens and Sparta fought with their respective allies in a prolonged struggle for power in the Greek world. The war ended in Athens’ defeat and brought severe political upheaval. Socrates lived through the conflict; the turmoil surrounding Athens during and after the war provides context for his later trial, without by itself explaining the verdict.',
    source: { title: 'World History Encyclopedia, Peloponnesian War', url: 'https://www.worldhistory.org/Peloponnesian_War/' }
  },
  {
    id: 'socrates-trial', name: 'Trial and Execution of Socrates',
    start: -399, end: -399, approximate: false, category: 'philosophical',
    description: 'An Athenian jury convicted Socrates on charges of impiety and corrupting the young, and he was executed in 399 BCE. Plato and Xenophon preserved influential accounts of his defense and character. His trial became a central episode in later discussions of philosophy, civic authority, and the examined life.',
    source: { title: 'World History Encyclopedia, Socrates', url: 'https://www.worldhistory.org/socrates/' }
  },
  {
    id: 'plato-academy', name: 'Founding of Plato’s Academy',
    start: -387, end: -387, approximate: true, category: 'philosophical',
    description: 'Plato gathered a philosophical community around the Academy in Athens, conventionally dated to about 387 BCE. The precise founding date and the community’s early institutional form are uncertain. It became an important setting for philosophical study, and Aristotle later spent approximately twenty years studying with Plato.',
    source: { title: 'Internet Encyclopedia of Philosophy, Plato: The Academy', url: 'https://iep.utm.edu/plato-academy/' }
  },
  {
    id: 'chaeronea', name: 'Battle of Chaeronea',
    start: -338, end: -338, approximate: false, category: 'military',
    description: 'Philip II of Macedon defeated an alliance led by Athens and Thebes at Chaeronea. The victory established Macedonian dominance over much of mainland Greece. It marked a major change in the political environment of the city-states in which Aristotle and other fourth-century thinkers lived.',
    source: { title: 'World History Encyclopedia, Battle of Chaeronea', url: 'https://www.worldhistory.org/Battle_of_Chaeronea/' }
  },
  {
    id: 'alexander-reign', name: 'Reign of Alexander the Great',
    start: -336, end: -323, approximate: false, category: 'political',
    description: 'Alexander succeeded Philip II as king of Macedon and conquered the Persian Empire before his death in 323 BCE. His campaigns created an extensive realm and intensified contacts across the eastern Mediterranean and western Asia. The kingdoms that emerged after his death formed the political setting of Hellenistic philosophy.',
    source: { title: 'World History Encyclopedia, Alexander the Great', url: 'https://www.worldhistory.org/Alexander_the_Great/' }
  },
  {
    id: 'alexander-death', name: 'Death of Alexander the Great',
    start: -323, end: -323, approximate: false, category: 'political',
    description: 'Alexander died in Babylon in 323 BCE, leaving no settled adult successor to rule his empire. Conflicts among his successors eventually produced several Hellenistic kingdoms. His death is commonly used as a boundary between the Classical and Hellenistic periods, rather than as an abrupt break in intellectual life.',
    source: { title: 'World History Encyclopedia, Alexander the Great', url: 'https://www.worldhistory.org/Alexander_the_Great/' }
  },
  {
    id: 'stoicism-founding', name: 'Founding of Stoicism',
    start: -300, end: -300, approximate: true, category: 'philosophical',
    description: 'Zeno of Citium began teaching in Athens around 300 BCE, establishing the school later known as Stoicism. Its name refers to the Stoa Poikile, or painted porch, associated with his teaching. Later Greek and Roman Stoics developed its accounts of reason, virtue, nature, and the good life.',
    source: { title: 'Internet Encyclopedia of Philosophy, Stoicism', url: 'https://iep.utm.edu/stoicism/' }
  },
  {
    id: 'punic-wars', name: 'Punic Wars',
    start: -264, end: -146, approximate: false, category: 'military',
    dateNotes: 'The bar spans three separate wars, including intervening periods of peace.',
    description: 'Rome and Carthage fought three wars between 264 and 146 BCE over power in the Mediterranean. Rome’s victories expanded its territory, and the final war ended with the destruction of Carthage. The conflicts form part of the broader background to Rome’s rise as a Mediterranean power, not a demonstrated cause of any particular philosophical teaching.',
    source: { title: 'World History Encyclopedia, Punic Wars', url: 'https://www.worldhistory.org/Punic_Wars/' }
  },
  {
    id: 'corinth-146', name: 'Sack of Corinth and Roman Ascendancy',
    start: -146, end: -146, approximate: false, category: 'political',
    description: 'Roman forces defeated the Achaean League and destroyed Corinth in 146 BCE, consolidating Roman dominance in southern Greece. This did not mean that all Greece became a single Roman province that year; the province of Achaea was organized under Augustus in 27 BCE. Greek philosophical traditions continued under changing arrangements of Roman power.',
    source: { title: 'Perseus, Corinth; Gardens of the Roman Empire, Achaea historical context', url: 'https://www.perseus.tufts.edu/hopper/artifact?name=Corinth&object=Site' },
    additionalSource: { title: 'Gardens of the Roman Empire, Villa of Herodes Atticus', url: 'https://roman-gardens.github.io/province/achaea/eua/villa_of_herodes_atticus/' }
  },
  {
    id: 'caesar-dictatorship', name: 'Caesar’s Rise and Dictatorship',
    start: -49, end: -44, approximate: false, category: 'political',
    description: 'Caesar’s crossing of the Rubicon in 49 BCE began a civil war against Pompey and his allies. His victories led to concentrated personal power and successive dictatorships, ending with his assassination in 44 BCE. Cicero lived through this crisis of the Roman Republic and wrote about political duty and government within its changing circumstances.',
    source: { title: 'World History Encyclopedia, Julius Caesar', url: 'https://www.worldhistory.org/Julius_Caesar/' }
  },
  {
    id: 'actium', name: 'Battle of Actium',
    start: -31, end: -31, approximate: false, category: 'military',
    description: 'Octavian’s fleet, commanded by Agrippa, defeated the forces of Antony and Cleopatra at Actium. The victory was a decisive step toward Octavian’s sole rule, though the civil war did not end immediately. It belongs to the transition from republican civil conflict to the imperial political order.',
    source: { title: 'World History Encyclopedia, Battle of Actium', url: 'https://www.worldhistory.org/Battle_of_Actium/' }
  },
  {
    id: 'augustus-principate', name: 'Beginning of Augustus’ Principate',
    start: -27, end: -27, approximate: false, category: 'political',
    description: 'In 27 BCE the Senate granted Octavian the name Augustus as he reshaped his position within Roman government. This settlement is conventionally used to mark the beginning of the Principate, a system of imperial rule that retained republican offices and language. Seneca, Epictetus, and Marcus Aurelius later practiced philosophy within this imperial world.',
    source: { title: 'World History Encyclopedia, Augustus', url: 'https://www.worldhistory.org/augustus/' }
  },
  {
    id: 'nero-reign', name: 'Reign of Nero',
    start: 54, end: 68, approximate: false, category: 'political',
    description: 'Nero ruled the Roman Empire from 54 to 68 CE, a reign marked by court politics and growing conflict. Seneca served as an adviser during its early years and was compelled to take his own life in 65 CE after being implicated in the Pisonian conspiracy. This is a documented biographical connection, distinct from simply living during the same reign.',
    source: { title: 'World History Encyclopedia, Nero; PBS, Roman Empire timeline (65 CE)', url: 'https://www.worldhistory.org/Nero/' },
    additionalSource: { title: 'PBS, The Roman Empire: In the First Century', url: 'https://www.pbs.org/empires/romans/special/timeline_21.html' }
  },
  {
    id: 'rome-fire', name: 'Great Fire of Rome',
    start: 64, end: 64, approximate: false, category: 'cultural-social',
    description: 'A major fire devastated large areas of Rome in 64 CE during Nero’s reign. It led to extensive rebuilding and became entangled with accusations and persecution; claims that Nero deliberately caused it should not be treated as established fact. Its overlap with a philosopher’s lifetime establishes contemporaneity, not that the person witnessed the fire.',
    source: { title: 'PBS, The Roman Empire: In the First Century, Great Fire of Rome', url: 'https://www.pbs.org/empires/romans/special/timeline_21.html' }
  },
  {
    id: 'nerva-antonine', name: 'Nerva–Antonine Dynasty',
    start: 96, end: 192, approximate: false, category: 'political',
    description: 'This grouping of Roman emperors runs from Nerva’s accession in 96 CE to Commodus’s death in 192 CE. The period commonly called the Five Good Emperors ends with Marcus Aurelius in 180 CE and is not identical to the dynasty’s full span. Epictetus and Marcus Aurelius lived during parts of this longer imperial period.',
    source: { title: 'Hallie Ford Museum of Art, Flavian to Nerva-Antonine', url: 'https://library.willamette.edu/hfma/omeka/exhibits/show/coinsofthegreekandromanworld/roman/flaviantonervaantonine' }
  },
  {
    id: 'marcus-reign', name: 'Reign of Marcus Aurelius',
    start: 161, end: 180, approximate: false, category: 'political',
    description: 'Marcus Aurelius ruled from 161 to 180 CE, initially alongside Lucius Verus and later with Commodus as co-emperor. His reign included military campaigns and serious pressures on the empire. His Meditations records philosophical exercises by a ruler attempting to practice Stoic judgment and duty, rather than a systematic account of imperial policy.',
    source: { title: 'Livius, Antonines; shared Marcus Aurelius biography', url: 'https://www.livius.org/articles/dynasty/antonines/' }
  }
];
