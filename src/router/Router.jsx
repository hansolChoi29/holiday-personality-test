import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Loginpage from '../pages/Loginpage';
import Joinpage from '../pages/Joinpage';
import TestPage from '../pages/TestPage';
import Results from '../pages/Results';
import Mypage from '../pages/Mypage';

const Router = () => {
  return (
    <div>
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
    </div>
  );
};

export default Router;
