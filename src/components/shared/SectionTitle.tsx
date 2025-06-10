import { cn } from "@/lib/utils";

type SectionTitleProps = {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export default function SectionTitle({ children, className, as: Component = 'h2' }: SectionTitleProps) {
  return (
    <Component className={cn("font-headline text-3xl font-semibold text-primary mb-6 pb-2 border-b-2 border-accent", className)}>
      {children}
    </Component>
  );
}
