import { cn } from "../../utils/class-names";

interface TogglerProps {
  /**
   * This explains foo.
   */
  options: [
    {
      label: string;
      onClick: () => void;
      selected: boolean;
    },
    {
      label: string;
      onClick: () => void;
      selected: boolean;
    }
  ];
}

export const Toggler = ({ options }: TogglerProps) => {
  return (
    <div className="flex p-1 border rounded-lg">
      {options.map((option) => (
        <button
          className={cn(
            "p-2 rounded-lg",
            option.selected && "bg-dark-blue text-white"
          )}
          onClick={option.onClick}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
