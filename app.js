(() => {
  'use strict';
  const records = window.PHILOSOPHERS;
  const timeline = document.getElementById('timeline');
  const details = document.getElementById('details');
  if (!Array.isArray(records) || !records.length) {
    timeline.textContent = 'The philosopher collection could not be loaded.';
    return;
  }
  // Convert historical years to continuous coordinates: 1 BCE and 1 CE are adjacent.
  const coordinate = year => year < 0 ? year + 1 : year;
  const start = coordinate(-500);
  const end = coordinate(200);
  const position = year => (coordinate(year) - start) / (end - start) * 100;
  const formatYear = year => `${Math.abs(year)} ${year < 0 ? 'BCE' : 'CE'}`;
  const ticks = [-500, -400, -300, -200, -100, 1, 100, 200];
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const axis = element('div', 'axis');
  axis.append(element('div', 'axis-label', 'Philosopher'));
  const axisTrack = element('div', 'track');
  ticks.forEach(year => {
    const tick = element('span', 'tick desktop-tick', formatYear(year));
    tick.style.left = `${position(year)}%`;
    axisTrack.append(tick);
  });
  [-500, -250, 200].forEach(year => {
    const tick = element('span', 'tick compact-tick', formatYear(year));
    tick.style.left = `${position(year)}%`;
    axisTrack.append(tick);
  });
  axis.append(axisTrack);
  timeline.append(axis);
  function select(record) {
    timeline.querySelectorAll('.life').forEach(button => {
      const active = button.dataset.id === record.id;
      button.setAttribute('aria-pressed', String(active));
      button.closest('.timeline-row').classList.toggle('selected', active);
    });
    details.replaceChildren();
    details.append(element('p', 'eyebrow', record.culture));
    const heading = element('h2', '', record.name);
    heading.id = 'detail-name';
    details.append(heading, element('p', 'dates', `${formatYear(record.birth)} – ${formatYear(record.death)}`), element('p', 'summary', record.summary));
    const definitions = element('dl');
    [['Tradition', record.tradition], ['Region / cultural sphere', record.region]].forEach(([label, value]) => definitions.append(element('dt', '', label), element('dd', '', value)));
    const link = element('a', 'source', 'Read the Britannica reference');
    link.href = record.source;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    details.append(definitions, element('p', 'date-note', record.dateNotes), link);
  }
  function activate(record, scrollToDetails) {
    select(record);
    if (!scrollToDetails) return;
    const heading = document.getElementById('detail-name');
    heading.tabIndex = -1;
    heading.focus({ preventScroll: true });
    details.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  }
  [...records].sort((a, b) => a.birth - b.birth).forEach(record => {
    const row = element('div', 'timeline-row');
    const name = element('div', 'name');
    const nameButton = element('button', 'name-button', record.name);
    nameButton.type = 'button';
    nameButton.setAttribute('aria-label', `Read about ${record.name}`);
    nameButton.addEventListener('click', event => {
      event.stopPropagation();
      activate(record, true);
    });
    name.append(nameButton);
    row.append(name);
    const track = element('div', 'track');
    ticks.forEach(year => {
      const line = element('span', year === 1 ? 'gridline era-line' : 'gridline');
      line.style.left = `${position(year)}%`;
      line.setAttribute('aria-hidden', 'true');
      track.append(line);
    });
    const button = element('button', `life${record.culture === 'Roman' ? ' roman' : ''}`);
    button.type = 'button';
    button.dataset.id = record.id;
    button.style.left = `${position(record.birth)}%`;
    button.style.width = `${position(record.death) - position(record.birth)}%`;
    button.setAttribute('aria-label', `${record.name}, ${formatYear(record.birth)} to ${formatYear(record.death)}. Show details.`);
    button.title = `${record.name}: ${formatYear(record.birth)}–${formatYear(record.death)}`;
    track.append(button);
    row.append(track);
    row.addEventListener('click', () => {
      activate(record, window.matchMedia('(max-width: 1100px)').matches);
    });
    timeline.append(row);
  });
  select(records[0]);
})();
