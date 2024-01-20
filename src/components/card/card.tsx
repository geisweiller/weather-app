import { cn } from "../../utils/class-names";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: React.ReactNode;
}

export const Card = ({ children, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border shadow-lg bg-white p-5 w-fit flex flex-col",
        props.className
      )}
    >
      {children}
    </div>
  );
};
