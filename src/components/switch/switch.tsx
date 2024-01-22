import { cn } from "../../utils/class-names";
import { Text } from "../text/text";

interface SwitchProps {
  /**
   * Switch options
   */
  options: {
    id: string;
    label: string;
    selected: boolean;
  }[];
  /**
   * Action to execute when a option is selected
   */
  onClick: (id: string) => void;
}

export const Switch = ({ options, onClick }: SwitchProps) => {
  return (
    <div className="flex p-1 border border-light-blue bg-light-blue rounded-lg min-w-20 shadow-lg">
      {options.map((option) => (
        <button
          key={option.id}
          className={cn(
            "p-1 rounded-lg w-full",
            option.selected && "bg-dark-blue text-white"
          )}
          onClick={() => onClick(option.id)}
        >
          <Text className="text-xs">{option.label}</Text>
        </button>
      ))}
    </div>
  );
};
