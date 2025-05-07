'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  DocumentTextIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  HeartIcon,
  BookOpenIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Company Resources',
    description: 'Access all company documents, PDFs, and technical documentation in one centralized location.',
    icon: DocumentTextIcon,
  },
  {
    name: 'Smart Chatbot',
    description: 'Get instant answers to your questions with our AI-powered chatbot that searches both intranet and external resources.',
    icon: ChatBubbleLeftRightIcon,
  },
  {
    name: 'Organization Chart',
    description: 'Visualize the company structure and easily find team members across different departments.',
    icon: UserGroupIcon,
  },
  {
    name: 'Employee Benefits',
    description: 'Explore comprehensive benefits packages and access mental health resources.',
    icon: HeartIcon,
  },
  {
    name: 'WISE Program',
    description: 'Access materials and information about our wellness and education initiatives.',
    icon: BookOpenIcon,
  },
  {
    name: 'Product Roadmap',
    description: 'Stay updated with the latest product developments and company initiatives.',
    icon: ChartBarIcon,
  },
];

export default function Features() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="bg-white py-24 sm:py-32" ref={ref}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
            className="text-base font-semibold leading-7 text-blue-600"
          >
            Everything You Need
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Comprehensive Intranet Solutions
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 text-lg leading-8 text-gray-600"
          >
            Our intranet platform provides all the tools and resources you need to stay connected, informed, and productive.
          </motion.p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex flex-col"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
} 