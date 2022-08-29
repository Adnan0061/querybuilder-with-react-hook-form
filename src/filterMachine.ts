import { faker } from "@faker-js/faker";
import { assign, createMachine } from "xstate";
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

export const filterMachine = createMachine(
  {
    tsTypes: {} as import("./filterMachine.typegen").Typegen0,
    context: {
      data: [],
      filterType: "",
    },
    schema: {
      events: {} as
        | { type: "START" }
        | {
            type: "FILTER";
            status?: number[];
            assignee?: string;
            team?: string;
            inbox?: string;
          },
      context: {} as {
        data: Message[];
        filterType: string;
      },
    },
    initial: "idle",
    states: {
      idle: {
        on: {
          START: {
            target: "work",
          },
        },
      },
      work: {
        on: {
          FILTER: {
            actions: "filter",
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
              //TODO implement better comparison
              console.log(value.status, "status", ev.status);
              output = JSON.stringify(value.status) === JSON.stringify(ev.status);
            }
            if (ev.assignee) {
              output = value.assignee === ev.assignee;
            }
            if (ev.team) {
              console.log(value.team, "team", ev.team);
              output = value.team === ev.team;
            }
            if (ev.inbox) {
              console.log(value.inbox, "sdafasd", ev.inbox);
              output = value.inbox === ev.inbox;
            }
            return output;
          });
        },
      }),
    },
  }
);
