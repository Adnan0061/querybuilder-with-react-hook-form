import { faker } from "@faker-js/faker";
import { assign, createMachine } from "xstate";
import { messages } from "./data";
import { Message } from "./types";

export const filterMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOlwgBswBiAZQBUBBAJXsVAAcB7WXAF1xd87EAA9EARgCsAdhIAOAAwAWCWoCcigMxSJy+QBoQAT0kA2dSUWL1yqVpkzFAJm3qpAXw9G0WPIVIAdy4AJwBragAxAEkAGXoAUWYRbl4BIRFxBGczMwUtLTNFeRk1ZTN5Zy0jU2y85R0JHOUZKXcZeQkvbxB8Lgg4EV8cAmIySjAUnn5BYSQxRGVLV3kHGTMpfT0JGRrzLSsbOxVK9TMlzx7h-zHg8Km02czEHLlHCRszRyWJMz2EX4Hay2LSKHauRxmLReHwYEYBB4zDLzLLOKQkFZrDZbVS7EyIAC0dhIUnO8nkqnUnVsG0uXiAA */
  createMachine(
    {
      context: {
        data: [],
        filterType: "",
      },
      tsTypes: {} as import("./filterMachine.typegen").Typegen0,
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
      id: "(machine)",
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
          data: (_, ev) => {
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
