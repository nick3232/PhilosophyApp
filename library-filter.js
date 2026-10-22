(() => {
  'use strict';
  const normalize = value => String(value || '').trim().toLocaleLowerCase('en');
  function createIndex(passages, philosophers) {
    const names = new Map(philosophers.map(record => [record.id, record.name]));
    return passages.map(passage => {
      const author = names.get(passage.philosopherId);
      if (!author) throw new Error(`Unknown library author: ${passage.philosopherId}`);
      return {
        passage,
        author,
        searchText: normalize([author, passage.work, passage.topic, passage.description, passage.passage, passage.attribution].join('\n'))
      };
    });
  }
  function matches(entry, { query = '', philosopherId = '', topic = '' } = {}) {
    return (!philosopherId || entry.passage.philosopherId === philosopherId)
      && (!topic || entry.passage.topic === topic)
      && entry.searchText.includes(normalize(query));
  }
  function choices(index) {
    return {
      authors: [...new Map(index.map(entry => [entry.passage.philosopherId, entry.author]))]
        .map(([id, name]) => ({ id, name })).sort((a, b) => a.name.localeCompare(b.name, 'en')),
      topics: [...new Set(index.map(entry => entry.passage.topic))].sort((a, b) => a.localeCompare(b, 'en'))
    };
  }
  window.LIBRARY_FILTER = { createIndex, matches, choices };
})();
