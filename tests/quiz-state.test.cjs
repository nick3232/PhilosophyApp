const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { runInNewContext } = require('node:vm');

const context = { window: {} };
for (const file of ['quiz-data.js', 'quiz-state.js']) {
  runInNewContext(readFileSync(join(__dirname, '..', file), 'utf8'), context);
}
const bank = context.window.PHILOSOPHY_QUIZ_QUESTIONS;
const createQuiz = context.window.createPhilosophyQuiz;
const plain = value => JSON.parse(JSON.stringify(value));
const seededRandom = seed => () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};

test('the bank has 20 distinct questions, four distinct answers each, and the 6/7/7 category split', () => {
  assert.equal(bank.length, 20);
  assert.equal(new Set(bank.map(question => question.id)).size, 20);
  assert.equal(new Set(bank.map(question => question.question)).size, 20);
  const counts = {};
  for (const question of bank) {
    counts[question.category] = (counts[question.category] || 0) + 1;
    assert.equal(question.options.length, 4);
    assert.equal(new Set(question.options.map(option => option.id)).size, 4);
    assert.equal(new Set(question.options.map(option => option.text)).size, 4);
    assert.equal(question.options.filter(option => option.id === question.correctAnswerId).length, 1);
    assert.ok(question.explanation.trim());
  }
  assert.deepEqual(counts, {
    'Philosophers and their lives': 6,
    'Philosophical schools and traditions': 7,
    'Philosophical ideas and teachings': 7
  });
});

test('sampling yields 10 distinct questions, varies across sessions, and does not mutate the bank', () => {
  const original = JSON.stringify(bank);
  const quiz = createQuiz(bank, 10, seededRandom(1));
  const orders = new Set();
  const seen = new Set();
  for (let session = 0; session < 50; session += 1) {
    const ids = quiz.getState().questions.map(question => question.id);
    assert.equal(ids.length, 10);
    assert.equal(new Set(ids).size, 10);
    assert.ok(ids.every(id => bank.some(question => question.id === id)));
    orders.add(ids.join(','));
    ids.forEach(id => seen.add(id));
    quiz.start();
  }
  assert.ok(orders.size > 1);
  assert.equal(seen.size, 20);
  assert.equal(JSON.stringify(bank), original);
});

test('unanswered questions cannot advance, invalid answers are ignored, and a submitted answer locks', () => {
  const quiz = createQuiz(bank, 10, seededRandom(2));
  const first = quiz.getState().questions[0];
  assert.equal(quiz.next(), false);
  assert.equal(quiz.answer('invalid-option'), false);
  assert.equal(quiz.getState().answered, false);
  assert.equal(quiz.answer(first.correctAnswerId), true);
  const locked = plain(quiz.getState());
  assert.equal(quiz.answer(first.options.find(option => option.id !== first.correctAnswerId).id), false);
  assert.equal(quiz.answer(first.correctAnswerId), false);
  assert.deepEqual(plain(quiz.getState()), locked);
  assert.equal(quiz.next(), true);
  assert.equal(quiz.getState().index, 1);
  assert.equal(quiz.getState().answered, false);
});

for (const expectedScore of [0, 6, 10]) {
  test(`a complete session records all answers and scores ${expectedScore}/10 exactly`, () => {
    const quiz = createQuiz(bank, 10, seededRandom(3));
    for (let index = 0; index < 10; index += 1) {
      const state = quiz.getState();
      const question = state.questions[state.index];
      const option = index < expectedScore ? question.correctAnswerId : question.options.find(option => option.id !== question.correctAnswerId).id;
      assert.equal(quiz.answer(option), true);
      assert.equal(quiz.getState().complete, false); // Results require explicit advancement.
      assert.equal(quiz.next(), true);
    }
    const result = quiz.getState();
    assert.equal(result.complete, true);
    assert.equal(result.correctCount, expectedScore);
    assert.equal(result.answers.length, 10);
    assert.equal(result.answers.filter(answer => answer.correct).length, expectedScore);
    assert.ok(result.answers.every((answer, index) => answer.questionId === result.questions[index].id));
    assert.equal(Math.round(result.correctCount / result.questions.length * 100), expectedScore * 10);
    const locked = plain(result);
    assert.equal(quiz.answer(result.questions[0].correctAnswerId), false);
    assert.equal(quiz.next(), false);
    assert.deepEqual(plain(quiz.getState()), locked);
    quiz.start();
    const reset = quiz.getState();
    assert.equal(reset.index, 0);
    assert.equal(reset.correctCount, 0);
    assert.equal(reset.answers.length, 0);
    assert.equal(reset.answered, false);
    assert.equal(reset.complete, false);
    assert.equal(reset.questions.length, 10);
  });
}

test('returned answer arrays cannot alter recorded answers or scoring', () => {
  const quiz = createQuiz(bank);
  quiz.answer(quiz.getState().questions[0].correctAnswerId);
  const snapshot = quiz.getState();
  snapshot.answers[0].optionId = 'changed';
  snapshot.answers.pop();
  snapshot.questions.pop();
  assert.equal(quiz.getState().answers.length, 1);
  assert.notEqual(quiz.getState().answers[0].optionId, 'changed');
  assert.equal(quiz.getState().questions.length, 10);
  assert.equal(quiz.getState().correctCount, 1);
});

test('invalid banks fail before a quiz can start', () => {
  assert.throws(() => createQuiz(bank.slice(0, 9)));
  assert.throws(() => createQuiz([...bank, bank[0]]));
  const invalid = plain(bank);
  invalid[0].correctAnswerId = 'missing';
  assert.throws(() => createQuiz(invalid));
  invalid[0].correctAnswerId = invalid[0].options[0].id;
  invalid[0].options[1].id = invalid[0].options[0].id;
  assert.throws(() => createQuiz(invalid));
});
