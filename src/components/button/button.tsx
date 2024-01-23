import { cn } from "../../utils/class-names";

interface CardProps extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Button content
   */
  children: React.ReactNode;
  /**
   * Button className
   */
  className?: string;
}

export const Button = ({ children, className, ...props }: CardProps) => {
  return (
    <button
      type="button"
      role="button"
      className={cn(
        "rounded-lg border border-black shadow-xl p-2 bg-white w-full flex flex-col hover:opacity-80",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
