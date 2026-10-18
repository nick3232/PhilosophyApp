(() => {
  'use strict';
  const card = document.getElementById('quiz-card');
  const bank = window.PHILOSOPHY_QUIZ_QUESTIONS;
  let quiz;
  try {
    quiz = window.createPhilosophyQuiz(bank);
  } catch (error) {
    const heading = document.createElement('h2');
    heading.id = 'quiz-question';
    heading.textContent = 'The quiz could not be loaded. Please check the question files and reload.';
    card.append(heading);
    return;
  }
  const element = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };
  const optionText = (question, id) => question.options.find(option => option.id === id).text;
  function focusHeading() {
    const heading = document.getElementById('quiz-question');
    heading.focus({ preventScroll: true });
    card.scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  function renderQuestion() {
    const state = quiz.getState();
    const question = state.questions[state.index];
    card.dataset.questionId = question.id;
    const progressText = element('p', 'quiz-progress-text', `Question ${state.index + 1} of ${state.questions.length}`);
    const progress = element('progress', 'quiz-progress');
    progress.max = state.questions.length;
    progress.value = state.answers.length;
    progress.setAttribute('aria-label', 'Questions answered');
    const category = element('p', 'eyebrow quiz-category', question.category);
    const heading = element('h2', 'question-title', question.question);
    heading.id = 'quiz-question';
    heading.tabIndex = -1;
    const options = element('div', 'quiz-options');
    options.setAttribute('role', 'group');
    options.setAttribute('aria-labelledby', heading.id);
    const feedback = element('div', 'quiz-feedback');
    feedback.id = 'quiz-feedback';
    feedback.setAttribute('role', 'status');
    feedback.setAttribute('aria-atomic', 'true');
    const next = element('button', 'quiz-next', state.index === state.questions.length - 1 ? 'See results' : 'Next Question');
    next.type = 'button';
    next.disabled = true;
    const buttons = new Map();
    question.options.forEach(option => {
      const button = element('button', 'quiz-answer');
      button.type = 'button';
      button.dataset.optionId = option.id;
      button.setAttribute('aria-pressed', 'false');
      button.append(element('span', '', option.text));
      button.addEventListener('click', () => {
        if (!quiz.answer(option.id)) return;
        // Keep the controls in place while revealing feedback; never auto-advance.
        buttons.forEach((answerButton, id) => {
          const correct = id === question.correctAnswerId;
          const selected = id === option.id;
          answerButton.setAttribute('aria-disabled', 'true');
          answerButton.setAttribute('aria-pressed', String(selected));
          answerButton.classList.toggle('correct', correct);
          answerButton.classList.toggle('incorrect', selected && !correct);
          if (correct || selected) answerButton.append(element('small', 'quiz-answer-status', correct ? (selected ? 'Your answer · Correct' : 'Correct answer') : 'Your answer · Incorrect'));
        });
        const correct = option.id === question.correctAnswerId;
        feedback.classList.add('answered');
        feedback.append(
          element('p', 'quiz-feedback-heading', correct ? 'Correct.' : `Incorrect. The correct answer is ${optionText(question, question.correctAnswerId)}.`),
          element('p', '', question.explanation)
        );
        progress.value = quiz.getState().answers.length;
        next.disabled = false;
      });
      buttons.set(option.id, button);
      options.append(button);
    });
    next.addEventListener('click', () => {
      if (!quiz.next()) return;
      if (quiz.getState().complete) renderResults();
      else renderQuestion();
      focusHeading();
    });
    card.replaceChildren(progressText, progress, category, heading, options, feedback, next);
  }
  function renderResults() {
    const state = quiz.getState();
    delete card.dataset.questionId;
    const total = state.questions.length;
    const percentage = Math.round(state.correctCount / total * 100);
    const heading = element('h2', 'question-title', 'Quiz Complete!');
    heading.id = 'quiz-question';
    heading.tabIndex = -1;
    const result = element('p', 'quiz-result', `You answered ${state.correctCount} out of ${total} questions correctly.`);
    const score = element('p', 'quiz-score', `Score: ${percentage}%`);
    const message = element('p', 'quiz-result-message', percentage >= 80
      ? 'You have a strong grasp of these foundations. Review the explanations to reinforce what you know.'
      : percentage >= 50
        ? 'You are building a good foundation. Reviewing the answers can help clarify the ideas that need more practice.'
        : 'Keep exploring at your own pace. The explanations below are a useful starting point for another try.');
    const restart = element('button', 'quiz-next', 'Start another quiz');
    restart.type = 'button';
    restart.addEventListener('click', () => {
      quiz.start();
      renderQuestion();
      focusHeading();
    });
    const reviewTitle = element('h3', 'quiz-review-title', 'Review Answers');
    const review = element('div', 'quiz-review');
    state.questions.forEach((question, index) => {
      const answer = state.answers[index];
      const item = element('details', 'quiz-review-item');
      const summary = element('summary');
      summary.append(element('span', '', `${index + 1}. ${question.question}`), element('span', `quiz-review-verdict ${answer.correct ? 'correct' : 'incorrect'}`, answer.correct ? 'Correct' : 'Incorrect'));
      const body = element('div', 'quiz-review-body');
      body.append(
        element('p', '', `Your answer: ${optionText(question, answer.optionId)}`),
        element('p', '', `Correct answer: ${optionText(question, question.correctAnswerId)}`),
        element('p', '', question.explanation)
      );
      item.append(summary, body);
      review.append(item);
    });
    card.replaceChildren(heading, result, score, message, restart, reviewTitle, review);
  }
  renderQuestion();
})();
