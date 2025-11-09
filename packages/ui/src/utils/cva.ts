/**
 * Class Variance Authority (CVA)
 *
 * A utility for managing component variants with type safety.
 * Inspired by class-variance-authority (cva) library.
 *
 * @example
 * const buttonVariants = cva('base-button-class', {
 *   variants: {
 *     variant: {
 *       primary: 'bg-primary text-white',
 *       secondary: 'bg-secondary text-black'
 *     },
 *     size: {
 *       sm: 'text-sm px-2 py-1',
 *       md: 'text-base px-4 py-2'
 *     }
 *   },
 *   defaultVariants: {
 *     variant: 'primary',
 *     size: 'md'
 *   }
 * });
 */

import { cn } from './cn';

type VariantConfig<T extends Record<string, Record<string, string>>> = {
  variants: T;
  defaultVariants?: Partial<{ [K in keyof T]: keyof T[K] }>;
  compoundVariants?: Array<
    Partial<{ [K in keyof T]: keyof T[K] }> & { class: string }
  >;
};

type VariantProps<T extends Record<string, Record<string, string>>> = Partial<{
  [K in keyof T]: keyof T[K];
}>;

/**
 * Creates a variant function that generates class names based on props.
 *
 * @param base - Base class names applied to all variants
 * @param config - Configuration object with variants and defaults
 * @returns Function that accepts variant props and returns combined class names
 */
export function cva<T extends Record<string, Record<string, string>>>(
  base: string,
  config?: VariantConfig<T>
) {
  return (props?: VariantProps<T>): string => {
    if (!config) return base;

    const classes: string[] = [base];

    // Apply default variants
    const mergedProps = {
      ...config.defaultVariants,
      ...props,
    } as VariantProps<T>;

    // Apply variant classes
    for (const [variantKey, variantValue] of Object.entries(mergedProps)) {
      if (variantValue && config.variants[variantKey]) {
        const variantClass = config.variants[variantKey][variantValue as string];
        if (variantClass) {
          classes.push(variantClass);
        }
      }
    }

    // Apply compound variants
    if (config.compoundVariants) {
      for (const compound of config.compoundVariants) {
        const { class: compoundClass, ...compoundProps } = compound;
        const matches = Object.entries(compoundProps).every(
          ([key, value]) => mergedProps[key as keyof typeof mergedProps] === value
        );
        if (matches) {
          classes.push(compoundClass);
        }
      }
    }

    return cn(...classes);
  };
}
