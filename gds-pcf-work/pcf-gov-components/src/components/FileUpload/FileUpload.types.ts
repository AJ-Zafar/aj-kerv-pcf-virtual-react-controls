export interface FileUploadProps {
  /** Unique ID for the file input */
  id: string;
  /** Name attribute for the file input */
  name: string;
  /** Label text */
  label: string;
  /** Whether the label should be wrapped in an h1 */
  labelIsHeading?: boolean;
  /** Label size modifier: 's' | 'm' | 'l' | 'xl' */
  labelSize?: 's' | 'm' | 'l' | 'xl';
  /** Hint text displayed below the label */
  hint?: string;
  /** Error message text */
  errorMessage?: string;
  /** Whether to accept multiple files */
  multiple?: boolean;
  /** Accepted file types (e.g. ".jpg,.png,.pdf") */
  accept?: string;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Additional CSS class for the file input */
  className?: string;
}
