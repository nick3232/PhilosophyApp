(() => {
  'use strict';
  const schools = window.PHILOSOPHICAL_SCHOOLS;
  const philosophers = new Map((window.PHILOSOPHERS || []).map(record => [record.id, record]));
  const overview = document.getElementById('school-overview');
  const choices = document.getElementById('school-choices');
  const category = document.getElementById('comparison-category');
  const table = document.getElementById('school-comparison');
  const scroll = document.getElementById('comparison-scroll');
  const hint = document.getElementById('comparison-hint');
  const status = document.getElementById('comparison-status');
  const categories = [
    ['happiness', 'Happiness / Good Life'],
    ['virtue', 'Virtue'],
    ['knowledge', 'Knowledge'],
    ['emphasis', 'Distinctive Emphasis']
  ];
  if (!Array.isArray(schools) || !schools.length) {
    overview.textContent = 'The philosophical schools could not be loaded.';
    document.querySelector('.comparison-controls').hidden = true;
    scroll.hidden = true;
    hint.hidden = true;
    return;
  }
  const selected = new Set(schools.map(school => school.id));
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  function renderComparison() {
    const visibleSchools = schools.filter(school => selected.has(school.id));
    const columns = categories.filter(([key]) => category.value === 'all' || key === category.value);
    const empty = visibleSchools.length === 0;
    scroll.hidden = empty;
    hint.hidden = empty || category.value !== 'all';
    status.textContent = empty
      ? 'Choose at least one school above to begin comparing its ideas.'
      : `${visibleSchools.length} ${visibleSchools.length === 1 ? 'school' : 'schools'} · ${category.options[category.selectedIndex].textContent}`;
    const caption = element('caption', 'visually-hidden', 'Selected philosophical schools and their approaches');
    const head = element('thead');
    const headingRow = element('tr');
    ['School', ...columns.map(([, label]) => label)].forEach(label => {
      const cell = element('th', '', label);
      cell.scope = 'col';
      headingRow.append(cell);
    });
    head.append(headingRow);
    const body = element('tbody');
    visibleSchools.forEach(school => {
      const row = element('tr');
      const name = element('th', '', school.name);
      name.scope = 'row';
      row.append(name);
      columns.forEach(([key]) => row.append(element('td', '', school[key])));
      body.append(row);
    });
    table.classList.toggle('single-category', category.value !== 'all');
    table.replaceChildren(caption, head, body);
  }
  schools.forEach(school => {
    const card = element('article', 'school-card');
    card.dataset.schoolId = school.id;
    const heading = element('h3', '', school.name);
    const facts = element('dl');
    [
      ['Principal philosophers', school.philosopherIds.map(id => philosophers.get(id)?.name || 'Unknown philosopher').join(', ')],
      ['Central idea', school.centralIdea],
      ['Distinctive emphasis', school.emphasis]
    ].forEach(([label, value]) => facts.append(element('dt', '', label), element('dd', '', value)));
    card.append(heading, element('p', 'school-founding', school.founding), facts);
    overview.append(card);

    const label = element('label', 'school-choice');
    const checkbox = element('input');
    checkbox.type = 'checkbox';
    checkbox.value = school.id;
    checkbox.checked = true;
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) selected.add(school.id);
      else selected.delete(school.id);
      renderComparison();
    });
    label.append(checkbox, element('span', '', school.name));
    choices.append(label);
  });
  category.addEventListener('change', renderComparison);
  renderComparison();
})();
