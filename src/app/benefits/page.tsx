import {
  HeartIcon,
  ShieldCheckIcon,
  BanknotesIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';

const benefitCategories = [
  {
    name: 'Health & Wellness',
    description: 'Comprehensive health coverage and wellness programs',
    icon: HeartIcon,
    items: [
      { name: 'Medical Insurance', type: 'Plan', status: 'Active' },
      { name: 'Dental Coverage', type: 'Plan', status: 'Active' },
      { name: 'Vision Care', type: 'Plan', status: 'Active' },
      { name: 'Mental Health Support', type: 'Program', status: 'Available' },
    ],
  },
  {
    name: 'Financial Benefits',
    description: 'Financial security and planning resources',
    icon: BanknotesIcon,
    items: [
      { name: '401(k) Plan', type: 'Retirement', status: 'Active' },
      { name: 'Stock Options', type: 'Investment', status: 'Active' },
      { name: 'Financial Planning', type: 'Service', status: 'Available' },
      { name: 'Tuition Reimbursement', type: 'Program', status: 'Available' },
    ],
  },
  {
    name: 'Work-Life Balance',
    description: 'Programs to support your work-life balance',
    icon: BuildingOfficeIcon,
    items: [
      { name: 'Flexible Work Hours', type: 'Policy', status: 'Active' },
      { name: 'Remote Work Options', type: 'Policy', status: 'Active' },
      { name: 'Paid Time Off', type: 'Benefit', status: 'Active' },
      { name: 'Parental Leave', type: 'Policy', status: 'Active' },
    ],
  },
  {
    name: 'Professional Development',
    description: 'Resources for career growth and learning',
    icon: AcademicCapIcon,
    items: [
      { name: 'Training Programs', type: 'Program', status: 'Available' },
      { name: 'Conference Budget', type: 'Benefit', status: 'Active' },
      { name: 'Certification Support', type: 'Program', status: 'Available' },
      { name: 'Mentorship Program', type: 'Program', status: 'Available' },
    ],
  },
];

export default function Benefits() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Employee Benefits
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore your comprehensive benefits package and support resources
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {benefitCategories.map((category) => (
            <div
              key={category.name}
              className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-pink-100 p-3">
                  <category.icon className="h-6 w-6 text-pink-600" aria-hidden="true" />
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
                      <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-xs text-gray-500">{item.type}</span>
                      <span className={`text-xs font-medium ${
                        item.status === 'Active' ? 'text-green-600' : 'text-blue-600'
                      }`}>
                        {item.status}
                      </span>
                      <button className="rounded-md bg-pink-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-pink-500">
                        View Details
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