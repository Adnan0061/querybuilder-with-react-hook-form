import { assign, createMachine } from "xstate";
import { messages, options } from "./data";
import { assignOperators, assignValues } from "./helpers";
import type { InputProps, Message, Operators, Options } from "./types";

export const filterMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAZQBUBBAJXsVAAcB7WXAF1xd87EAA9EAJgAMAThIAOAGwSALAHZF8mWoDMKgKxKANCACeiAIyK5U21It7NmlTsUBfNybRY8hUlw4wACd0Pi4g2GoRbl4BIRFxBBcLEilVGX0VFWt9XLUTcwQLQxIdMr0JCXkdJSkdDy8MHAJiEgA3dAoAVzgopBAY-kFhfsTNKRJ9dKkNJUVZfLNLEvKKqpr5+s8Qb2a-EggwADN0Loo+Ps4eIfjRxBkJHRIZF-laq0ULC3kC5flS8oqSrVWpbRo+FqkADu4QA1tQAMIACUYADkAOIAUQA+gB5AAKmOYjHouOY0WucRGoESFgkuRIymy8kMukUag5vwQ8hUJGk1jULwkxSkimUDR2TV8rRhQXhyLRWOxADVGAAZACqmIpsWGCUsEjUE0NMh0r2F1nki0KKgsclWZSN+ik8ikKglu2l0LhdA1ACEALIASTY-UGVP1RXsihI3zZLOjaR+SwQqn0APKMiBQPZaQ9UshJFgXQARqh+IiURicQSiSSyTqbtSxPdHs9Xu8xV9k4UyhIM2VFPpFNldGp8xD9sWyxWFdWVeqtY2I3cEA8ni8ZG95h9u1zbfaHU6XW6J3tiHRMWrMQj6Hj8fQg7jUcu9augVyJNZUnZRWKqlMegeNs+BcIc8D9J6hbkFQr63DSlgOKkTJZtkYpKC8XJWE8zq2BYKg8nSWgOGeXokAEwShOEEFXLq8EtggOiyO2LyKDoVQcZU+hYWo-arNkehZPIhr6KRhYdN0cBwc2iSGCk8h0kCDzsjI8wSDxfHlI8XxJroonbFB+yHCcZx8NJkYKRM1hbtUyj6C83waQOAlZARhryGJ+yyrC5mrt26a2o8Lium6rift+v4uux+FWC4nmtNO5ZmWGlJvgh3IzKUygbMJ9j6GoKifkaqTVHoMxmipMjxUQvnpY5KbGqK2jjLotjKPYHnAUAA */
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
          always: "operators",
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
