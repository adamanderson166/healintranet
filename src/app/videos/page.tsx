import { VideoCameraIcon } from '@heroicons/react/24/outline';

const videoCategories = [
  {
    name: 'Training Videos',
    description: 'Essential training materials for new and existing employees',
    videos: [
      {
        title: 'Getting Started with HEAL',
        description: 'Introduction to company tools and processes',
        duration: '15:30',
        date: '2024-03-15',
      },
      {
        title: 'Product Overview',
        description: 'Detailed walkthrough of our products and services',
        duration: '22:45',
        date: '2024-03-10',
      },
      {
        title: 'Best Practices',
        description: 'Tips and tricks for maximizing productivity',
        duration: '18:20',
        date: '2024-03-05',
      },
    ],
  },
  {
    name: 'Company Updates',
    description: 'Latest news and updates from leadership',
    videos: [
      {
        title: 'Q1 2024 Company Update',
        description: 'Review of company performance and future plans',
        duration: '25:15',
        date: '2024-03-20',
      },
      {
        title: 'New Product Announcement',
        description: 'Introduction of our latest product features',
        duration: '20:30',
        date: '2024-03-18',
      },
      {
        title: 'Team Building Workshop',
        description: 'Strategies for effective collaboration',
        duration: '30:45',
        date: '2024-03-12',
      },
    ],
  },
  {
    name: 'Technical Tutorials',
    description: 'In-depth technical guides and tutorials',
    videos: [
      {
        title: 'System Architecture',
        description: 'Understanding our technical infrastructure',
        duration: '35:20',
        date: '2024-03-17',
      },
      {
        title: 'API Integration Guide',
        description: 'How to integrate with our APIs',
        duration: '28:10',
        date: '2024-03-14',
      },
      {
        title: 'Security Best Practices',
        description: 'Maintaining security in your daily work',
        duration: '24:30',
        date: '2024-03-08',
      },
    ],
  },
];

export default function Videos() {
  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Mike's Videos
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Access training materials, company updates, and technical tutorials
          </p>
        </div>

        <div className="mt-12 space-y-12">
          {videoCategories.map((category) => (
            <div key={category.name} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-red-100 p-3">
                  <VideoCameraIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{category.description}</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.videos.map((video) => (
                  <div
                    key={video.title}
                    className="group relative rounded-lg border border-gray-200 bg-gray-50 p-4 hover:border-red-300"
                  >
                    <div className="aspect-w-16 aspect-h-9 mb-4 overflow-hidden rounded-lg bg-gray-200">
                      <div className="flex h-full items-center justify-center">
                        <VideoCameraIcon className="h-12 w-12 text-gray-400" />
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 group-hover:text-red-600">
                        {video.title}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500">{video.description}</p>
                      <div className="mt-2 flex items-center gap-4 text-xs text-gray-500">
                        <span>{video.duration}</span>
                        <span>•</span>
                        <span>{video.date}</span>
                      </div>
                    </div>
                    <button className="mt-4 w-full rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500">
                      Watch Now
                    </button>
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