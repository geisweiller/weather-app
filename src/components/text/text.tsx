import React from "react";

import { cn } from "../../utils/class-names";

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /**
   * Text content
   */
  children: React.ReactNode;
  /**
   * Text className
   */
  className?: string;
}

export const Text = ({ children, className, ...props }: TextProps) => {
  return (
    <p className={cn("font-Montserrat text-white", className)} {...props}>
      {children}
    </p>
  );
};
