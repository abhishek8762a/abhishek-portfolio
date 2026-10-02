import type { LucideIcon } from 'lucide-react';
import {
  Braces, ChartColumn, Database, FileSpreadsheet, Filter, Gauge, Boxes, Route,
  ShieldCheck, Sheet, Workflow, Calculator, CodeXml, LayoutDashboard, Table2, ChartLine, Bot,
} from 'lucide-react';

export interface SkillGroup {
  id: string;
  title: string;
  blurb: string;
  accent: 'blue' | 'violet' | 'cyan' | 'emerald';
  skills: { name: string; icon: LucideIcon; note: string }[];
}

/** No proficiency percentages on purpose — skills are shown by where they are used. */
export const skillGroups: SkillGroup[] = [
  {
    id: 'analytics',
    title: 'Data Analytics',
    blurb: 'Querying, cleaning and analysing data.',
    accent: 'blue',
    skills: [
      { name: 'SQL', icon: Database, note: 'Joins, aggregations, analysis queries' },
      { name: 'MySQL / PostgreSQL', icon: Table2, note: 'Schemas, roles, analysis queries' },
      { name: 'Python', icon: Braces, note: 'Scripting for data work' },
      { name: 'Pandas', icon: Calculator, note: 'Cleaning & transforming tables' },
      { name: 'NumPy', icon: ChartLine, note: 'Numerical operations' },
      { name: 'LLM tool-calling agents', icon: Bot, note: 'NL → SQL with self-correction' },
    ],
  },
  {
    id: 'bi',
    title: 'Business Intelligence',
    blurb: 'Turning data into dashboards people use.',
    accent: 'violet',
    skills: [
      { name: 'Power BI + DAX', icon: ChartColumn, note: 'Data models, measures, dashboards' },
      { name: 'Microsoft Excel', icon: FileSpreadsheet, note: 'Formulas, pivots, reporting' },
      { name: 'Looker Studio', icon: LayoutDashboard, note: 'Reports on Google Sheets data' },
    ],
  },
  {
    id: 'automation',
    title: 'Automation',
    blurb: 'Removing repetitive manual work.',
    accent: 'cyan',
    skills: [
      { name: 'Google Sheets', icon: Sheet, note: 'Operational databases & trackers' },
      { name: 'Google Apps Script', icon: CodeXml, note: 'Forms, web apps, workflow logic' },
      { name: 'Workflow Automation', icon: Workflow, note: 'Multi-step process tracking' },
    ],
  },
  {
    id: 'ops',
    title: 'Data Operations',
    blurb: 'Keeping data correct and decisions timely.',
    accent: 'emerald',
    skills: [
      { name: 'Data Cleaning', icon: Filter, note: 'Consistent, analysis-ready data' },
      { name: 'Data Validation', icon: ShieldCheck, note: 'Rules that stop bad entries' },
      { name: 'KPI Reporting', icon: Gauge, note: 'Metrics that track performance' },
      { name: 'Inventory Analytics', icon: Boxes, note: 'Stock, locations, reorder levels' },
      { name: 'Process Tracking', icon: Route, note: 'Stage-wise status & TAT' },
    ],
  },
];

export const webSkills = ['HTML', 'CSS', 'JavaScript', 'Chart.js', 'Git & GitHub', 'Dashboard Development'];
