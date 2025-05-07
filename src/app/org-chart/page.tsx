'use client';

import { useState } from 'react';
import { UserGroupIcon, BuildingOfficeIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface OrgNode {
  name: string;
  role: string;
  email?: string;
  children?: OrgNode[];
}

interface CompanyOrg {
  [key: string]: OrgNode;
}

// Global HEAL organization structure
const globalHealOrg: OrgNode = {
  name: 'HEAL Global',
  role: 'Parent Company',
  children: [
    {
      name: 'Executive Leadership',
      role: 'Global Leadership',
      children: [
        { name: 'John Smith', role: 'Global CEO', email: 'john.smith@heal.com' },
        { name: 'Sarah Johnson', role: 'Global CFO', email: 'sarah.johnson@heal.com' },
        { name: 'Michael Chen', role: 'Global CTO', email: 'michael.chen@heal.com' },
      ],
    },
    {
      name: 'Global Operations',
      role: 'Operations',
      children: [
        { name: 'Emily Davis', role: 'VP of Global Operations', email: 'emily.davis@heal.com' },
        { name: 'David Wilson', role: 'Operations Director', email: 'david.wilson@heal.com' },
      ],
    },
    {
      name: 'Global Strategy',
      role: 'Strategy',
      children: [
        { name: 'Robert Taylor', role: 'Chief Strategy Officer', email: 'robert.taylor@heal.com' },
        { name: 'Jennifer Lee', role: 'Strategy Director', email: 'jennifer.lee@heal.com' },
      ],
    },
  ],
};

// Individual company structures
const companyOrgs: CompanyOrg = {
  'KovoRCM': {
    name: 'KovoRCM',
    role: 'Revenue Cycle Management',
    children: [
      {
        name: 'Engineering',
        role: 'Department',
        children: [
          { name: 'Alex Martinez', role: 'Engineering Director', email: 'alex.martinez@kovorcm.com' },
          { name: 'Lisa Brown', role: 'Senior Engineer', email: 'lisa.brown@kovorcm.com' },
        ],
      },
      {
        name: 'Product',
        role: 'Department',
        children: [
          { name: 'Thomas Clark', role: 'Product Director', email: 'thomas.clark@kovorcm.com' },
          { name: 'Rachel Adams', role: 'Product Manager', email: 'rachel.adams@kovorcm.com' },
        ],
      },
    ],
  },
  'Veebas': {
    name: 'Veebas',
    role: 'Healthcare Technology',
    children: [
      {
        name: 'Development',
        role: 'Department',
        children: [
          { name: 'Patricia White', role: 'Development Director', email: 'patricia.white@veebas.com' },
          { name: 'David Wilson', role: 'Senior Developer', email: 'david.wilson@veebas.com' },
        ],
      },
      {
        name: 'Operations',
        role: 'Department',
        children: [
          { name: 'Emily Davis', role: 'Operations Director', email: 'emily.davis@veebas.com' },
          { name: 'Michael Chen', role: 'Operations Manager', email: 'michael.chen@veebas.com' },
        ],
      },
    ],
  },
  'AIVector': {
    name: 'AIVector',
    role: 'AI Solutions',
    children: [
      {
        name: 'AI Research',
        role: 'Department',
        children: [
          { name: 'Sarah Johnson', role: 'Research Director', email: 'sarah.johnson@aivector.com' },
          { name: 'Jennifer Lee', role: 'AI Researcher', email: 'jennifer.lee@aivector.com' },
        ],
      },
      {
        name: 'ML Engineering',
        role: 'Department',
        children: [
          { name: 'Robert Taylor', role: 'Engineering Director', email: 'robert.taylor@aivector.com' },
          { name: 'Alex Martinez', role: 'ML Engineer', email: 'alex.martinez@aivector.com' },
        ],
      },
    ],
  },
  'Leva': {
    name: 'Leva',
    role: 'Healthcare Services',
    children: [
      {
        name: 'Clinical',
        role: 'Department',
        children: [
          { name: 'Patricia White', role: 'Clinical Director', email: 'patricia.white@leva.com' },
          { name: 'Emily Davis', role: 'Clinical Manager', email: 'emily.davis@leva.com' },
        ],
      },
      {
        name: 'Technology',
        role: 'Department',
        children: [
          { name: 'Michael Chen', role: 'Tech Director', email: 'michael.chen@leva.com' },
          { name: 'David Wilson', role: 'Senior Developer', email: 'david.wilson@leva.com' },
        ],
      },
    ],
  },
  'TCN': {
    name: 'TCN',
    role: 'Healthcare Network',
    children: [
      {
        name: 'Network Operations',
        role: 'Department',
        children: [
          { name: 'Robert Taylor', role: 'Operations Director', email: 'robert.taylor@tcn.com' },
          { name: 'Sarah Johnson', role: 'Network Manager', email: 'sarah.johnson@tcn.com' },
        ],
      },
      {
        name: 'Provider Relations',
        role: 'Department',
        children: [
          { name: 'Jennifer Lee', role: 'Relations Director', email: 'jennifer.lee@tcn.com' },
          { name: 'Alex Martinez', role: 'Provider Manager', email: 'alex.martinez@tcn.com' },
        ],
      },
    ],
  },
  'The Newly Institute': {
    name: 'The Newly Institute',
    role: 'Mental Health Services',
    children: [
      {
        name: 'Clinical Services',
        role: 'Department',
        children: [
          { name: 'Patricia White', role: 'Clinical Director', email: 'patricia.white@newly.com' },
          { name: 'Emily Davis', role: 'Therapy Manager', email: 'emily.davis@newly.com' },
        ],
      },
      {
        name: 'Research',
        role: 'Department',
        children: [
          { name: 'Michael Chen', role: 'Research Director', email: 'michael.chen@newly.com' },
          { name: 'David Wilson', role: 'Research Lead', email: 'david.wilson@newly.com' },
        ],
      },
    ],
  },
};

export default function OrgChart() {
  const [selectedView, setSelectedView] = useState<'global' | 'company'>('global');
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const renderOrgNode = (node: any, level: number = 0) => {
    const isDepartment = node.children && node.children[0]?.role === 'Department';
    const isPerson = !node.children;

    return (
      <div className={`relative ${level > 0 ? 'mt-4' : ''}`}>
        <div
          className={`flex items-center gap-3 p-3 rounded-lg ${
            isPerson
              ? 'bg-blue-50 border border-blue-100'
              : isDepartment
              ? 'bg-purple-50 border border-purple-100'
              : 'bg-yellow-50 border border-yellow-100'
          }`}
        >
          <div className="flex-shrink-0">
            {isPerson ? (
              <UserGroupIcon className="h-5 w-5 text-blue-600" />
            ) : isDepartment ? (
              <BuildingOfficeIcon className="h-5 w-5 text-purple-600" />
            ) : (
              <BuildingOfficeIcon className="h-5 w-5 text-yellow-600" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">{node.name}</p>
            <p className="text-xs text-gray-500">{node.role}</p>
            {node.email && (
              <a
                href={`mailto:${node.email}`}
                className="text-xs text-blue-600 hover:text-blue-500"
              >
                {node.email}
              </a>
            )}
          </div>
        </div>
        {node.children && (
          <div className="ml-8 pl-4 border-l-2 border-gray-200">
            {node.children.map((child: any) => renderOrgNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Organization Chart
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            View the HEAL global structure and individual company organizations
          </p>
        </div>

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => {
              setSelectedView('global');
              setSelectedCompany(null);
            }}
            className={`px-4 py-2 rounded-md ${
              selectedView === 'global'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Global HEAL
          </button>
          <button
            onClick={() => setSelectedView('company')}
            className={`px-4 py-2 rounded-md ${
              selectedView === 'company'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border border-gray-300'
            }`}
          >
            Individual Companies
          </button>
        </div>

        {selectedView === 'company' && (
          <div className="mt-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Object.keys(companyOrgs).map((companyName) => (
                <button
                  key={companyName}
                  onClick={() => setSelectedCompany(companyName)}
                  className={`p-4 rounded-lg border ${
                    selectedCompany === companyName
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 bg-white'
                  } hover:border-blue-500 hover:bg-blue-50 transition-colors`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{companyName}</span>
                    <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8">
          {selectedView === 'global' ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderOrgNode(globalHealOrg)}
            </div>
          ) : selectedCompany ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              {renderOrgNode(companyOrgs[selectedCompany])}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              Select a company to view its organization structure
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 