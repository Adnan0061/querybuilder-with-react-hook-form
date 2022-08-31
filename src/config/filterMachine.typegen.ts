// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "": { type: "" };
    "done.invoke.(machine).generation:invocation[0]": {
      type: "done.invoke.(machine).generation:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.(machine).submission:invocation[0]": {
      type: "done.invoke.(machine).submission:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    generate: "done.invoke.(machine).generation:invocation[0]";
    submit: "done.invoke.(machine).submission:invocation[0]";
  };
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
    setResults:
      | "done.invoke.(machine).generation:invocation[0]"
      | "done.invoke.(machine).submission:invocation[0]";
    setValues: "";
    value: "CHANGE_VALUE";
  };
  eventsCausingServices: {
    generate: "START";
    submit: "SUBMIT";
  };
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "default"
    | "generation"
    | "idle"
    | "operators"
    | "submission"
    | "submit"
    | "values"
    | "work";
  tags: never;
}
