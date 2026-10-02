export interface TimelineItem {
  kind: 'work' | 'project' | 'education';
  title: string;
  org: string;
  /** Edit dates here — '[Add dates]' is shown as a visible placeholder. */
  period: string;
  points: string[];
}

export const timeline: TimelineItem[] = [
  {
    kind: 'work',
    title: 'MIS Data Analyst',
    org: 'Dharma Power Transmission Pvt. Ltd. (Omex Gears) · Sonipat, Haryana',
    period: 'Apr 2026 — Present',
    points: [
      'Built and run the Inventory Management System: 1,800+ SKUs, 6,100+ logged transactions, 8 users — replacing manual registers.',
      'Reorder thresholds from Average Daily Consumption, lead time and safety factor, feeding system-generated purchase indents.',
      'TAT analysis across a 24-step, 5-phase order pipeline (90+ orders, 50+ clients) to find department-wise slippage.',
    ],
  },
  {
    kind: 'project',
    title: 'Order-to-Dispatch Flow Management System (FMS)',
    org: 'Google Sheets · Apps Script',
    period: '2026',
    points: [
      'Batch-level tracking of partial fulfilment, each split portion with its own planned-vs-actual clock.',
      'Working-hour deadlines (shifts, working days, holiday calendar) automated via Apps Script form workflows.',
    ],
  },
  {
    kind: 'project',
    title: 'Inventory Management System (IMS)',
    org: 'Google Sheets · Apps Script',
    period: '2026',
    points: [
      'Data-quality checks flagging duplicate keys, invalid transactions and negative balances.',
      '100% location-vs-closing reconciliation with zero mismatches.',
    ],
  },
  {
    kind: 'work',
    title: 'Quality Control Executive',
    org: 'Mahima Life Science Pvt. Ltd. · Pharmaceuticals',
    period: 'Dec 2025 — Mar 2026',
    points: [
      'Quality control lab work (HPLC, GMP) in a regulated pharmaceutical environment.',
      'Built a habit of accuracy, documentation and data-driven checks.',
    ],
  },
  {
    kind: 'education',
    title: 'M.Sc. Chemistry',
    org: '',
    period: 'Ongoing',
    points: ['Currently pursuing.'],
  },
  {
    kind: 'education',
    title: 'B.Sc. — Chemistry, Zoology, Botany',
    org: 'Siddharth University, Sant Kabir Nagar',
    period: '2024 · CGPA 7.68',
    points: ['Scientific foundation in observation, measurement and analysis.'],
  },
];
