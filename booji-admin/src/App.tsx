import { RecoilRoot } from "recoil";
import { HashRouter } from "react-router-dom";
import CustomRoutes from "@/routes";
import { AuthProvider } from "@/context/auth";

function App() {
  return (
    <RecoilRoot>
      <HashRouter>
        <AuthProvider>
          <CustomRoutes />
        </AuthProvider>
      </HashRouter>
    </RecoilRoot>
  );
}

export default App;
