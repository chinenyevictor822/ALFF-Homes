import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import PageMeta from "./components/PageMeta";
import { Home } from "./pages/Home";
import { Properties } from "./pages/Properties";
import { PropertyDetail } from "./pages/PropertyDetail";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { NotFound } from "./pages/NotFound";

const pageMeta = {
  home: {
    title: "Contemporary African Luxury Real Estate",
    description: "Distinctive contemporary African luxury real estate in Lagos and Port Harcourt, curated by ALFF HOMES LTD."
  },
  properties: {
    title: "The Living Collection",
    description: "Explore ALFF HOMES' curated collection of contemporary African luxury properties across Lagos and Port Harcourt."
  },
  about: {
    title: "Our Philosophy",
    description: "Discover the architectural philosophy, values and vision behind ALFF HOMES."
  },
  services: {
    title: "Private Services",
    description: "Explore ALFF HOMES private acquisition, development and architectural advisory services."
  }
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-brand-ivory text-brand-charcoal selection:bg-brand-bronze selection:text-white flex flex-col justify-between">
        <Navigation />

        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <PageMeta {...pageMeta.home} />
                  <Home />
                </>
              }
            />
            <Route
              path="/properties"
              element={
                <>
                  <PageMeta {...pageMeta.properties} />
                  <Properties />
                </>
              }
            />
            <Route path="/properties/:id" element={<PropertyDetail />} />
            <Route
              path="/about"
              element={
                <>
                  <PageMeta {...pageMeta.about} />
                  <About />
                </>
              }
            />
            <Route
              path="/services"
              element={
                <>
                  <PageMeta {...pageMeta.services} />
                  <Services />
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <footer className="bg-brand-charcoal text-brand-ivory/80 py-16 border-t border-brand-ivory/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.15em] text-brand-ivory font-medium">ALFF HOMES</span>
              <span className="text-[7.5px] uppercase tracking-[0.38em] text-brand-bronze mt-0.5 font-bold">LTD — EST. 2021</span>
            </div>

            <p className="font-sans text-[10px] tracking-wider max-w-md leading-relaxed text-brand-ivory/50">
              © {new Date().getFullYear()} ALFF HOMES LTD. Registered in Nigeria (RC: 1840291). Member of AEAN (AEAN/PH/7042). Designing contemporary African luxury sanctuaries. All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs uppercase tracking-widest text-brand-bronze font-semibold">
              <Link to="/" className="hover:text-brand-ivory transition-colors focus:outline-hidden focus:ring-2 focus:ring-brand-bronze">Home</Link>
              <Link to="/properties" className="hover:text-brand-ivory transition-colors focus:outline-hidden focus:ring-2 focus:ring-brand-bronze">Collection</Link>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-brand-ivory transition-colors focus:outline-hidden focus:ring-2 focus:ring-brand-bronze"
              >
                Back to Top
              </button>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
