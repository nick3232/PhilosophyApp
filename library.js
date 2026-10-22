(() => {
  'use strict';
  const passages = window.PRIMARY_SOURCES;
  const filter = window.LIBRARY_FILTER;
  const cards = document.getElementById('library-cards');
  const status = document.getElementById('library-status');
  const empty = document.getElementById('library-empty');
  const search = document.getElementById('library-search');
  const author = document.getElementById('library-author');
  const topic = document.getElementById('library-topic');
  const clearSearch = document.getElementById('library-clear-search');
  if (!Array.isArray(passages) || !passages.length || !filter) {
    status.textContent = 'The library could not be loaded. Please reload the page.';
    return;
  }
  const element = (tag, className, text = '') => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    return node;
  };
  let index;
  try {
    index = filter.createIndex(passages, window.PHILOSOPHERS || []);
  } catch (error) {
    status.textContent = 'The library could not be loaded because an author record is missing.';
    return;
  }
  const choices = filter.choices(index);
  choices.authors.forEach(record => {
    const option = element('option', '', record.name);
    option.value = record.id;
    author.append(option);
  });
  choices.topics.forEach(name => {
    const option = element('option', '', name);
    option.value = name;
    topic.append(option);
  });
  const rows = index.map(entry => {
    const passage = entry.passage;
    const card = element('article', 'library-card');
    card.dataset.passageId = passage.id;
    const title = element('h3', '', passage.work);
    title.id = `library-title-${passage.id}`;
    card.setAttribute('aria-labelledby', title.id);
    card.append(element('p', 'library-author', entry.author), title,
      element('p', 'library-topic', passage.topic), element('p', 'library-description', passage.description));
    const details = element('details', 'library-reading');
    const summary = element('summary');
    const label = element('span', '', 'Read Passage');
    summary.append(label, element('span', 'visually-hidden', `: ${passage.work} — ${passage.description}`));
    const content = element('div', 'library-reading-content');
    content.append(element('h4', '', 'Passage · brief excerpt'));
    const quote = element('blockquote');
    quote.cite = passage.sourceUrl;
    passage.passage.split('\n\n').forEach(paragraph => quote.append(element('p', '', paragraph)));
    content.append(quote);
    if (passage.attribution) content.append(element('p', 'library-attribution', passage.attribution));
    content.append(element('h4', '', 'Source information'));
    const source = element('dl', 'library-source');
    [['Work and reference', `${entry.author}, ${passage.work} — ${passage.reference}`],
      ['Translator', passage.translator], ['Translation / edition', passage.edition],
      ['Text status', 'Public-domain English translation in the United States.']].forEach(([term, value]) => {
      source.append(element('dt', '', term), element('dd', '', value));
    });
    const sourceLink = element('a', 'source', 'Read the source transcription (online)');
    sourceLink.href = passage.sourceUrl;
    content.append(source, sourceLink, element('h4', '', 'Philosophical context'), element('p', 'library-context', passage.context));
    const close = element('button', 'library-close', 'Close Passage');
    close.type = 'button';
    close.addEventListener('click', () => {
      details.open = false;
      summary.focus();
    });
    content.append(close);
    details.append(summary, content);
    details.addEventListener('toggle', () => {
      label.textContent = details.open ? 'Close Passage' : 'Read Passage';
    });
    card.append(details);
    cards.append(card);
    return { entry, card };
  });
  function update() {
    const state = { query: search.value, philosopherId: author.value, topic: topic.value };
    let count = 0;
    rows.forEach(({ entry, card }) => {
      const visible = filter.matches(entry, state);
      card.hidden = !visible;
      if (visible) count += 1;
    });
    status.textContent = `Showing ${count} of ${passages.length} passages`;
    empty.hidden = count !== 0;
  }
  search.addEventListener('input', update);
  author.addEventListener('change', update);
  topic.addEventListener('change', update);
  clearSearch.addEventListener('click', () => {
    search.value = '';
    update();
    search.focus();
  });
  document.getElementById('library-reset').addEventListener('click', () => {
    search.value = '';
    author.value = '';
    topic.value = '';
    update();
  });
  update();
})();
