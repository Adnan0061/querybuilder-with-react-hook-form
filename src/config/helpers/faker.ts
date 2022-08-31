import { faker } from '@faker-js/faker';
import { Message } from '../types';

function randMessage(assignees: string[], teams: string[]): Message {
  return {
    assignee: faker.helpers.arrayElement(assignees),
    body: faker.lorem.paragraph(2),
    inbox: faker.lorem.word(5),
    status: faker.datatype.number({ min: 0, max: 2 }),
    team: faker.helpers.arrayElement(teams),
  };
}

export function randMessages(length = 5): Message[] {
  const assignees = [
    faker.internet.userName(),
    faker.internet.userName(),
    faker.internet.userName(),
    faker.internet.userName(),
    faker.internet.userName(),
  ];
  const teams = [
    faker.commerce.department(),
    faker.commerce.department(),
    faker.commerce.department(),
  ];
  return Array.from({ length }).map(() => randMessage(assignees, teams));
}
