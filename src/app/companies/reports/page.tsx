'use client';

import { useState } from 'react';
import { DocumentTextIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Report {
  id: number;
  name: string;
  description: string;
}

const reportTypes: Report[] = [
  { id: 1, name: 'Performance Report', description: 'Monthly performance metrics and KPIs' },
  { id: 2, name: 'Financial Report', description: 'Revenue, expenses, and financial analysis' },
  { id: 3, name: 'Team Report', description: 'Team productivity and performance metrics' },
  { id: 4, name: 'Project Report', description: 'Project status and milestone tracking' },
];

export default function Reports() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center">
          <Link
            href="/companies"
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            <ArrowLeftIcon className="mr-2 h-5 w-5" />
            Back to Companies
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Report</h1>
          <p className="mt-2 text-lg text-gray-600">Generate performance reports for your company</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reportTypes.map((report) => (
            <div
              key={report.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:border-blue-600 hover:ring-1 hover:ring-blue-600 cursor-pointer"
              onClick={() => setSelectedReport(report)}
            >
              <div className="flex items-center">
                <DocumentTextIcon className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{report.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{report.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedReport && (
          <div className="mt-8">
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-medium text-gray-900">Generate {selectedReport.name}</h3>
              <div className="mt-4">
                <button
                  type="button"
                  className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                >
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 