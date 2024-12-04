import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Loginpage from '../pages/Loginpage';
import Joinpage from '../pages/Joinpage';
import Results from '../pages/Results';
import Mypage from '../pages/Mypage';
import TestPage from '../pages/Testpage';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Loginpage />} />
            <Route path="/joinpage" element={<Joinpage />} />
            <Route path="/testpage" element={<TestPage />} />
            {/* <Route element={<PrivateRoute />}> */}
            <Route path="/results" element={<Results />} />
            <Route path="/mypage" element={<Mypage />} />
            {/* </Route> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
