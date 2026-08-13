import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navigation from "./components/Navigation";
import ScrollToTop from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { Properties } from "./pages/Properties";
import { PropertyDetail } from "./pages/PropertyDetail";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen bg-brand-ivory text-brand-charcoal selection:bg-brand-bronze selection:text-white flex flex-col justify-between">

        {/* Navigation Shared Header */}
        <Navigation />

        {/* Dynamic Route Pages */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/properties/:id" element={<PropertyDetail />} />
          </Routes>
        </main>

        {/* Global Editorial Footer */}
        <footer className="bg-brand-charcoal text-brand-ivory/80 py-16 border-t border-brand-ivory/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-[0.15em] text-brand-ivory font-medium">ALFF HOMES</span>
              <span className="text-[7.5px] uppercase tracking-[0.38em] text-brand-bronze mt-0.5 font-bold">LTD — EST. 2021</span>
            </div>

            <p className="font-sans text-[10px] tracking-wider max-w-md leading-relaxed text-brand-ivory/50">
              © {new Date().getFullYear()} ALFF HOMES LTD. Registered in Nigeria (RC: 1840291). Member of AEAN (AEAN/PH/7042). Designing contemporary African luxury sanctuaries. All rights reserved.
            </p>

            <div className="flex space-x-6 text-xs uppercase tracking-widest text-brand-bronze font-semibold">
              <Link to="/" className="hover:text-brand-ivory transition-colors">Home</Link>
              <Link to="/properties" className="hover:text-brand-ivory transition-colors">Collection</Link>
              <a href="#" className="hover:text-brand-ivory transition-colors">Back to Top</a>
            </div>
          </div>
        </footer>

      </div>
    </Router>
  );
}
