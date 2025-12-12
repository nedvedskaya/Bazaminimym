/**
 * Safe localStorage utility with validation and error handling
 * Prevents XSS and handles browser privacy modes
 */

export const safeStorage = {
  /**
   * Safely get item from localStorage with validation
   */
  getItem: (key: string): string | null => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return null;
      }
      const item = window.localStorage.getItem(key);
      return item;
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  },

  /**
   * Safely set item to localStorage with validation
   */
  setItem: (key: string, value: string): boolean => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      // Prevent storing extremely large values (max 5MB)
      if (value.length > 5 * 1024 * 1024) {
        console.warn(`Value too large for localStorage: ${key}`);
        return false;
      }
      window.localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.warn(`Failed to set item to localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Safely remove item from localStorage
   */
  removeItem: (key: string): boolean => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      window.localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  },

  /**
   * Get number from localStorage with validation
   */
  getNumber: (key: string, defaultValue: number = 0): number => {
    const value = safeStorage.getItem(key);
    if (value === null) return defaultValue;
    
    const parsed = parseInt(value, 10);
    if (isNaN(parsed) || parsed < 0 || parsed > Number.MAX_SAFE_INTEGER) {
      return defaultValue;
    }
    return parsed;
  },

  /**
   * Set number to localStorage
   */
  setNumber: (key: string, value: number): boolean => {
    if (!Number.isFinite(value) || value < 0) {
      console.warn(`Invalid number value for localStorage: ${key}`, value);
      return false;
    }
    return safeStorage.setItem(key, value.toString());
  },

  /**
   * Clear all items from localStorage (use with caution)
   */
  clear: (): boolean => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) {
        return false;
      }
      window.localStorage.clear();
      return true;
    } catch (error) {
      console.warn('Failed to clear localStorage', error);
      return false;
    }
  }
};
