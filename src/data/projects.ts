export type ProjectStatus = 'production' | 'completed' | 'template' | 'learning';
export type ProjectCategory = 'Automation' | 'AI & Python' | 'SQL' | 'Power BI';

export interface Project {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  tech: string[];
  status: ProjectStatus;
  category: ProjectCategory;
  /** visual accent for generated art & badges */
  accent: 'blue' | 'violet' | 'cyan' | 'rose' | 'emerald';
  size: 'tall' | 'medium' | 'short';
  highlights: string[];
  /** Thumbnail in public/images/projects/. Missing file → generated art. */
  thumbnail: string;
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
  /** Shows the interactive "same engine, any business flow" explorer in the case study. */
  flowExplorer?: boolean;
}

export const statusLabel: Record<ProjectStatus, string> = {
  production: 'Live in daily operations',
  completed: 'Completed project',
  template: 'Sample template — results pending',
  learning: 'Learning project — in progress',
};

export const projects: Project[] = [
  {
    id: 'ims',
    title: 'Inventory Management System',
    shortTitle: 'IMS',
    tagline: 'Stock control for 1,800+ SKUs, from store room to shop floor',
    description:
      'A Google Sheets + Apps Script inventory system running daily at a gearbox manufacturer — mobile stock-entry app, location- and stage-wise stock, reorder cycles, indents and a read-only audit engine.',
    tech: ['Google Apps Script', 'Google Sheets', 'HTML / CSS / JS', 'Web App API'],
    status: 'production',
    category: 'Automation',
    accent: 'blue',
    size: 'tall',
    highlights: ['1,884 SKUs', '6,100+ transactions', '20 categories', '7 locations', '27 item routes', '8 users'],
    thumbnail: 'images/projects/ims-thumbnail.png',
    screenshots: [
      { file: 'images/projects/ims-dashboard.png', caption: 'Stock matrix with colour-coded levels' },
      { file: 'images/projects/ims-entry-form.png', caption: 'Mobile stock IN / OUT entry app' },
      { file: 'images/projects/ims-location-stock.png', caption: 'Location- and stage-wise stock' },
    ],
    overview:
      'An inventory system that replaced manual stock registers. Store and production staff log every movement through a mobile web app; the workbook keeps a day-by-day stock matrix, location-wise and stage-wise balances, reorder quantities and an indent trail — 12 linked sheets driven by Apps Script.',
    problem:
      '1,800+ SKUs across 20 categories and 7 locations, with parts moving through production stages (turning, drilling, hobbing, grinding…). Manual registers could not answer three simple questions: how much do we have, where is it, and what must be ordered now.',
    objective:
      'One trustworthy source of stock truth: validated entries, live balances by location and stage, reorder suggestions from real consumption, and audit checks that catch bad data before it reaches decisions.',
    architecture: ['Mobile web app (login)', 'Apps Script API — doGet / doPost', 'In/Out transaction sheets', 'Stock engine + audit', 'Matrix · Reorder · Indent reports'],
    workflowTitle: 'Stock movement → reorder → indent',
    workflow: [
      'User logs in on mobile',
      'Pick category → SKU',
      'Choose location & stage',
      'Live stock shown before entry',
      'Submit IN / OUT / Transfer',
      'Daily closing check',
      'Stock matrix recalculated',
      'Reorder qty from OWS cycle',
      'Approve with Y',
      'Indent IND-n created',
    ],
    dataProcessing: [
      'Hybrid stock model: the latest physical Daily Closing for a SKU becomes the baseline, then only transactions after that date are applied — so a physical count always overrides drift.',
      'Day-by-day stock matrix for any date range (up to 90 days), colour-coded against Max Level: ≤33% red, ≤66% yellow, ≤100% green, above = overstock.',
      'Location stock from the Tracking grid; stage stock computed live as IN − OUT per SKU + location + stage.',
      'Average Daily Consumption from actual OUT transactions over a user-chosen window.',
      'Header-alias matching (e.g. "SKU", "SKU Code", "Item Code") so the engine keeps working when columns move.',
    ],
    automationLogic: [
      'Web app API with actions for login, master data, dropdowns, location/stage stock and batched submissions.',
      'Item-type-specific stage routes read from a Dropdowns sheet — add a column, the form picks it up.',
      'Reorder quantity = units consumed since the chosen weekly cycle day (OWS); approved rows become sequential indents (IND-1, IND-2…).',
      'Read-only audit: missing headers, duplicate SKUs, invalid transactions, duplicate closings, negative stock, reorder mismatches, duplicate indent IDs.',
      'Document locks prevent two runs colliding; time triggers refresh closing stock every 3 h and the matrix every 6 h.',
    ],
    insights: [
      'Current stock per SKU, per location and per production stage — without anyone adding up a register.',
      'Items heading below their level are visible by colour, and reorder quantities come from real consumption.',
      'Every indent is traceable to the stock and consumption numbers that justified it.',
    ],
    relevance:
      'Inventory accuracy drives production planning and purchasing. The same skills — data modelling, validation, reconciliation and reporting automation — apply to any analyst role that owns operational data.',
  },
  {
    id: 'agent',
    title: 'AI SQL Analytics Agent',
    shortTitle: 'AI Agent',
    tagline: 'Ask in plain English — it writes, runs and fixes its own SQL',
    description:
      'A Python agent that turns business questions into SQL on PostgreSQL, detects errors and dirty data, rewrites its own queries and returns a business-friendly answer. Read-only and guarded against destructive SQL.',
    tech: ['Python', 'PostgreSQL', 'psycopg2', 'Groq LLM', 'Tool calling'],
    status: 'completed',
    category: 'AI & Python',
    accent: 'cyan',
    size: 'tall',
    highlights: ['4 agent tools', 'Self-correction loop', '2-layer security', '5 tables · 2,810 rows', 'Daily KPI report'],
    thumbnail: 'images/projects/agent-thumbnail.png',
    screenshots: [{ file: 'images/projects/agent-run.png', caption: 'Agent run — error → inspect → fix → answer' }],
    overview:
      'Not a chatbot that guesses SQL once. The agent loops: it calls tools to read the schema, inspect tables and check data quality, executes queries, reads real Postgres errors, and keeps going until it has a verifiable answer.',
    problem:
      'Business users can’t write SQL, and naive text-to-SQL breaks on real data — inconsistent casing, “N/A” in numeric columns, NULLs and duplicates give wrong totals or errors.',
    objective: 'Answer natural-language questions correctly on messy data, explain what was excluded, and never modify the database.',
    architecture: ['Question in plain English', 'LLM agent (Groq · gpt-oss-20b)', 'Tools: execute_sql · get_schema · inspect_table · inspect_data_quality', 'PostgreSQL (read-only role)', 'Business-friendly answer'],
    workflowTitle: 'Self-correction loop (real example)',
    workflow: ['“Total payments received?”', 'SUM(CAST(amount)) fails on “N/A”', 'inspect_data_quality(payments, amount)', 'Finds invalid text rows', 'Rewrites with numeric regex filter', 'Executes successfully', 'Answer + note on excluded rows'],
    dataProcessing: [
      'E-commerce dataset: customers, products, orders, order_items, payments (~2,810 rows).',
      'Deliberate data-quality issues: city casing (Mumbai / MUMBAI), NULLs, “N/A” in numeric text, duplicates, invalid dates.',
      'Agent normalises casing before GROUP BY and filters invalid numerics before CAST/SUM.',
    ],
    automationLogic: [
      'Multi-round tool-calling loop with a max-iteration guard.',
      'validate_sql() blocks DROP / DELETE / UPDATE / INSERT / ALTER / TRUNCATE and enforces SELECT-only.',
      'Dedicated agent_readonly PostgreSQL role — the database itself rejects writes.',
      'Credentials in .env; scheduled daily KPI + AI summary report via Task Scheduler.',
    ],
    insights: [
      'The agent catches casing issues that silently produce wrong GROUP BY results.',
      'It reports what it excluded instead of quietly returning a misleading total.',
    ],
    relevance: 'Shows SQL depth, data-quality thinking and practical AI-agent design — with the security a real company would require.',
  },
  {
    id: 'fda',
    title: 'FDA Adverse Events Analysis',
    shortTitle: 'FDA SQL',
    tagline: '90,786 safety reports investigated with SQL',
    description:
      'End-to-end SQL investigation of the FDA CAERS dataset (2004–2017): which products, brands and age groups appear most in adverse-event and serious-outcome reports.',
    tech: ['MySQL', 'SQL', 'Excel'],
    status: 'completed',
    category: 'SQL',
    accent: 'rose',
    size: 'medium',
    highlights: ['90,786 records', '2004–2017', 'Serious-case analysis', 'Redacted-data flag'],
    thumbnail: 'images/projects/fda-thumbnail.png',
    screenshots: [],
    overview: 'A public-health data investigation using only SQL: ingestion, cleaning and multi-angle analysis of 90,786 adverse-event reports.',
    problem: 'Which product categories, brands and demographics are behind adverse events — and how much of the picture is hidden?',
    objective: 'Answer safety questions with reproducible SQL and turn the findings into recommendations.',
    architecture: ['FDA CAERS CSV', 'MySQL import', 'Cleaning queries', 'Analysis queries', 'Findings & recommendations'],
    workflowTitle: 'Analysis pipeline',
    workflow: ['Import 90,786 rows', 'Clean & standardise', 'Category analysis', 'Gender & age split', 'Year trend', 'Serious outcomes', 'Brand drill-down'],
    dataProcessing: ['Category, gender, age-group and year aggregations.', 'Death / hospitalisation filtering for serious cases.', 'Brand-level ranking and cross-checks.'],
    automationLogic: ['All analysis saved as reusable SQL in the repository.'],
    insights: [
      'Supplements: 48,501 reports — about 4× cosmetics (11,733), the next category.',
      'Report volume grew roughly 5× from 2004 (3,338) to 2016 (15,547).',
      'Females 64.9% of reports; seniors (60+) had the most serious cases (20,889).',
      '“REDACTED” is the most reported brand (6,081 reports, 1,393 serious cases) — a data-transparency problem in itself.',
    ],
    relevance: 'Healthcare / pharma data analysis — a direct bridge from a pharmaceutical QC background to analytics.',
  },
  {
    id: 'hormuz',
    title: 'Strait of Hormuz Oil Dashboard',
    shortTitle: 'Hormuz',
    tagline: '40 years of oil prices vs geopolitical shocks',
    description:
      'A Power BI dashboard linking 40 years of daily WTI prices with 42 crisis events, Hormuz ship traffic and consumption across 211 countries — every dataset labelled Real, Computed or Modeled.',
    tech: ['Power BI', 'DAX', 'Excel', 'Data validation'],
    status: 'completed',
    category: 'Power BI',
    accent: 'cyan',
    size: 'tall',
    highlights: ['1986–2026', '211 countries', '42 events', '10,000+ rows verified'],
    thumbnail: 'images/projects/hormuz-thumbnail.jpg',
    screenshots: [{ file: 'images/projects/hormuz-dashboard.jpg', caption: 'Global oil market dashboard' }],
    overview: 'A geopolitical-risk dashboard where the real work was making the data trustworthy before visualising it.',
    problem: 'How much do conflicts near one narrow strait actually move oil prices — measured, not headlined?',
    objective: 'Quantify event price impact and country exposure with transparent, labelled data.',
    architecture: ['EIA · FRED · IMF PortWatch data', 'Excel cleaning & reconciliation', 'Computed metrics (YoY, T+30)', 'Power BI model + DAX', 'Filterable dashboard'],
    workflowTitle: 'Methodology',
    workflow: ['Collect', 'Clean', 'Reconcile totals', 'Compute YoY & event impact', 'Model dependency score', 'Label confidence', 'Build in Power BI'],
    dataProcessing: [
      'Verified 10,000+ daily price rows against official EIA history.',
      'Reconciled 211 countries of consumption until it matched the published global total.',
      'Event impact measured at T−7 / T+7 / T+30 around each event date.',
    ],
    automationLogic: ['Filters by year, region, country and event type.'],
    insights: ['The 2026 Hormuz crisis drove an approx. 57% price surge in 30 days — comparable to the 1990 Gulf War shock.'],
    insightsNote: 'The Hormuz Dependency Score is a self-built composite model, clearly labelled as such in the project.',
    relevance: 'Data validation discipline and honest labelling — exactly what decision-makers need from an analyst.',
  },
  {
    id: 'fms',
    title: 'Flow Management System',
    shortTitle: 'FMS',
    tagline: 'Track any business process — step by step, on time or late',
    description:
      'A sheet-driven workflow engine where every step has a Who, How and When. Configured at Omex for Order-to-Dispatch: 24 steps across 5 phases with batch-level tracking of partially fulfilled orders.',
    tech: ['Google Apps Script', 'Google Sheets', 'Google Forms', 'Looker Studio'],
    status: 'production',
    category: 'Automation',
    accent: 'violet',
    size: 'medium',
    highlights: ['24 steps · 5 phases', '90+ orders', '50+ clients', 'Batch-level TAT', 'Any process'],
    thumbnail: 'images/projects/fms-thumbnail.png',
    screenshots: [
      { file: 'images/projects/fms-workflow.png', caption: 'Planned / Actual / Status / Delay per step' },
      { file: 'images/projects/fms-pending.png', caption: 'Pending & overdue steps' },
      { file: 'images/projects/fms-looker.png', caption: 'Looker Studio report' },
    ],
    overview:
      'An FMS turns a business process into a row-per-item tracker. Each step gets four columns — Planned, Actual, Status and Time Delay — and the planned time is calculated from the previous step using working hours and holidays. Built on an Apps Script Wizard Formula engine — setup and step wizards generate each step’s formulas — configured for Omex’s order-to-dispatch flow.',
    problem:
      'An order rarely moves as one unit. Production decides how much to make this month, the client decides how much to take now, only part gets ready, and only part is dispatched. Tracking the whole order as “pending” hid which part was stuck and where.',
    objective:
      'Track every split portion as its own batch with its own planned-vs-actual clock, keep the parent balance auto-reconciled, and measure delay per stage and department.',
    architecture: ['Entry form (unique ID)', 'Apps Script FMS engine', 'Google Sheets — one row per item', 'Planned · Actual · Status · Delay', 'Looker Studio reporting'],
    workflowTitle: 'Order-to-Dispatch — 5 phases, 4 split points',
    workflow: [
      'Sales Order received',
      'Split 1 · RM plan (production capacity)',
      'Work order → bought-out plan',
      'Split 2 · client schedule',
      'Assembly',
      'Split 3 · FG confirmation (what got ready)',
      'Dispatch plan confirmation',
      'Split 4 · actual dispatch',
      'Delivered — parent balance closes',
    ],
    dataProcessing: [
      'Every step = Planned | Actual | Status | Time Delay. Planned is computed from the previous step’s Actual.',
      'Three timing methods: TAT in working hours, days-before-a-future-date (e.g. 2 days before delivery), or a specific clock time.',
      'Working-hour deadlines respect shift timings, working-day patterns and a holiday calendar.',
      'Phase 1 matches on PO number; later phases match on a generated Unique ID, so tracking becomes batch-level, not order-level.',
      'Parent balance reconciles automatically: balance = ordered qty − sum of child batch quantities.',
    ],
    automationLogic: [
      'Wizard Formula setup: wizards create the entry form, step blocks and TAT formulas — no hand-written formulas per step.',
      'Decision steps (Yes / No) with conditional steps that only run on one path.',
      'Variable per-row lead-time columns for steps whose deadline differs by item or vendor.',
      'Status dropdown stamps the Actual time; delay cells turn yellow when overdue and red when done late.',
      'Sales Order entry web app with source validation feeds the first phase.',
    ],
    insights: [
      'TAT analysis across the 24-step pipeline (90+ orders, 50+ clients), quantifying planned-vs-actual delay per stage.',
      'Stuck sub-orders become visible at batch level instead of the whole order showing as pending.',
      'Department-wise slippage is measurable, so follow-ups target the right person.',
    ],
    relevance:
      'Process mining in a spreadsheet: define the flow, timestamp every step, measure delay. The same engine tracks purchase, hiring, service tickets or any flow with a unique ID — see the explorer below.',
    flowExplorer: true,
  },
  {
    id: 'netflix',
    title: 'Netflix Content Analytics',
    shortTitle: 'Netflix',
    tagline: 'SQL analysis + a Power BI dashboard',
    description:
      'Two-part project: SQL analysis of ratings, release trends and quality tiers in MySQL, and an interactive Power BI dashboard on content mix, genres, ratings and countries.',
    tech: ['MySQL', 'SQL', 'Power BI', 'Power Query'],
    status: 'completed',
    category: 'SQL',
    accent: 'rose',
    size: 'medium',
    highlights: ['SQL + Power BI', 'Rating tiers', 'Release trends', 'Top countries'],
    thumbnail: 'images/projects/netflix-thumbnail.jpg',
    screenshots: [{ file: 'images/projects/netflix-dashboard.jpg', caption: 'Power BI dashboard' }],
    overview: 'The same domain analysed twice — first in SQL to answer specific questions, then in Power BI to make the picture explorable.',
    problem: 'What does the catalogue look like by rating, genre, type, country and release year?',
    objective: 'Practise the full path: query → insight → dashboard → recommendation.',
    architecture: ['Dataset (CSV / XLSX)', 'MySQL queries', 'Power Query cleaning', 'Power BI model', 'Interactive dashboard'],
    workflowTitle: 'Analysis pipeline',
    workflow: ['Import to MySQL', 'Rating distribution', 'Year-wise releases', 'Score tiers (CASE)', 'Clean in Power Query', 'Build visuals', 'Recommendations'],
    dataProcessing: ['CASE-based tiers: Excellent / Good / Average / Low.', 'Year-wise counts and averages.', 'Genre, type and country breakdowns in Power BI.'],
    automationLogic: ['Slicers and cross-filtering in the dashboard.'],
    insights: [
      'SQL: TV-14 has the most shows; 2016 had the most releases; 2017 the highest average rating.',
      'Power BI: movies are about 69% of titles; the USA contributes the most; output rises sharply after 2015.',
    ],
    relevance: 'Core analyst workflow — aggregation in SQL and storytelling in a BI tool.',
  },
  {
    id: 'healthcare',
    title: 'Healthcare Executive Dashboard',
    shortTitle: 'Healthcare',
    tagline: 'Revenue, patients and satisfaction for hospital leadership',
    description:
      'An interactive Power BI executive dashboard on 5,000 patient visits — revenue by hospital and visit type, monthly average bill, visit volumes and satisfaction.',
    tech: ['Power BI', 'DAX', 'Power Query', 'Data modelling'],
    status: 'completed',
    category: 'Power BI',
    accent: 'emerald',
    size: 'medium',
    highlights: ['5,000 visits', '5 hospitals', 'OPD · IPD · Emergency', 'KPI cards'],
    thumbnail: 'images/projects/healthcare-thumbnail.jpg',
    screenshots: [{ file: 'images/projects/healthcare-dashboard.jpg', caption: 'Executive dashboard' }],
    overview: 'A one-page executive view of hospital performance with filters for hospital, date, city and visit type.',
    problem: 'Executives need revenue, volume and satisfaction in one place, sliceable by hospital and visit type.',
    objective: 'Design KPI cards and visuals that answer leadership questions in seconds.',
    architecture: ['HEALTHCARE.csv (5,000 rows)', 'Power Query cleaning', 'Data model', 'DAX measures', 'Executive dashboard'],
    workflowTitle: 'Build steps',
    workflow: ['Load data', 'Clean in Power Query', 'Model', 'DAX KPIs', 'Visuals', 'Filters', 'Review'],
    dataProcessing: ['KPIs: total revenue, total patients, average satisfaction, average age.', 'Revenue split by hospital and visit type.'],
    automationLogic: ['Slicers for hospital, date, city and visit type.'],
    insights: ['OPD drives the highest visit volume; revenue is compared across five hospitals and three visit types.'],
    relevance: 'Healthcare KPI reporting — supported by the Healthcare Data Visualization certification.',
  },
  {
    id: 'delegation',
    title: 'Delegation Management System',
    shortTitle: 'Delegation',
    tagline: 'Task assignment, follow-ups and an MD performance dashboard',
    description:
      'A full-stack Google Apps Script web app: managers assign tasks, follow up on deadlines, log revisions and see weekly performance scores per employee — no external backend.',
    tech: ['Google Apps Script', 'HTML / CSS / JS', 'Chart.js', 'Google Sheets'],
    status: 'completed',
    category: 'Automation',
    accent: 'emerald',
    size: 'medium',
    highlights: ['Follow-up workflow', 'Revision tracking', 'PIN-locked MD view', 'Performance score'],
    thumbnail: 'images/projects/delegation-thumbnail.jpg',
    screenshots: [{ file: 'images/projects/delegation-dashboard.jpg', caption: 'MD dashboard — weekly KPIs' }],
    overview:
      'An internal tool for delegating work and holding it to a deadline. Tasks get a first commitment date, follow-ups surface what is due or overdue, revisions are logged, and the MD dashboard scores each employee with a transparent formula.',
    problem:
      'Tasks given verbally or on WhatsApp disappear. Nobody knows what is overdue, how often deadlines were pushed, or who consistently delivers.',
    objective: 'Make every delegated task trackable from assignment to completion, and turn follow-up history into a fair performance measure.',
    architecture: ['Web app UI (dark theme)', 'google.script.run', 'Apps Script backend', 'MASTER · EMPLOYEE MASTER · ARCHIVE', 'MD dashboard + Chart.js'],
    workflowTitle: 'Task lifecycle',
    workflow: ['Assign task (auto-fill employee)', 'First commitment date', 'Follow-up list (due / overdue)', 'Revise deadline (logged)', 'Complete or cancel', 'Archive', 'Weekly MD scoring'],
    dataProcessing: [
      'Employee details auto-fill from the Employee Master on assignment.',
      'Revision count and dates are kept per task, so pushed deadlines are never lost.',
      'Weekly / period filters with compare-with-another-period mode.',
    ],
    automationLogic: [
      'Performance % = Completion% × 0.5 + On-time% × 0.5 − Revision penalty.',
      'Revision penalty = min(average revisions per task × 10, 50).',
      'Required sheets are created automatically on first run; completed tasks can be archived.',
    ],
    insights: [
      'Completion rate, on-time rate and revision count per employee at a glance.',
      'Overdue tasks surface first in the follow-up view, sorted by oldest deadline.',
    ],
    relevance: 'KPI design and reporting for people-process data — the same thinking used in HR, operations and project analytics.',
  },
  {
    id: 'railway',
    title: 'Railway Display Board',
    shortTitle: 'Railway SQL',
    tagline: 'One source of truth — update one row, every screen agrees',
    description:
      'A small SQL design project modelling a station display board: stations, trains, schedules and live status — with the board built as a JOIN, never a copy.',
    tech: ['MySQL', 'SQL', 'Data modelling'],
    status: 'completed',
    category: 'SQL',
    accent: 'blue',
    size: 'short',
    highlights: ['5 tables', 'Single source of truth', 'Live status JOIN'],
    thumbnail: 'images/projects/railway-board.jpg',
    screenshots: [{ file: 'images/projects/railway-board.jpg', caption: 'Display board query result' }],
    overview: 'A curiosity project: how does a station display board stay in sync with the app and website? Answer — they all read one table.',
    problem: 'If delays are stored in several places, screens disagree.',
    objective: 'Design a schema where one UPDATE changes every display.',
    architecture: ['stations', 'train_master', 'train_schedule', 'live_status (source of truth)', 'Display-board JOIN'],
    workflowTitle: 'How a delay propagates',
    workflow: ['Train delayed', 'UPDATE one live_status row', 'Board query re-runs', 'Every screen shows the delay'],
    dataProcessing: ['Normalised schema with keys between trains, schedules and live status.'],
    automationLogic: ['schema.sql builds everything; queries.sql runs the board and the update demo.'],
    insights: ['The core idea behind operational dashboards: one source of truth, many readers.'],
    relevance: 'Data-modelling fundamentals that apply to every MIS system — including the IMS and FMS above.',
  },
];
