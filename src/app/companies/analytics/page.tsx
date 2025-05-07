'use client';

import { ArrowLeftIcon, ChartBarIcon, ArrowTrendingUpIcon, UsersIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const metrics = [
  { 
    id: 1, 
    name: 'Revenue Growth', 
    value: '12.5%', 
    trend: 'up',
    description: 'Year over year growth',
    icon: CurrencyDollarIcon 
  },
  { 
    id: 2, 
    name: 'Active Users', 
    value: '2,453', 
    trend: 'up',
    description: 'Total active users this month',
    icon: UsersIcon 
  },
  { 
    id: 3, 
    name: 'Performance', 
    value: '96.2%', 
    trend: 'up',
    description: 'Average system performance',
    icon: ChartBarIcon 
  },
  { 
    id: 4, 
    name: 'Growth Rate', 
    value: '15.3%', 
    trend: 'up',
    description: 'Monthly growth rate',
    icon: ArrowTrendingUpIcon 
  },
];

export default function Analytics() {
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
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-lg text-gray-600">View key performance metrics and analytics</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center">
                <div className="rounded-md bg-blue-100 p-3">
                  <metric.icon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900">{metric.name}</h3>
                <p className="mt-1 text-2xl font-semibold text-blue-600">{metric.value}</p>
                <p className="mt-1 text-sm text-gray-500">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-medium text-gray-900">Detailed Analytics</h3>
            <p className="mt-1 text-sm text-gray-500">View comprehensive analytics and generate custom reports</p>
            <div className="mt-4">
              <button
                type="button"
                className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Generate Custom Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 