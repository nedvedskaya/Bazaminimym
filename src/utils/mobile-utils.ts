/**
 * Mobile Utilities for Better Cross-Device Compatibility
 */

/**
 * Detect if the device is mobile
 */
export const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Detect if the device is iOS
 */
export const isIOS = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
};

/**
 * Detect if the device is Android
 */
export const isAndroid = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return /Android/i.test(navigator.userAgent);
};

/**
 * Get iOS version
 */
export const getIOSVersion = (): number | null => {
  if (!isIOS()) return null;
  
  const match = navigator.userAgent.match(/OS (\d+)_/);
  return match ? parseInt(match[1], 10) : null;
};

/**
 * Detect if device supports touch
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Detect if device is in standalone mode (PWA)
 */
export const isStandalone = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    (window.navigator as any).standalone === true
  );
};

/**
 * Get safe area insets for devices with notch
 */
export const getSafeAreaInsets = () => {
  if (typeof window === 'undefined') return { top: 0, right: 0, bottom: 0, left: 0 };
  
  const style = getComputedStyle(document.documentElement);
  
  return {
    top: parseInt(style.getPropertyValue('env(safe-area-inset-top)') || '0'),
    right: parseInt(style.getPropertyValue('env(safe-area-inset-right)') || '0'),
    bottom: parseInt(style.getPropertyValue('env(safe-area-inset-bottom)') || '0'),
    left: parseInt(style.getPropertyValue('env(safe-area-inset-left)') || '0'),
  };
};

/**
 * Prevent iOS bounce scroll
 */
export const preventIOSBounce = () => {
  if (!isIOS()) return;
  
  document.body.style.overscrollBehavior = 'none';
  document.documentElement.style.overscrollBehavior = 'none';
};

/**
 * Get actual viewport height (accounting for mobile browser chrome)
 */
export const getActualViewportHeight = (): number => {
  if (typeof window === 'undefined') return 0;
  
  return window.innerHeight;
};

/**
 * Detect if keyboard is open on mobile
 */
export const isKeyboardOpen = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const viewportHeight = window.visualViewport?.height || window.innerHeight;
  const windowHeight = window.innerHeight;
  
  return viewportHeight < windowHeight * 0.75;
};

/**
 * Smooth scroll to element (works on all devices)
 */
export const smoothScrollTo = (element: HTMLElement | null, offset: number = 0) => {
  if (!element) return;
  
  const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth'
  });
};

/**
 * Disable pull-to-refresh on Chrome Android
 */
export const disablePullToRefresh = () => {
  if (!isAndroid()) return;
  
  let touchStartY = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: false });
  
  document.addEventListener('touchmove', (e) => {
    const touchY = e.touches[0].clientY;
    const touchDelta = touchY - touchStartY;
    
    if (touchDelta > 0 && window.scrollY === 0) {
      e.preventDefault();
    }
  }, { passive: false });
};

/**
 * Get device pixel ratio for high-DPI displays
 */
export const getDevicePixelRatio = (): number => {
  if (typeof window === 'undefined') return 1;
  
  return window.devicePixelRatio || 1;
};

/**
 * Check if device is in landscape mode
 */
export const isLandscape = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.innerWidth > window.innerHeight;
};

/**
 * Vibrate device (if supported)
 */
export const vibrate = (duration: number | number[] = 200) => {
  if (typeof navigator === 'undefined' || !navigator.vibrate) return;
  
  navigator.vibrate(duration);
};

/**
 * Request notification permission (mobile-friendly)
 */
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    return 'denied';
  }
  
  return await Notification.requestPermission();
};

/**
 * Copy text to clipboard (mobile-friendly)
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    
    return successful;
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
};

/**
 * Share content using Web Share API (mobile-friendly)
 */
export const shareContent = async (data: ShareData): Promise<boolean> => {
  if (!navigator.share) {
    console.warn('Web Share API not supported');
    return false;
  }
  
  try {
    await navigator.share(data);
    return true;
  } catch (err) {
    if ((err as Error).name !== 'AbortError') {
      console.error('Error sharing:', err);
    }
    return false;
  }
};
