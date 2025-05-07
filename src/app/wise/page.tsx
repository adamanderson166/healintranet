import {
  AcademicCapIcon,
  HeartIcon,
  BookOpenIcon,
  ChartBarIcon,
  ArrowRightIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

const programSections = [
  {
    name: 'Scholarship Program',
    description: 'Supporting "Stranded Superstar" students in their post-secondary education journey',
    icon: AcademicCapIcon,
    items: [
      { name: 'Scholarship Application', type: 'Form', size: 'Interactive' },
      { name: 'Eligibility Criteria', type: 'PDF', size: '1.2 MB' },
      { name: 'Mentorship Program', type: 'PDF', size: '2.1 MB' },
    ],
  },
  {
    name: 'Education Platform',
    description: 'Integrated approach to academic and social growth',
    icon: BookOpenIcon,
    items: [
      { name: 'Academic Resources', type: 'PDF', size: '3.4 MB' },
      { name: 'Social Development', type: 'PDF', size: '2.7 MB' },
      { name: 'Global Citizenship', type: 'PDF', size: '2.9 MB' },
    ],
  },
  {
    name: 'Partnerships',
    description: 'Collaborative initiatives with educational institutions',
    icon: HeartIcon,
    items: [
      { name: 'Partner Institutions', type: 'PDF', size: '4.1 MB' },
      { name: 'Collaboration Guidelines', type: 'PDF', size: '3.2 MB' },
      { name: 'Success Stories', type: 'PDF', size: '2.5 MB' },
    ],
  },
  {
    name: 'Program Impact',
    description: 'Tracking and measuring the success of our initiatives',
    icon: ChartBarIcon,
    items: [
      { name: 'Impact Reports', type: 'PDF', size: '3.8 MB' },
      { name: 'Student Success Stories', type: 'PDF', size: '2.4 MB' },
      { name: 'Annual Review', type: 'PDF', size: '4.2 MB' },
    ],
  },
];

const testimonials = [
  {
    quote: "The WISE Scholarship Program has transformed my educational journey, providing not just financial support but also invaluable mentorship.",
    author: "Sarah Johnson",
    role: "WISE Scholar, Class of 2023"
  },
  {
    quote: "As a mentor in the program, I've witnessed firsthand the incredible growth and potential of these 'Stranded Superstars'.",
    author: "Dr. Michael Chen",
    role: "Program Mentor"
  },
  {
    quote: "The integrated approach to education and social development has created a truly unique and impactful program.",
    author: "Emily Davis",
    role: "Partner Institution Representative"
  }
];

export default function WISE() {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-blue-900">
        <div className="absolute inset-0">
          <Image
            src="/images/wise-hero.jpg"
            alt="WISE Scholarship Program"
            fill
            className="object-cover opacity-20"
            priority
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              WISE Scholarship Program
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
              Supporting "Stranded Superstar" students in their journey to becoming socially responsible, global citizens
            </p>
          </div>
        </div>
      </div>

      {/* Vision Section */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
            <p className="mt-6 text-lg text-gray-600 max-w-3xl mx-auto">
              The WISE Scholarship Program™ provides a sustainable education platform with substantial mentoring advantages,
              offering a completely integrated approach to post-secondary growth, both academically and socially.
            </p>
          </div>
        </div>
      </div>

      {/* Program Features */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {programSections.map((section) => (
              <div
                key={section.name}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-blue-100 p-3">
                    <section.icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{section.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  {section.items.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between rounded-lg border border-gray-100 bg-gray-50 px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <BookOpenIcon className="h-5 w-5 text-gray-400" />
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-gray-500">{item.type}</span>
                        <span className="text-xs text-gray-500">{item.size}</span>
                        <button className="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-blue-500">
                          {item.type === 'Form' ? 'Apply' : 'View'}
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

      {/* Testimonials */}
      <div className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Success Stories</h2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-lg bg-gray-50 p-6">
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <div className="mt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-900 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Ready to Make a Difference?</h2>
            <p className="mt-4 text-xl text-blue-100">
              Join us in supporting the next generation of global citizens
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <button className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-blue-900 shadow-sm hover:bg-blue-50">
                Apply for Scholarship
              </button>
              <button className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                Become a Mentor
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 