import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get time-based greeting
 */
export function getTimeBasedGreeting(): string {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return "Good morning";
  } else if (hour < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  const timeZoneMatch = /\((.*)\)/.exec(date.toString());
  const timeZone = timeZoneMatch ? timeZoneMatch[1] : '';
  
  return `${date.toLocaleDateString('en-US', options)} ${timeZone}`;
}

/**
 * Format currency amount
 */
export function formatCurrency(amount: string | number): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(numAmount);
}

/**
 * Mask account number (show only last 4 digits)
 */
export function maskAccountNumber(accountNumber: string): string {
  const lastFour = accountNumber.slice(-4);
  return `XXXX${lastFour}`;
}

/**
 * Save to session storage
 */
export function saveToSession(key: string, value: any): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to session storage:', error);
  }
}

/**
 * Get from session storage
 */
export function getFromSession<T>(key: string, defaultValue: T): T {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error getting from session storage:', error);
    return defaultValue;
  }
}

/**
 * Clear session storage
 */
export function clearSession(): void {
  try {
    sessionStorage.clear();
  } catch (error) {
    console.error('Error clearing session storage:', error);
  }
}
