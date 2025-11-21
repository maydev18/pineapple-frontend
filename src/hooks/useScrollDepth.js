import { useEffect } from "react";

export default function useScrollDepth() {
  useEffect(() => {
    let sent = {
      25: false,
      50: false,
      75: false,
      100: false,
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const depth = Math.round((scrollTop / docHeight) * 100);

      [25, 50, 75, 100].forEach(p => {
        if (depth >= p && !sent[p]) {
          sent[p] = true;

          window.gtag("event", "scroll_depth", {
            depth: `${p}%`,
            event_category: "engagement",
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
