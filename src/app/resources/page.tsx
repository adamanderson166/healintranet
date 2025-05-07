import {
  DocumentTextIcon,
  BookOpenIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

const resourceCategories = [
  {
    name: 'Company Documents',
    description: 'Access important company policies, procedures, and guidelines',
    icon: DocumentTextIcon,
    items: [
      { name: 'Employee Handbook', type: 'PDF', size: '2.4 MB' },
      { name: 'Company Policies', type: 'PDF', size: '1.8 MB' },
      { name: 'Code of Conduct', type: 'PDF', size: '1.2 MB' },
    ],
  },
  {
    name: 'User Guides',
    description: 'Step-by-step guides for using company tools and systems',
    icon: BookOpenIcon,
    items: [
      { name: 'Intranet User Guide', type: 'PDF', size: '3.1 MB' },
      { name: 'Software Tutorials', type: 'PDF', size: '4.2 MB' },
      { name: 'Best Practices Guide', type: 'PDF', size: '2.5 MB' },
    ],
  },
  {
    name: 'Training Materials',
    description: 'Resources for employee training and development',
    icon: AcademicCapIcon,
    items: [
      { name: 'New Hire Training', type: 'PDF', size: '5.6 MB' },
      { name: 'Leadership Development', type: 'PDF', size: '3.8 MB' },
      { name: 'Skills Training', type: 'PDF', size: '2.9 MB' },
    ],
  },
  {
    name: 'Technical Documentation',
    description: 'Technical guides and API documentation',
    icon: WrenchScrewdriverIcon,
    items: [
      { name: 'API Documentation', type: 'PDF', size: '4.7 MB' },
      { name: 'System Architecture', type: 'PDF', size: '3.2 MB' },
      { name: 'Development Guidelines', type: 'PDF', size: '2.1 MB' },
    ],
  },
];

export default function Resources() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Company Resources
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Access all company documents, guides, and technical resources
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {resourceCategories.map((category) => (
            <div
              key={category.name}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-blue-100 p-3">
                  <category.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              <div className="mt-6 space-y-4">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">{item.type}</span>
                      <span className="text-xs text-gray-500">{item.size}</span>
                      <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500">
                        Download
                      </button>
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