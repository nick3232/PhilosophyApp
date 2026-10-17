(() => {
  'use strict';
  const data = window.PHILOSOPHY_NETWORK;
  const canvas = document.getElementById('network-canvas');
  const details = document.getElementById('network-details');
  const list = document.getElementById('network-relationships');
  const reset = document.getElementById('network-reset');
  const categories = { direct: 'Direct personal relationship', intellectual: 'Significant intellectual influence' };
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  if (!data || !Array.isArray(data.relationships) || !data.layout?.nodes.length) {
    canvas.textContent = 'The influence network could not be loaded.';
    reset.disabled = true;
    return;
  }
  const records = new Map([...(window.PHILOSOPHERS || []), ...data.additionalPhilosophers].map(record => [record.id, record]));
  const positions = new Map(data.layout.nodes.map(node => [node.id, node]));
  const relationships = new Map(data.relationships.map(edge => [edge.id, edge]));
  if (data.layout.nodes.some(node => !records.has(node.id)) || data.relationships.some(edge =>
    !positions.has(edge.source) || !positions.has(edge.target) || !categories[edge.category])) {
    canvas.textContent = 'The network contains an invalid philosopher or relationship reference.';
    reset.disabled = true;
    return;
  }
  const nodeButtons = new Map();
  const edgeGroups = new Map();
  const edgeButtons = new Map();
  const { width, height, nodeWidth, nodeHeight } = data.layout;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const svgElement = (tag, attributes = {}) => {
    const node = document.createElementNS('http://www.w3.org/2000/svg', tag);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
    return node;
  };
  const svg = svgElement('svg', { width, height, viewBox: `0 0 ${width} ${height}`, class: 'network-arrows', role: 'group', 'aria-label': 'Influence arrows' });
  const defs = svgElement('defs');
  ['direct', 'intellectual', 'selected'].forEach(type => {
    const marker = svgElement('marker', { id: `arrow-${type}`, viewBox: '0 0 10 10', refX: 10, refY: 5, markerWidth: 9, markerHeight: 9, orient: 'auto', markerUnits: 'userSpaceOnUse' });
    marker.append(svgElement('path', { d: 'M 0 0 L 10 5 L 0 10 Z', class: `arrow-head ${type}` }));
    defs.append(marker);
  });
  svg.append(defs);
  canvas.append(svg);
  const labelFor = edge => `${records.get(edge.source).name} → ${records.get(edge.target).name}`;
  const formatYear = year => `${Math.abs(year)} ${year < 0 ? 'BCE' : 'CE'}`;
  const datesFor = record => `${formatYear(record.birth)} – ${formatYear(record.death)}`;
  const sourceLink = (label, url) => {
    const link = element('a', 'source', label);
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    return link;
  };
  const relationshipButton = edge => {
    const button = element('button', 'network-relationship-button');
    button.type = 'button';
    button.dataset.relationshipId = edge.id;
    button.append(element('span', '', labelFor(edge)), element('small', '', categories[edge.category]));
    button.addEventListener('click', () => {
      // A panel relationship button is replaced when the evidence view is rendered.
      const showDetails = details.contains(button) || list.contains(button);
      select('relationship', edge.id);
      if (showDetails) {
        document.getElementById('network-detail-title').focus({ preventScroll: true });
        details.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      }
    });
    return button;
  };
  data.relationships.forEach(edge => {
    const start = positions.get(edge.source);
    const end = positions.get(edge.target);
    const x1 = start.x + nodeWidth, y1 = start.y + nodeHeight / 2;
    const x2 = end.x, y2 = end.y + nodeHeight / 2;
    const middle = (x1 + x2) / 2;
    const path = data.layout.routes[edge.id] || `M ${x1} ${y1} C ${middle} ${y1} ${middle} ${y2} ${x2} ${y2}`;
    const group = svgElement('g', { class: `network-edge ${edge.category}`, role: 'button', tabindex: 0, 'aria-label': `${labelFor(edge)}. ${categories[edge.category]}. Show evidence.`, 'aria-pressed': 'false', 'aria-controls': 'network-details', 'data-relationship-id': edge.id });
    const visible = svgElement('path', { d: path, class: 'edge-line', 'marker-end': `url(#arrow-${edge.category})` });
    group.append(svgElement('path', { d: path, class: 'edge-hit' }), visible);
    group.addEventListener('click', () => select('relationship', edge.id));
    group.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        select('relationship', edge.id);
      }
    });
    svg.append(group);
    edgeGroups.set(edge.id, group);
    const button = relationshipButton(edge);
    button.setAttribute('aria-controls', 'network-details');
    list.append(button);
    edgeButtons.set(edge.id, button);
  });
  data.layout.nodes.forEach(position => {
    const record = records.get(position.id);
    const button = element('button', 'network-node');
    button.type = 'button';
    button.dataset.philosopherId = record.id;
    button.style.left = `${position.x}px`;
    button.style.top = `${position.y}px`;
    button.style.width = `${nodeWidth}px`;
    button.style.height = `${nodeHeight}px`;
    button.setAttribute('aria-controls', 'network-details');
    button.append(element('span', '', record.name), element('small', '', datesFor(record)));
    button.addEventListener('click', () => select('philosopher', record.id));
    canvas.append(button);
    nodeButtons.set(record.id, button);
  });
  function select(kind, id) {
    const activeEdges = new Set(kind === 'relationship' ? [id] : kind === 'philosopher'
      ? data.relationships.filter(edge => edge.source === id || edge.target === id).map(edge => edge.id) : []);
    const activeNodes = new Set(kind === 'philosopher' ? [id] : []);
    activeEdges.forEach(edgeId => {
      const edge = relationships.get(edgeId);
      activeNodes.add(edge.source);
      activeNodes.add(edge.target);
    });
    nodeButtons.forEach((button, nodeId) => {
      button.classList.toggle('dimmed', Boolean(kind) && !activeNodes.has(nodeId));
      button.classList.toggle('connected', Boolean(kind) && activeNodes.has(nodeId));
      button.setAttribute('aria-pressed', String(kind === 'philosopher' && nodeId === id));
    });
    edgeGroups.forEach((group, edgeId) => {
      const active = activeEdges.has(edgeId);
      group.classList.toggle('dimmed', Boolean(kind) && !active);
      group.classList.toggle('highlighted', active);
      group.setAttribute('aria-pressed', String(kind === 'relationship' && edgeId === id));
      group.querySelector('.edge-line').setAttribute('marker-end', `url(#arrow-${active ? 'selected' : relationships.get(edgeId).category})`);
      edgeButtons.get(edgeId).classList.toggle('related', active);
      edgeButtons.get(edgeId).setAttribute('aria-pressed', String(kind === 'relationship' && edgeId === id));
    });
    const heading = element('h2', 'question-title', 'Select a philosopher or relationship');
    heading.id = 'network-detail-title';
    heading.tabIndex = -1;
    const content = [heading];
    if (kind === 'philosopher') {
      const record = records.get(id);
      heading.textContent = record.name;
      content.push(element('p', 'idea-tradition', `${datesFor(record)} · ${record.tradition}`), element('p', 'network-body', record.summary), element('p', 'schools-note', record.dateNotes), sourceLink('Biographical reference', record.source));
      const related = element('ul', 'network-related-list');
      data.relationships.filter(edge => activeEdges.has(edge.id)).forEach(edge => {
        const item = element('li');
        item.append(relationshipButton(edge));
        related.append(item);
      });
      content.push(element('h3', '', 'Connections in this diagram'), related);
    } else if (kind === 'relationship') {
      const edge = relationships.get(id);
      heading.textContent = labelFor(edge);
      content.push(element('p', 'idea-tradition', categories[edge.category]), element('p', 'network-body', edge.explanation), sourceLink(`Source: ${edge.reference}`, edge.url));
    } else {
      content.push(element('p', 'network-body', 'Select a name or arrow above, or use a relationship button below, to see a short explanation and historical source.'));
    }
    details.replaceChildren(...content);
  }
  reset.addEventListener('click', () => select(null));
  select(null);
})();
