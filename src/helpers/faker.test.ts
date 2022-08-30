import { beforeAll, expect, test } from 'vitest';
import { Message } from '../types';
import { randMessages } from './faker';

const actual: Message[] = [];

beforeAll(() => {
  actual.push(...randMessages(8));
});

test('Length must be right', () => {
  expect(actual.length).toBe(8);
});

test('Assignee must be defined', () => {
  expect(actual[3].assignee).toBeDefined();
  expect(actual[3].assignee).not.toBe('');
});

test('Team must be defined', () => {
  expect(actual[0].team).toBeDefined();
  expect(actual[0].team).not.toBe('');
});

test('Inbox must be defined', () => {
  expect(actual[6].inbox).toBeDefined();
  expect(actual[6].inbox).not.toBe('');
});
