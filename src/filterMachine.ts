import { faker } from '@faker-js/faker';
import { assign, createMachine } from 'xstate';
import { Message } from './types';

const messages: Message[] = [
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(2),
    status: [faker.datatype.number({ min: 0, max: 2 })],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(2),
    status: [faker.datatype.number({ min: 0, max: 2 })],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(2),
    status: [faker.datatype.number({ min: 0, max: 2 })],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(2),
    status: [faker.datatype.number({ min: 0, max: 2 })],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(2),
    status: [faker.datatype.number({ min: 0, max: 2 })],
    team: faker.commerce.department(),
  },
];

export const filterMachine = createMachine(
  {
    tsTypes: {} as import('./filterMachine.typegen').Typegen0,
    context: {
      data: [] as Message[],
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
    },
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
              output = value.status === ev.status;
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
