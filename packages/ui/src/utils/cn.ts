/**
 * Class Name Utility (cn)
 *
 * A simple utility for conditionally joining class names.
 * Similar to clsx/classnames but simplified for our use case.
 *
 * @example
 * cn('base-class', condition && 'conditional-class', 'always-applied')
 * // => 'base-class conditional-class always-applied' (if condition is true)
 */

type ClassValue =
  | ClassValue[]
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: boolean };

/**
 * Combines multiple class names into a single string.
 * Filters out falsy values and flattens arrays.
 */
export function cn(...inputs: ClassValue[]): string {
  const classes: string[] = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'number') {
      classes.push(String(input));
    } else if (Array.isArray(input)) {
      const nested = cn(...input);
      if (nested) classes.push(nested);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value) classes.push(key);
      }
    }
  }

  return classes.join(' ');
}
