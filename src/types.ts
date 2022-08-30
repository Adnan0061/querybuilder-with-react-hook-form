export interface Message {
  status: number[];
  assignee: string;
  team: string;
  inbox: string;
  body: string;
}

export type InputProps = {
  value: string | number[];
  label: string;
};

export type Options = 'status' | 'agent_id' | 'inbox_id' | 'team_id';
