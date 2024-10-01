import type { PostItem } from "@/types";

export default {
  title: "Chronological pagination example",
  description: "Pagination works regardless of folder name.",
  date: "2024-03-21",
  collection: "blog",
  draft: false,
  slug: "chronological-pagination-example",
  content: `This post should show up in proper chronological order even though its folder comes last in the \`content/blog\` directory.

The \`Previous Post\` and \`Next Post\` buttons under each blog post should also keep the proper chronological order, based on the frontmatter \`date\` field.`,
} satisfies PostItem;
