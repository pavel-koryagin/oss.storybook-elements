import { Children, cloneElement, isValidElement, type ReactNode } from 'react';

/**
 * Recursively clones a ReactNode. This function is introduced to make plural slots look elegant.
 * cloneElement() is considered unsafe, so do not use this function in production.
 * For dev-time in Storybook - it is acceptable.
 */
export function cloneNode(node: ReactNode): ReactNode {
  // Handle null, undefined, boolean (React ignores these)
  if (node == null || typeof node === 'boolean') {
    return node;
  }

  // Handle primitives (string, number)
  if (typeof node === 'string' || typeof node === 'number') {
    return node;
  }

  // Handle arrays
  if (Array.isArray(node)) {
    return node.map((child) => {
      return cloneNode(child);
    });
  }

  // Handle valid React elements
  if (isValidElement(node)) {
    return cloneElement(node);
  }

  // Handle iterables (Children.toArray handles this)
  const childArray = Children.toArray(node);
  if (childArray.length > 0) {
    return childArray.map(child => cloneNode(child));
  }

  // Fallback: return as-is
  return node;
}
