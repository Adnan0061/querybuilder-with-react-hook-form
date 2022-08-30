// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
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
    filter: "SELECT FILTER";
    operator: "OPERATOR CHANGE";
    value: "VALUE CHANGE";
  };
  eventsCausingServices: {};
  eventsCausingGuards: {};
  eventsCausingDelays: {};
  matchesStates:
    | "filter_selected"
    | "filter_selected.default value"
    | "filter_selected.default_operator"
    | "filter_selected.selected_operator"
    | "filter_selected.selected_value"
    | "idle"
    | "submit"
    | "work"
    | {
        filter_selected?:
          | "default value"
          | "default_operator"
          | "selected_operator"
          | "selected_value";
      };
  tags: never;
}
