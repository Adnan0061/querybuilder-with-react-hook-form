import { createMachine } from "xstate";
import { Message } from "./types";

const messages: Message[] = [];
const filterMachine = createMachine({
  tsTypes: {} as import("./filterMachine.typegen").Typegen0,
  states: {
    idle: {
      on: {
        START: {
          target: "work",
        },
      },
    },
    work: {},
  },
});
