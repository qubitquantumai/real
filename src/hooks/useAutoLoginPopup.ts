import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface UseAutoLoginPopupOptions {
  delayMs?: number;
  storageKey?: string;
}

export const useAutoLoginPopup = (options: UseAutoLoginPopupOptions = {}) => {
  const { delayMs = 40000, storageKey = 'autoLoginPopupShown' } = options;
  const [showPopup, setShowPopup] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const { user } = useAuth();

  useEffect(() => {
    // Don't show popup if user is already logged in
    if (user) return;

    // Check if popup was already shown in this session
    const popupShown = sessionStorage.getItem(storageKey);
    if (popupShown) return;

    // Check if we're in a browser environment
    if (typeof window === 'undefined') return;

    let startTime = Date.now();
    let interval: NodeJS.Timeout;
    let isPageVisible = !document.hidden;

    const updateTimeSpent = () => {
      if (!isPageVisible) return; // Don't count time when page is hidden
      
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      setTimeSpent(elapsed);

      // Show popup after specified delay
      if (elapsed >= delayMs && !showPopup) {
        setShowPopup(true);
        sessionStorage.setItem(storageKey, 'true');
        clearInterval(interval);
      }
    };

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page is hidden, pause the timer
        isPageVisible = false;
        clearInterval(interval);
      } else {
        // Page is visible again, resume the timer
        isPageVisible = true;
        startTime = Date.now() - timeSpent;
        interval = setInterval(updateTimeSpent, 1000);
      }
    };

    // Handle page focus/blur for better accuracy
    const handleFocus = () => {
      if (!document.hidden) {
        isPageVisible = true;
        startTime = Date.now() - timeSpent;
        interval = setInterval(updateTimeSpent, 1000);
      }
    };

    const handleBlur = () => {
      isPageVisible = false;
      clearInterval(interval);
    };

    // Start the timer
    interval = setInterval(updateTimeSpent, 1000);

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    // Cleanup
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, [user, delayMs, storageKey, showPopup, timeSpent]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const resetTimer = () => {
    sessionStorage.removeItem(storageKey);
    setShowPopup(false);
    setTimeSpent(0);
  };

  return {
    showPopup,
    closePopup,
    resetTimer,
    timeSpent: Math.floor(timeSpent / 1000), // Return time in seconds
  };
};