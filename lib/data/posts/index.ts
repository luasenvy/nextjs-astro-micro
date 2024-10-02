import post00, { metadata as metadata00 } from "./00-micro-changelog/index.mdx";
import post01, { metadata as metadata01 } from "./01-getting-started/index.mdx";
import post02, { metadata as metadata02 } from "./02-blog-collection/index.mdx";
import post03, { metadata as metadata03 } from "./03-projects-collection/index.mdx";
import post04, { metadata as metadata04 } from "./04-markdown-syntax/index.mdx";
import post05, { metadata as metadata05 } from "./05-mdx-syntax/index.mdx";
import post06, { metadata as metadata06 } from "./06-year-sorting-example/index.mdx";
import post07, { metadata as metadata07 } from "./07-draft-example/index.mdx";
import post08, { metadata as metadata08 } from "./08-prev-next-order-example/index.mdx";

const posts = [
  { Component: post00, metadata: metadata00 },
  { Component: post01, metadata: metadata01 },
  { Component: post02, metadata: metadata02 },
  { Component: post03, metadata: metadata03 },
  { Component: post04, metadata: metadata04 },
  { Component: post05, metadata: metadata05 },
  { Component: post06, metadata: metadata06 },
  { Component: post07, metadata: metadata07 },
  { Component: post08, metadata: metadata08 },
]
  .filter(({ metadata: { draft } }) => !draft)
  .sort(
    ({ metadata: { date: a } }, { metadata: { date: b } }) =>
      new Date(b).getTime() - new Date(a).getTime()
  );

export type PostItem = (typeof posts)[number];

export const postsByYear: Map<number, Array<PostItem>> = posts.reduce((map, post) => {
  const year = new Date(post.metadata.date).getFullYear();
  return map.set(year, (map.get(year) ?? []).concat(post));
}, new Map<number, Array<PostItem>>());

export const postsBySlug: Map<string, PostItem> = posts.reduce(
  (map, post) => map.set(post.metadata.slug, post),
  new Map()
);

export default posts;
