/** The one shape every validator returns — `valid`, and a `message` when it is not. */
export interface ValidationResult {
  valid: boolean;
  message?: string;
}

export const invalid = (message: string): ValidationResult => ({ valid: false, message });
export const VALID: ValidationResult = { valid: true };
