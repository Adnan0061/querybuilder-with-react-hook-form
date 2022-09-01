import { assign, createMachine } from "xstate";
import { messages, options } from "./data";
import { assignOperators, assignValues } from "./helpers";
import type { InputProps, Message, Operators, Options } from "./types";

export const filterMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiRUABwHtZcAXXR-OkAD0QEYArACYSADgDME4fwBsswQE5hY2RIAsAGhABPRDPUkA7OvUT+Y4YvUAGdYomCAvk+1oseQqUb0wAJ3RWRj9YWiQQJhZ2Tm4+BHNFY2FbCTFBQXU0kSNtPQQhIxJpdUFZGX5k9OEJFzcMHAJiEgA3dAoAVzgwhmY2Di5wuNLE4WrFRX4jI35FGwdcgUFC4tLyypEa1xB3Bq8SCDAAM3R2ilZuiN7ogdA4sQqSWUUxRSMbfneJ-gkF-KWiyplfgVEobWrbeqeJoAd2CAGtqABhAASAEEAHIAcQAogB9ADyAAVsQAlVEAFXxJO4kT6MUGAn4pgBEiMT0UgheU2Ev0kJBm93GRkE73eGXBOyhpFhfgRKIxONxADVUQAZACq2JpV36sUZnJIrzEmQks3Zll+6gsANBjiksmFmzqHka0vh1AAyuqAEIAWQAkuTtVFdQyELNDGJVCVhJynjZkr9koYVkpYypZDNnFtJa6SLB2gAjVBsJForF4omkilU4N0m68RD3URPLmimbAn66RBSfg29JqBzCWSqCWQvMF4ul+UV5VqzV1656hDNx7PV7tr5dvJWsT9wR2iQOg9jl1eT3Y1XYxHkgmE8n+-Hoxeh26IAC0TyKNjmQgm6jeOxBCTB1DQmUZZHsJkAOHFwtnwRgDngcJcz2cgqBfek33yYxMyWLIBQUcweW7fIyhIKDqnUeRnmNGxs2dXYmh8fxAmCZCehDLDG3yZ41wjIwj2bCxfkmPsVnkSYJBsKYHVPJjSFaDo4Ewhs4gAmwSEEYFtKkA9Y1eUTpn7dQrFSKNRiMeSpX2I4TjOVTl3ZIp1wdaYKgmbcBGMiTM0EmSpmsvMZThRyww+Ex+WBUyjCjJZHFkEDCnGCoVCEH9OwYiEzyaScS1YMLsKeWQSBsTMNNmDIlhAxIZJKWR6JHYQTDEIKvEKnj3wcb9fyUJlAJKX5300sR3jZaMlAUTkyrgpwgA */
  createMachine(
    {
      context: {
        option: "status",
        operator: "_eq",
        operators: assignOperators("status"),
        values: assignValues("status"),
        value: "",
        options,
        results: messages,
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
              value: InputProps["value"];
            }
          | {
              type: "SUBMIT";
            },
      },
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
          always: {
            target: "operators",
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
              actions: "submit",
              target: "submit",
            },
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
        submit: assign({
          results: (ctx) => {
            return messages.filter((value) => {
              let output = true;
              switch (ctx.option) {
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
