export type PublicationCategory =
  | "Strategic Forecast"
  | "Economic Analysis"
  | "Infographic"
  | "Video Presentation"
  | "Research Report"
  | "Policy Brief";

export interface MediaItem {
  type: "pdf" | "video" | "image" | "presentation";
  url: string;
  label: string;
  downloadable: boolean;
}

export interface Publication {
  slug: string;
  title: string;
  description: string;
  category: PublicationCategory;
  date: string; // ISO date string
  coverImage: string;
  thumbnail: string;
  media: MediaItem[];
  featured: boolean;
  client?: string;
  role?: string;
  tags?: string[];
}
