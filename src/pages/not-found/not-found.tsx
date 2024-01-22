import { useNavigate } from "react-router-dom";

import { EmptyState } from "../../layouts";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <EmptyState
      description="   The page you are looking for isn't here."
      buttonText="Back to search"
      onClick={() => navigate("/")}
    />
  );
};

export default NotFound;
