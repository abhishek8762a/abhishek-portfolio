export type ProjectStatus = 'production' | 'completed' | 'template' | 'learning';

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  category: 'Automation' | 'SQL & BI' | 'Analytics';
  /** visual accent for the generated thumbnail */
  accent: 'blue' | 'violet' | 'cyan' | 'rose' | 'emerald';
  /** taller cards create the masonry rhythm */
  size: 'tall' | 'medium' | 'short';
  highlights: string[];
  /** Thumbnail image in public/images/projects/. Missing file → generated art. */
  thumbnail: string;
  /** Screenshot files you can add later in public/images/projects/ */
  screenshots: { file: string; caption: string }[];
  overview: string;
  problem: string;
  objective: string;
  architecture: string[];
  workflowTitle: string;
  workflow: string[];
  dataProcessing: string[];
  automationLogic: string[];
  insights: string[];
  insightsNote?: string;
  relevance: string;
}

export const statusLabel: Record<ProjectStatus, string> = {
  production: 'Live in daily operations',
  completed: 'Completed project',
  template: 'Sample template — results pending',
  learning: 'Learning project — in progress',
};

const sheetsArchitecture = [
  'User / HTML Form',
  'Google Apps Script',
  'Google Sheets Database',
  'Validation & Processing',
  'Dashboard / Reporting',
];

export const projects: Project[] = [
  {
    id: 'ims',
    title: 'Inventory Management System',
    shortTitle: 'IMS',
    tagline: 'Form-driven stock control for 1800+ SKUs',
    description:
      'A real-world inventory system built on Google Sheets and Apps Script — stock IN/OUT transactions, location-wise monitoring, reorder levels and daily closing records.',
    tech: ['Google Sheets', 'Google Apps Script', 'HTML', 'JavaScript'],
    status: 'production',
    category: 'Automation',
    accent: 'blue',
    size: 'tall',
    highlights: ['1,800+ SKUs', '4,900+ transactions', '8 users', '950+ purchase indents', '100% reconciliation'],
    thumbnail: 'images/projects/ims-thumbnail.png',
    screenshots: [
      { file: 'images/projects/ims-dashboard.png', caption: 'Stock dashboard' },
      { file: 'images/projects/ims-entry-form.png', caption: 'Stock IN / OUT entry form' },
      { file: 'images/projects/ims-location-stock.png', caption: 'Location-wise stock view' },
    ],
    overview:
      'An operational Inventory Management System that replaced manual stock registers with a structured, form-based workflow on Google Sheets. It records every stock movement, keeps location-wise balances and supports reconciliation and daily closing.',
    problem:
      'With 1800+ SKUs spread across multiple store locations, manual registers made it hard to know current stock, where an item physically sits, and when it needs reordering. Entries were inconsistent and reconciliation was slow.',
    objective:
      'Create a single source of truth for stock — consistent entries through forms and dropdowns, live balances per location, reorder visibility, and a clean daily transaction trail.',
    architecture: sheetsArchitecture,
    workflowTitle: 'Stock movement flow',
    workflow: [
      'Select category & SKU (dropdowns)',
      'Choose location',
      'Record stock IN / OUT',
      'Validate quantity & fields',
      'Write to transaction log',
      'Update location-wise balance',
      'Check reorder level',
      'Daily closing record',
    ],
    dataProcessing: [
      'Category → SKU dependent dropdowns keep item names and codes consistent.',
      'Every IN/OUT movement is stored as a transaction row with date, item, location and quantity.',
      'Location-wise stock is calculated from the transaction history rather than typed by hand.',
      'Reconciliation compares system balance against physical counts to surface differences.',
      'Data-quality checks flag duplicate keys, invalid transactions and negative balances automatically.',
    ],
    automationLogic: [
      'Apps Script powers the HTML entry form and appends validated rows to the database sheet.',
      'Validation blocks incomplete entries before they reach the database.',
      'Reorder levels use Average Daily Consumption × Lead Time × Safety Factor and flag items below threshold.',
      'Daily closing captures the end-of-day position for traceability.',
    ],
    insights: [
      'Stock-movement analysis on 4,900+ transactions across 1,800+ SKUs (19 categories, 92 item types), used by 8 users.',
      'Reorder thresholds (ADC × Lead Time × Safety Factor) segmented stock into Low / Medium / Good / Over Stock, driving 950+ purchase indents.',
      'Work-in-progress mapped across 28 process flows (Turning, Drilling, Hobbing, Grinding…) to spot stage-level bottlenecks.',
      '100% location-vs-closing reconciliation with zero mismatches.',
      'Live view of stock per SKU and per location.',
      'Items approaching reorder level are visible without manual checking.',
      'A complete, date-wise transaction trail supports audits and reconciliation.',
    ],
    relevance:
      'Inventory accuracy directly affects production planning and purchasing. A structured system reduces stock-outs, duplicate buying and time spent searching for material — the same data-quality and reporting skills used in any analyst role.',
  },
  {
    id: 'fms',
    title: 'Flow Management System',
    shortTitle: 'FMS',
    tagline: 'Order-to-dispatch tracking with batch-level TAT',
    description:
      'Tracks 90+ orders for 50+ clients through a 24-step, 5-phase pipeline — with batch-level partial-fulfilment tracking, pending-task monitoring and planned-vs-actual TAT analysis.',
    tech: ['Google Sheets', 'Google Apps Script', 'Looker Studio'],
    status: 'production',
    category: 'Automation',
    accent: 'violet',
    size: 'medium',
    highlights: ['24 steps · 5 phases', '90+ orders', '50+ clients', 'Batch-level TAT', 'Working-hour deadlines'],
    thumbnail: 'images/projects/fms-thumbnail.png',
    screenshots: [
      { file: 'images/projects/fms-workflow.png', caption: 'Stage-wise workflow tracker' },
      { file: 'images/projects/fms-pending.png', caption: 'Pending tasks & follow-ups' },
      { file: 'images/projects/fms-looker.png', caption: 'Looker Studio report' },
    ],
    overview:
      'A Flow Management System that tracks every order through a fixed sequence of departmental steps. Each stage has an owner, a planned time and an actual time, so the team can see exactly where an order is and how long each step took.',
    problem:
      'Orders pass through many departments — sales, design, purchase, approvals, vendors. Without one shared tracker, delays were noticed late, follow-ups depended on memory, and nobody had a clear picture of turnaround time per stage.',
    objective:
      'Give every stakeholder visibility of order status, highlight pending and overdue steps, support follow-ups, and measure turnaround time (TAT) department-wise.',
    architecture: [...sheetsArchitecture.slice(0, 4), 'Looker Studio Reporting'],
    workflowTitle: 'Key stages — order to material receipt',
    workflow: [
      'Order Receive',
      'Sales',
      'Design (if required)',
      'Drawing Approval',
      'Work Order',
      'Material Planning',
      'Purchase',
      'Material Assessment',
      'Final Indent',
      'Vendor Enquiry',
      'Purchase Order',
      'Director Approval',
      'PO Release',
      'Vendor Dispatch',
      'Material Receipt',
    ],
    dataProcessing: [
      'Each order — and each split batch of a partially fulfilled order — gets its own planned and actual timestamps, with an auto-reconciling parent balance.',
      'Deadlines respect working hours: shift timings, working-day patterns and a holiday calendar.',
      'Planned dates are derived from the previous stage plus the allowed TAT.',
      'Status per stage (done / pending / overdue) is computed from the timestamps.',
      'Department-wise views summarise workload and delays.',
    ],
    automationLogic: [
      'Apps Script form workflows capture stage completion with source validation and move the order to its next step.',
      'Optional stages (e.g. Design) are skipped automatically when not required.',
      'Pending and overdue steps are filtered for follow-up lists.',
      'Looker Studio reads the sheet to visualise progress and TAT.',
    ],
    insights: [
      'TAT analysis across the 24-step, 5-phase pipeline (90+ orders, 50+ clients), quantifying planned-vs-actual delay per stage.',
      'Batch-level visibility of stuck sub-orders when quantities are split by capacity, client schedule or readiness.',
      'Where each order currently sits in the flow.',
      'Which steps are pending or overdue, and with which department.',
      'Turnaround time per stage, highlighting bottlenecks.',
    ],
    relevance:
      'Workflow visibility turns delays into data. The same thinking — define the process, timestamp each step, measure TAT — applies to operations, supply-chain and business-process analytics.',
  },
  {
    id: 'netflix',
    title: 'Netflix Content Analytics',
    shortTitle: 'Netflix SQL',
    tagline: 'SQL analysis + Power BI dashboard on 605 titles',
    description:
      'Imported 605 records into MySQL and wrote analysis queries on content categories, release-year trends, rating distribution and average ratings, then built an interactive Power BI dashboard.',
    tech: ['MySQL', 'SQL', 'Power BI'],
    status: 'completed',
    category: 'SQL & BI',
    accent: 'rose',
    size: 'medium',
    highlights: ['605 records', 'SQL queries', 'Release trends', 'Power BI'],
    thumbnail: 'images/projects/netflix-thumbnail.png',
    screenshots: [
      { file: 'images/projects/netflix-dashboard.png', caption: 'Power BI dashboard' },
      { file: 'images/projects/netflix-queries.png', caption: 'SQL analysis queries' },
    ],
    overview:
      'A SQL-first analysis of a Netflix content dataset. Data was imported into MySQL, explored with analytical queries, and presented in an interactive Power BI dashboard.',
    problem:
      'A streaming catalogue is large and varied. The question: what does the catalogue look like by category, release year and rating — and how can that be summarised for quick decisions?',
    objective:
      'Practise end-to-end analysis: import raw data, answer business-style questions in SQL, and communicate findings visually.',
    architecture: ['Raw dataset (CSV)', 'MySQL import (605 records)', 'SQL analysis queries', 'Power BI model', 'Interactive dashboard'],
    workflowTitle: 'Analysis pipeline',
    workflow: ['Import CSV to MySQL', 'Check & clean fields', 'Category analysis', 'Release-year trends', 'Rating distribution', 'Average ratings', 'Power BI dashboard'],
    dataProcessing: [
      'Imported 605 records into a MySQL table.',
      'Used GROUP BY / aggregate queries for category counts and averages.',
      'Grouped titles by release year to study trends over time.',
      'Built rating distribution and average-rating summaries.',
    ],
    automationLogic: [
      'Reusable SQL queries saved in the repository.',
      'Power BI visuals with slicers for interactive filtering.',
    ],
    insights: [
      'Which content categories make up most of the catalogue.',
      'How the number of titles changes across release years.',
      'How ratings are distributed and how average ratings compare by category.',
    ],
    insightsNote: 'Questions explored in the analysis — see the GitHub repository for the exact queries and results.',
    relevance:
      'Shows core analyst skills: SQL aggregation, trend analysis and turning query results into a dashboard a non-technical audience can use.',
  },
  {
    id: 'sales',
    title: 'Sales Performance Analytics',
    shortTitle: 'Sales',
    tagline: 'Sample template — KPI, region & product analysis',
    description:
      'A planned sales analytics case study using SQL, Excel and Power BI. This card is a clearly labelled template until real data and results are added.',
    tech: ['SQL', 'Excel', 'Power BI'],
    status: 'template',
    category: 'SQL & BI',
    accent: 'emerald',
    size: 'short',
    highlights: ['KPI framework', 'Region view', 'Product mix'],
    thumbnail: 'images/projects/sales-thumbnail.png',
    screenshots: [{ file: 'images/projects/sales-dashboard.png', caption: 'Sales dashboard (to be added)' }],
    overview: 'Template for a sales performance case study. Replace this text once the analysis is complete.',
    problem: 'Planned question: how do revenue, units and margin vary by region, product and month?',
    objective: 'Planned objective: build a KPI dashboard that highlights trends, top/bottom performers and seasonality.',
    architecture: ['Sales dataset', 'SQL cleaning & aggregation', 'Excel validation', 'Power BI model', 'KPI dashboard'],
    workflowTitle: 'Planned pipeline',
    workflow: ['Source data', 'Clean & validate', 'Aggregate in SQL', 'Model in Power BI', 'Publish dashboard'],
    dataProcessing: ['To be added after the analysis is performed.'],
    automationLogic: ['To be added after the analysis is performed.'],
    insights: ['Results will be published here once the analysis is complete.'],
    insightsNote: 'No findings yet — this is a template, not completed work.',
    relevance: 'Sales KPI reporting is one of the most common analyst responsibilities.',
  },
  {
    id: 'healthcare',
    title: 'Healthcare Data Analytics',
    shortTitle: 'Healthcare',
    tagline: 'Learning project — Python, SQL & Power BI',
    description:
      'A learning project exploring a healthcare dataset with Python (Pandas), SQL and Power BI. Clearly labelled as learning work in progress.',
    tech: ['Python', 'Pandas', 'SQL', 'Power BI'],
    status: 'learning',
    category: 'Analytics',
    accent: 'cyan',
    size: 'medium',
    highlights: ['Pandas cleaning', 'SQL queries', 'Power BI visuals'],
    thumbnail: 'images/projects/healthcare-thumbnail.png',
    screenshots: [{ file: 'images/projects/healthcare-dashboard.png', caption: 'Healthcare dashboard (to be added)' }],
    overview: 'A learning project to practise the full analysis workflow on healthcare data. Content will be updated as the work progresses.',
    problem: 'Learning question: what patterns exist across patient demographics, conditions and admissions in the dataset?',
    objective: 'Practise data cleaning in Pandas, querying in SQL and storytelling in Power BI.',
    architecture: ['Healthcare dataset', 'Pandas cleaning', 'SQL exploration', 'Power BI model', 'Dashboard'],
    workflowTitle: 'Learning pipeline',
    workflow: ['Load data', 'Clean in Pandas', 'Explore with SQL', 'Visualise in Power BI', 'Write findings'],
    dataProcessing: ['To be documented as the project progresses.'],
    automationLogic: ['To be documented as the project progresses.'],
    insights: ['Findings will be added once the analysis is complete.'],
    insightsNote: 'Learning project — not presented as completed real-world work.',
    relevance: 'Builds hands-on Python and BI skills on a realistic, domain-specific dataset.',
  },
];
