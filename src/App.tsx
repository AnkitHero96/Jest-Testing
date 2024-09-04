import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Draggable from "./pages/Draggable";
import Carousel from "./pages/Carousel";
import Login from "./pages/Login";
import RegisterPage from "./pages/RegisterPage";

import AuthGuard from "./components/component/utils/AuthGuard";

function App() {
  return (
    <>
      <Routes>
        <Route path="Login_Page" element={<Login />} />
        <Route path="Register_page" element={<RegisterPage />} />
        <Route path="/" element={<AuthGuard><Home/></AuthGuard>} />
        <Route path="Draggable" element={<AuthGuard><Draggable /></AuthGuard>} />
        <Route path="Carousel" element={<AuthGuard><Carousel /></AuthGuard>} />
      </Routes>
    </>
  );
}

export default App;
