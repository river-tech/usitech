import { TeamMember, Stat, Feature } from './types';

export const teamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    bio: '10+ years in automation and business process optimization.',
    avatarUrl: '/team/sarah.jpg'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Lead Developer',
    bio: 'Full-stack developer specializing in workflow automation.',
    avatarUrl: '/team/michael.jpg'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'UX Designer',
    bio: 'Creating intuitive user experiences for complex automation tools.',
    avatarUrl: '/team/emily.jpg'
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Product Manager',
    bio: 'Driving product strategy and user engagement initiatives.',
    avatarUrl: '/team/david.jpg'
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Customer Success',
    bio: 'Ensuring our customers achieve maximum value from automation.',
    avatarUrl: '/team/lisa.jpg'
  },
  {
    id: '6',
    name: 'Alex Morgan',
    role: 'Technical Lead',
    bio: 'Architecting scalable automation solutions for enterprise clients.',
    avatarUrl: '/team/alex.jpg'
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
