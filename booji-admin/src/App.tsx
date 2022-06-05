import { HashRouter } from "react-router-dom";
import CustomRoutes from "@/routes";
import { AuthProvider } from "@/context/auth";

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <CustomRoutes />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
