export type Site = {
  TITLE: string;
  DESCRIPTION: string;
  EMAIL: string;
  NUM_POSTS_ON_HOMEPAGE: number;
  NUM_PROJECTS_ON_HOMEPAGE: number;
};

export type Metadata = {
  TITLE: string;
  DESCRIPTION: string;
};

export type Socials = Array<{
  NAME: string;
  HREF: string;
}>;

export type PostItem = {
  slug: string;
  collection: string;
  title: string;
  description: string;
  date: string;
  content: string;
  draft: boolean;
};

export interface ProjectItem extends PostItem {
  demo: string;
  repo: string;
}
