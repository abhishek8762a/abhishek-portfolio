/**
 * Business flows for the FMS explorer.
 * `real: true`  → configured and running at work.
 * `real: false` → example configuration showing what the same engine can track.
 */
export type Timing = 'Entry' | 'TAT' | 'Before date' | 'Clock time' | 'Decision';

export interface FlowStep {
  what: string;
  who: string;
  when: string;
  timing: Timing;
  /** step only runs on this branch of the previous decision */
  branch?: 'Yes' | 'No';
  /** marks a quantity split point */
  split?: boolean;
}

export interface Flow {
  id: string;
  name: string;
  uniqueId: string;
  real: boolean;
  steps: FlowStep[];
}

export const flows: Flow[] = [
  {
    id: 'o2d',
    name: 'Order → Dispatch',
    uniqueId: 'PO No. → Batch Unique ID',
    real: true,
    steps: [
      { what: 'Sales Order received', who: 'Sales', when: 'Whenever needed', timing: 'Entry' },
      { what: 'RM / quantity plan', who: 'Production planning', when: 'TAT from SO', timing: 'TAT', split: true },
      { what: 'Work order → bought-out plan', who: 'Purchase', when: 'TAT from plan', timing: 'TAT', split: true },
      { what: 'Assembly', who: 'Production', when: 'Before delivery date', timing: 'Before date' },
      { what: 'FG confirmation', who: 'QC / Stores', when: 'TAT from assembly', timing: 'TAT', split: true },
      { what: 'Dispatch plan confirmed', who: 'Dispatch', when: 'Before delivery date', timing: 'Before date' },
      { what: 'Dispatched', who: 'Dispatch', when: 'By clock time', timing: 'Clock time', split: true },
    ],
  },
  {
    id: 'po',
    name: 'Purchase',
    uniqueId: 'Indent No.',
    real: false,
    steps: [
      { what: 'Final indent raised', who: 'Stores', when: 'Whenever needed', timing: 'Entry' },
      { what: 'Vendor enquiry', who: 'Purchase executive', when: '4 working hrs', timing: 'TAT' },
      { what: 'Purchase order drafted', who: 'Purchase executive', when: '8 working hrs', timing: 'TAT' },
      { what: 'Director approval', who: 'Director', when: 'By 18:00 same day', timing: 'Decision' },
      { what: 'PO released to vendor', who: 'Purchase executive', when: '2 working hrs', timing: 'TAT', branch: 'Yes' },
      { what: 'Revise PO', who: 'Purchase executive', when: '4 working hrs', timing: 'TAT', branch: 'No' },
      { what: 'Vendor dispatch follow-up', who: 'Purchase executive', when: '2 days before due date', timing: 'Before date' },
      { what: 'Material receipt', who: 'Stores', when: 'Vendor lead time', timing: 'TAT' },
    ],
  },
  {
    id: 'hire',
    name: 'Hiring',
    uniqueId: 'Requisition No.',
    real: false,
    steps: [
      { what: 'Manpower requisition', who: 'Department head', when: 'Whenever needed', timing: 'Entry' },
      { what: 'Job post published', who: 'HR executive', when: '1 working day', timing: 'TAT' },
      { what: 'CV shortlisting', who: 'HR executive', when: '3 working days', timing: 'TAT' },
      { what: 'Interview round', who: 'Department head', when: '2 working days', timing: 'TAT' },
      { what: 'Selected?', who: 'Department head', when: 'By 17:00 next day', timing: 'Decision' },
      { what: 'Offer letter', who: 'HR manager', when: '1 working day', timing: 'TAT', branch: 'Yes' },
      { what: 'Restart sourcing', who: 'HR executive', when: '1 working day', timing: 'TAT', branch: 'No' },
      { what: 'Joining & onboarding', who: 'HR executive', when: '1 day before joining date', timing: 'Before date' },
    ],
  },
  {
    id: 'service',
    name: 'Complaint / Service',
    uniqueId: 'Ticket No.',
    real: false,
    steps: [
      { what: 'Complaint logged', who: 'Customer support', when: 'Whenever needed', timing: 'Entry' },
      { what: 'Call back customer', who: 'Service coordinator', when: '2 working hrs', timing: 'TAT' },
      { what: 'Engineer assigned', who: 'Service manager', when: '4 working hrs', timing: 'TAT' },
      { what: 'Site visit / diagnosis', who: 'Service engineer', when: '1 working day', timing: 'TAT' },
      { what: 'Fixed on visit?', who: 'Service engineer', when: 'Same day', timing: 'Decision' },
      { what: 'Spare part ordered', who: 'Stores', when: '1 working day', timing: 'TAT', branch: 'No' },
      { what: 'Closure & feedback', who: 'Customer support', when: 'By 18:00 next day', timing: 'Clock time' },
    ],
  },
  {
    id: 'maint',
    name: 'Machine Breakdown',
    uniqueId: 'Breakdown ID',
    real: false,
    steps: [
      { what: 'Breakdown reported', who: 'Machine operator', when: 'Whenever needed', timing: 'Entry' },
      { what: 'Maintenance attends', who: 'Maintenance technician', when: '30 working min', timing: 'TAT' },
      { what: 'Root cause found', who: 'Maintenance in-charge', when: '2 working hrs', timing: 'TAT' },
      { what: 'Spare needed?', who: 'Maintenance in-charge', when: 'Same shift', timing: 'Decision' },
      { what: 'Spare issued / purchased', who: 'Stores', when: '4 working hrs', timing: 'TAT', branch: 'Yes' },
      { what: 'Machine running again', who: 'Maintenance technician', when: 'TAT from repair', timing: 'TAT' },
      { what: 'Production sign-off', who: 'Shift supervisor', when: 'By end of shift', timing: 'Clock time' },
    ],
  },
];

export const engineRules = [
  { k: 'One row = one item', v: 'Every order, ticket or request gets a unique ID and its own row.' },
  { k: '4 W’s per step', v: 'What, Who (one owner), How, and When — the deadline rule.' },
  { k: '3 timing rules', v: 'Working-hour TAT, days before a future date, or a clock time.' },
  { k: 'Decisions & branches', v: 'Yes / No steps with conditional steps on each path.' },
  { k: 'Real calendar', v: 'Office hours, working days and holidays are respected.' },
  { k: 'Planned vs Actual', v: 'Every step shows on-time, overdue (yellow) or late (red).' },
];
