import { faker } from "@faker-js/faker";
import { assign, createMachine } from "xstate";
import { InputProps, Message, Options } from "./types";

export const operatorOptionsList = (filter: string) => {
  if (filter === "status") {
    return [
      { value: "_eq", label: "equal (=)" },
      { value: "_neq", label: "not equal (!=)" },
    ];
  }
  if (filter === "agent_id" || filter === "inbox_id" || filter === "team_id") {
    return [
      { value: "_eq", label: "equal (=)" },
      { value: "_neq", label: "not equal (!=)" },
      { value: "_ilike", label: "is present" },
      { value: "_nilike", label: "is not present" },
      // { value: "_similar", label: "begins with (case sensitive)" },
      // { value: "_nsimilar", label: "not begins with (case sensitive)" },
    ];
  }
  return [];
};

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

export const assigneeOptionsList: InputProps[] = messages.map((value) => ({
  value: value.assignee,
  label: value.assignee,
}));

export const inboxOptionsList: InputProps[] = messages.map((value) => ({
  value: value.inbox,
  label: value.inbox,
}));

export const teamOptionsList: InputProps[] = messages.map((value) => ({
  value: value.team,
  label: value.team,
}));

export const statusOptionsList: InputProps[] = [
  { value: [0, 1, 2], label: "all" },
  { value: [0], label: "open" },
  { value: [1], label: "closed" },
  { value: [2], label: "snoozed" },
];

function assignValues(filter: Options) {
  switch (filter) {
    case "status":
      return statusOptionsList;
    case "agent_id":
      return assigneeOptionsList;
    case "team_id":
      return teamOptionsList;
    default:
      return inboxOptionsList;
  }
}

export const filterMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAZQBUBBAJXsVAAcB7WXAF1xd87EAA9EAWgDMADgAsJGQFYlABgCcSgExyA7FqW71ANgA0IAJ6SDSkuqPH1WgIyqlzqUakBfb+bRYeISkXBwCQrB0AKIAMlEAwvQABABiAJIx9FHMIty84cJIYpJyzsYkLh6GWp7OSsZySuZWCNJaJKoyqs66zi5S6m6qqnK+-hg4BMQkebwARlQAaugUAK5w1Lk8-IKFoOKtzjLtLi4yTmpScldyzYgy5bojR1J9dVLGMs5jIAGTwSQAGa4ABOsD4yzWGy2+V2IgOEi0WkeZXqD3sUikSNulkQyPaKjkLmMqleHzk1x+fyC0wA7lwQQBragAeQACtlGPQWcwkvEABKMAByAHEojCdkJ4ZIPOVjEjjMZtFoNA0mrjDlJbH05CMdCSlDIvFSJjTSPSmdRFowYgBVKJ8wWi8VFPKSvbFBDOZwKdTqOTqLHvHTuXR3Vq68oyLXGZzqMpSEZOE2BKbmhnM2i2gBCAFk0mxXdsCtKEPKSETrlpzmTkaozBqJCSK0bhrqiR8ffWU-9prBVnNUPw6Dn84XOMW4UUDnHVHYjcYtVonqSug2Wj1yj7jnX3ko9KMfvguBA4CJqWmyJQwBKS9PJLJbJ9F8ZdE9Bvp1OHpMoK-XdJ8-q6kaJg9maJChAU8BFrCUr3q0sgKAYuhfFcmjxqS349FIJCKp4JIuPGSj+j4fi-Kal6zLgCxgJC6zQROsEegiRK2Lq3RGHGjSaM44auHOKqlOhGgyNGPpgZewJghCKz0beU77CUwwkGoaj2MuBGDOueIGCpqg2LociKvp0ZaBJAIWoy8lwYprS-sRAFGeo5wqp4OItNIiaKFqfo+rGRqyOZfYDkOfDWcxiAUh0fRGsumJJn6fHKYJcbESJplBUQ4WlhIFLqH+HHxv6xHuN+egyN59TEkSLgjL4vhAA */
  createMachine(
    {
      context: {
        data: [],
        filterType: "status",
        operatorType: "_eq",
        operators: [] as InputProps[],
        values: [] as InputProps[],
        value: "" as InputProps["value"],
        filterOptionsList: [
          { value: "status", label: "Status" },
          { value: "agent_id", label: "Assignee Name" },
          { value: "inbox_id", label: "Inbox Name" },
          { value: "team_id", label: "Team Name" },
          // { value: "identifier", label: "Identifier" },
          // { value: "city", label: "City" },
          // { value: "country", label: "Country" },
          // { value: "CRM_link", label: "CRM Link" },
          // { value: "customer_segment", label: "Customer Segment" },
          // { value: "contact_reason", label: "Contact Reason" },
        ] as InputProps[],
        results: messages,
      },
      tsTypes: {} as import("./filterMachine.typegen").Typegen0,
      schema: {
        events: {} as
          | { type: "START" }
          // | {
          //     type: "FILTER";
          //     status?: number[];
          //     assignee?: string;
          //     team?: string;
          //     inbox?: string;
          //   }
          | {
              type: "SELECT FILTER";
              value: string;
            }
          | {
              type: "OPERATOR CHANGE";
              value: string;
            }
          | {
              type: "VALUE CHANGE";
              value: string | number | number[];
            }
          | {
              type: "SUBMIT";
            },
        // context: {} as {
        //   data: object[];
        //   filterType: string;
        //   operatorType: string;
        //   valueType: string | number[] | number;
        // },
      },
      id: "(machine)",
      initial: "idle",
      states: {
        idle: {
          on: {
            START: {
              target: "options",
            },
          },
        },
        options: {
          on: {
            "SELECT FILTER": {
              actions: "setOperators",
              target: "possibleValues",
            },
          },
        },
        possibleValues: {
          always: {
            actions: "setPossibleValues",
            target: "submit",
          },
        },
        firstValues: {
          always: {
            actions: "firstValues",
          },
        },
        work: {
          on: {
            "OPERATOR CHANGE": {
              actions: "operator",
            },
            "VALUE CHANGE": {
              actions: "value",
            },
            SUBMIT: {
              actions: "submit",
              target: "submit",
            },
          },
        },
        submit: {
          on: {
            SUBMIT: {
              actions: "submit",
            },
          },
        },
      },
    },
    {
      actions: {
        // filter: assign({
        //   data: (_, ev: any) => {
        //     return messages.filter((value) => {
        //       let output = true;
        //       if (ev.status) {
        //         //TODO implement better comparison
        //         console.log(value.status, "status", ev.status);
        //         output = JSON.stringify(value.status) === JSON.stringify(ev.status);
        //       }
        //       if (ev.assignee) {
        //         output = value.assignee === ev.assignee;
        //       }
        //       if (ev.team) {
        //         console.log(value.team, "team", ev.team);
        //         output = value.team === ev.team;
        //       }
        //       if (ev.inbox) {
        //         console.log(value.inbox, "sdafasd", ev.inbox);
        //         output = value.inbox === ev.inbox;
        //       }
        //       return output;
        //     });
        //   },
        // }),
        firstValues: assign({
          operatorType: (ctx) => {
            return ctx.operators[0].value as string;
          },
          value: (ctx) => {
            return ctx.values[0].value;
          },
        }),
        submit: assign({
          results: (ctx) => {
            return messages.filter((value) => {
              let output = true;
              switch (ctx.filterType) {
                case "status":
                  output = JSON.stringify(value.status) === JSON.stringify(ctx.value);
                case "agent_id":
                  output = value.assignee === ctx.value;
                case "team_id":
                  output = value.team === ctx.value;
                default:
                  output = value.inbox === ctx.value;
              }

              return output;
            });
          },
        }),
        operator: assign({
          operatorType: (context, event) => event.value,
        }),
        value: assign({
          value: (context, event) => event.value as string,
        }),
        setOperators: assign({
          operators: (_, ev) => {
            return operatorOptionsList(ev.value);
          },
        }),
        setPossibleValues: assign({
          values: (ctx) => {
            switch (ctx.filterType) {
              case "status":
                return statusOptionsList;
              case "agent_id":
                return assigneeOptionsList;
              case "team_id":
                return teamOptionsList;
              default:
                return inboxOptionsList;
            }
          },
        }),

        // submitData: assign({
        //   data: () => [{ message: "submitted" }],
        //   filterType: () => "",
        //   valueType: () => "",
        //   operatorType: () => "",
        // }),
      },
    }
  );
