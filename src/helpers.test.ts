import { expect, test, vi } from 'vitest';
import { randMessage, randMessages } from './helpers';

test('', () => {
  const func = vi.fn(randMessage);
  const actual = randMessages();
  expect(actual.length).toBe(8);
});
