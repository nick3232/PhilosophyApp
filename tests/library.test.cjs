const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const context = { window: {} };
for (const file of ['data.js', 'library-data.js', 'library-filter.js']) {
  vm.runInNewContext(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'), context);
}
const { PRIMARY_SOURCES: passages, PHILOSOPHERS: philosophers, LIBRARY_FILTER: filter } = context.window;
const index = filter.createIndex(passages, philosophers);
const ids = state => Array.from(index.filter(entry => filter.matches(entry, state)), entry => entry.passage.id);

test('curated bank has valid unique records and source metadata', () => {
  assert.equal(passages.length, 15);
  assert.equal(new Set(passages.map(p => p.id)).size, passages.length);
  for (const p of passages) {
    for (const field of ['id', 'philosopherId', 'work', 'topic', 'description', 'passage', 'reference', 'translator', 'edition', 'sourceUrl', 'context']) {
      assert.equal(typeof p[field], 'string', `${p.id}: ${field}`);
      assert.ok(p[field].trim(), `${p.id}: empty ${field}`);
    }
    assert.ok(philosophers.some(author => author.id === p.philosopherId));
    assert.equal(new URL(p.sourceUrl).protocol, 'https:');
    assert.ok(p.passage.split(/\s+/).length < 50, 'Keep initial selections brief');
  }
  assert.equal(new Set(passages.map(p => p.philosopherId)).size, 7);
  assert.equal(new Set(passages.map(p => p.topic)).size, 6);
});

test('dialogue speakers and recorded teachings are attributed separately', () => {
  for (const p of passages.filter(p => p.philosopherId === 'philosopher-2')) assert.match(p.attribution, /Socrates/);
  for (const p of passages.filter(p => p.philosopherId === 'philosopher-9')) assert.match(p.attribution, /Arrian/);
  assert.ok(!passages.some(p => p.philosopherId === 'philosopher-1'));
});

test('all required search fields support partial, case-insensitive matching', () => {
  const samples = [
    ['aRiStOt', 'virtue-habit'], ['MENOE', 'pleasure'], ['SELF-CONT', 'control'],
    ['Repeated practice', 'virtue-habit'], ['ACTIVITY OF SOUL', 'flourishing']
  ];
  for (const [query, id] of samples) assert.ok(ids({ query: `  ${query}  ` }).includes(id), query);
  assert.deepEqual(ids({ query: 'zzzz-unmatched' }), []);
});

test('both independent filters and their intersections apply to every combination', () => {
  const choices = filter.choices(index);
  for (const author of ['', ...choices.authors.map(p => p.id)]) {
    for (const topic of ['', ...choices.topics]) {
      for (const query of ['', 'virtue', 'soul', 'not-found']) {
        const actual = ids({ philosopherId: author, topic, query });
        const expected = passages.filter(p => (!author || p.philosopherId === author) && (!topic || p.topic === topic)
          && [philosophers.find(a => a.id === p.philosopherId).name, p.work, p.topic, p.description, p.passage, p.attribution]
            .join('\n').toLowerCase().includes(query)).map(p => p.id);
        assert.deepEqual(actual, Array.from(expected));
      }
    }
  }
  assert.deepEqual(ids({ philosopherId: 'philosopher-4', topic: 'Ethics and Virtue', query: 'habit' }), ['virtue-habit']);
});

test('empty state restores all entries and filtering never changes the bank', () => {
  const before = JSON.stringify(passages);
  assert.equal(ids({}).length, 15);
  assert.equal(ids({ query: '   ', philosopherId: '', topic: '' }).length, 15);
  ids({ query: 'virtue' });
  assert.equal(JSON.stringify(passages), before);
});

test('adding a record expands choices and search without renderer changes', () => {
  const addition = { ...passages[0], id: 'new-record', philosopherId: 'philosopher-1', topic: 'New topic', passage: 'A unique test phrase' };
  const extended = filter.createIndex([...passages, addition], philosophers);
  const choices = filter.choices(extended);
  assert.ok(choices.authors.some(p => p.name === 'Socrates'));
  assert.ok(choices.topics.includes('New topic'));
  assert.equal(extended.filter(p => filter.matches(p, { query: 'unique test' })).length, 1);
  assert.throws(() => filter.createIndex([{ ...addition, philosopherId: 'missing' }], philosophers), /Unknown library author/);
});
