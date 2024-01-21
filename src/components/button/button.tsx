import { cn } from "../../utils/class-names";

interface CardProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Card content
   */
  children: React.ReactNode;
  /**
   * Card className
   */
  className?: string;
}

export const Button = ({ children, className, ...props }: CardProps) => {
  return (
    <button
      type="button"
      className={cn(
        "rounded-lg border border-black shadow-lg bg-white p-5 w-full flex flex-col",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
