import { useRoutes } from "react-router-dom";
import config from "./config";

const CustomRoutes = () => {
  const element = useRoutes(config);
  return element;
};

export default CustomRoutes;
