// JavaScript chapter: Testing. Lessons plus this chapter's quiz questions.
// The block format is documented in src/courses/index.js.

export default {
  id: 'testing',
  title: 'Testing Your Code',
  description: 'Prove your code works, now and after every change',
  icon: 'fact-check',
  lessons: [
    {
      id: 'js-testing-basics',
      title: 'Why and How to Test',
      blocks: [
        { type: 'text', value: 'A test is code that checks other code. Instead of tapping through the app after every change, you run the tests and know in seconds whether something broke. Professional teams will not merge code without tests.' },
        { type: 'list', items: [
          'Unit tests: check one function in isolation (most of your tests)',
          'Integration tests: check that several parts work together',
          'End-to-end tests: drive the real app like a user would',
        ] },
        { type: 'text', value: 'Here is a tiny test runner, to show there is no magic behind testing tools:' },
        { type: 'code', lang: 'js', tryIt: true, value: `function test(name, fn) {
  try {
    fn();
    console.log('✅', name);
  } catch (e) {
    console.log('❌', name, '→', e.message);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) throw new Error(\`expected \${expected}, got \${actual}\`);
    },
  };
}

// Code under test
const calculateVat = (price, rate = 0.15) => Math.round(price * rate);

test('15% VAT on 1000 is 150', () => expect(calculateVat(1000)).toBe(150));
test('custom rate 5%', () => expect(calculateVat(200, 0.05)).toBe(10));
test('zero price gives zero VAT', () => expect(calculateVat(0)).toBe(0));
test('this one is wrong on purpose', () => expect(calculateVat(100)).toBe(16));` },
        { type: 'note', value: 'Every test follows Arrange, Act, Assert: prepare the input, call the code, check the result.' },
      ],
    },
    {
      id: 'js-jest',
      title: 'Testing with Jest',
      blocks: [
        { type: 'text', value: 'Jest is the most popular JavaScript testing framework (this app\'s project already includes it). Install it with npm, write files ending in .test.js, and run npx jest.' },
        { type: 'code', lang: 'js', value: `// cart.js
export function cartTotal(items) {
  return items.reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function applyCoupon(total, code) {
  if (code === 'SAVE10') return total * 0.9;
  throw new Error('Invalid coupon');
}` },
        { type: 'code', lang: 'js', value: `// cart.test.js
import { cartTotal, applyCoupon } from './cart';

describe('cartTotal', () => {
  test('adds price × quantity for every item', () => {
    const items = [{ price: 100, qty: 2 }, { price: 50, qty: 1 }];
    expect(cartTotal(items)).toBe(250);
  });

  test('empty cart is 0', () => {
    expect(cartTotal([])).toBe(0);
  });
});

describe('applyCoupon', () => {
  test('SAVE10 gives 10% off', () => {
    expect(applyCoupon(200, 'SAVE10')).toBe(180);
  });

  test('unknown coupon throws', () => {
    expect(() => applyCoupon(200, 'FAKE')).toThrow('Invalid coupon');
  });
});` },
        { type: 'list', items: [
          'toBe: exact equality for primitives',
          'toEqual: same contents for objects and arrays',
          'toThrow: the function throws',
          'toHaveLength, toContain, toBeTruthy, toBeGreaterThan...',
          'async tests: test("...", async () => { expect(await load()).toEqual(...) })',
        ] },
      ],
    },
    {
      id: 'js-tdd',
      title: 'Test-Driven Development',
      blocks: [
        { type: 'text', value: 'In Test-Driven Development (TDD) you write the test before the code. The cycle is Red, Green, Refactor.' },
        { type: 'list', items: [
          'Red: write a test for the next small behavior. It fails because the code does not exist yet.',
          'Green: write the simplest code that makes the test pass.',
          'Refactor: clean up the code while the tests stay green.',
        ] },
        { type: 'code', lang: 'js', tryIt: true, value: `const check = (name, ok) => console.log(ok ? '✅' : '❌', name);

// Step 1 (Red): describe what a valid password needs
// Step 2 (Green): implement just enough
function isStrongPassword(pw) {
  return pw.length >= 8 && /\\d/.test(pw) && /[A-Z]/.test(pw);
}

// The tests, written first
check('rejects short passwords', !isStrongPassword('Ab1'));
check('requires a digit', !isStrongPassword('Abcdefgh'));
check('requires an uppercase letter', !isStrongPassword('abcdefg1'));
check('accepts a strong password', isStrongPassword('Codenest2026'));` },
        { type: 'note', value: 'Good tests describe behavior, not implementation. You should be able to rewrite the function completely without changing its tests.' },
      ],
    },
  ],
  quiz: [
    { chapterId: 'testing', q: 'What does a unit test check?', options: ['The whole app in a browser', 'One function or small unit in isolation', 'The server only', 'Page design'], answer: 1, explain: 'Unit tests are small, fast and focused.' },
    { chapterId: 'testing', q: 'Which Jest matcher compares the contents of two arrays?', options: ['toBe', 'toEqual', 'toMatch', 'toThrow'], answer: 1, explain: 'toBe checks identity; toEqual compares contents.' },
    { chapterId: 'testing', q: 'What is the first step in the TDD cycle?', options: ['Refactor', 'Write the code', 'Write a failing test', 'Deploy'], answer: 2, explain: 'Red, Green, Refactor.' },
    { chapterId: 'testing', q: 'What are the three parts of a well-structured test?', options: ['Arrange, Act, Assert', 'Start, Stop, Reset', 'Input, Loop, Output', 'Read, Write, Delete'], answer: 0, explain: 'Prepare data, run the code, check the result.' },
  ],
};
