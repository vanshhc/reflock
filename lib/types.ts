export type Category =
  | "ai"
  | "community"
  | "course"
  | "cohort"
  | "coaching"
  | "template";

export type OfferingType =
  | "AI Tool"
  | "Community"
  | "Course"
  | "Cohort"
  | "Coaching"
  | "Template";

export interface Offering {
  name: string;
  type: OfferingType;
  price: string;
  desc: string;
  buyers: string;
}

export interface Store {
  id: number;
  handle: string;
  businessName: string;
  ownerName: string;
  role: string;
  bio: string;
  offerings: Offering[];
  buyers: string;
  cat: Category;
  color: string;
  abbr: string;
  featured?: boolean;
  memberSince: number;
  topics: string[];
  about: string;
  socials?: {
    twitter?: string;
    youtube?: string;
    linkedin?: string;
    instagram?: string;
    website?: string;
  };
}
