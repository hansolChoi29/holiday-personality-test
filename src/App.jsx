<<<<<<< HEAD
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import JoinPage from "./pages/Joinpage";
import Loginpage from "./pages/Loginpage";
import TestPage from "./pages/TestPage";
// import PrivateRoute from "./components/PrivateRoute";
// import Results from "./pages/Results";
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/layout" element={<Layout />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/joinpage" element={<JoinPage />} />
        <Route path="/loginpage" element={<Loginpage />} />
        <Route path="/testpage" element={<TestPage />} />
        {/* <Route element={<PrivateRoute />}>
          <Route path="/results" element={<Results />} />
        </Route> */}
      </Routes>
    </BrowserRouter>
  );
=======
import Router from './router/Router';

const App = () => {
  return <Router />;
>>>>>>> 34a9a485d1fad230c3990f5b788c1822645e8292
};

export default App;
