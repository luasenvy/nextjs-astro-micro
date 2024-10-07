import ArrowCard from "@/components/ArrowCard";
import Container from "@/components/Container";
import Link from "@/components/Link";

import { SITE, SOCIALS } from "@/lib/config";

import posts from "@/lib/data/posts";
import projects from "@/lib/data/projects";

const homepagePosts = posts.slice(0, SITE.NUM_POSTS_ON_HOMEPAGE);
const homepageProjects = projects.slice(0, SITE.NUM_PROJECTS_ON_HOMEPAGE);

export default function HomePage() {
  return (
    <Container>
      <aside data-pagefind-ignore>
        <h1 className="font-semibold text-black dark:text-white">Introducing Astro Micro 🔬</h1>
        <div className="space-y-16">
          <section>
            <article className="space-y-4">
              <span>
                <p>
                  Astro Micro is an accessible theme for{" "}
                  <Link href="https://astro.build/">Astro</Link>. It's a fork of
                  <Link href="https://github.com/markhorn-dev">Mark Horn's</Link> popular theme{" "}
                  <Link href="https://astro.build/themes/details/astronano/">Astro Nano</Link>. Like
                  Nano, Micro comes with zero frameworks installed.
                </p>
                <p>
                  Micro adds features like <Link href="https://pagefind.app/">Pagefind</Link> for
                  search, <Link href="https://giscus.app">Giscus</Link> for comments, and more. For
                  a full list of changes, see this{" "}
                  <Link href="/blog/00-micro-changelog">blog post</Link>.
                </p>
              </span>
              <span className="animate">
                <p>
                  Micro still comes with everything great about Nano — full type safety, a sitemap,
                  an RSS feed, and Markdown + MDX support. Styled with TailwindCSS and preconfigured
                  with system, light, and dark themes.
                </p>
                <p>
                  Visit
                  <Link href="https://github.com/trevortylerlee/astro-micro">
                    Astro Micro on GitHub
                  </Link>
                  to fork the repository to get started.
                </p>
              </span>
            </article>
          </section>

          <section className="animate space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <h2 className="font-semibold text-black dark:text-white">Latest posts</h2>
              <Link href="/blog"> See all posts </Link>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {homepagePosts.map((post, i) => (
                <li key={`post-${i}`}>
                  <ArrowCard {...post} />
                </li>
              ))}
            </ul>
          </section>

          <section className="animate space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-y-2">
              <h2 className="font-semibold text-black dark:text-white">Recent projects</h2>
              <Link href="/projects"> See all projects </Link>
            </div>
            <ul className="not-prose flex flex-col gap-4">
              {homepageProjects.map((project, i) => (
                <li key={`project-${i}`}>
                  <ArrowCard {...project} />
                </li>
              ))}
            </ul>
          </section>

          <section className="animate space-y-4">
            <h2 className="font-semibold text-black dark:text-white">Let's Connect</h2>
            <article>
              <p>
                If you want to get in touch with me about something or just to say hi, reach out on
                social media or send me an email.
              </p>
            </article>
            <ul className="not-prose flex flex-wrap gap-2">
              {SOCIALS.map((SOCIAL, i) => (
                <li key={`social-${i}`} className="flex gap-x-2 text-nowrap">
                  <Link href={SOCIAL.HREF} external aria-label={`${SITE.TITLE} on ${SOCIAL.NAME}`}>
                    {SOCIAL.NAME}
                  </Link>
                  {"/"}
                </li>
              ))}
              <li className="line-clamp-1">
                <Link href={`mailto:${SITE.EMAIL}`} aria-label={`Email ${SITE.TITLE}`}>
                  {SITE.EMAIL}
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </aside>
    </Container>
  );
}
