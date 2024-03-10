import { Link, createFileRoute } from "@tanstack/react-router";

const Index = () => {
  return (
    <main>
      <div className="dsy-hero -mt-16 min-h-screen">
        <div className="dsy-hero-content">
          <div className="flex flex-col gap-4">
            <span className="text-base-content">
              &quot;Ahorita&quot; translates to &quot;now&quot; in Spanish and
              it was used when we weren&apos;t really going{" "}
              <strong className="text-accent">to do</strong> something in my
              family.
            </span>
            <h1 className="bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-8xl text-transparent">
              Ahorita
            </h1>
            <p className="text-2xl">
              Another task management application built for the sake of playing
              with new technologies.
            </p>
            <div className="flex justify-end">
              <Link to="/groups/new" className="dsy-btn dsy-btn-accent">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export const Route = createFileRoute("/")({ component: Index });
