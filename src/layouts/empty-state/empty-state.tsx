import { Button, Text } from "../components";

interface EmptyStateProps {
  description: string;
  buttonText: string;
  onClick: () => void;
}

const EmptyState = ({ description, buttonText, onClick }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <Text className="text-2xl font-bold">{description}</Text>
      <Button className="bg-dark-blue w-fit border-dark-blue" onClick={onClick}>
        <Text>{buttonText}</Text>
      </Button>
    </div>
  );
};

export default EmptyState;
