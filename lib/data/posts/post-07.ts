import type { PostItem } from "@/types";

export default {
  title: "Draft example",
  description: "Setting draft flag to true to hide this post.",
  date: "2022-12-31",
  collection: "blog",
  draft: false,
  slug: "draft-example",
  content: `This post also demonstrates the year sorting capabilities.

Try setting this file's metadata to \`draft: true\``,
} satisfies PostItem;
