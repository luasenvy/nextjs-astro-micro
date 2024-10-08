declare module "*.mdx" {
  import type { Element, MDXProps } from "mdx/types";

  interface Frontmatter {
    slug: string;
    title: string;
    subtitle: string;
    description: string;
    collection: string;
    image: string;
    author: string;
    date: string;
    categories: Array<string>;
    featured: boolean;
    draft: boolean;
    content: string;
  }

  function MDXContent(props: MDXProps): Element;
  const metadata: Frontmatter;

  export { metadata, MDXContent as default };
}
