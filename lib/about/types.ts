export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarUrl?: string;
}

export interface Stat {
  id: string;
  label: string;
  value: string;
  icon?: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface AboutHeroProps {
  videoUrl?: string;
  posterUrl?: string;
}
