import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes user input for structural mechanics answers.
 * Handles:
 * - Case-insensitivity
 * - Trimming whitespace
 * - Removing basic units (e.g., "10N" -> "10")
 * - Consistent decimal separators (optional but good practice)
 */
export function normalizeAnswer(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[nN]$/, '') // Remove 'N' or 'n' at the end (for Newtons)
    .replace(/kn$/i, '')   // Remove 'kN' or 'kn'
    .trim();
}

/**
 * Validates a quiz answer against a correct answer.
 */
export function validateAnswer(userInput: string, correctAnswer: string): boolean {
  return normalizeAnswer(userInput) === normalizeAnswer(correctAnswer);
}
