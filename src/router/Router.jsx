import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Loginpage from '../pages/Loginpage';
import Joinpage from '../pages/Joinpage';
import Results from '../pages/Results';
import TestPage from '../pages/TestPage';
import Mypage from '../pages/Mypage';
import PrivateRoute from '../components/PrivateRoute';

const Router = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Loginpage />} />
            <Route path="/joinpage" element={<Joinpage />} />
            <Route element={<PrivateRoute />}>
            <Route path="/testpage" element={<TestPage />} />
            <Route path="/results" element={<Results />} />
            <Route path="/mypage" element={<Mypage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
};

export default Router;
