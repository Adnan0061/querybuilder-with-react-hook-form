import { faker } from '@faker-js/faker';
import { messages } from './data';
import type { InputProps, Message, Options } from './types';

const statusList: InputProps[] = [
  { value: [0, 1, 2], label: 'all' },
  { value: [0], label: 'open' },
  { value: [1], label: 'closed' },
  { value: [2], label: 'snoozed' },
];

export function assignValues(filter: Options): InputProps[] {
  switch (filter) {
    case 'status':
      return statusList;
    case 'agent_id':
      return messages.map((value) => ({
        value: value.assignee,
        label: value.assignee,
      }));
    case 'team_id':
      return messages.map((value) => ({
        value: value.team,
        label: value.team,
      }));
    default:
      return messages.map((value) => ({
        value: value.inbox,
        label: value.inbox,
      }));
  }
}

export const assignOperators = (filter: Options): InputProps[] => {
  switch (filter) {
    case 'status':
      return [
        { value: '_eq', label: 'equal (=)' },
        { value: '_neq', label: 'not equal (!=)' },
      ];

    default:
      return [
        { value: '_eq', label: 'equal (=)' },
        { value: '_neq', label: 'not equal (!=)' },
        { value: '_ilike', label: 'is present' },
        { value: '_nilike', label: 'is not present' },
        // { value: "_similar", label: "begins with (case sensitive)" },
        // { value: "_nsimilar", label: "not begins with (case sensitive)" },
      ];
  }
};

function randStatus(): Message['status'] {
  const fake = Array.from({
    length: faker.datatype.number({ min: 1, max: 3 }),
  }).map(() => faker.datatype.number({ min: 0, max: 2 }));

  return Array.from(new Set(fake));
}

export function randMessage(): Message {
  return {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(5),
    status: randStatus(),
    team: faker.commerce.department(),
  };
}

export function randMessages(length = 5): Message[] {
  return Array.from({ length }).map(randMessage);
}
