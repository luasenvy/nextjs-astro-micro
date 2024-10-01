"use client";

import { marked } from "marked";
import { gfmHeadingId } from "marked-gfm-heading-id";

import { useParams } from "next/navigation";

import { useEffect, useMemo, useRef } from "react";

import BackToPrevious from "@/components/BackToPrevious";
import Container from "@/components/Container";
import FormattedDate from "@/components/FormattedDate";

import PostNavigation from "@/components/PostNavigation";
import TableOfContents from "@/components/TableOfContents";

import posts, { postsBySlug } from "@/lib/data/posts";
import type { PostItem } from "@/types";

const prefix = "blg-head";
marked.use(gfmHeadingId({ prefix }));

const readingTime = (html: string) => {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
};

export default function PostViewer() {
  const { slug } = useParams();
  const giscusRef = useRef<HTMLDivElement>(null);

  const post = postsBySlug.get(slug as string) as PostItem;

  const prevPost = useMemo(() => {
    const index = posts.findIndex(({ slug }) => slug === post.slug);
    if (index > 0) return posts[index - 1];
  }, [post]);

  const nextPost = useMemo(() => {
    const index = posts.findIndex(({ slug }) => slug === post.slug);
    if (index < posts.length - 1) return posts[index + 1];
  }, [post]);

  const content = useMemo(() => marked.parse(post.content) as string, [post]);

  const article = useMemo(
    () => (
      <article className="animate">
        <div dangerouslySetInnerHTML={{ __html: content }} />
        <div className="mt-24">
          <PostNavigation prevPost={prevPost} nextPost={nextPost} />
        </div>
        <div className="mt-24">
          <div ref={giscusRef} />
        </div>
      </article>
    ),
    [content]
  );

  const headings = useMemo(() => {
    const heads: Array<{ depth: number; slug: string; text: string }> = [];
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

  useEffect(() => {
    if (!giscusRef.current) return;

    const isDark = document.documentElement.classList.contains("dark");

    const script = document.createElement("script");

    script.setAttribute("src", "https://giscus.app/client.js");
    script.setAttribute("data-repo", "trevortylerlee/astro-micro");
    script.setAttribute("data-repo-id", "R_kgDOL_6l9Q");
    script.setAttribute("data-category", "Announcements");
    script.setAttribute("data-category-id", "DIC_kwDOL_6l9c4Cfk55");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "top");
    script.setAttribute("data-theme", isDark ? "dark" : "preferred_color_scheme");
    script.setAttribute("data-lang", "en");
    script.setAttribute("data-loading", "lazy");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", "");

    giscusRef.current.appendChild(script);
  }, [giscusRef]);

  return (
    <Container>
      <div className="animate">
        <BackToPrevious href="/blog">Back to blog</BackToPrevious>
      </div>
      <div className="my-10 space-y-1">
        <div className="animate flex items-center gap-1.5">
          <div className="font-base text-sm">
            <FormattedDate date={new Date(post.date)} />
          </div>
          &bull;
          <div className="font-base text-sm">{readingTime(content)}</div>
        </div>
        <h1 className="animate text-3xl font-semibold text-black dark:text-white">{post.title}</h1>
      </div>

      {headings.length > 0 && <TableOfContents headings={headings} />}

      {article}
    </Container>
  );
}
