/**
 * Utility for generating and managing component IDs
 * Helps wire up accessibility attributes correctly
 */

let counter = 0;

/**
 * Generate a unique ID for component usage
 * @param prefix - Optional prefix for the ID
 */
export function generateId(prefix: string = 'govuk'): string {
  counter += 1;
  return `${prefix}-${counter}`;
}

/**
 * Create related IDs for a component (e.g., input, hint, error)
 * @param baseId - Base ID for the component
 */
export function createComponentIds(baseId: string) {
  return {
    input: baseId,
    hint: `${baseId}-hint`,
    error: `${baseId}-error`,
    label: `${baseId}-label`,
  };
}

/**
 * Build aria-describedby value from hint and error IDs
 * @param hintId - ID of the hint element
 * @param errorId - ID of the error element
 * @param hasHint - Whether hint exists
 * @param hasError - Whether error exists
 */
export function buildDescribedBy(
  hintId: string,
  errorId: string,
  hasHint: boolean = false,
  hasError: boolean = false
): string | undefined {
  const ids: string[] = [];
  
  if (hasHint) {
    ids.push(hintId);
  }
  
  if (hasError) {
    ids.push(errorId);
  }
  
  return ids.length > 0 ? ids.join(' ') : undefined;
}
