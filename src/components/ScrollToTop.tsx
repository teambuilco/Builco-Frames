import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

/**
 * ScrollToTop ensures that whenever a route or page changes,
 * the viewport resets immediately to the top of the page.
 * It also renders an elegant floating "Volver arriba" button
 * when the user has scrolled down.
 */
export default function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Scroll to top immediately when route/page changes
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, search, hash]);

  // Track scroll position for the floating back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    document.documentElement.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Volver a la parte superior"
          className="fixed bottom-6 right-6 z-40 p-3 rounded-2xl bg-gold text-black hover:bg-gold-hover shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-110 active:scale-95 flex items-center gap-1.5 font-bold text-xs group cursor-pointer border border-amber-300/40 backdrop-blur-sm"
        >
          <ArrowUp className="w-4 h-4 stroke-[2.5] group-hover:-translate-y-0.5 transition-transform" />
          <span className="hidden sm:inline-block font-mono uppercase tracking-wider text-[11px] pr-1">
            Arriba
          </span>
        </button>
      )}
    </>
  );
}
