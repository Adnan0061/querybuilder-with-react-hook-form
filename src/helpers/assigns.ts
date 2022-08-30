import { faker } from '@faker-js/faker';
import { messages } from '../data';
import type { InputProps, Message, Options } from '../types';

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

