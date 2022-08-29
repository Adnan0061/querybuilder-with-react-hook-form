import { messages } from './filterMachine';

export const filterOptionsList = [
  { value: 'status', label: 'Status' },
  { value: 'agent_id', label: 'Assignee Name' },
  { value: 'inbox_id', label: 'Inbox Name' },
  { value: 'team_id', label: 'Team Name' },
  // { value: "identifier", label: "Identifier" },
  // { value: "city", label: "City" },
  // { value: "country", label: "Country" },
  // { value: "CRM_link", label: "CRM Link" },
  // { value: "customer_segment", label: "Customer Segment" },
  // { value: "contact_reason", label: "Contact Reason" },
];
export const operatorOptionsList = (filter: string) => {
  if (filter === 'status')
    return [
      { value: '_eq', label: 'equal (=)' },
      { value: '_neq', label: 'not equal (!=)' },
    ];
  if (
    filter === 'agent_id' ||
    filter === 'inbox_id' ||
    filter === 'team_id'
  )
    return [
      { value: '_eq', label: 'equal (=)' },
      { value: '_neq', label: 'not equal (!=)' },
      { value: '_ilike', label: 'is present' },
      { value: '_nilike', label: 'is not present' },
      // { value: "_similar", label: "begins with (case sensitive)" },
      // { value: "_nsimilar", label: "not begins with (case sensitive)" },
    ];
};
export const statusOptionsList = [
  { value: [0, 1, 2], label: 'all' },
  { value: [0], label: 'open' },
  { value: [1], label: 'closed' },
  { value: [2], label: 'snoozed' },
];

export const assigneeOptionsList = messages.map((value) => ({
  value: value.assignee,
  label: value.assignee,
}));

export const inboxOptionsList = messages.map((value) => ({
  value: value.inbox,
  label: value.inbox,
}));

export const teamOptionsList = messages.map((value) => ({
  value: value.team,
  label: value.team,
}));
