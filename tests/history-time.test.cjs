const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { runInNewContext } = require('node:vm');
const context = { window: {} };
for (const file of ['data.js', 'history-data.js', 'history-time.js']) {
  runInNewContext(readFileSync(join(__dirname, '..', file), 'utf8'), context);
}
const philosophers = context.window.PHILOSOPHERS;
const events = context.window.HISTORICAL_EVENTS;
const time = context.window.HISTORY_TIME;
const byId = id => events.find(event => event.id === id) || philosophers.find(record => record.id === id);
const all = () => new Set(['political-military', 'cultural-social', 'philosophical']);
const ids = records => Array.from(records, record => record.id).sort();

test('BCE coordinates are continuous across the era boundary and reject year zero', () => {
  assert.equal(time.coordinate(-500), -499);
  assert.equal(time.coordinate(-1), 0);
  assert.equal(time.coordinate(1), 1);
  assert.equal(time.coordinate(1) - time.coordinate(-1), 1);
  assert.throws(() => time.coordinate(0));
  assert.throws(() => time.coordinate(1.5));
  assert.throws(() => time.interval({ start: -404, end: -431 }));
});

test('conventional date labels support points, ranges, approximation, and both eras', () => {
  assert.equal(time.formatRange(byId('peloponnesian-war')), '431–404 BCE');
  assert.equal(time.formatRange(byId('rome-fire')), '64 CE');
  assert.equal(time.formatRange(byId('plato-academy')), 'c. 387 BCE');
  assert.equal(time.formatRange(byId('athenian-reforms')), '508/507 BCE');
  assert.equal(time.formatRange(byId('philosopher-8')), '4 BCE–65 CE');
  assert.equal(time.formatRange({ start: -1, end: 1 }), '1 BCE–1 CE');
  assert.equal(time.formatRange({ start: 54, end: 68 }), '54–68 CE');
});

test('one scale contains all records, expands for earlier data, and positions equal years equally', () => {
  const scale = time.createScale([...philosophers, ...events]);
  assert.equal(scale.start, -510);
  assert.equal(scale.end, 200);
  assert.equal(scale.position(-510), 0);
  assert.equal(scale.position(200), 100);
  assert.ok(!scale.ticks.includes(0));
  assert.ok(scale.ticks.includes(1));
  for (const record of [...philosophers, ...events]) {
    const geometry = scale.geometry(record);
    assert.ok(geometry.left >= 0);
    assert.ok(geometry.width >= 0);
    assert.ok(geometry.left + geometry.width <= 100);
  }
  const socrates = scale.geometry(byId('philosopher-1'));
  const trial = scale.geometry(byId('socrates-trial'));
  assert.ok(Math.abs(socrates.left + socrates.width - trial.left) < 1e-10);
  assert.equal(trial.width, 0);
  const crossEra = scale.geometry({ start: -1, end: 1 });
  assert.ok(Math.abs(crossEra.width - 100 / 709) < 1e-10);
  const expanded = time.createScale([{ start: -604, end: 251 }]);
  assert.equal(expanded.start, -610);
  assert.equal(expanded.end, 260);
});

test('overlap is symmetric, inclusive at the year level, and excludes events after death', () => {
  assert.ok(time.overlaps(byId('philosopher-1'), byId('peloponnesian-war')));
  assert.ok(time.overlaps(byId('peloponnesian-war'), byId('philosopher-1')));
  assert.ok(time.overlaps(byId('philosopher-1'), byId('socrates-trial')));
  assert.ok(!time.overlaps(byId('philosopher-1'), byId('plato-academy')));
  assert.ok(time.overlaps(byId('philosopher-8'), byId('rome-fire')));
  assert.ok(time.overlaps(byId('philosopher-8'), { start: 65 }));
  assert.ok(!time.overlaps(byId('philosopher-8'), { start: 66 }));
  assert.ok(!time.overlaps({ start: -2, end: -1 }, { start: 1, end: 2 }));
  assert.ok(time.overlaps({ start: -2, end: 1 }, { start: 1 }));
});

test('the 18-event bank is valid, sourced, and retains the corrected historical boundaries', () => {
  assert.equal(events.length, 18);
  assert.equal(new Set(events.map(event => event.id)).size, 18);
  const valid = new Set(['political', 'military', 'cultural-social', 'philosophical']);
  for (const event of events) {
    time.interval(event);
    assert.ok(valid.has(event.category));
    assert.equal(typeof event.approximate, 'boolean');
    assert.ok(event.name && event.description && event.source.title);
    assert.ok(event.source.url.startsWith('https://'));
  }
  assert.equal(byId('nerva-antonine').end, 192);
  assert.ok(byId('nerva-antonine').description.includes('180 CE'));
  assert.ok(byId('corinth-146').description.includes('27 BCE'));
  assert.ok(byId('punic-wars').dateNotes.includes('three separate wars'));
});

test('point and period selections derive contemporaries from dates rather than manual lists', () => {
  for (const id of ['rome-fire', 'nero-reign']) {
    const view = time.selectionView(philosophers, events, all(), { kind: 'event', id });
    assert.deepEqual(ids(view.philosophers), ['philosopher-8', 'philosopher-9']);
  }
  const earlier = time.selectionView(philosophers, events, all(), { kind: 'event', id: 'athenian-reforms' });
  assert.equal(earlier.philosophers.length, 0);
  const socrates = time.selectionView(philosophers, events, all(), { kind: 'philosopher', id: 'philosopher-1' });
  assert.deepEqual(ids(socrates.events), ['peloponnesian-war', 'socrates-trial']);
  const aristotle = time.selectionView(philosophers, events, all(), { kind: 'philosopher', id: 'philosopher-4' });
  assert.deepEqual(ids(aristotle.events), ['alexander-death', 'alexander-reign', 'chaeronea']);
});

test('all three category groups filter independently, including every combination', () => {
  const groups = ['political-military', 'cultural-social', 'philosophical'];
  const counts = [14, 1, 3];
  for (let mask = 0; mask < 8; mask += 1) {
    const enabled = new Set(groups.filter((group, index) => mask & (1 << index)));
    const expected = counts.reduce((sum, count, index) => sum + (mask & (1 << index) ? count : 0), 0);
    assert.equal(time.visibleEvents(events, enabled).length, expected);
  }
});

test('filters preserve philosopher selections, remove hidden event selections, and allow reset', () => {
  const onlyCulture = new Set(['cultural-social']);
  const philosopher = time.selectionView(philosophers, events, onlyCulture, { kind: 'philosopher', id: 'philosopher-8' });
  assert.equal(philosopher.selected.id, 'philosopher-8');
  assert.deepEqual(ids(philosopher.events), ['rome-fire']);
  const retained = time.selectionView(philosophers, events, new Set(), { kind: 'philosopher', id: 'philosopher-8' });
  assert.equal(retained.selected.id, 'philosopher-8');
  assert.equal(retained.events.length, 0);
  const hidden = time.selectionView(philosophers, events, onlyCulture, { kind: 'event', id: 'nero-reign' });
  assert.equal(hidden.selected, null);
  assert.equal(hidden.kind, null);
  const reset = time.selectionView(philosophers, events, onlyCulture, null);
  assert.equal(reset.selected, null);
  assert.equal(reset.philosophers.length, 0);
  assert.deepEqual(ids(reset.visible), ['rome-fire']);
});
