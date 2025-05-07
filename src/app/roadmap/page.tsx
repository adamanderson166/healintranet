import { ChartBarIcon } from '@heroicons/react/24/outline';

const roadmapItems = [
  {
    quarter: 'Q1 2024',
    items: [
      {
        title: 'Product Launch',
        description: 'Launch of new product features and improvements',
        status: 'Completed',
        progress: 100,
      },
      {
        title: 'User Interface Update',
        description: 'Modernization of the user interface',
        status: 'Completed',
        progress: 100,
      },
    ],
  },
  {
    quarter: 'Q2 2024',
    items: [
      {
        title: 'Mobile App Development',
        description: 'Development of mobile application for iOS and Android',
        status: 'In Progress',
        progress: 60,
      },
      {
        title: 'API Integration',
        description: 'Integration with third-party services and APIs',
        status: 'In Progress',
        progress: 30,
      },
    ],
  },
  {
    quarter: 'Q3 2024',
    items: [
      {
        title: 'AI Features',
        description: 'Implementation of AI-powered features',
        status: 'Planned',
        progress: 0,
      },
      {
        title: 'Performance Optimization',
        description: 'System-wide performance improvements',
        status: 'Planned',
        progress: 0,
      },
    ],
  },
  {
    quarter: 'Q4 2024',
    items: [
      {
        title: 'Global Expansion',
        description: 'Expansion to new markets and regions',
        status: 'Planned',
        progress: 0,
      },
      {
        title: 'Enterprise Features',
        description: 'Development of enterprise-level features',
        status: 'Planned',
        progress: 0,
      },
    ],
  },
];

export default function Roadmap() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Product Roadmap
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Stay updated with our product development plans and upcoming features
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {roadmapItems.map((quarter) => (
            <div key={quarter.quarter} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-purple-100 p-3">
                  <ChartBarIcon className="h-6 w-6 text-purple-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{quarter.quarter}</h3>
                </div>
              </div>
              <div className="mt-6 space-y-6">
                {quarter.items.map((item) => (
                  <div key={item.title} className="rounded-lg border border-gray-100 bg-gray-50 p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-gray-900">{item.title}</h4>
                        <p className="mt-1 text-xs text-gray-500">{item.description}</p>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.status === 'Completed'
                          ? 'bg-green-100 text-green-800'
                          : item.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status}
                      </span>
                    </div>
                    <div className="mt-4">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className="h-2 rounded-full bg-purple-600"
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{item.progress}% complete</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 