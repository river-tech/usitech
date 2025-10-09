import { TeamMember, Stat, Feature } from './types';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Nguyễn Hà',
    role: 'Product Designer',
    bio: 'Designs user experiences and a consistent interface system for the workflow platform.',
  },
  {
    id: '2',
    name: 'Hoài Đức',
    role: 'Lead Engineer',
    bio: 'Owns system architecture and engineering quality, optimizing performance and reliability.',
  },
  {
    id: '3',
    name: 'Thành Tài',
    role: 'Automation Specialist',
    bio: 'Builds and optimizes automation workflows with deep integrations across the n8n ecosystem.',
  },
  {
    id: '4',
    name: 'Phương Tuấn',
    role: 'Customer Success',
    bio: 'Partners with customers to implement and scale automation solutions successfully.',
  }
];

export const stats: Stat[] = [
  {
    id: '1',
    label: 'Workflows Available',
    value: '500+',
    icon: 'workflow'
  },
  {
    id: '2',
    label: 'Happy Customers',
    value: '10K+',
    icon: 'users'
  },
  {
    id: '3',
    label: 'Downloads',
    value: '50M+',
    icon: 'download'
  },
  {
    id: '4',
    label: 'Uptime',
    value: '99.9%',
    icon: 'uptime'
  }
];

export const features: Feature[] = [
  {
    id: '1',
    title: 'Professional Workflows',
    description: 'Enterprise-grade automation templates built by industry experts.',
    icon: 'professional'
  },
  {
    id: '2',
    title: 'Quality Guaranteed',
    description: 'Rigorous testing and validation ensure reliable performance.',
    icon: 'quality'
  },
  {
    id: '3',
    title: '24/7 Support',
    description: 'Round-the-clock assistance from our dedicated support team.',
    icon: 'support'
  },
  {
    id: '4',
    title: 'Regular Updates',
    description: 'Continuous improvements and new features added regularly.',
    icon: 'updates'
  },
  {
    id: '5',
    title: 'Fair Pricing',
    description: 'Transparent pricing with no hidden fees or surprise charges.',
    icon: 'pricing'
  },
  {
    id: '6',
    title: 'Active Community',
    description: 'Join thousands of users sharing knowledge and best practices.',
    icon: 'community'
  }
];
