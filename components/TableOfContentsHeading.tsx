import Link from "@/components/Link";

export interface Heading {
  depth: number;
  slug: string;
  text: string;
  subheadings?: Array<Heading>;
}

export type TableOfContentsHeadingProps = Heading;

export default function TableOfContentsHeading({
  slug,
  text,
  subheadings = [],
}: TableOfContentsHeadingProps) {
  return (
    <li className="list-inside list-disc px-6 py-1.5 text-sm">
      <Link href={"#" + slug} underline>
        {text}
      </Link>

      {Boolean(subheadings?.length) && (
        <ul className="translate-x-3">
          {subheadings.map((subheading: Heading, i) => (
            <TableOfContentsHeading key={`subheading-${i}`} {...subheading} />
          ))}
        </ul>
      )}
    </li>
  );
}
