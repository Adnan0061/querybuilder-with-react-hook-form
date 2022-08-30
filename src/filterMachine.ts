import { faker } from '@faker-js/faker';
import { assign, createMachine } from 'xstate';
import { InputProps, Message, Options } from './types';

export const operatorOptionsList = (filter: string) => {
  if (filter === 'status') {
    return [
      { value: '_eq', label: 'equal (=)' },
      { value: '_neq', label: 'not equal (!=)' },
    ];
  }
  if (
    filter === 'agent_id' ||
    filter === 'inbox_id' ||
    filter === 'team_id'
  ) {
    return [
      { value: '_eq', label: 'equal (=)' },
      { value: '_neq', label: 'not equal (!=)' },
      { value: '_ilike', label: 'is present' },
      { value: '_nilike', label: 'is not present' },
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
  { value: [0, 1, 2], label: 'all' },
  { value: [0], label: 'open' },
  { value: [1], label: 'closed' },
  { value: [2], label: 'snoozed' },
];

function assignValues(filter: Options) {
  switch (filter) {
    case 'status':
      return statusOptionsList;
    case 'agent_id':
      return assigneeOptionsList;
    case 'team_id':
      return teamOptionsList;
    default:
      return inboxOptionsList;
  }
}

export const filterMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAZQBUBBAJXsVAAcB7WXAF1xd87EAA9EAWgCMABgDsJAMwAmAKzKZygCwAOFQDYAnMp0AaEAE9Jyw1pL7529VJVbtWgL4fzaLHkKkAO5cAE4A1nQAogAykQDC9AAEAGIAktH0kcwi3LwCQiLiCFKGhiQ6+oryslJyOoYyqmaWklUy9o6KTaqqUlpS+qpePhg4BMQkAGa4FHxgIQD6sGBUmHMQJBBgk+gArrMLXBzz6Hyh1ADyAApZjPQXzIlxABKMAHIA4pE5PPyCwkgxIhZOVavo5MpFHp9HpDDpmlYENIFPJKjJwcopGpDHJPN4QL4xgEpjM5otlqt1iQKWA1pBDscQqdztdbvdHi93l8fnl-oVJFp5CRMVVBjJ4ep9FJVOZERJweVMdooYo5Ko5I5hgTRv4JtNZvMlitaVStjt9nxEgA3dAUXY0ABqjGiAFVIk9Xp9voDcn8CoCil0SFp1BCpNL9DYXMpZcCZHYdOjDOrJeGNIotYTdaR9WSjZTINTjXSIAsbXbHc63R6ud7OL98gDQEUJIoGiRDC55G46jidDGWghVO0ZKUQ+CtIpZDi8SM-OMc6TDTSS1FYgkUulMtkfQ2+QHJAMpPYVDo5HC5Oe5FjY0jtPpFS5DCpIfpBTohviswuSQbycX1joF0ACEAFlUjYXdeX9ZtJDVEhulVVR9BhNw4QHRFIQUNRMVxaN0yhLx8XwLgtngQFv2JcgqB5P0myBO9I3KMV40FS96ikW9WxkdoHAhLoP16fpBkzHUf2CcJaMbfkEFVYUsIGKcNETGRFC4toOn47ohIGT85yJPUl3-AsNjNPYDiOE4zhCKT91ghARXKHQpAqfo5CqZRBi0dSELkSpIU7EUlT07V52JXNlwAwsV3WBkrNCWyYIY6QP2FVQBK0dzGkUKE5B89V-LbLFoyxELKMMv98xNQszIta1bXtRL6KKSFFBPDUNX6GRaghDDgRcpQkz0ZQ6nRSo5FEsKKrzGLoqi0ty0aqC6Jk5E7G6vjlC2nFGkhW9wx0QajAcWxL0MN8dEmgzF0q2aICa1bJ2PEV0WHCVPOlLin0fXD0TPDzLq-MTiVgXYACNUH4B6DyRdKSEUiMHBKFxr1vRRdHKLQsfPKp0rbWdQuu6H7IkENVGFLsxXeqUZUHVsIU07QeMaFw3yIjwgA */
  createMachine(
    {
      context: {
        data: [],
        filterType: 'status',
        operatorType: '_eq',
        operators: [] as InputProps[],
        values: [] as InputProps[],
        value: '' as InputProps['value'],
        filterOptionsList: [
          { value: 'status', label: 'Status' },
          { value: 'agent_id', label: 'Assignee Name' },
          { value: 'inbox_id', label: 'Inbox Name' },
          { value: 'team_id', label: 'Team Name' },
          // { value: "identifier", label: "Identifier" },
          // { value: "city", label: "City" },
          // { value: "country", label: "Country" },
          // { value: "CRM_link", label: "CRM Link" },
          // { value: "customer_segment", label: "Customer Segment" },
          // { value: "contact_reason", label: "Contact Reason" },
        ] as InputProps[],
        results: messages,
      },
      tsTypes: {} as import('./filterMachine.typegen').Typegen0,
      schema: {
        events: {} as
          | { type: 'START' }
          // | {
          //     type: "FILTER";
          //     status?: number[];
          //     assignee?: string;
          //     team?: string;
          //     inbox?: string;
          //   }
          | {
              type: 'SELECT FILTER';
              value: string;
            }
          | {
              type: 'OPERATOR CHANGE';
              value: string;
            }
          | {
              type: 'VALUE CHANGE';
              value: string | number | number[];
            }
          | {
              type: 'SUBMIT';
            },
        // context: {} as {
        //   data: object[];
        //   filterType: string;
        //   operatorType: string;
        //   valueType: string | number[] | number;
        // },
      },
      id: '(machine)',
      initial: 'idle',
      states: {
        idle: {
          on: {
            START: {
              target: 'options',
            },
          },
        },
        options: {
          on: {
            'SELECT FILTER': {
              actions: ['setOperators'],
              target: 'possibleValues',
            },
          },
        },
        possibleValues: {
          always: {
            actions: ['setPossibleValues'],
            target: 'submit',
          },
        },
        firstValues: {
          always: {
            actions: ['firstValues'],
          },
        },
        work: {
          on: {
            'OPERATOR CHANGE': { actions: ['operator'] },
            'VALUE CHANGE': { actions: ['value'] },
            SUBMIT: {
              actions: 'submit',
              target: 'submit',
            },
          },
        },

        // filter_selected: {
        //   type: 'parallel',
        //   states: {
        //     default_operator: {
        //       on: {
        //         'OPERATOR CHANGE': {
        //           actions: 'operator',
        //           target: 'selected_operator',
        //         },
        //       },
        //     },
        //     selected_operator: {
        //       on: {
        //         'OPERATOR CHANGE': {
        //           actions: 'operator',
        //         },
        //       },
        //     },
        //     'default value': {
        //       on: {
        //         'VALUE CHANGE': {
        //           actions: 'value',
        //           target: 'selected_value',
        //         },
        //       },
        //     },
        //     selected_value: {
        //       on: {
        //         'VALUE CHANGE': {
        //           actions: 'value',
        //         },
        //       },
        //     },
        //   },
        //   on: {
        //     'SELECT FILTER': {
        //       actions: 'filter',
        //     },
        //     SUBMIT: {
        //       // actions: "submitData",
        //       actions: () => console.log('submitted'),
        //       target: 'submit',
        //     },
        //   },
        // },
        submit: {
          on: {
            SUBMIT: {
              actions: 'submit',
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
                case 'status':
                  output =
                    JSON.stringify(value.status) ===
                    JSON.stringify(ctx.value);
                case 'agent_id':
                  output = value.assignee === ctx.value;
                case 'team_id':
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
              case 'status':
                return statusOptionsList;
              case 'agent_id':
                return assigneeOptionsList;
              case 'team_id':
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
