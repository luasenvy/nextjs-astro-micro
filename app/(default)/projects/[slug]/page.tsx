"use client";

import { useParams } from "next/navigation";

import { useEffect, useMemo, useRef, useState } from "react";

import BackToPrevious from "@/components/BackToPrevious";
import Container from "@/components/Container";
import FormattedDate from "@/components/FormattedDate";

import Link from "@/components/Link";
import TableOfContents from "@/components/TableOfContents";

import type { Heading } from "@/components/TableOfContentsHeading";
import { projectsBySlug } from "@/lib/data/projects";

const readingTime = (html: string) => {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
};

export default function ProjectViewer() {
  const { slug } = useParams();

  const articleRef = useRef<HTMLElement>(null);

  const [toc, setToc] = useState<Array<Heading>>([]);

  const project = useMemo(() => projectsBySlug.get(slug as string)!, [projectsBySlug, slug]);

  const ProjectArticle = useMemo(
    () => (
      <article ref={articleRef} className="animate">
        {project?.Component && <project.Component />}
      </article>
    ),
    [project]
  );

  const content = useMemo(() => project?.metadata.content ?? "", [project]);

  useEffect(() => {
    if (!articleRef.current) return;

    setToc(
      Array.from(
        articleRef.current.querySelectorAll("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]")
      ).map(({ id, tagName, textContent }) => ({
        depth: Number(tagName.slice(1)),
        slug: id,
        text: textContent!,
      }))
    );
  }, [articleRef]);

  return (
    <Container>
      <div className="animate">
        <BackToPrevious href="/projects">Back to projects</BackToPrevious>
      </div>
      <div className="animate my-10 space-y-1">
        <div className="flex items-center gap-1.5">
          <div className="font-base text-sm">
            {project?.metadata.date && <FormattedDate date={new Date(project.metadata.date)} />}
          </div>
          &bull;
          <div className="font-base text-sm">{readingTime(content)}</div>
        </div>
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          {project.metadata.title}
        </h1>
        {(project.demo || project.repo) && (
          <nav className="flex gap-1">
            {project.demo && (
              <Link href={project.demo} external>
                demo
              </Link>
            )}
            {project.demo && project.repo && <span>/</span>}
            {project.repo && (
              <Link href={project.repo} external>
                repo
              </Link>
            )}
          </nav>
        )}
      </div>

      <TableOfContents headings={toc} />

      {ProjectArticle}
    </Container>
  );
}
