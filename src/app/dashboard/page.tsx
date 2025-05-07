import Link from 'next/link';
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  HeartIcon,
  BookOpenIcon,
  ChartBarIcon,
  VideoCameraIcon,
  ClipboardDocumentListIcon,
} from '@heroicons/react/24/outline';

const dashboardItems = [
  {
    name: 'Company Resources',
    description: 'Access all company documents and guides',
    href: '/resources',
    icon: DocumentTextIcon,
    color: 'bg-blue-500',
  },
  {
    name: 'Mike\'s Videos',
    description: 'Watch training and informational videos',
    href: '/videos',
    icon: VideoCameraIcon,
    color: 'bg-red-500',
  },
  {
    name: 'To-Do List',
    description: 'Manage your tasks and company objectives',
    href: '/todos',
    icon: ClipboardDocumentListIcon,
    color: 'bg-green-500',
  },
  {
    name: 'Product Roadmap',
    description: 'View product development plans',
    href: '/roadmap',
    icon: ChartBarIcon,
    color: 'bg-purple-500',
  },
  {
    name: 'Smart Chatbot',
    description: 'Get instant answers to your questions',
    href: '/chatbot',
    icon: ChatBubbleLeftRightIcon,
    color: 'bg-indigo-500',
  },
  {
    name: 'Organization Chart',
    description: 'View company structure and teams',
    href: '/org-chart',
    icon: UserGroupIcon,
    color: 'bg-yellow-500',
  },
  {
    name: 'Employee Benefits',
    description: 'Access benefits and support resources',
    href: '/benefits',
    icon: HeartIcon,
    color: 'bg-pink-500',
  },
  {
    name: 'WISE Program',
    description: 'Explore wellness and education initiatives',
    href: '/wise',
    icon: BookOpenIcon,
    color: 'bg-teal-500',
  },
];

export default function Dashboard() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Welcome to Your Dashboard
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Access all the tools and resources you need in one place
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex items-center gap-4">
                <div className={`${item.color} rounded-lg p-3`}>
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 