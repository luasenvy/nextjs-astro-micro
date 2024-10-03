"use client";

import classnames from "classnames";
import { useParams } from "next/navigation";

import { useEffect, useMemo, useRef, useState } from "react";

import BackToPrevious from "@/components/BackToPrevious";
import Container from "@/components/Container";
import FormattedDate from "@/components/FormattedDate";

import PostNavigation from "@/components/PostNavigation";
import TableOfContents from "@/components/TableOfContents";

import type { Heading } from "@/components/TableOfContentsHeading";
import posts, { postsBySlug } from "@/lib/data/posts";

const readingTime = (html: string) => {
  const textOnly = html.replace(/<[^>]+>/g, "");
  const wordCount = textOnly.split(/\s+/).length;
  const readingTimeMinutes = (wordCount / 200 + 1).toFixed();
  return `${readingTimeMinutes} min read`;
};

export default function PostViewer() {
  const { slug } = useParams();

  const giscusRef = useRef<HTMLDivElement>(null);
  const articleRef = useRef<HTMLElement>(null);

  const [toc, setToc] = useState<Array<Heading>>([]);

  const post = useMemo(() => postsBySlug.get(slug as string)!, [postsBySlug, slug]);

  const prevPost = useMemo(() => {
    const index = posts.findIndex(({ metadata: { slug } }) => slug === post?.metadata.slug);
    if (index > 0) return posts[index - 1];
  }, [post]);

  const nextPost = useMemo(() => {
    const index = posts.findIndex(({ metadata: { slug } }) => slug === post?.metadata.slug);
    if (index < posts.length - 1) return posts[index + 1];
  }, [post]);

  const PostArticle = useMemo(
    () => (
      <article ref={articleRef} className="animate">
        {post?.Component && <post.Component />}
        <div className="mt-24">
          <PostNavigation prevPost={prevPost} nextPost={nextPost} />
        </div>
        <div className="mt-24">
          <div ref={giscusRef} />
        </div>
      </article>
    ),
    [post]
  );

  const content = useMemo(() => post?.metadata.content ?? "", [post]);

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
            {post?.metadata.date && <FormattedDate date={new Date(post.metadata.date)} />}
          </div>
          &bull;
          <div className="font-base text-sm">{readingTime(content)}</div>
        </div>
        <h1 className="animate text-3xl font-semibold text-black dark:text-white">
          {post.metadata.title}
        </h1>
      </div>

      <TableOfContents headings={toc} className={classnames({ hidden: !Boolean(toc.length) })} />

      {PostArticle}
    </Container>
  );
}
