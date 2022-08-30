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
    operator: "CHANGE_OPERATOR";
    setDefaults: "";
    setOperators: "";
    setOption: "SELECT_OPTION";
    setValues: "";
    submit: "SUBMIT";
    value: "CHANGE_VALUE";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "default"
    | "idle"
    | "operators"
    | "submit"
    | "values"
    | "work";
  tags: never;
}
