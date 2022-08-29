export const filterOptionsList = [
  { value: "status", label: "Status" },
  { value: "agent_id", label: "Assignee Name" },
  { value: "inbox_id", label: "Inbox Name" },
  { value: "team_id", label: "Team Name" },
  // { value: "identifier", label: "Identifier" },
  // { value: "city", label: "City" },
  // { value: "country", label: "Country" },
  // { value: "CRM_link", label: "CRM Link" },
  // { value: "customer_segment", label: "Customer Segment" },
  // { value: "contact_reason", label: "Contact Reason" },
];
export const operatorOptionsList = (filter: string) => {
  if (filter === "status")
    return [
      { value: "_eq", label: "equal (=)" },
      { value: "_neq", label: "not equal (!=)" },
    ];
  if (filter === "agent_id" || filter === "inbox_id" || filter === "team_id")
    return [
      { value: "_eq", label: "equal (=)" },
      { value: "_neq", label: "not equal (!=)" },
      { value: "_ilike", label: "is present" },
      { value: "_nilike", label: "is not present" },
      // { value: "_similar", label: "begins with (case sensitive)" },
      // { value: "_nsimilar", label: "not begins with (case sensitive)" },
    ];
};
export const statusOptionsList = [
  { value: [0, 1, 2], label: "all" },
  { value: [0], label: "open" },
  { value: [1], label: "closed" },
  { value: [2], label: "snoozed" },
];

export const assigneeOptionsList = [
  { value: "assignee_1", label: "Assignee 1" },
  { value: "assignee_2", label: "Assignee 2" },
  { value: "assignee_3", label: "Assignee 3" },
  { value: "assignee_4", label: "Assignee 4" },
];

export const inboxOptionsList = [
  { value: "inbox_1", label: "Inbox 1" },
  { value: "inbox_2", label: "Inbox 2" },
  { value: "inbox_3", label: "Inbox 3" },
  { value: "inbox_4", label: "Inbox 4" },
];

export const teamOptionsList = [
  { value: "team_1", label: "Team 1" },
  { value: "team_2", label: "Team 2" },
  { value: "team_3", label: "Team 3" },
  { value: "team_4", label: "Team 4" },
];
