'use client';

import { ArrowLeftIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const teams = [
  {
    id: 1,
    name: 'Engineering',
    members: [
      { id: 1, name: 'Jennifer Lee', role: 'Senior Engineer', email: 'jennifer.lee@heal.com' },
      { id: 2, name: 'Alex Martinez', role: 'Frontend Developer', email: 'alex.martinez@heal.com' },
      { id: 3, name: 'Michael Chen', role: 'Backend Developer', email: 'michael.chen@heal.com' },
    ],
  },
  {
    id: 2,
    name: 'Product Development',
    members: [
      { id: 4, name: 'Emily Davis', role: 'Product Manager', email: 'emily.davis@heal.com' },
      { id: 5, name: 'David Wilson', role: 'UX Designer', email: 'david.wilson@heal.com' },
      { id: 6, name: 'Sarah Johnson', role: 'Product Analyst', email: 'sarah.johnson@heal.com' },
    ],
  },
  {
    id: 3,
    name: 'Sales & Marketing',
    members: [
      { id: 7, name: 'Robert Taylor', role: 'Sales Director', email: 'robert.taylor@heal.com' },
      { id: 8, name: 'Lisa Brown', role: 'Marketing Manager', email: 'lisa.brown@heal.com' },
      { id: 9, name: 'James Wilson', role: 'Sales Representative', email: 'james.wilson@heal.com' },
    ],
  },
];

export default function TeamOverview() {
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
          <h1 className="text-3xl font-bold text-gray-900">Team Overview</h1>
          <p className="mt-2 text-lg text-gray-600">View team structure and member details</p>
        </div>

        <div className="space-y-8">
          {teams.map((team) => (
            <div key={team.id} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
              <div className="bg-blue-600 px-6 py-4">
                <div className="flex items-center">
                  <UserGroupIcon className="h-6 w-6 text-white" />
                  <h2 className="ml-3 text-xl font-semibold text-white">{team.name}</h2>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {team.members.map((member) => (
                  <div key={member.id} className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{member.name}</h3>
                        <p className="mt-1 text-sm text-gray-500">{member.role}</p>
                      </div>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-sm text-blue-600 hover:text-blue-500"
                      >
                        {member.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-gray-50 px-6 py-4">
                <button
                  type="button"
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View Team Performance →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 