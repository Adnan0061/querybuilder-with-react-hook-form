import { assign, createMachine } from 'xstate';
import { messages, options } from './data';
import { assignOperators, assignValues } from './helpers/assigns';
import type { InputProps, Message, Operators, Options } from './types';

export const filterMachine = createMachine(
  {
    context: {
      option: 'status',
      operator: '_eq',
      operators: [],
      values: [],
      value: '',
      options,
      results: messages,
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
            value: InputProps['value'];
          }
        | {
            type: 'SUBMIT';
          },
    },
    initial: 'idle',
    on: {
      SELECT_OPTION: {
        actions: ['setOption'],
        target: 'operators',
      },
    },
    states: {
      idle: {
        on: {
          START: {
            target: 'operators',
          },
        },
      },
      operators: {
        always: {
          actions: ['setOperators'],
          target: 'values',
        },
      },
      values: {
        always: {
          actions: ['setValues'],
          target: 'default',
        },
      },
      default: {
        always: {
          actions: ['setDefaults'],
          target: 'work',
        },
      },
      work: {
        on: {
          SELECT_OPTION: {
            actions: ['setOption'],
            target: 'operators',
          },
          CHANGE_OPERATOR: { actions: ['operator'] },
          CHANGE_VALUE: { actions: ['value'] },
          SUBMIT: {
            actions: 'submit',
            target: 'submit',
          },
        },
      },

      submit: {
        on: {
          CHANGE_OPERATOR: { actions: ['operator'], target: 'work' },
          CHANGE_VALUE: { actions: ['value'], target: 'work' },
        },
      },
    },
  },
  {
    actions: {
      submit: assign({
        results: (ctx) => {
          return messages.filter((value) => {
            let output = true;
            switch (ctx.option) {
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
          return assignValues(ctx.option);
        },
      }),
      setOption: assign({
        option: (_, ev) => ev.value,
      }),
      setDefaults: assign({
        operator: (ctx) => ctx.operators[0].value as Operators,
        value: (ctx) => ctx.values[0].value,
      }),
    },
  }
);
