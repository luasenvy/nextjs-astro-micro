interface Metadata {
  title: string;
  date: string;
  slug: string;
  draft?: boolean;
  description: string;
  collection: string;
  content: string;
}

declare module "*.mdx" {
  export default React.ComponentType;

  export const metadata: Metadata;
}
