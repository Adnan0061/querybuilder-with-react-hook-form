import { randMessages } from './helpers';
import type { InputProps } from './types';

export const data = randMessages(20);

export const options: InputProps[] = [
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
