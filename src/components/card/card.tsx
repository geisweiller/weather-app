interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card content
   */
  children: React.ReactNode;
}

export const Card = ({ children }: CardProps) => {
  return (
    <div className="rounded-lg border shadow-lg bg-white p-5 w-fit">
      {children}
    </div>
  );
};
