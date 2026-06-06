import { useEffect, useRef } from "react";

export default function AutoScroller({ children, speed = 0.5, pauseOnHover = true }) {
  const containerRef = useRef(null);
  const rafRef = useRef(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // duplicate content for seamless scroll
    const content = el.querySelector(".auto-scroll-content");
    if (!content) return;
    // set aria-hidden on duplicate
    const duplicate = content.cloneNode(true);
    duplicate.setAttribute("aria-hidden", "true");
    el.appendChild(duplicate);

    let lastTime = performance.now();

    function step(now) {
      const dt = now - lastTime;
      lastTime = now;
      if (!pausedRef.current) {
        el.scrollLeft += speed * dt * 0.06; // tuned multiplier for reasonable speed
        // when we've scrolled past the first content width, reset
        const contentWidth = content.scrollWidth;
        if (el.scrollLeft >= contentWidth) {
          el.scrollLeft -= contentWidth;
        }
      }
      rafRef.current = requestAnimationFrame(step);
    }

    rafRef.current = requestAnimationFrame(step);

    const onEnter = () => { if (pauseOnHover) pausedRef.current = true; };
    const onLeave = () => { if (pauseOnHover) pausedRef.current = false; };
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      // remove duplicate
      if (duplicate && duplicate.parentNode === el) el.removeChild(duplicate);
    };
  }, [speed, pauseOnHover]);

  return (
    <div
      ref={containerRef}
      className="auto-scroller relative w-full overflow-x-hidden"
      style={{ whiteSpace: "nowrap" }}
    >
      <div className="auto-scroll-content inline-flex items-stretch gap-6">{children}</div>
    </div>
  );
}
