import { faker } from '@faker-js/faker';
import { assign, createMachine } from 'xstate';
import { Message } from './types';

export const messages: Message[] = [
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(1),
    status: [faker.datatype.number({ min: 0, max: 2 })],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(1),
    status: [faker.datatype.number({ min: 0, max: 2 })],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(1),
    status: [faker.datatype.number({ min: 0, max: 2 })],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(1),
    status: [faker.datatype.number({ min: 0, max: 2 })],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(1),
    status: [faker.datatype.number({ min: 0, max: 2 })],
    team: faker.commerce.department(),
  },
];

export const filterMachine = createMachine(
  {
    tsTypes: {} as import('./filterMachine.typegen').Typegen0,
    context: {
      data: [],
    },
    schema: {
      events: {} as
        | { type: 'START' }
        | {
            type: 'FILTER';
            status?: number[];
            assignee?: string;
            team?: string;
            inbox?: string;
          },
      context: {} as {
        data: Message[];
      },
    },
    initial: 'idle',
    states: {
      idle: {
        on: {
          START: {
            target: 'work',
          },
        },
      },
      work: {
        on: {
          FILTER: {
            actions: 'filter',
          },
        },
      },
    },
  },
  {
    actions: {
      filter: assign({
        data: (_, ev: any) => {
          return messages.filter((value) => {
            let output = true;
            if (ev.status) {
              //TODO implement beter comparaison
              output =
                JSON.stringify(value.status) === JSON.stringify(ev.status);
            }
            if (ev.assignee) {
              output = value.assignee === ev.assignee;
            }
            if (ev.team) {
              output = value.team === ev.team;
            }
            if (ev.inbox) {
              output = value.inbox === ev.inbox;
            }
            return output;
          });
        },
      }),
    },
  }
);
