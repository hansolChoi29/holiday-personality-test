import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Joinpage from "./pages/Joinpage";
import Loginpage from "./pages/Loginpage";
import TestPage from "./pages/TestPage";
import PrivateRoute from "./components/PrivateRoute";
import Results from "./pages/Results";
import Layout from "./components/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/layout" element={<Layout />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/joinpage" element={<Joinpage />} />
        <Route path="/loginpage" element={<Loginpage />} />
        <Route path="/testpage" element={<TestPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/results" element={<Results />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
