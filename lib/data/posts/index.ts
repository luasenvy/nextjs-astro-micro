// import * as post01 from "./post-01";
import post02 from "./post-02";
import post03 from "./post-03";
import post06 from "./post-06";
import post07 from "./post-07";
import post08 from "./post-08";

import type { PostItem } from "@/types";

const posts = [post02, post03, post06, post07, post08]
  .filter(({ draft }) => !draft)
  .sort(
    ({ date: a }, { date: b }) => new Date(b).getTime() - new Date(a).getTime()
  ) as Array<PostItem>;

export const postsByYear: Map<number, Array<PostItem>> = posts.reduce((map, post) => {
  const year = new Date(post.date).getFullYear();
  return map.set(year, (map.get(year) ?? []).concat(post));
}, new Map<number, Array<PostItem>>());

export const postsBySlug: Map<string, PostItem> = posts.reduce(
  (map, post) => map.set(post.slug, post),
  new Map()
);

export default posts;
