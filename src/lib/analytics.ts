import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';
import ReactGA from 'react-ga4';

// Google Analytics Measurement ID
const MEASUREMENT_ID = 'G-GME0ML0W8W';

// Initialize Google Analytics
export const initializeAnalytics = (): void => {
  ReactGA.initialize(MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (path: string, title: string): void => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
    title,
  });
};

// Custom event interface
interface CustomEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Track custom events
export const trackEvent = (event: CustomEvent): void => {
  ReactGA.event({
    action: event.action,
    category: event.category,
    label: event.label,
    value: event.value,
  });
};

// Hook to track scroll depth
export const useScrollDepth = (): void => {
  const hasTracked = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = (): void => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      // Calculate scroll percentage
      const scrollPercent = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      // Track at 25%, 50%, 75%, and 100%
      const milestones = [25, 50, 75, 100];
      milestones.forEach((milestone) => {
        if (
          scrollPercent >= milestone &&
          !hasTracked.current.has(milestone)
        ) {
          hasTracked.current.add(milestone);
          trackEvent({
            action: 'scroll_depth',
            category: 'engagement',
            label: `${milestone}% scrolled`,
            value: milestone,
          });
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
};

// Hook to track time on page
export const useTimeOnPage = (): void => {
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    const handleBeforeUnload = (): void => {
      const timeOnPage = Math.round((Date.now() - startTimeRef.current) / 1000);

      // Track time on page (in seconds)
      trackEvent({
        action: 'page_engagement',
        category: 'engagement',
        label: `Time on page: ${timeOnPage}s`,
        value: timeOnPage,
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);
};

// Event helpers for specific actions
export const trackCTAClick = (ctaName: string, destination: string): void => {
  trackEvent({
    action: 'cta_click',
    category: 'conversion',
    label: `${ctaName} → ${destination}`,
  });
};

export const trackFormStart = (formName: string): void => {
  trackEvent({
    action: 'form_start',
    category: 'conversion',
    label: formName,
  });
};

export const trackFormSubmission = (formName: string): void => {
  trackEvent({
    action: 'form_submit',
    category: 'conversion',
    label: formName,
  });
};

// Track when a section enters the viewport
export const trackSectionView = (sectionName: string): void => {
  trackEvent({
    action: 'section_view',
    category: 'engagement',
    label: sectionName,
  });
};

// Track service card interest clicks
export const trackServiceInterest = (serviceName: string): void => {
  trackEvent({
    action: 'service_interest',
    category: 'engagement',
    label: serviceName,
  });
};

// Hook to fire a section_view event once when the element scrolls into view
export const useTrackSectionView = (sectionName: string): RefObject<HTMLElement | null> => {
  const ref = useRef<HTMLElement | null>(null);
  const hasTracked = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTracked.current) {
          hasTracked.current = true;
          trackSectionView(sectionName);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [sectionName]);

  return ref;
};
