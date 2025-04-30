import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CATEGORY_COLORS } from './constants';
import { ProjectCategory } from '@shared/schema';
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCategoryColor(category: string) {
  switch (category) {
    case ProjectCategory.MEDICAL:
      return {
        color: CATEGORY_COLORS.medical.color,
        bgColor: CATEGORY_COLORS.medical.bgColor,
        textColor: CATEGORY_COLORS.medical.textColor,
        borderColor: CATEGORY_COLORS.medical.borderColor,
      };
    case ProjectCategory.EDUCATION:
      return {
        color: CATEGORY_COLORS.education.color,
        bgColor: CATEGORY_COLORS.education.bgColor,
        textColor: CATEGORY_COLORS.education.textColor,
        borderColor: CATEGORY_COLORS.education.borderColor,
      };
    case ProjectCategory.SPORTS:
      return {
        color: CATEGORY_COLORS.sports.color,
        bgColor: CATEGORY_COLORS.sports.bgColor,
        textColor: CATEGORY_COLORS.sports.textColor,
        borderColor: CATEGORY_COLORS.sports.borderColor,
      };
    case ProjectCategory.ENVIRONMENT:
      return {
        color: CATEGORY_COLORS.environment.color,
        bgColor: CATEGORY_COLORS.environment.bgColor,
        textColor: CATEGORY_COLORS.environment.textColor,
        borderColor: CATEGORY_COLORS.environment.borderColor,
      };
    default:
      return {
        color: '#2C5282', // primary color
        bgColor: 'bg-primary-light',
        textColor: 'text-primary',
        borderColor: 'border-primary',
      };
  }
}

// Format date to locale string based on language
export function formatDate(date: Date | string, language: string = 'ru') {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(language === 'en' ? 'en-US' : 'ru-RU');
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.substring(0, maxLength)}...`;
}

// Get random item from array
export function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}
