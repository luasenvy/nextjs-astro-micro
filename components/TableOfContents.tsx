import "@/styles/table-of-contents.css";

import TableOfContentsHeading, { type Heading } from "@/components/TableOfContentsHeading";

const buildToc = (headings: Array<Heading>) => {
  const toc: Array<Heading> = [];

  headings.reduce((acc, heading) => {
    acc.set(heading.depth, heading);
    if (heading.depth === 2) toc.push(heading);
    else acc.get(heading.depth - 1)?.subheadings?.push(heading);
    return acc;
  }, new Map<number, Heading>());

  return toc;
};

export interface TableOfContentsProps {
  headings: Array<Heading>;
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const toc = buildToc(headings);

  return (
    <details open className="animate rounded-lg border border-black/15 dark:border-white/20">
      <summary>Table of Contents</summary>
      <nav>
        <ul className="py-3">
          {toc.map((heading, i) => (
            <TableOfContentsHeading key={`heading-${i}`} {...heading} />
          ))}
        </ul>
      </nav>
    </details>
  );
}
