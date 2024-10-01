"use client";

import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";

import { useParams } from "next/navigation";

import { useMemo } from "react";

import BackToPrevious from "@/components/BackToPrevious";
import Container from "@/components/Container";
import FormattedDate from "@/components/FormattedDate";
import Link from "@/components/Link";
import TableOfContents from "@/components/TableOfContents";

import type { Heading } from "@/components/TableOfContentsHeading";
import { projectsBySlug } from "@/lib/data/projects";
import type { ProjectItem } from "@/types";

const prefix = "prj-head";
marked.use(gfmHeadingId({ prefix }));

const readingTime = (html: string) => {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
};

export default function ProjectViewer() {
  const { slug } = useParams();

  const project = useMemo(
    () => projectsBySlug.get(slug as string) as ProjectItem,
    [projectsBySlug, slug]
  );

  const content = useMemo(() => marked.parse(project.content) as string, [project]);

  const article = useMemo(
    () => <article className="animate" dangerouslySetInnerHTML={{ __html: content }} />,
    [content]
  );

  const headings = useMemo(() => {
    const heads: Array<Heading> = [];
    const regex = /<h(\d)[\s>][^<]*<\/h\d>/g;
    let match;
    while ((match = regex.exec(content))) {
      const [, depth] = match;
      const slug = (match[0].match(/>([^<]+)/)?.[1] || "")
        .replace(/[^a-zA-Z\s]/g, "")
        .replace(/\s/g, "-")
        .toLowerCase();
      const text = match[0].replace(/<[^>]+>/g, "");
      heads.push({ depth: Number(depth), slug: `${prefix}${slug}`, text });
    }
    return heads;
  }, [content]);

  return (
    <Container>
      <div className="animate">
        <BackToPrevious href="/projects">Back to projects</BackToPrevious>
      </div>
      <div className="animate my-10 space-y-1">
        <div className="flex items-center gap-1.5">
          <div className="font-base text-sm">
            <FormattedDate date={new Date(project.date)} />
          </div>
          &bull;
          <div className="font-base text-sm">{readingTime(project.content)}</div>
        </div>
        <h1 className="text-3xl font-semibold text-black dark:text-white">{project.title}</h1>
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

      <TableOfContents headings={headings} />

      {article}
    </Container>
  );
}
