'use client';
import React, { useState, useRef, useEffect } from "react";
import { ChartBarIcon, CurrencyDollarIcon, UserGroupIcon, ExclamationTriangleIcon, CheckCircleIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, DocumentTextIcon, ArrowDownTrayIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table as DocxTable, TableRow, TableCell, BorderStyle } from 'docx';
import { saveAs } from 'file-saver';

const companies = [
  { id: 1, name: 'KovoRCM', president: 'Justin Anderson', ticker: 'KOVO', industry: 'Healthcare', fiscalYear: '2025' },
  { id: 2, name: 'Veebas', president: 'Sarah Lee', ticker: 'VBS', industry: 'Tech', fiscalYear: '2025' },
  { id: 3, name: 'AIVector', president: 'Mike Smith', ticker: 'AIV', industry: 'AI', fiscalYear: '2025' },
  { id: 4, name: 'Leva', president: 'Anna Kim', ticker: 'LEVA', industry: 'MedTech', fiscalYear: '2025' },
  { id: 5, name: 'TCN', president: 'John Doe', ticker: 'TCN', industry: 'Telecom', fiscalYear: '2025' },
  { id: 6, name: 'The Newly Institute', president: 'Jane Doe', ticker: 'TNI', industry: 'Research', fiscalYear: '2025' },
];

const months = [
  'January 2025',
  'February 2025',
  'March 2025',
  'April 2025',
  'May 2025',
  'June 2025',
];

const financialHighlights = [
  { metric: 'Revenue', current: 867309, budget: 955952 },
  { metric: 'Operating Expenses', current: 960540, budget: 1089502 },
  { metric: 'Net Profit / (Loss)', current: -372220, budget: -309642 },
  { metric: 'EBITDA', current: -93231, budget: -133550 },
  { metric: 'Cash Flow', current: 103930, budget: 2684333 },
];

const nonFinancialMetrics = [
  { metric: 'People costs / Total Expense', current: '54.7%', prior: '55.4%', variance: '-0.7%' },
  { metric: 'Total FTEs', current: '98', prior: '103', variance: '-4.85%' },
  { metric: 'Payroll % of sales (%)', current: '78.6%', prior: '72.6%', variance: '6.0%' },
];

const useOfProceeds = [
  { month: 'Dec-24', budgeted: 2000000, disbursed: 0 },
  { month: 'Jan-25', budgeted: 0, disbursed: 0 },
  { month: 'Feb-25', budgeted: 0, disbursed: 915486 },
  { month: 'Mar-25', budgeted: 0, disbursed: 0 },
  { month: 'Apr-25', budgeted: 0, disbursed: 0 },
  { month: 'May-25', budgeted: 0, disbursed: 0 },
  { month: 'Jun-25', budgeted: 0, disbursed: 0 },
];

const executiveSummary = [
  { label: 'Revenue Decline', value: 'A 9.27% decrease in revenues, driven by the loss of 2 clients.' },
  { label: 'Cost Adjustments', value: 'Salary expenses decreased by 7.16% due to operational headcount reductions.' },
  { label: 'Funding Strategy Update', value: 'A revised funding strategy includes a planned debt raise in April/May 2025, with risks that the funding process may take longer than expected.' },
];

const operationalAchievements = [
  { title: 'Operational Milestones', items: [
    'E&O & Cyber security (backdating to 2003, all companies)',
    'D&O renew (BUT) opportunity to save $50k to $60k',
  ]},
  { title: 'Product/Service Updates', items: [
    'Outsource RCM small business model (launch June 2025)',
    'Recast 30% of revenue classification Q3',
  ]},
  { title: 'Strategic Partnerships/Deals', items: [
    'Two MSPs identified for acquisition',
    'LOI for Veebas & AI Vector signed',
  ]},
];

const challenges = [
  { title: 'Lawsuits', icon: ExclamationTriangleIcon },
  { title: 'Capital raise', icon: ExclamationTriangleIcon },
];

const focusAreas = [
  'Contract addendum to recognize 30% of revenue as AI/SaaS',
  'Wound care specialty sales',
];

const commentary = [
  { label: 'Challenge 1', value: 'Loss of two large clients. Run out from E&A and RPM has been by far the worst brand, largely stemming from structure and legal handling. The forbearance period and blocking proved to be disastrous.' },
  { label: 'Challenge 2', value: 'OPEX cost cuts. Two large RIFs last year and continued headcount decrease. Costs of operating Pubco. and maintaining company structure for future vision strains the budget.' },
  { label: 'Challenge 3', value: '$ Raise: In process of opening a Kovo+ Pubco. Equity deal room and HEAL US Sub Debt deal room for acquisitions. Complex.' },
];

const wins = [
  'E&A performed better than budget; data points of winning a few clients back.',
  'Restore Health: identified and testing a large RCM revenue channel. Critical path as replacement to organic sales strategy.',
];
const onTrack = [
  'Changed Healthcare Insurance. Improved employee offering while saving $ per month and improving our employee services platform.',
  'Standard RCM sales wins: after year of zero sales, the pipeline is building.',
];
const misses = [
  'Midwest unfavorable to budget',
  'RPM unfavorable to budget',
  'Runouts larger than expected',
  '$ Raise efforts changes in plans/timing, affects planned revenue forecast and cascades through entire forecast plan.',
  'Augmenting organic sales strategy/focus. Internal systems are issue and implementing pivot (more in MD&A)',
];

interface FormData {
  preparedBy: string;
  date: string;
  // Executive Summary
  purpose: string;
  overallPerformance: string;
  // Financial Highlights
  revenue: string | number;
  expenses: string | number;
  netProfit: string | number;
  ebitda: string | number;
  cashFlow: string | number;
  commentary: string;
  // Key Operational & Strategic Achievements
  operationalMilestones: string;
  productUpdates: string;
  strategicPartnerships: string;
  // Challenges & Mitigation
  challenge1: string;
  mitigation1: string;
  challenge2: string;
  mitigation2: string;
  challenge3: string;
  mitigation3: string;
  // Focus Areas
  focusAreas: string;
  // Acknowledgments & Team Highlights
  acknowledgments: string;
  // CEO Signature
  ceoSignature: string;
  ceoTitle: string;
  companyName: string;
  confidential: string;
}

type SavedReport = FormData & { id: string; companyId: number; month: string };

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm mb-6">
      <h2 className="text-xl font-semibold text-blue-700 mb-4">{title}</h2>
      {children}
    </div>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: (string | number | React.ReactNode)[][] }) {
  return (
    <table className="min-w-full divide-y divide-gray-200 mb-4">
      <thead className="bg-blue-50">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-100">
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td key={j} className="px-4 py-2 text-sm text-gray-900">{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Mock trend data for charts
const chartData = [
  { name: 'Prior Month', Revenue: 900000, Expenses: 1000000, EBITDA: -100000, NetProfit: -350000, CashFlow: 120000 },
  { name: 'Budget', Revenue: 955952, Expenses: 1089502, EBITDA: -133550, NetProfit: -309642, CashFlow: 2684333 },
  { name: 'Current', Revenue: 867309, Expenses: 960540, EBITDA: -93231, NetProfit: -372220, CashFlow: 103930 },
];

function MetricChart({ title, dataKey, color, chartData }: { title: string; dataKey: string; color: string; chartData: { name: string; Revenue: number; Expenses: number; EBITDA: number; NetProfit: number; CashFlow: number; }[] }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col items-stretch overflow-visible">
      <div className="font-bold text-lg text-gray-900 mb-4">{title}</div>
      <div className="overflow-visible">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#1e293b" tick={{ fontSize: 14 }} />
            <YAxis stroke="#1e293b" tick={{ fontSize: 14 }} domain={['auto', 'auto']} />
            <Tooltip wrapperClassName="!text-gray-900" />
            <Bar dataKey={dataKey} fill={color} radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4">
        <span className="px-3 py-1 rounded bg-gray-50 border border-gray-200 text-sm font-medium" style={{ color }}>{dataKey}</span>
      </div>
    </div>
  );
}

// Helper for currency formatting
function formatCurrency(value: string | number) {
  if (value === '' || value === null || value === undefined) return '';
  const num = typeof value === 'string' ? Number(value.replace(/[^\d.-]/g, '')) : value;
  if (isNaN(num)) return '';
  return num.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export default function FlashReports() {
  const [selectedCompany, setSelectedCompany] = useState(companies[0].id);
  const [selectedMonth, setSelectedMonth] = useState(months[1]);
  const company = companies.find(c => c.id === selectedCompany)!;

  // Define defaultForm at the top of the FlashReports component
  const defaultForm: FormData = {
    preparedBy: 'Justin Anderson',
    date: '',
    purpose: '',
    overallPerformance: '',
    revenue: '',
    expenses: '',
    netProfit: '',
    ebitda: '',
    cashFlow: '',
    commentary: '',
    operationalMilestones: '',
    productUpdates: '',
    strategicPartnerships: '',
    challenge1: '',
    mitigation1: '',
    challenge2: '',
    mitigation2: '',
    challenge3: '',
    mitigation3: '',
    focusAreas: '',
    acknowledgments: '',
    ceoSignature: 'Justin Anderson',
    ceoTitle: 'Chief Executive Officer',
    companyName: 'Kovo+',
    confidential: 'Confidential & Internal Use Only',
  };

  // Initialize form with empty values
  const [form, setForm] = useState<FormData>({ ...defaultForm });
  const [formError, setFormError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [exportError, setExportError] = useState('');

  // Add at the top of the FlashReports component
  const pendingExportRef = useRef(false);

  // Add useEffect to trigger PDF export after form state is set
  useEffect(() => {
    if (pendingExportRef.current) {
      pendingExportRef.current = false;
      handleExportPDF();
    }
  }, [form]);

  // Update chartData and financialHighlights based on form
  const dynamicChartData = [
    { name: 'Prior Month', Revenue: 900000, Expenses: 1000000, EBITDA: -100000, NetProfit: -350000, CashFlow: 120000 },
    { name: 'Budget', Revenue: 955952, Expenses: 1089502, EBITDA: -133550, NetProfit: -309642, CashFlow: 2684333 },
    { name: 'Current', Revenue: Number(form.revenue), Expenses: Number(form.expenses), EBITDA: Number(form.ebitda), NetProfit: Number(form.netProfit), CashFlow: Number(form.cashFlow) },
  ];
  const dynamicFinancialHighlights = [
    { metric: 'Revenue', current: Number(form.revenue), budget: 955952 },
    { metric: 'Operating Expenses', current: Number(form.expenses), budget: 1089502 },
    { metric: 'Net Profit / (Loss)', current: Number(form.netProfit), budget: -309642 },
    { metric: 'EBITDA', current: Number(form.ebitda), budget: -133550 },
    { metric: 'Cash Flow', current: Number(form.cashFlow), budget: 2684333 },
  ];

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target;
    if (["revenue", "expenses", "ebitda", "netProfit", "cashFlow"].includes(name)) {
      // Format as currency while typing
      const raw = value.replace(/[^\d.-]/g, '');
      setForm((prev) => ({ ...prev, [name]: raw === '' ? '' : Number(raw) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  }

  function handleFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Validate required numeric fields
    if ([form.revenue, form.expenses, form.ebitda, form.netProfit, form.cashFlow].some(v => (typeof v === 'string' ? (v as string).trim() === '' : false) || isNaN(Number(v)))) {
      setFormError('Please enter valid numbers for all metrics.');
      return;
    }
    setFormError('');
    // Optionally scroll to report preview
    previewRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // PDF Export
  async function handleExportPDF() {
    setExportError('');
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 15;
      let y = margin;

      // Header with logo
      try {
        const logo = await fetch('/images/heal-logo.png').then(r => r.blob());
        const logoUrl = URL.createObjectURL(logo);
        pdf.addImage(logoUrl, 'PNG', margin, y, 40, 15);
      } catch (e) {
        console.log('Logo not available, continuing without it');
      }

      // Title and Company Info
      pdf.setFontSize(24);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Monthly Summary Report', pageWidth - margin, y + 10, { align: 'right' });
      
      pdf.setFontSize(14);
      pdf.setTextColor(51, 51, 51);
      y += 25;
      pdf.text(`${form.companyName}`, pageWidth - margin, y, { align: 'right' });

      // Prepared By and Date
      y += 10;
      pdf.setFontSize(10);
      pdf.setTextColor(102, 102, 102);
      pdf.text(`Prepared By: ${form.preparedBy}`, margin, y);
      pdf.text(`Date: ${form.date}`, pageWidth - margin, y, { align: 'right' });

      // Executive Summary
      y += 15;
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Executive Summary', margin, y);
      pdf.line(margin, y + 2, pageWidth - margin, y + 2);

      y += 10;
      pdf.setFontSize(11);
      pdf.setTextColor(51, 51, 51);

      // Executive Summary Content
      pdf.setFont('helvetica', 'bold');
      pdf.text('Overview:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const summaryLines = pdf.splitTextToSize(form.purpose || '', pageWidth - (2 * margin));
      y += 7;
      summaryLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Financial Performance
      y += 10;
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Financial Performance', margin, y);
      pdf.line(margin, y + 2, pageWidth - margin, y + 2);

      y += 10;
      pdf.setFontSize(11);
      pdf.setTextColor(51, 51, 51);

      // Financial Metrics Table
      const metrics: [string, string | number][] = [
        ['Revenue', form.revenue || 0],
        ['Operating Expenses', form.expenses || 0],
        ['Net Profit / (Loss)', form.netProfit || 0],
        ['EBITDA', form.ebitda || 0]
      ];

      // Table header
      pdf.setFillColor(240, 240, 240);
      pdf.rect(margin, y, pageWidth - (2 * margin), 8, 'F');
      pdf.setFont('helvetica', 'bold');
      pdf.text('Metric', margin + 2, y + 6);
      pdf.text('Amount', pageWidth - margin - 40, y + 6, { align: 'right' });

      // Table rows
      y += 8;
      metrics.forEach(([metric, value]) => {
        pdf.setFont('helvetica', 'normal');
        pdf.text(metric, margin + 2, y + 6);
        pdf.text(formatCurrency(value), pageWidth - margin - 2, y + 6, { align: 'right' });
        y += 8;
      });

      // Revenue Analysis
      y += 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Revenue Analysis:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const revenueLines = pdf.splitTextToSize(form.commentary || '', pageWidth - (2 * margin));
      y += 7;
      revenueLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Expense Analysis
      y += 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Expense Analysis:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const expenseLines = pdf.splitTextToSize(form.commentary || '', pageWidth - (2 * margin));
      y += 7;
      expenseLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Operational Performance
      y += 10;
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Operational Performance', margin, y);
      pdf.line(margin, y + 2, pageWidth - margin, y + 2);

      y += 10;
      pdf.setFontSize(11);
      pdf.setTextColor(51, 51, 51);

      // KPIs
      pdf.setFont('helvetica', 'bold');
      pdf.text('Key Performance Indicators:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const kpiLines = pdf.splitTextToSize(form.operationalMilestones || '', pageWidth - (2 * margin));
      y += 7;
      kpiLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Segment Performance
      y += 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Segment Performance:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const segmentLines = pdf.splitTextToSize(form.productUpdates || '', pageWidth - (2 * margin));
      y += 7;
      segmentLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Operational Efficiency
      y += 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Operational Efficiency:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const efficiencyLines = pdf.splitTextToSize(form.strategicPartnerships || '', pageWidth - (2 * margin));
      y += 7;
      efficiencyLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Liquidity and Capital Resources
      y += 10;
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Liquidity and Capital Resources', margin, y);
      pdf.line(margin, y + 2, pageWidth - margin, y + 2);

      y += 10;
      pdf.setFontSize(11);
      pdf.setTextColor(51, 51, 51);

      // Liquidity Overview
      pdf.setFont('helvetica', 'bold');
      pdf.text('Liquidity Overview:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const liquidityLines = pdf.splitTextToSize(form.commentary || '', pageWidth - (2 * margin));
      y += 7;
      liquidityLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Capital Structure
      y += 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Capital Structure:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const capitalLines = pdf.splitTextToSize(form.commentary || '', pageWidth - (2 * margin));
      y += 7;
      capitalLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Risk Factors
      y += 10;
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Risk Factors', margin, y);
      pdf.line(margin, y + 2, pageWidth - margin, y + 2);

      y += 10;
      pdf.setFontSize(11);
      pdf.setTextColor(51, 51, 51);

      // Key Risks
      pdf.setFont('helvetica', 'bold');
      pdf.text('Key Risks:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const riskLines = pdf.splitTextToSize(form.challenge1 || '', pageWidth - (2 * margin));
      y += 7;
      riskLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Mitigation Strategies
      y += 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Mitigation Strategies:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const mitigationLines = pdf.splitTextToSize(form.mitigation1 || '', pageWidth - (2 * margin));
      y += 7;
      mitigationLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Outlook and Guidance
      y += 10;
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Outlook and Guidance', margin, y);
      pdf.line(margin, y + 2, pageWidth - margin, y + 2);

      y += 10;
      pdf.setFontSize(11);
      pdf.setTextColor(51, 51, 51);

      // Future Plans
      pdf.setFont('helvetica', 'bold');
      pdf.text('Future Plans:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const plansLines = pdf.splitTextToSize(form.focusAreas || '', pageWidth - (2 * margin));
      y += 7;
      plansLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Financial Guidance
      y += 5;
      pdf.setFont('helvetica', 'bold');
      pdf.text('Financial Guidance:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const guidanceLines = pdf.splitTextToSize(form.acknowledgments || '', pageWidth - (2 * margin));
      y += 7;
      guidanceLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Conclusion
      y += 10;
      pdf.setFontSize(16);
      pdf.setTextColor(0, 51, 102);
      pdf.text('Conclusion', margin, y);
      pdf.line(margin, y + 2, pageWidth - margin, y + 2);

      y += 10;
      pdf.setFontSize(11);
      pdf.setTextColor(51, 51, 51);

      // Final Remarks
      pdf.setFont('helvetica', 'bold');
      pdf.text('Final Remarks:', margin, y);
      pdf.setFont('helvetica', 'normal');
      const remarksLines = pdf.splitTextToSize(form.commentary || '', pageWidth - (2 * margin));
      y += 7;
      remarksLines.forEach((line: string) => {
        pdf.text(line, margin, y);
        y += 5;
      });

      // Footer
      const pageCount = pdf.internal.pages.length - 1;
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text(`Page ${i} of ${pageCount}`, pageWidth - margin, pdf.internal.pageSize.getHeight() - margin, { align: 'right' });
        pdf.text(form.confidential || '', margin, pdf.internal.pageSize.getHeight() - margin);
      }

      // Add page numbers and ensure all content is included
      const addPage = () => {
        pdf.addPage();
        y = margin;
      };

      // Check if we need a new page before adding content
      const checkNewPage = (contentHeight: number) => {
        if (y + contentHeight > pdf.internal.pageSize.getHeight() - margin) {
          addPage();
          return true;
        }
        return false;
      };

      // Save the PDF
      pdf.save(`MD&A-${form.companyName}-${selectedMonth}.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      setExportError('PDF export failed. Please try again or contact support if the issue persists.');
    }
  }

  // Simulate API import with the new structure
  function handleImportFromAPI() {
    setForm({
      ...defaultForm,
      preparedBy: 'Justin Anderson',
      date: '2025-03-07',
      purpose: 'Highlight Insurance, legal, financial, sales, strategic initiatives, and misc critical business updates for February, 2025',
      overallPerformance: `Critical insurance items were finally secured while several legal items have closed out, but some concerning suits remain. The financial performance is below budget/plan on most meaningful measures except an improvement in EBITDA variance. Most of the items for meaningful analysis are impacted by the delay in $ capital raise and acquisitions. Risk analysis and implementation plans were finished on internal Kovo+ operating systems. The systems are high risk (old, not upgradeable) and do not provide a basis to perpetuate plans for email/text pay solutions. Migrating to OPS has been prioritized as the top technical item and shoring up expertise to accelerate that plan and minimize risks asap. To date we have now migrated 12 of the 350+ practices. Cybersecurity insurance was prioritized and obtained as a result too.`,
      revenue: 867309,
      expenses: 960540,
      netProfit: -372220,
      ebitda: -93231,
      cashFlow: 103930,
      commentary: `Client run off is why revenue is below budget: 2 large clients accounted for most of the declined revenue. In January we shifted organic sales growth plans to include a new RCM speciality focus: Wound Care. Restore Health has been signed and we are awaiting results. There is $10M+ annual pipeline possible.\n\nThere are about $200K of expenses at the Kovo+ Pubco level including the 3 officers. The largest expense has been legal. And legal fees have been more than budgeted and are under review.\n\nMuch of the significant variance in plans/budgets baseline stems from the delay in the planned $ capital raise and acquisitions.`,
      operationalMilestones: `Obtaining E+O insurance was needed for all RCM Brands. The Colley lawsuit exposed the need. Arbitration is scheduled in March (should be capped at this point with $50K existing Hiscox premium but still awaiting confirmation). Unity remains a costly and lengthy situation, grossly mishandled from the gate in 2023 and continues to demand resources (estimated $30K more). 2 client letters were received (Chow, Hermitage) threatening claims and have been responded to and likely do not resurface, per advice. The Summit MOU is being signed and targets a $50K value, albeit non-binding. Many other legal matters have closed: Marshall, Meade, Campbell, LECO, Others are signed/being paid out: Saini, Healthcell and other issues remain unsigned: Nobles (although being paid). D+O renewed after much effort and burden of proof.`,
      productUpdates: `The sales team identified an underserved market for small deals that can grow quickly. In concert with BPO we are organizing a low touch, good margin model with a BPO, so that we can pursue and close these deals. ETA May/June launch.\nWe are working on legal addendums and fair market valuation analysis to implement contracts that enable Kovo RCM to reclassify Billing as a Service(Baas) revenue. Our target is 10% AI, and 20% SaaS. ETA May/June (to be seen if we can do this across the book of business at once or have to approach each client separately.`,
      strategicPartnerships: `Two MSPs have been identified: one in UT and one in CA through the ShieldOne relationship. The LOI\'s are being obtained and entered into the deal rooms(by March 14 eta). The financial results are in the due diligence process and included in proformas for debt lenders. Two additional MSP are now being discussed. One in SD: need both to qualify for a $10M debt request and full use of proceeds. Additionally, due diligence continues on a $9M revenue RCM opportunity in Puerto Rico. Adam Suarez and the BCBSFL group are on hold. They have had to rework engagement with 8 HMO new payor requirements in Dade County, FL, implemented in January 2025. Will revisit their interest this summer. Several small RCM opportunities have been qualified out. We continue to reach out and nurture/market to other targets and have expanded the broker list from 2 to 5 now.`,
      challenge1: 'Lawsuits continue to beleaguer Executive time and pose risks.',
      mitigation1: 'a blanket E+O policy was recently put in place',
      challenge2: 'Capital Raise results and needs',
      mitigation2: 'Working with Denton\'s, Fundr, Hybrid, AVi, Oakhill, MSA, Tudor and more to pursue Kovo+ Equity raise and HEAL Group debt raise. Implementing work back schedule.',
      challenge3: 'Capital Raise worst case scenario needs.',
      mitigation3: `If Restore Health channel doesn't track like planned the business will need a cash infusion by April 15 or bridge loan($272K by April 28th) for May to carry till we can complete debt or equity raise in May. If Restore Health proves out those funds would carry us til May 30(would need $100k-$200K infusion or bridge for June if Debt or Equity raise doesn't close). In worst-case scenario, if Restore Health and Equity/Debt do not raise the business will need $272K in April and then $200K each subsequent month. If company just accomplishes debt raise, funds will be needed above Heal Global, as the Pubco and Blocker company is burning $200k/ month`,
      focusAreas: '1. Initiative 1: $Debt Raise\n2. Initiative 2: $Equity Raise\n3. Initiative 3: Restore Health Wound Care validation (Include measurable targets where possible.)',
      acknowledgments: `We have a process to recognize standout performances or contributions from individuals or teams in our monthly Townhall. We will start highlighting one a month here.\nAi Vector progress: 1.) Flat files out of EMR's for large projects like wound care: Pipeline is $4M(attribute $200K savings value to AiV). 2.) MSP patching: completed in January the auto curing capability for PC/Server updates/Windows10. Less human intervention. $200K less in Opex. increases EBITDA for MSP's. 3.) HDM AR Dashboard: net new client annualized $1.2M. Potential ROI:$1.6M/$110,000spend=16X ROI. We are working on productivity gains with agentive bots and more. Reviewing Blue Bar and Nick's hit list.\nMention any special awards, team-building events, or positive feedback from clients: Planning to bring some of the team members to the Scottsdale HEAL event for the first time: Nick Jose, Lorena Neibaur.`,
      ceoSignature: 'Justin Anderson',
      ceoTitle: 'Chief Executive Officer',
      companyName: 'Kovo+',
      confidential: 'Confidential & Internal Use Only',
    });
  }

  // Define the canonical April 2025 example
  const canonicalApril2025: SavedReport = {
    id: 'example-april-2025',
    companyId: 1,
    month: 'April 2025',
    preparedBy: 'Justin Anderson',
    date: '2025-03-07',
    purpose: 'Highlight Insurance, legal, financial, sales, strategic initiatives, and misc critical business updates for February, 2025',
    overallPerformance: `Critical insurance items were finally secured while several legal items have closed out, but some concerning suits remain. The financial performance is below budget/plan on most meaningful measures except an improvement in EBITDA variance. Most of the items for meaningful analysis are impacted by the delay in $ capital raise and acquisitions. Risk analysis and implementation plans were finished on internal Kovo+ operating systems. The systems are high risk (old, not upgradeable) and do not provide a basis to perpetuate plans for email/text pay solutions. Migrating to OPS has been prioritized as the top technical item and shoring up expertise to accelerate that plan and minimize risks asap. To date we have now migrated 12 of the 350+ practices. Cybersecurity insurance was prioritized and obtained as a result too.`,
    revenue: 867309,
    expenses: 960540,
    netProfit: -372220,
    ebitda: -93231,
    cashFlow: 103930,
    commentary: `Client run off is why revenue is below budget: 2 large clients accounted for most of the declined revenue. In January we shifted organic sales growth plans to include a new RCM speciality focus: Wound Care. Restore Health has been signed and we are awaiting results. There is $10M+ annual pipeline possible.\n\nThere are about $200K of expenses at the Kovo+ Pubco level including the 3 officers. The largest expense has been legal. And legal fees have been more than budgeted and are under review.\n\nMuch of the significant variance in plans/budgets baseline stems from the delay in the planned $ capital raise and acquisitions.`,
    operationalMilestones: `Obtaining E+O insurance was needed for all RCM Brands. The Colley lawsuit exposed the need. Arbitration is scheduled in March (should be capped at this point with $50K existing Hiscox premium but still awaiting confirmation). Unity remains a costly and lengthy situation, grossly mishandled from the gate in 2023 and continues to demand resources (estimated $30K more). 2 client letters were received (Chow, Hermitage) threatening claims and have been responded to and likely do not resurface, per advice. The Summit MOU is being signed and targets a $50K value, albeit non-binding. Many other legal matters have closed: Marshall, Meade, Campbell, LECO, Others are signed/being paid out: Saini, Healthcell and other issues remain unsigned: Nobles (although being paid). D+O renewed after much effort and burden of proof.`,
    productUpdates: `The sales team identified an underserved market for small deals that can grow quickly. In concert with BPO we are organizing a low touch, good margin model with a BPO, so that we can pursue and close these deals. ETA May/June launch.\nWe are working on legal addendums and fair market valuation analysis to implement contracts that enable Kovo RCM to reclassify Billing as a Service(Baas) revenue. Our target is 10% AI, and 20% SaaS. ETA May/June (to be seen if we can do this across the book of business at once or have to approach each client separately.`,
    strategicPartnerships: `Two MSPs have been identified: one in UT and one in CA through the ShieldOne relationship. The LOI\'s are being obtained and entered into the deal rooms(by March 14 eta). The financial results are in the due diligence process and included in proformas for debt lenders. Two additional MSP are now being discussed. One in SD: need both to qualify for a $10M debt request and full use of proceeds. Additionally, due diligence continues on a $9M revenue RCM opportunity in Puerto Rico. Adam Suarez and the BCBSFL group are on hold. They have had to rework engagement with 8 HMO new payor requirements in Dade County, FL, implemented in January 2025. Will revisit their interest this summer. Several small RCM opportunities have been qualified out. We continue to reach out and nurture/market to other targets and have expanded the broker list from 2 to 5 now.`,
    challenge1: 'Lawsuits continue to beleaguer Executive time and pose risks.',
    mitigation1: 'a blanket E+O policy was recently put in place',
    challenge2: 'Capital Raise results and needs',
    mitigation2: 'Working with Denton\'s, Fundr, Hybrid, AVi, Oakhill, MSA, Tudor and more to pursue Kovo+ Equity raise and HEAL Group debt raise. Implementing work back schedule.',
    challenge3: 'Capital Raise worst case scenario needs.',
    mitigation3: `If Restore Health channel doesn't track like planned the business will need a cash infusion by April 15 or bridge loan($272K by April 28th) for May to carry till we can complete debt or equity raise in May. If Restore Health proves out those funds would carry us til May 30(would need $100k-$200K infusion or bridge for June if Debt or Equity raise doesn't close). In worst-case scenario, if Restore Health and Equity/Debt do not raise the business will need $272K in April and then $200K each subsequent month. If company just accomplishes debt raise, funds will be needed above Heal Global, as the Pubco and Blocker company is burning $200k/ month`,
    focusAreas: '1. Initiative 1: $Debt Raise\n2. Initiative 2: $Equity Raise\n3. Initiative 3: Restore Health Wound Care validation (Include measurable targets where possible.)',
    acknowledgments: `We have a process to recognize standout performances or contributions from individuals or teams in our monthly Townhall. We will start highlighting one a month here.\nAi Vector progress: 1.) Flat files out of EMR's for large projects like wound care: Pipeline is $4M(attribute $200K savings value to AiV). 2.) MSP patching: completed in January the auto curing capability for PC/Server updates/Windows10. Less human intervention. $200K less in Opex. increases EBITDA for MSP's. 3.) HDM AR Dashboard: net new client annualized $1.2M. Potential ROI:$1.6M/$110,000spend=16X ROI. We are working on productivity gains with agentive bots and more. Reviewing Blue Bar and Nick's hit list.\nMention any special awards, team-building events, or positive feedback from clients: Planning to bring some of the team members to the Scottsdale HEAL event for the first time: Nick Jose, Lorena Neibaur.`,
    ceoSignature: 'Justin Anderson',
    ceoTitle: 'Chief Executive Officer',
    companyName: 'Kovo+',
    confidential: 'Confidential & Internal Use Only',
  };

  const [savedReports, setSavedReports] = useState<SavedReport[]>(() => {
    let reports: SavedReport[] = [];
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('flashReports');
      if (data) reports = JSON.parse(data);
    }
    // Ensure canonical April 2025 example is present
    if (!reports.some(r => r.month === 'April 2025' && r.companyId === 1)) {
      reports = [canonicalApril2025, ...reports];
    }
    return reports;
  });

  // Save to localStorage whenever savedReports changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('flashReports', JSON.stringify(savedReports));
    }
  }, [savedReports]);

  // Function to save the current form as a report
  function handleSaveReport() {
    const newReport: SavedReport = {
      ...form,
      id: `${selectedCompany}-${selectedMonth}`,
      companyId: selectedCompany,
      month: selectedMonth,
    };
    setSavedReports((prev) => {
      // Replace if exists for this company/month
      const filtered = prev.filter(r => !(r.companyId === selectedCompany && r.month === selectedMonth));
      return [...filtered, newReport];
    });
  }

  // Function to load a saved report into the form
  function handleLoadReport(report: SavedReport) {
    setForm({ ...defaultForm, ...report });
    setSelectedCompany(report.companyId);
    setSelectedMonth(report.month);
  }

  async function handleExportWord() {
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: "MONTHLY SUMMARY REPORT",
              heading: HeadingLevel.HEADING_1,
              alignment: 'center'
            }),
            new Paragraph({
              children: [
                new TextRun({ text: `Prepared By: ${form.preparedBy}`, bold: true }),
                new TextRun({ text: "\t\t" }),
                new TextRun({ text: `Date: ${form.date}` })
              ]
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: "1. Executive Summary",
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Purpose of the Report: ", bold: true }),
                new TextRun(form.purpose || "(not set)")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Overall Performance: ", bold: true }),
                new TextRun(form.overallPerformance || "(not set)")
              ]
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: "2. Financial Highlights",
              heading: HeadingLevel.HEADING_2
            }),
            new DocxTable({
              width: {
                size: 100,
                type: 'pct',
              },
              borders: {
                top: { style: BorderStyle.SINGLE, size: 1 },
                bottom: { style: BorderStyle.SINGLE, size: 1 },
                left: { style: BorderStyle.SINGLE, size: 1 },
                right: { style: BorderStyle.SINGLE, size: 1 },
                insideHorizontal: { style: BorderStyle.SINGLE, size: 1 },
                insideVertical: { style: BorderStyle.SINGLE, size: 1 },
              },
              rows: [
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Metric")] }),
                    new TableCell({ children: [new Paragraph("Current Period")] }),
                    new TableCell({ children: [new Paragraph("Budget")] }),
                    new TableCell({ children: [new Paragraph("Variance")] })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Revenue")] }),
                    new TableCell({ children: [new Paragraph(formatCurrency(form.revenue))] }),
                    new TableCell({ children: [new Paragraph("$955,952")] }),
                    new TableCell({ children: [new Paragraph(formatCurrency(Number(form.revenue) - 955952))] })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Operating Expenses")] }),
                    new TableCell({ children: [new Paragraph(formatCurrency(form.expenses))] }),
                    new TableCell({ children: [new Paragraph("$1,089,502")] }),
                    new TableCell({ children: [new Paragraph(formatCurrency(Number(form.expenses) - 1089502))] })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Net Profit / (Loss)")] }),
                    new TableCell({ children: [new Paragraph(formatCurrency(form.netProfit))] }),
                    new TableCell({ children: [new Paragraph("($309,642)")] }),
                    new TableCell({ children: [new Paragraph(formatCurrency(Number(form.netProfit) + 309642))] })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("EBITDA")] }),
                    new TableCell({ children: [new Paragraph(formatCurrency(form.ebitda))] }),
                    new TableCell({ children: [new Paragraph("($133,550)")] }),
                    new TableCell({ children: [new Paragraph(formatCurrency(Number(form.ebitda) + 133550))] })
                  ]
                }),
                new TableRow({
                  children: [
                    new TableCell({ children: [new Paragraph("Cash Flow")] }),
                    new TableCell({ children: [new Paragraph(formatCurrency(form.cashFlow))] }),
                    new TableCell({ children: [new Paragraph("$2,684,333")] }),
                    new TableCell({ children: [new Paragraph(formatCurrency(Number(form.cashFlow) - 2684333))] })
                  ]
                })
              ]
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: "3. Key Operational & Strategic Achievements",
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Operational Milestones: ", bold: true }),
                new TextRun(form.operationalMilestones || "(not set)")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Product/Service Updates: ", bold: true }),
                new TextRun(form.productUpdates || "(not set)")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Strategic Partnerships/Deals: ", bold: true }),
                new TextRun(form.strategicPartnerships || "(not set)")
              ]
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: "4. Challenges & Mitigation Strategies",
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Challenge 1: ", bold: true }),
                new TextRun(form.challenge1 || "(not set)")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Mitigation 1: ", bold: true }),
                new TextRun(form.mitigation1 || "(not set)")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Challenge 2: ", bold: true }),
                new TextRun(form.challenge2 || "(not set)")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Mitigation 2: ", bold: true }),
                new TextRun(form.mitigation2 || "(not set)")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Challenge 3: ", bold: true }),
                new TextRun(form.challenge3 || "(not set)")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Mitigation 3: ", bold: true }),
                new TextRun(form.mitigation3 || "(not set)")
              ]
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: "5. Focus Areas for Next Month",
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph(form.focusAreas || "(not set)"),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: "6. Acknowledgments & Team Highlights",
              heading: HeadingLevel.HEADING_2
            }),
            new Paragraph(form.acknowledgments || "(not set)"),
            new Paragraph({ text: "" }),
            new Paragraph({
              children: [
                new TextRun({ text: "CEO's Signature: ", bold: true }),
                new TextRun(form.ceoSignature || "(not set)")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Title: ", bold: true }),
                new TextRun(form.ceoTitle || "(not set)")
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({ text: "Company: ", bold: true }),
                new TextRun(form.companyName || "(not set)")
              ]
            }),
            new Paragraph({ text: "" }),
            new Paragraph({
              text: form.confidential || "",
            })
          ]
        }]
      });

      const blob = await Packer.toBlob(doc);
      saveAs(blob, `MD&A-${form.companyName}-${selectedMonth}.docx`);
    } catch (err) {
      console.error('Word export error:', err);
      setExportError('Word export failed. Please try again or contact support if the issue persists.');
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white min-h-screen">
      {/* Flash Report Data Entry */}
      <SectionCard title="Saved Reports">
        {savedReports.length === 0 ? (
          <div className="text-gray-500">No saved reports yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 mb-4">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Company</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Month</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {savedReports.map((report) => (
                  <tr key={report.id}>
                    <td className="px-4 py-2 text-sm text-gray-900">{report.companyName}</td>
                    <td className="px-4 py-2 text-sm text-gray-900">{report.month}</td>
                    <td className="px-4 py-2 text-sm space-x-2">
                      <button 
                        onClick={() => handleLoadReport(report)} 
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                      >
                        <DocumentTextIcon className="h-4 w-4 mr-1" />
                        View/Edit
                      </button>
                      <button 
                        onClick={() => { setForm({ ...defaultForm, ...report }); pendingExportRef.current = true; }} 
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                      >
                        <ArrowDownTrayIcon className="h-4 w-4 mr-1" />
                        Export PDF
                      </button>
                      <button 
                        onClick={() => { setForm({ ...defaultForm, ...report }); handleExportWord(); }} 
                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors"
                      >
                        <DocumentArrowDownIcon className="h-4 w-4 mr-1" />
                        Export Word
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </SectionCard>
      <SectionCard title="Flash Report Data Entry">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div className="flex gap-4 mb-4">
            <button type="button" onClick={handleImportFromAPI} className="rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-indigo-500">Import from API</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Prepared By</label>
              <input name="preparedBy" value={form.preparedBy} onChange={handleFormChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Date</label>
              <input type="date" name="date" value={form.date} onChange={handleFormChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Purpose</label>
            <textarea name="purpose" value={form.purpose} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Purpose of the report..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Overall Performance</label>
            <textarea name="overallPerformance" value={form.overallPerformance} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Overall performance summary..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Revenue</label>
            <input type="text" name="revenue" value={formatCurrency(form.revenue)} onChange={handleFormChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="$0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Expenses</label>
            <input type="text" name="expenses" value={formatCurrency(form.expenses)} onChange={handleFormChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="$0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Net Profit / (Loss)</label>
            <input type="text" name="netProfit" value={formatCurrency(form.netProfit)} onChange={handleFormChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="$0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">EBITDA</label>
            <input type="text" name="ebitda" value={formatCurrency(form.ebitda)} onChange={handleFormChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="$0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Cash Flow</label>
            <input type="text" name="cashFlow" value={formatCurrency(form.cashFlow)} onChange={handleFormChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="$0" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Commentary</label>
            <textarea name="commentary" value={form.commentary} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Commentary on the financial performance..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Operational Milestones</label>
            <textarea name="operationalMilestones" value={form.operationalMilestones} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Operational milestones and achievements..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Product Updates</label>
            <textarea name="productUpdates" value={form.productUpdates} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Product updates and new initiatives..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Strategic Partnerships</label>
            <textarea name="strategicPartnerships" value={form.strategicPartnerships} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Strategic partnerships and deals..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Challenge 1</label>
            <textarea name="challenge1" value={form.challenge1} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="First challenge and its impact..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Mitigation 1</label>
            <textarea name="mitigation1" value={form.mitigation1} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Mitigation strategy for Challenge 1..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Challenge 2</label>
            <textarea name="challenge2" value={form.challenge2} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Second challenge and its impact..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Mitigation 2</label>
            <textarea name="mitigation2" value={form.mitigation2} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Mitigation strategy for Challenge 2..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Challenge 3</label>
            <textarea name="challenge3" value={form.challenge3} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Third challenge and its impact..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Mitigation 3</label>
            <textarea name="mitigation3" value={form.mitigation3} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Mitigation strategy for Challenge 3..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Focus Areas</label>
            <textarea name="focusAreas" value={form.focusAreas} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Focus areas for the next month..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">Acknowledgments</label>
            <textarea name="acknowledgments" value={form.acknowledgments} onChange={handleFormChange} rows={2} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" placeholder="Acknowledgments and team highlights..." />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">CEO's Signature</label>
              <input name="ceoSignature" value={form.ceoSignature} onChange={handleFormChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">CEO's Title</label>
              <input name="ceoTitle" value={form.ceoTitle} onChange={handleFormChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Confidential Note</label>
              <input name="confidential" value={form.confidential} onChange={handleFormChange} className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900 p-2" />
            </div>
          </div>
          {formError && <div className="text-red-600 font-medium">{formError}</div>}
          {exportError && <div className="text-red-600 font-medium">{exportError}</div>}
          <div className="flex gap-4">
            <button type="submit" className="rounded-md bg-blue-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-blue-500">Save Flash Report</button>
            <button type="button" onClick={handleExportPDF} className="rounded-md bg-green-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-green-500">Export PDF</button>
            <button type="button" onClick={handleExportWord} className="rounded-md bg-purple-600 px-4 py-2 text-white font-semibold shadow-sm hover:bg-purple-500">Export Word</button>
          </div>
        </form>
      </SectionCard>
      <SectionCard title="Report Preview (Read-Only)">
        <div className="prose max-w-none text-gray-900">
          <h2 className="text-2xl font-bold mb-2">MONTHLY SUMMARY REPORT</h2>
          <div className="mb-2"><b>Prepared By:</b> {form.preparedBy || <span className="text-gray-400">(not set)</span>}</div>
          <div className="mb-4"><b>Date:</b> {form.date || <span className="text-gray-400">(not set)</span>}</div>
          <h3 className="text-lg font-semibold mt-4 mb-1">1. Executive Summary</h3>
          <ul className="list-disc pl-6">
            <li><b>Purpose of the Report:</b> {form.purpose || <span className="text-gray-400">(not set)</span>}</li>
            <li><b>Overall Performance:</b> {form.overallPerformance || <span className="text-gray-400">(not set)</span>}</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-1">2. Financial Highlights</h3>
          <table className="min-w-full mb-2 border">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-2 py-1 border">Metric</th>
                <th className="px-2 py-1 border">Current Period</th>
                <th className="px-2 py-1 border">Budget</th>
                <th className="px-2 py-1 border">Variance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-2 py-1">Revenue</td>
                <td className="border px-2 py-1">{formatCurrency(form.revenue)}</td>
                <td className="border px-2 py-1">$955,952</td>
                <td className="border px-2 py-1">{formatCurrency(Number(form.revenue) - 955952)}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">Operating Expenses</td>
                <td className="border px-2 py-1">{formatCurrency(form.expenses)}</td>
                <td className="border px-2 py-1">$1,089,502</td>
                <td className="border px-2 py-1">{formatCurrency(Number(form.expenses) - 1089502)}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">Net Profit / (Loss)</td>
                <td className="border px-2 py-1">{formatCurrency(form.netProfit)}</td>
                <td className="border px-2 py-1">($309,642)</td>
                <td className="border px-2 py-1">{formatCurrency(Number(form.netProfit) + 309642)}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">EBITDA</td>
                <td className="border px-2 py-1">{formatCurrency(form.ebitda)}</td>
                <td className="border px-2 py-1">($133,550)</td>
                <td className="border px-2 py-1">{formatCurrency(Number(form.ebitda) + 133550)}</td>
              </tr>
              <tr>
                <td className="border px-2 py-1">Cash Flow</td>
                <td className="border px-2 py-1">{formatCurrency(form.cashFlow)}</td>
                <td className="border px-2 py-1">$2,684,333</td>
                <td className="border px-2 py-1">{formatCurrency(Number(form.cashFlow) - 2684333)}</td>
              </tr>
            </tbody>
          </table>
          <div className="mb-2"><b>Commentary on Financials:</b><br />{form.commentary || <span className="text-gray-400">(not set)</span>}</div>
          <h3 className="text-lg font-semibold mt-4 mb-1">3. Key Operational & Strategic Achievements</h3>
          <ul className="list-disc pl-6">
            <li><b>Operational Milestones:</b> {form.operationalMilestones || <span className="text-gray-400">(not set)</span>}</li>
            <li><b>Product/Service Updates:</b> {form.productUpdates || <span className="text-gray-400">(not set)</span>}</li>
            <li><b>Strategic Partnerships/Deals:</b> {form.strategicPartnerships || <span className="text-gray-400">(not set)</span>}</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-1">4. Challenges & Mitigation Strategies</h3>
          <ul className="list-disc pl-6">
            <li><b>Challenge 1:</b> {form.challenge1 || <span className="text-gray-400">(not set)</span>}<br /><b>Mitigation/Action:</b> {form.mitigation1 || <span className="text-gray-400">(not set)</span>}</li>
            <li><b>Challenge 2:</b> {form.challenge2 || <span className="text-gray-400">(not set)</span>}<br /><b>Mitigation/Action:</b> {form.mitigation2 || <span className="text-gray-400">(not set)</span>}</li>
            <li><b>Challenge 3:</b> {form.challenge3 || <span className="text-gray-400">(not set)</span>}<br /><b>Mitigation/Action:</b> {form.mitigation3 || <span className="text-gray-400">(not set)</span>}</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-1">5. Focus Areas for Next Month</h3>
          <div>{form.focusAreas || <span className="text-gray-400">(not set)</span>}</div>
          <h3 className="text-lg font-semibold mt-4 mb-1">6. Acknowledgments & Team Highlights</h3>
          <div>{form.acknowledgments || <span className="text-gray-400">(not set)</span>}</div>
          <div className="mt-6"><b>CEO's Signature:</b> {form.ceoSignature || <span className="text-gray-400">(not set)</span>}</div>
          <div><b>Title:</b> {form.ceoTitle || <span className="text-gray-400">(not set)</span>}</div>
          <div><b>Company:</b> {form.companyName || <span className="text-gray-400">(not set)</span>}</div>
          <div className="mt-2 text-xs text-gray-500">{form.confidential}</div>
        </div>
      </SectionCard>
      {/* Main Report Preview (scroll target) */}
      <div ref={previewRef} id="flash-report-preview"></div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1 text-gray-900">Flash Reports / MD&amp;A</h1>
          <div className="text-gray-900 text-sm">Monthly Management Discussion &amp; Analysis</div>
        </div>
        <div className="flex gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-900 mb-1">Company</label>
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
              value={selectedCompany}
              onChange={(e) => setSelectedCompany(Number(e.target.value))}
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id} className="text-gray-900">{company.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-900 mb-1">Month</label>
            <select
              className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-gray-900"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {months.map((month) => (
                <option key={month} value={month} className="text-gray-900">{month}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {/* Company Info */}
      <div className="rounded-lg bg-blue-600 text-white p-6 shadow-md mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <div className="text-2xl font-bold text-white">{company.name}</div>
            <div className="text-sm text-white">President: {company.president} | Ticker: {company.ticker} | Industry: {company.industry} | Fiscal Year: {company.fiscalYear}</div>
          </div>
          <div className="text-sm text-white">Reporting Month: {selectedMonth}</div>
        </div>
      </div>
      {/* Executive Summary & Market */}
      <SectionCard title="Executive Summary">
        <ul className="list-disc pl-5 space-y-1 text-gray-900">
          {executiveSummary.map((item) => (
            <li key={item.label}><span className="font-semibold">{item.label}:</span> {item.value}</li>
          ))}
        </ul>
        <div className="mt-4 text-gray-900">
          <span className="font-semibold">Market Conditions:</span> {form.commentary}
        </div>
      </SectionCard>
      {/* Financial Highlights */}
      <SectionCard title="Financial Highlights">
        <Table
          headers={["Metric", "Current Period", "Budget", "Variance"]}
          rows={dynamicFinancialHighlights.map(fh => [
            fh.metric,
            `$${fh.current.toLocaleString()}`,
            `$${fh.budget.toLocaleString()}`,
            <span className={fh.current - fh.budget < 0 ? 'text-red-600' : 'text-green-600'}>
              {fh.current - fh.budget < 0 ? '-' : '+'}${Math.abs(fh.current - fh.budget).toLocaleString()}
            </span>
          ])}
        />
      </SectionCard>
      {/* Operational Achievements */}
      <SectionCard title="Key Operational and Strategic Achievements">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-900">
          {operationalAchievements.map((section) => (
            <div key={section.title}>
              <div className="font-semibold mb-1">{section.title}</div>
              <ul className="list-disc pl-5 text-sm space-y-1">
                {section.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </SectionCard>
      {/* Challenges & Mitigation */}
      <SectionCard title="Challenges and Mitigation Strategies">
        <ul className="list-disc pl-5 space-y-1 text-gray-900">
          {challenges.map((c) => (
            <li key={c.title} className="flex items-center gap-2"><c.icon className="h-5 w-5 text-yellow-500" /> {c.title}</li>
          ))}
        </ul>
      </SectionCard>
      {/* Focus Areas for Next Month */}
      <SectionCard title="Focus Areas for Next Month">
        <ul className="list-disc pl-5 space-y-1 text-gray-900">
          {focusAreas.map((fa, i) => (
            <li key={i}>{fa}</li>
          ))}
        </ul>
      </SectionCard>
      {/* Financial Results Commentary */}
      <SectionCard title="Financial Results & Commentary">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="font-semibold mb-2 text-gray-900">Commentary</div>
            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-900">
              {commentary.map((c) => <li key={c.label}><span className="font-semibold">{c.label}:</span> {c.value}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2 text-gray-900">Non-Financial Metrics</div>
            <Table
              headers={["Metric", "Current Period", "Prior Month", "Variance"]}
              rows={nonFinancialMetrics.map(nf => [nf.metric, nf.current, nf.prior, nf.variance])}
            />
          </div>
        </div>
      </SectionCard>
      {/* Update on Use of Proceeds */}
      <SectionCard title="Update on Use of Proceeds">
        <div className="mb-2 text-sm text-gray-900">Private placement equity raise completed in Feb 2025. Funds currently being used for working capital purposes. Working to secure additional funding not in budget for April/May 2025 for acquisitions and working capital.</div>
        <Table
          headers={["Month", "Budgeted Funding", "Amounts Disbursed", "Variance $"]}
          rows={useOfProceeds.map(row => [
            row.month,
            `$${row.budgeted.toLocaleString()}`,
            `$${row.disbursed.toLocaleString()}`,
            <span className={row.budgeted - row.disbursed < 0 ? 'text-red-600' : 'text-green-600'}>
              {row.budgeted - row.disbursed < 0 ? '-' : '+'}${Math.abs(row.budgeted - row.disbursed).toLocaleString()}
            </span>
          ])}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-gray-900">
          <div>
            <div className="font-semibold mb-1">Wins (favourable, not Budgeted)</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {wins.map((w) => <li key={w}><CheckCircleIcon className="h-4 w-4 text-green-500 inline mr-1" />{w}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">On Track (as expected per Budget)</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {onTrack.map((o) => <li key={o}><ArrowTrendingUpIcon className="h-4 w-4 text-blue-500 inline mr-1" />{o}</li>)}
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-1">Misses (risks to the Budget)</div>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {misses.map((m) => <li key={m}><ArrowTrendingDownIcon className="h-4 w-4 text-red-500 inline mr-1" />{m}</li>)}
            </ul>
          </div>
        </div>
      </SectionCard>
      {/* Appendix */}
      <SectionCard title="Appendix: Financial Statements">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="font-semibold mb-1 flex items-center gap-2 text-gray-900"><DocumentTextIcon className="h-5 w-5 text-blue-600" />2025 – Income Statement</div>
            <div className="h-24 bg-blue-50 rounded flex items-center justify-center text-blue-400 text-xs">[Income Statement Table Placeholder]</div>
          </div>
          <div className="flex-1">
            <div className="font-semibold mb-1 flex items-center gap-2 text-gray-900"><DocumentTextIcon className="h-5 w-5 text-blue-600" />2025 – Balance Sheet</div>
            <div className="h-24 bg-blue-50 rounded flex items-center justify-center text-blue-400 text-xs">[Balance Sheet Table Placeholder]</div>
          </div>
          <div className="flex-1">
            <div className="font-semibold mb-1 flex items-center gap-2 text-gray-900"><DocumentTextIcon className="h-5 w-5 text-blue-600" />2025 – Statement of Cash Flows</div>
            <div className="h-24 bg-blue-50 rounded flex items-center justify-center text-blue-400 text-xs">[Cash Flow Table Placeholder]</div>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-800">Notes to Financial Statements: Additional relevant disclosures and explanations.</div>
      </SectionCard>
      {/* Key Metrics Dashboard */}
      <SectionCard title="Key Metrics Dashboard">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-8">
          <MetricChart title="Revenue" dataKey="Revenue" color="#2563eb" chartData={dynamicChartData} />
          <MetricChart title="Operating Expenses" dataKey="Expenses" color="#f59e42" chartData={dynamicChartData} />
          <MetricChart title="EBITDA" dataKey="EBITDA" color="#10b981" chartData={dynamicChartData} />
          <MetricChart title="Net Profit / (Loss)" dataKey="NetProfit" color="#ef4444" chartData={dynamicChartData} />
          <MetricChart title="Cash Flow" dataKey="CashFlow" color="#6366f1" chartData={dynamicChartData} />
        </div>
      </SectionCard>
    </div>
  );
} 