import project01 from "./project-01";
import project02 from "./project-02";
import project03 from "./project-03";

import type { ProjectItem } from "@/types";

const projects = [project01, project02, project03]
  .filter(({ draft }) => !draft)
  .sort(
    ({ date: a }, { date: b }) => new Date(b).getTime() - new Date(a).getTime()
  ) as Array<ProjectItem>;

export const projectsByYear: Map<number, ProjectItem> = projects.reduce(
  (map, post) => map.set(new Date(post.date).getFullYear(), post),
  new Map()
);

export const projectsBySlug: Map<string, ProjectItem> = projects.reduce(
  (map, post) => map.set(post.slug, post),
  new Map()
);

export default projects as Array<ProjectItem>;
