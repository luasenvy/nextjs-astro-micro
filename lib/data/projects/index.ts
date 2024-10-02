import project1, { metadata as metadata1 } from "./project-1/index.mdx";
import project2, { metadata as metadata2 } from "./project-2/index.mdx";
import project3, { metadata as metadata3 } from "./project-3/index.mdx";

import type { PostItem } from "@/lib/data/posts";

export interface ProjectItem extends PostItem {
  demo: string;
  repo: string;
}

const projects = [
  { Component: project1, metadata: metadata1 },
  { Component: project2, metadata: metadata2 },
  { Component: project3, metadata: metadata3 },
]
  .filter(({ metadata: { draft } }) => !draft)
  .sort(
    ({ metadata: { date: a } }, { metadata: { date: b } }) =>
      new Date(b).getTime() - new Date(a).getTime()
  ) as Array<ProjectItem>;

export const projectsByYear: Map<number, ProjectItem> = projects.reduce(
  (map, post) => map.set(new Date(post.metadata.date).getFullYear(), post),
  new Map()
);

export const projectsBySlug: Map<string, ProjectItem> = projects.reduce(
  (map, post) => map.set(post.metadata.slug, post),
  new Map()
);

export default projects as Array<ProjectItem>;
