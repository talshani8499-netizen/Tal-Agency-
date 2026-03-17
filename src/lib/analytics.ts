import { useEffect, useRef } from 'react';
import ReactGA from 'react-ga4';

// Google Analytics Measurement ID
const MEASUREMENT_ID = 'G-GME0ML0W8W';

// Initialize Google Analytics
export const initializeAnalytics = (): void => {
  ReactGA.initialize(MEASUREMENT_ID);
};

// Track page views
export const trackPageView = (path: string, title: string): void => {
  ReactGA.pageview({
    path,
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
