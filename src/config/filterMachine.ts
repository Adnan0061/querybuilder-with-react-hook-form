import { assign, createMachine } from "xstate";
import { messages, options } from "./data";
import { assignOperators, assignValues } from "./helpers";
import type { InputProps, Message, Operators, Options } from "./types";

export const filterMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAZQBUBBAJXsVAAcB7WXAF1xd87EAA9EAJgAMAThIAOAGwSALIpUqp8mfICMKgDQgAnpL0KAzBZXSNugOz2ArE8UBfN0bRY8hUjEIAJ3QBIWoIITAyfAA3LgBrKO8cAmISALBg0PwEAjjMEMF8AG0pAF0Rbl5skXEEJ10LBV1Ve3l5VV0lCSNTBAllEitrXSlFJwspLqcPLwwUvxIuDkyQrkDYakqefiLaxHkpFRIVexUZGQddCcVL3sRNJqlnqXtbGXPlWZBk3zSY9AUACucC2SBAVV2Qn2CFGExIMmcUgkTlU4yOhhMDykTxebyOHxkX08P3mf1IEDAADN0ECKHwwZwdjVwXUWvJ7CcnM9FHDRvYuvcEI8SC9Xu9PhJvr9UqQAO7reLUADCAAlGAA5ADiAFEAPoAeQACjrmIx6AbmNtqntWYh9IihijXrcJPYZE4OkKLLo5PYXjICa7edKybKSArAkq1ZrdXqAGqMAAyAFUddaocI7bCGk1lNzFPIbEXUUKJBYJCR-TzFMpfbJQz5w5GlbQUwAhACyAEk2ODISzQGzbpzpM8ZBJDioi2ohSoHCQx1pbsjNIjGws0rAgQAjVC4WC8MIRQjROKJEgyxbbvcHo85PJcArZUoVfvM21D+0jxcBydHGdFCFQNRReFoLF5D0rBUDdyRIG99wZGNtX1Y1TXNS0M0HMR7UnTkVG5MY+VeQUsX6CQ5DFVQKI+SCLFg8MEP4FV1RQhNkzTLDPxw2E8K5HliIFeRvV0RRQOeacHA0d0pBmEkr2IOgdSTHVlXoQ0jXobsDQ1LjoWzGw510XRLBGV4nEuCj7A8El8C4Sl4HBBTSHIKg9KzL9YUaUVlAI8ZFHsCC1CcMt7DE4ZiymJw1GuOS5ibRYMiybiB24upJjkC4LkLCzRnaICyOdUybFUGdrhkBjFmWVY+HWRymRtfTPMLJoCOeFpkUcHFdCMzkxQC+RPVGFQrEq-5ARBeqIQ-JqeI9JxF3zWRrkUMYJ168TRhkSZHCUCr5LDRZKRpOk+HcmFjKLEhrmeCztA0Aq+nnPr2tkHa2luMb5UVc7s2uacFHzQ4PhcbajJM6tjJGgUPlGg6Eq3Xd90PFKZo8njphMn0BgcVw-IsGRvX9EgJmsCZfQkLa4fizdSCYs730a9G2S6KRmhRf1pkuDky00EmXl5FxHFRdx4dp37PNIvoxKoitLokBWfRstwgA */
  createMachine(
    {
      context: {
        option: "status",
        operator: "_eq",
        operators: [],
        values: [],
        value: "",
        options,
        results: [],
      },
      tsTypes: {} as import("./filterMachine.typegen").Typegen0,
      schema: {
        context: {} as {
          option: Options;
          operator: Operators;
          operators: InputProps[];
          values: InputProps[];
          value: InputProps["value"];
          options: InputProps[];
          results: Message[];
        },
        services: {} as {
          generate: { data: Message[] };
          submit: { data: Message[] };
        },
        events: {} as
          | { type: "START" }
          | {
              type: "SELECT_OPTION";
              value: Options;
            }
          | {
              type: "CHANGE_OPERATOR";
              value: Operators;
            }
          | {
              type: "CHANGE_VALUE";
              value: string;
            }
          | {
              type: "SUBMIT";
            },
      },
      predictableActionArguments: true,
      id: "(machine)",
      initial: "idle",
      on: {
        SELECT_OPTION: {
          actions: "setOption",
          target: ".operators",
        },
      },
      states: {
        idle: {
          on: {
            START: {
              target: "generation",
            },
          },
        },
        generation: {
          invoke: {
            src: "generate",
            onDone: [
              {
                actions: "setResults",
                target: "operators",
              },
            ],
          },
        },
        operators: {
          always: {
            actions: "setOperators",
            target: "values",
          },
        },
        values: {
          always: {
            actions: "setValues",
            target: "default",
          },
        },
        default: {
          always: {
            actions: "setDefaults",
            target: "work",
          },
        },
        work: {
          on: {
            CHANGE_OPERATOR: {
              actions: "operator",
            },
            CHANGE_VALUE: {
              actions: "value",
            },
            SUBMIT: {
              target: "submission",
            },
          },
        },
        submission: {
          invoke: {
            src: "submit",
            onDone: [
              {
                actions: "setResults",
                target: "submit",
              },
            ],
          },
        },
        submit: {
          on: {
            CHANGE_OPERATOR: {
              actions: "operator",
              target: "work",
            },
            CHANGE_VALUE: {
              actions: "value",
              target: "work",
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
          option: (_, { value }) => value,
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
              case "status":
                output = ctx.value === value.status;
                break;
              case "agent_id":
                output = value.assignee === ctx.value;
                break;
              case "team_id":
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
