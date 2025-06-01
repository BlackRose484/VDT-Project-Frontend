import { useLocation } from "react-router-dom";

export const useQueryForm = () => {
  const location = useLocation();
  const query = location.state;
  return query;
};
