import ArrowCard from "@/components/ArrowCard";
import Container from "@/components/Container";

import { postsByYear } from "@/lib/data/posts";

const years = Array.from(postsByYear.keys()).sort((a, b) => b - a);

export default function BlogPage() {
  return (
    <Container>
      <aside data-pagefind-ignore>
        <div className="space-y-10">
          <div className="space-y-4">
            {years.map((year, i) => (
              <section key={`post-${i}`} className="animate space-y-4">
                <div className="font-semibold text-black dark:text-white">{year}</div>
                <div>
                  <ul className="not-prose flex flex-col gap-4">
                    {postsByYear.get(year)?.map((post, i) => (
                      <li key={`post-card-${i}`}>
                        <ArrowCard {...post} />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>
        </div>
      </aside>
    </Container>
  );
}
