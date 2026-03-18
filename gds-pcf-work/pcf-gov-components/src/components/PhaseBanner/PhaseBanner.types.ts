export interface PhaseBannerProps {
  /** Tag text displayed in the banner (e.g. "Alpha", "Beta") */
  tag: string;
  /** Additional CSS classes for the tag */
  tagClassName?: string;
  /** Banner content as text */
  children?: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}
