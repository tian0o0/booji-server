import { useRoutes } from "react-router-dom";
import routes from "./config";

const CustomRoutes = () => {
  const element = useRoutes(routes);
  return element;
};

export default CustomRoutes;
