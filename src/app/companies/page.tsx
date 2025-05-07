'use client';

import { useState } from 'react';
import { DocumentTextIcon, ChartBarIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const companies = [
  { id: 1, name: 'KovoRCM', description: 'Company performance overview' },
  { id: 2, name: 'Veebas', description: 'Digital solutions provider' },
  { id: 3, name: 'AIVector', description: 'AI and machine learning solutions' },
  { id: 4, name: 'Leva', description: 'Healthcare technology' },
  { id: 5, name: 'TCN', description: 'Telecommunications network' },
  { id: 6, name: 'The Newly Institute', description: 'Research and development' },
];

const quickActions = [
  {
    name: 'Create Report',
    description: 'Generate a new performance report',
    icon: DocumentTextIcon,
    href: '#',
  },
  {
    name: 'View Analytics',
    description: 'Analyze key performance metrics',
    icon: ChartBarIcon,
    href: '#',
  },
  {
    name: 'Team Overview',
    description: 'Review team performance',
    icon: UserGroupIcon,
    href: '#',
  },
  {
    name: 'Financial Review',
    description: 'Review financial statements',
    icon: CurrencyDollarIcon,
    href: '#',
  },
];

export default function Companies() {
  const [selectedCompany, setSelectedCompany] = useState(companies[0]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Company Selection */}
        <div className="mb-8">
          <label htmlFor="company" className="block text-lg font-semibold text-gray-900">
            Select Company
          </label>
          <div className="mt-2">
            <select
              id="company"
              name="company"
              className="block w-full rounded-md border-0 py-3 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-blue-600 sm:text-sm sm:leading-6"
              value={selectedCompany.id}
              onChange={(e) => setSelectedCompany(companies.find(c => c.id === Number(e.target.value)) || companies[0])}
            >
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Company Overview */}
        <div className="rounded-lg bg-blue-600 px-6 py-8 sm:px-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">{selectedCompany.name}</h2>
            <p className="mt-2 text-lg text-blue-100">{selectedCompany.description}</p>
            <p className="mt-1 text-sm text-blue-200">Company ID: {selectedCompany.id}</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <div
                key={action.name}
                className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-blue-600 hover:ring-1 hover:ring-blue-600"
              >
                <div className="flex-shrink-0">
                  <action.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div className="min-w-0 flex-1">
                  <a href={action.href} className="focus:outline-none">
                    <p className="text-sm font-medium text-gray-900">{action.name}</p>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Company Details */}
        <div className="mt-12">
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Company Details</h3>
              <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Full company name</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedCompany.name}</dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Company ID</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedCompany.id}</dd>
                  </div>
                  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4">
                    <dt className="text-sm font-medium text-gray-500">Description</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{selectedCompany.description}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 