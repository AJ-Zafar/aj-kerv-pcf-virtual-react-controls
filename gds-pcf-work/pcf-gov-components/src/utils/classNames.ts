/**
 * Utility for combining class names
 * Filters out falsy values for conditional classes
 */
export function classNames(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
