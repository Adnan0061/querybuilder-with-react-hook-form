// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingActions: {
    firstValues: "";
    operator: "OPERATOR CHANGE";
    setOperators: "SELECT FILTER";
    setPossibleValues: "";
    submit: "SUBMIT";
    value: "VALUE CHANGE";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "firstValues"
    | "idle"
    | "options"
    | "possibleValues"
    | "submit"
    | "work";
  tags: never;
}
