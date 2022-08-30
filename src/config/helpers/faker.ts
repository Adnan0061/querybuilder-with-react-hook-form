import { faker } from '@faker-js/faker';
import { Message } from '../types';

function randStatus(): Message['status'] {
  const fake = Array.from({
    length: faker.datatype.number({ min: 1, max: 3 }),
  }).map(() => faker.datatype.number({ min: 0, max: 2 }));

  return Array.from(new Set(fake));
}

function randMessage(): Message {
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
