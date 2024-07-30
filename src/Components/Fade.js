// FadeInComponent.js
import React, { useEffect, useRef, useState } from 'react';
import styles from './Fade.module.css';

const FadeInComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.fadeInUp} ${isVisible ? styles.fadeInUpVisible : ''}`}
    >
      {children}
    </div>
  );
};

export default FadeInComponent;
