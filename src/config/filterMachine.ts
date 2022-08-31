import { assign, createMachine, InterpreterFrom } from 'xstate';
import { data, options } from './data';
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
      data: [],
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
        data: Message[];
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
        always: {
          target: 'operators',
          actions: ['getData', 'setDefaultResults'],
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
          SUBMIT: {
            actions: 'submit',
            target: 'submit',
          },
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
      submit: assign({
        results: (ctx) => {
          return ctx.data.filter((value) => {
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
          return assignValues(ctx.data, ctx.option);
        },
      }),
      setOption: assign({
        option: (_, ev) => ev.value,
      }),
      setDefaults: assign({
        operator: (ctx) => ctx.operators[0].value as Operators,
        value: (ctx) => ctx.values[0].value,
      }),
      getData: assign({
        data: (_) => data,
      }),
      setDefaultResults: assign({
        results: (ctx) => ctx.data,
      }),
    },
  }
);

export type FilterMachine = typeof filterMachine;
export type FilterSend = InterpreterFrom<FilterMachine>['send'];
