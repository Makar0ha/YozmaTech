import "./css/App.css";
import Registration from "./components/Registration";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routes } from "./config/routes-config";
import Cookies from 'js-cookie';          

const App = () => {
  function getRoutes() {
    return routes.map((el) => <Route key={el.path} path={el.path} element={el.element} />);
  }
  const token = Cookies.get('token'); //would be cookies from server
  return (
    <BrowserRouter>
      <Routes>
        {!token && <Route path="/registration" element={<Registration />} />}
        {getRoutes()}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
