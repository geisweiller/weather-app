import { useNavigate } from "react-router-dom";

import { Button, Text } from "../../components";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      <Text className="text-2xl font-bold">
        The page you are looking for isn't here.
      </Text>
      <Button
        className="bg-dark-blue w-fit border-dark-blue"
        onClick={() => navigate("/")}
      >
        <Text>Back to search</Text>
      </Button>
    </div>
  );
};

export default NotFound;
