import { faker } from "@faker-js/faker";
import { Message } from "./types";

export const messages: Message[] = [
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(5),
    status: [0],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(5),
    status: [0],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(5),
    status: [1],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(5),
    status: [0, 1, 2],
    team: faker.commerce.department(),
  },
  {
    assignee: faker.internet.userName(),
    body: faker.lorem.paragraph(1),
    inbox: faker.lorem.word(5),
    status: [2],
    team: faker.commerce.department(),
  },
];
