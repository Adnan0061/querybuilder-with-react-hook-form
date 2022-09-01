import type { InputProps, Message, Options } from '../types';

function mapping<T>(messages: Message[], mapper: (val: Message) => T) {
  const mappeds = messages.map(mapper);
  const distincts = Array.from(new Set(mappeds));
  return distincts.map((value) => ({
    value: value,
    label: value,
  }));
}

export function assignValues(
  messages: Message[],
  filter: Options
): InputProps[] {
  switch (filter) {
    case 'status':
      return [
        { value: '[0, 1, 2]', label: 'all' },
        { value: '[0]', label: 'open' },
        { value: '[1]', label: 'closed' },
        { value: '[2]', label: 'snoozed' },
      ];
    case 'agent_id':
      return mapping(messages, (value) => value.assignee);
    case 'team_id':
      return mapping(messages, (value) => value.team);
    default:
      return mapping(messages, (value) => value.inbox);
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
