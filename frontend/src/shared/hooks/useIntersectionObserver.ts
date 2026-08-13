import { useEffect } from "react";

export const useIntersectionObserver = (
  targetRef: React.RefObject<Element | null>,
  onIntersect: () => void,
  enabled = true,
) => {
  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      {
        threshold: 0.1,
      },
    );

    const currentElement = targetRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [targetRef, onIntersect, enabled]);
};
