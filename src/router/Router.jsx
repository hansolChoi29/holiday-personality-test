import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Loginpage from '../pages/Loginpage';
import JoinPage from '../pages/Joinpage';
import TestPage from '../pages/TestPage';
// import Results from '../pages/Results';
import Mypage from '../pages/Mypage';
import PrivateRoute from '../components/PrivateRoute';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/layout" element={<Layout />} />
          <Route path="/" element={<Loginpage />} />
          <Route path="/joinpage" element={<JoinPage />} />
          <Route path="/testpage" element={<TestPage />} />
          <Route element={<PrivateRoute />}>
          {/* <Route path="/results" element={<Results />} /> */}
          <Route path="/mypage" element={<Mypage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
