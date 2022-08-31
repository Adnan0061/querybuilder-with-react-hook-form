import { assign, createMachine } from 'xstate';
import { messages, options } from './data';
import { assignOperators, assignValues } from './helpers';
import type { InputProps, Message, Operators, Options } from './types';

export const filterMachine = createMachine(
  {
    predictableActionArguments: true,
    context: {
      option: 'status',
      operator: '_eq',
      operators: [],
      values: [],
      value: '',
      options,
      results: [],
    },
    tsTypes: {} as import('./filterMachine.typegen').Typegen0,
    schema: {
      context: {} as {
        option: Options;
        operator: Operators;
        operators: InputProps[];
        values: InputProps[];
        value: InputProps['value'];
        options: InputProps[];
        results: Message[];
      },
      services: {} as {
        generate: { data: Message[] };
        submit: { data: Message[] };
      },
      events: {} as
        | { type: 'START' }
        | {
            type: 'SELECT_OPTION';
            value: Options;
          }
        | {
            type: 'CHANGE_OPERATOR';
            value: Operators;
          }
        | {
            type: 'CHANGE_VALUE';
            value: string;
          }
        | {
            type: 'SUBMIT';
          },
    },
    id: '(machine)',
    initial: 'idle',
    on: {
      SELECT_OPTION: {
        actions: 'setOption',
        target: '.operators',
      },
    },
    states: {
      idle: {
        on: {
          START: 'generation',
        },
      },
      generation: {
        invoke: {
          src: 'generate',
          onDone: {
            actions: ['setResults'],
            target: 'operators',
          },
        },
      },
      operators: {
        always: {
          actions: 'setOperators',
          target: 'values',
        },
      },
      values: {
        always: {
          actions: 'setValues',
          target: 'default',
        },
      },
      default: {
        always: {
          actions: 'setDefaults',
          target: 'work',
        },
      },
      work: {
        on: {
          CHANGE_OPERATOR: {
            actions: 'operator',
          },
          CHANGE_VALUE: {
            actions: 'value',
          },
          SUBMIT: 'submission',
        },
      },
      submission: {
        invoke: {
          src: 'submit',
          onDone: { target: 'submit', actions: 'setResults' },
        },
      },
      submit: {
        on: {
          CHANGE_OPERATOR: {
            actions: 'operator',
            target: 'work',
          },
          CHANGE_VALUE: {
            actions: 'value',
            target: 'work',
          },
        },
      },
    },
  },
  {
    actions: {
      operator: assign({
        operator: (_, ev) => ev.value,
      }),
      value: assign({
        value: (_, event) => event.value,
      }),
      setOperators: assign({
        operators: (ctx) => {
          return assignOperators(ctx.option);
        },
      }),
      setValues: assign({
        values: (ctx) => {
          return assignValues(messages, ctx.option);
        },
      }),
      setOption: assign({
        option: (_, ev) => ev.value,
      }),
      setDefaults: assign({
        operator: (ctx) => ctx.operators[0].value as Operators,
        value: (ctx) => ctx.values[0].value,
      }),

      setResults: assign({
        results: (_, { data }) => data,
      }),
    },
    services: {
      generate: async () => {
        return messages;
      },
      submit: async (ctx) => {
        return messages.filter((value) => {
          let output = true;
          switch (ctx.option) {
            case 'status':
              output = (JSON.parse(ctx.value) as number[]).includes(
                value.status
              );
              break;
            case 'agent_id':
              output = value.assignee === ctx.value;
              break;
            case 'team_id':
              output = value.team === ctx.value;
              break;
            default:
              output = value.inbox === ctx.value;
              break;
          }
          return output;
        });
      },
    },
  }
);
