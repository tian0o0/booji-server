import { RecoilRoot } from "recoil";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import CustomRoutes from "@/routes";
import { AuthProvider } from "@/context/auth";

const history = createBrowserHistory({ window });

const App = () => {
  return (
    <RecoilRoot>
      <HistoryRouter history={history}>
        <AuthProvider>
          <CustomRoutes />
        </AuthProvider>
      </HistoryRouter>
    </RecoilRoot>
  );
};

export default App;
