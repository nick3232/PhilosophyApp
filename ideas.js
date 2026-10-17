(() => {
  'use strict';
  const questions = window.PHILOSOPHICAL_QUESTIONS;
  const philosophers = new Map((window.PHILOSOPHERS || []).map(record => [record.id, record]));
  const controls = document.getElementById('question-buttons');
  const results = document.getElementById('ideas-results');
  if (!Array.isArray(questions) || !questions.length) {
    results.textContent = 'The philosophical questions could not be loaded.';
    return;
  }
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    node.textContent = text;
    return node;
  };
  function select(question) {
    controls.querySelectorAll('button').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.id === question.id));
    });
    const heading = element('h2', 'question-title', question.question);
    heading.id = 'question-title';
    const cards = element('div', 'idea-cards', '');
    question.answers.forEach(answer => {
      const philosopher = philosophers.get(answer.philosopherId);
      const card = element('article', 'idea-card', '');
      card.dataset.philosopherId = answer.philosopherId;
      card.append(
        element('h3', '', philosopher.name),
        element('p', 'idea-tradition', answer.tradition || philosopher.tradition),
        element('p', 'idea-summary', answer.summary)
      );
      cards.append(card);
    });
    results.replaceChildren(heading, cards);
  }
  questions.forEach(question => {
    const button = element('button', 'question-button', question.question);
    button.type = 'button';
    button.dataset.id = question.id;
    button.setAttribute('aria-controls', 'ideas-results');
    button.addEventListener('click', () => select(question));
    controls.append(button);
  });
  select(questions[0]);
})();
