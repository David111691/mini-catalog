import { Outlet } from "react-router";
import GlobalStyle from "./styles/GlobalStyles";
import Header from "./Header";

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Outlet />
    </>
  );
};

export default App;
