import ArrowCard from "@/components/ArrowCard";
import Container from "@/components/Container";

import projects from "@/lib/data/projects";

export default function Project() {
  return (
    <Container>
      <aside data-pagefind-ignore>
        <div className="space-y-10">
          <div className="animate font-semibold text-black dark:text-white">Projects</div>
          <ul className="animate not-prose flex flex-col gap-4">
            {projects.map((project, i) => (
              <li key={`project-${i}`}>
                <ArrowCard {...project} />
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </Container>
  );
}
