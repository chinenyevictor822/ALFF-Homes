import { Link } from "react-router-dom";
import PageMeta from "../components/PageMeta";

export default function NotFound() {
  return (
    <main className="min-h-[70vh] bg-brand-ivory px-6 py-32 md:px-12">
      <PageMeta
        title="Page Not Found"
        description="The requested ALFF HOMES page could not be found. Return to the private collection or begin a new enquiry."
      />
      <div className="mx-auto flex max-w-3xl flex-col items-start justify-center">
        <span className="mb-4 text-[10px] font-bold uppercase tracking-[0.4em] text-brand-bronze">
          404 — Private Collection
        </span>
        <h1 className="font-serif text-5xl leading-tight text-brand-charcoal md:text-7xl">
          This page is not part of the collection.
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-brand-taupe md:text-base">
          The address may have changed or the property may no longer be available at this location. Return to the collection and continue your private discovery.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to="/"
            className="bg-brand-charcoal px-6 py-3 text-xs font-semibold uppercase tracking-widest text-brand-ivory transition-colors hover:bg-brand-bronze focus:outline-hidden focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2"
          >
            Return Home
          </Link>
          <Link
            to="/properties"
            className="border border-brand-stone px-6 py-3 text-xs font-semibold uppercase tracking-widest text-brand-charcoal transition-colors hover:border-brand-charcoal focus:outline-hidden focus:ring-2 focus:ring-brand-bronze focus:ring-offset-2"
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </main>
  );
}

export { NotFound };
