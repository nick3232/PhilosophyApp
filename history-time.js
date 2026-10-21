(() => {
  'use strict';
  // Shift BCE years forward by one: 1 BCE -> 0, 1 CE -> 1. Never display this coordinate.
  const coordinate = year => {
    if (!Number.isInteger(year) || year === 0) throw new Error('Use integer historical years with no year zero.');
    return year < 0 ? year + 1 : year;
  };
  const interval = record => {
    const start = record.start ?? record.birth;
    const end = record.end ?? record.death ?? start;
    if (coordinate(start) > coordinate(end)) throw new Error('A date range must end on or after it starts.');
    return { start, end };
  };
  const overlaps = (left, right) => {
    const a = interval(left), b = interval(right);
    // Inclusive, year-level overlap. It makes no claim about location or personal involvement.
    return coordinate(a.start) <= coordinate(b.end) && coordinate(b.start) <= coordinate(a.end);
  };
  const formatYear = year => {
    coordinate(year);
    return `${Math.abs(year)} ${year < 0 ? 'BCE' : 'CE'}`;
  };
  const formatRange = record => {
    const { start, end } = interval(record);
    if (record.displayDate) return record.displayDate;
    const prefix = record.approximate ? 'c. ' : '';
    if (start === end) return prefix + formatYear(start);
    if ((start < 0) === (end < 0)) return `${prefix}${Math.abs(start)}–${Math.abs(end)} ${start < 0 ? 'BCE' : 'CE'}`;
    return `${prefix}${formatYear(start)}–${formatYear(end)}`;
  };
  const createScale = records => {
    const ranges = records.map(interval);
    const start = Math.floor(Math.min(-500, ...ranges.map(range => range.start)) / 10) * 10;
    const end = Math.ceil(Math.max(200, ...ranges.map(range => range.end)) / 10) * 10;
    const span = coordinate(end) - coordinate(start);
    const position = year => (coordinate(year) - coordinate(start)) / span * 100;
    const geometry = record => {
      const range = interval(record);
      return { left: position(range.start), width: position(range.end) - position(range.start) };
    };
    const ticks = [];
    for (let year = Math.ceil(start / 100) * 100; year <= end; year += 100) {
      if (year !== 0) ticks.push(year);
    }
    if (start < 0 && end > 0) ticks.push(1);
    ticks.sort((a, b) => coordinate(a) - coordinate(b));
    return { start, end, position, geometry, ticks };
  };
  const categoryGroup = category => category === 'political' || category === 'military' ? 'political-military' : category;
  const visibleEvents = (events, enabled) => events.filter(event => enabled.has(categoryGroup(event.category)));
  const selectionView = (philosophers, events, enabled, selection) => {
    const visible = visibleEvents(events, enabled);
    const selected = selection?.kind === 'event'
      ? visible.find(event => event.id === selection.id)
      : selection?.kind === 'philosopher' ? philosophers.find(record => record.id === selection.id) : null;
    if (!selected) return { selected: null, kind: null, visible, philosophers: [], events: [] };
    return {
      selected, kind: selection.kind, visible,
      philosophers: selection.kind === 'event' ? philosophers.filter(record => overlaps(record, selected)) : [selected],
      events: selection.kind === 'philosopher' ? visible.filter(event => overlaps(event, selected)) : [selected]
    };
  };
  window.HISTORY_TIME = { coordinate, interval, overlaps, formatYear, formatRange, createScale, categoryGroup, visibleEvents, selectionView };
})();
