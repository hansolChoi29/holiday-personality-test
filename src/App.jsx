import { BrowserRouter, Route, Routes } from "react-router-dom";
import Joinpage from "./pages/Joinpage";
import Loginpage from "./pages/Loginpage";
import PrivateRoute from "./components/PrivateRoute";
import Results from "./pages/Results";
import Layout from "./components/Layout";
import TestPage from "./pages/TestPage";
import Mypage from "./pages/Mypage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/layout" element={<Layout />} />
        <Route path="/" element={<Loginpage />} />
        <Route path="/joinpage" element={<Joinpage />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route element={<PrivateRoute />}></Route>
        <Route path="/results" element={<Results />} />
        <Route path="/mypage" element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
