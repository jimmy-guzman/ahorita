import { Link } from "@tanstack/react-router";
import { ArrowLeftIcon, SearchXIcon } from "lucide-react";

export const NotFound = () => {
  return (
    <main className="grid min-h-screen place-content-center">
      <div className="dsy-hero">
        <div className="dsy-hero-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 font-bold text-5xl lg:text-7xl xl:text-9xl">
              Error
            </h1>
            <p className="mb-5 inline-flex items-center gap-2 text-error">
              <SearchXIcon aria-hidden="true" className="h-4 w-4" />
              <span>Not Found</span>
            </p>
            <Link className="dsy-btn dsy-btn-outline" to="/">
              <ArrowLeftIcon aria-hidden="true" className="h-4 w-4" />
              Go back
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
