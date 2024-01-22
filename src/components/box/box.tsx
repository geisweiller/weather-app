import React from "react";

import { cn } from "../../utils/class-names";

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Box className to be added to the component.
   */
  className?: string;
  /**
   * Box content
   */
  children: React.ReactNode;
}

export const Box = ({ className, children }: BoxProps) => {
  return (
    <div
      className={cn(
        "bg-dark-blue gap-5 flex flex-col p-10 rounded-lg bg-opacity-40 shadow-xl max-w-4xl flex-1 w-full",
        className
      )}
    >
      {children}
    </div>
  );
};
