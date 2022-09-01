export interface Message {
  status: string;
  assignee: string;
  team: string;
  inbox: string;
  body: string;
}

export type InputProps = {
  value: string;
  label: string;
};

export type Options = "status" | "agent_id" | "inbox_id" | "team_id";

export type Operators = "_eq" | "_neq" | "_ilike" | "_nilike";
