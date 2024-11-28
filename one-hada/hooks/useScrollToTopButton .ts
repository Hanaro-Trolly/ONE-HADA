import { useEffect, useRef, useState } from 'react';

const useScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const toggleVisibility = () => {
      setIsVisible(container.scrollTop > 200);
    };

    container.addEventListener('scroll', toggleVisibility);

    return () => {
      container.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return { isVisible, scrollToTop, scrollContainerRef };
};

export default useScrollToTopButton;
