(() => {
  'use strict';
  const philosophers = window.PHILOSOPHERS;
  const events = window.HISTORICAL_EVENTS;
  const time = window.HISTORY_TIME;
  const timeline = document.getElementById('history-timeline');
  const details = document.getElementById('history-details');
  const status = document.getElementById('history-filter-status');
  const reset = document.getElementById('history-reset');
  const filters = [...document.querySelectorAll('.history-filters input')];
  if (!Array.isArray(philosophers) || !philosophers.length || !Array.isArray(events) || !events.length || !time) {
    timeline.textContent = 'The historical timeline could not be loaded.';
    reset.disabled = true;
    filters.forEach(input => { input.disabled = true; });
    return;
  }
  const categoryLabels = { political: 'Political', military: 'Military', 'cultural-social': 'Cultural / Social', philosophical: 'Philosophical' };
  const sortedPhilosophers = [...philosophers].sort((a, b) => a.birth - b.birth);
  const sortedEvents = [...events].sort((a, b) => a.start - b.start || a.end - b.end);
  const scale = time.createScale([...philosophers, ...events]);
  const enabled = new Set(filters.map(input => input.value));
  const rows = [];
  let selection = null;
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  document.getElementById('history-range').textContent = `${time.formatYear(scale.start)}–${time.formatYear(scale.end)} · Philosopher dates follow the shared collection and may be approximate.`;
  const grid = track => scale.ticks.forEach(year => {
    const line = element('span', `history-gridline${year === 1 ? ' era' : ''}`);
    line.style.left = `${scale.position(year)}%`;
    line.setAttribute('aria-hidden', 'true');
    track.append(line);
  });
  function axis() {
    const row = element('div', 'history-axis');
    const track = element('div', 'history-track');
    const label = element('span', 'history-axis-label', 'Historical years');
    scale.ticks.forEach(year => {
      const tick = element('span', 'history-tick', time.formatYear(year));
      tick.style.left = `${scale.position(year)}%`;
      track.append(tick);
    });
    row.append(label, track);
    return row;
  }
  function addRow(record, kind) {
    const row = element('div', `history-row ${kind}${kind === 'event' ? ` ${record.category}` : ''}`);
    row.dataset.kind = kind;
    row.dataset.id = record.id;
    const button = element('button', 'history-row-button');
    button.type = 'button';
    button.setAttribute('aria-controls', 'history-details');
    const meta = kind === 'event' ? `${categoryLabels[record.category]} · ${time.formatRange(record)}` : time.formatRange(record);
    button.append(element('span', 'history-row-name', record.name), element('small', 'history-row-meta', meta));
    const track = element('div', 'history-track');
    grid(track);
    const { left, width } = scale.geometry(record);
    const mark = element('button', `history-mark${kind === 'event' && width === 0 ? ' point' : ''}${record.approximate ? ' approximate' : ''}`);
    mark.type = 'button';
    mark.style.left = `${left}%`;
    mark.style.width = kind === 'event' && width === 0 ? '44px' : `${width}%`;
    mark.setAttribute('aria-label', `${record.name}, ${time.formatRange(record)}. Show ${kind === 'event' ? 'contemporary philosophers' : 'overlapping events'}.`);
    mark.setAttribute('aria-controls', 'history-details');
    const shape = element('span', 'history-shape');
    shape.setAttribute('aria-hidden', 'true');
    mark.append(shape);
    [button, mark].forEach(control => control.addEventListener('click', () => select(kind, record.id)));
    track.append(mark);
    row.append(button, track);
    timeline.append(row);
    rows.push({ row, button, mark, kind, record });
  }
  timeline.append(element('h3', 'history-section-title', 'Philosophers'), axis());
  sortedPhilosophers.forEach(record => addRow(record, 'philosopher'));
  const eventsTitle = element('h3', 'history-section-title', 'Historical Events');
  timeline.append(eventsTitle, axis());
  sortedEvents.forEach(event => addRow(event, 'event'));
  const empty = element('p', 'history-empty', 'No historical events are visible. Enable a category above to restore events; philosopher lifetimes remain visible.');
  timeline.append(empty);

  function select(kind, id, fromDetails = false) {
    selection = { kind, id };
    update();
    // Match the original timeline's phone behavior: make the information easy to reach.
    if (fromDetails || window.matchMedia('(max-width: 1100px)').matches) {
      document.getElementById('history-detail-title').focus({ preventScroll: true });
      details.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }
  function renderDetails(view) {
    const heading = element('h2', 'question-title', view.selected?.name || 'Select a philosopher or event');
    heading.id = 'history-detail-title';
    heading.tabIndex = -1;
    const content = [heading];
    if (!view.selected) {
      content.push(element('p', 'history-detail-body', 'Choose a name or timeline marker to see its description and chronological overlaps. Clear selection restores the unhighlighted view while keeping your category filters.'));
    } else {
      const record = view.selected;
      content.push(element('p', 'idea-tradition', time.formatRange(record)), element('p', 'eyebrow', view.kind === 'event' ? categoryLabels[record.category] : record.tradition), element('p', 'history-detail-body', view.kind === 'event' ? record.description : record.summary));
      if (record.dateNotes) content.push(element('p', 'schools-note', record.dateNotes));
      const related = view.kind === 'event' ? view.philosophers : view.events;
      content.push(element('h3', '', view.kind === 'event' ? 'Philosophers alive during this event' : 'Overlapping events in visible categories'));
      if (related.length) {
        const list = element('ul', 'history-related');
        related.forEach(item => {
          const entry = element('li');
          const button = element('button', 'history-related-button');
          button.type = 'button';
          button.append(element('span', '', item.name), element('small', '', time.formatRange(item)));
          button.addEventListener('click', () => select(view.kind === 'event' ? 'philosopher' : 'event', item.id, true));
          entry.append(button);
          list.append(entry);
        });
        content.push(list);
      } else content.push(element('p', 'schools-note', view.kind === 'event' ? 'None of the philosophers in this collection were alive during this event.' : 'No overlapping events in the enabled categories.'));
      if (view.kind === 'philosopher') {
        const hiddenCount = events.filter(event => time.overlaps(record, event)).length - related.length;
        if (hiddenCount) content.push(element('p', 'schools-note', `${hiddenCount} additional overlapping ${hiddenCount === 1 ? 'event is' : 'events are'} hidden by category filters.`));
      }
      content.push(element('p', 'history-overlap-note', 'Year-level overlap establishes contemporaneity only, not personal involvement, location, or a direct influence on ideas.'));
    }
    details.replaceChildren(...content);
  }
  function update() {
    const view = time.selectionView(sortedPhilosophers, sortedEvents, enabled, selection);
    const cleared = Boolean(selection) && !view.selected;
    if (cleared) selection = null;
    const visibleIds = new Set(view.visible.map(event => event.id));
    const matchedPhilosophers = new Set(view.philosophers.map(record => record.id));
    const matchedEvents = new Set(view.events.map(event => event.id));
    rows.forEach(({ row, button, mark, kind, record }) => {
      row.hidden = kind === 'event' && !visibleIds.has(record.id);
      const selected = view.kind === kind && view.selected.id === record.id;
      const matched = kind === 'event' ? matchedEvents.has(record.id) : matchedPhilosophers.has(record.id);
      row.classList.toggle('selected', selected);
      row.classList.toggle('matched', Boolean(view.selected) && matched);
      row.classList.toggle('dimmed', Boolean(view.selected) && !matched);
      [button, mark].forEach(control => control.setAttribute('aria-pressed', String(selected)));
    });
    empty.hidden = view.visible.length > 0;
    eventsTitle.textContent = `Historical Events · ${view.visible.length} visible`;
    status.textContent = `${view.visible.length} of ${events.length} historical events visible.${cleared ? ' Selection cleared because its event category is hidden.' : ''}`;
    renderDetails(view);
  }
  filters.forEach(input => input.addEventListener('change', () => {
    if (input.checked) enabled.add(input.value);
    else enabled.delete(input.value);
    update();
  }));
  reset.addEventListener('click', () => { selection = null; update(); });
  update();
})();
