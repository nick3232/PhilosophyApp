(() => {
  'use strict';
  // Pure session logic: no DOM access or persistence. Randomness can be supplied in tests.
  window.createPhilosophyQuiz = (bank, questionCount = 10, random = Math.random) => {
    if (!Array.isArray(bank) || !Number.isInteger(questionCount) || questionCount < 1 || bank.length < questionCount) {
      throw new Error('The question bank must contain enough questions for a session.');
    }
    const ids = new Set();
    bank.forEach(question => {
      const optionIds = new Set(question.options?.map(option => option.id));
      if (!question.id || ids.has(question.id) || !question.category || !question.question || !question.explanation ||
        question.options?.length !== 4 || optionIds.size !== 4 ||
        question.options.some(option => !option.id || !option.text) || !optionIds.has(question.correctAnswerId)) {
        throw new Error('Each question needs a unique ID, four unique options, one valid correct answer, and explanatory content.');
      }
      ids.add(question.id);
    });
    let state;
    function start() {
      const shuffled = [...bank];
      // Fisher–Yates shuffles the whole bank before taking a distinct 10-question sample.
      for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const other = Math.floor(random() * (index + 1));
        [shuffled[index], shuffled[other]] = [shuffled[other], shuffled[index]];
      }
      state = { questions: shuffled.slice(0, questionCount), index: 0, answers: [], correctCount: 0, answered: false, complete: false };
    }
    function answer(optionId) {
      if (state.complete || state.answered) return false;
      const question = state.questions[state.index];
      if (!question.options.some(option => option.id === optionId)) return false;
      const correct = optionId === question.correctAnswerId;
      state.answers.push({ questionId: question.id, optionId, correct });
      state.correctCount += Number(correct);
      state.answered = true;
      return true;
    }
    function next() {
      if (state.complete || !state.answered) return false;
      if (state.index === state.questions.length - 1) state.complete = true;
      else {
        state.index += 1;
        state.answered = false;
      }
      return true;
    }
    const getState = () => ({ ...state, questions: [...state.questions], answers: state.answers.map(answer => ({ ...answer })) });
    start();
    return { start, answer, next, getState };
  };
})();
