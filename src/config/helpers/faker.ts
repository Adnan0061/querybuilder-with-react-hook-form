import { faker } from "@faker-js/faker";
import { Message } from "../types";

type RandMessageProps = {
  assignees: string[];
  teams: string[];
  inboxes: string[];
};

function randMessage({ assignees, teams, inboxes }: RandMessageProps): Message {
  return {
    assignee: faker.helpers.arrayElement(assignees),
    body: faker.lorem.paragraph(2),
    inbox: faker.helpers.arrayElement(inboxes),
    status: faker.datatype.number({ min: 0, max: 3 }).toLocaleString(),
    team: faker.helpers.arrayElement(teams),
  };
}

export function randMessages(length = 5): Message[] {
  const assignees = [faker.internet.userName(), faker.internet.userName(), faker.internet.userName(), faker.internet.userName()];
  const inboxes = [faker.name.jobType(), faker.name.jobType(), faker.name.jobType(), faker.name.jobType(), faker.name.jobType()];
  const teams = [faker.commerce.department(), faker.commerce.department(), faker.commerce.department()];
  return Array.from({ length }).map(() => randMessage({ assignees, teams, inboxes }));
}
