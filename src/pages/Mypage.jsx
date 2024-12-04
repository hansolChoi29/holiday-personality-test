// 마이페이지
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/supabase';
import background1 from '/background1.png';
import styled from 'styled-components';
// #D84137
// #67A53B
// #F9F468
// Styled Components
const Background = styled.div`
  background-image: url(${background1});
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const NicknameContainer = styled.div`
  position: absolute;
  top: 20%;
  width: 600px;
  height: 40px;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  padding: 10px 20px;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 0.5);
`;

const NicknameInput = styled.input`
  font-size: 16px;
  padding: 5px 10px;
  text-align: center;
  border: none;
  border-radius: 15px;
  outline: none;
`;

const NicknameText = styled.p`
  font-size: 20px;
  text-align: center;
  margin: 0;
`;

const EditnButton = styled.button`
  font-size: 14px;
  background-color: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 10px;
  padding: 5px 10px;
  position: absolute;
  right: 10%;

  top: 20%;
  height: 40px;
  cursor: pointer;
`;

const ResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const ResultCard = styled.div`
  background-color: #f9f468; /* 노란색 배경 */
  border-radius: 10px;
  padding: 20px;
  width: 300px;
  text-align: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  position: relative;
  height: 150px;
  display: grid;
`;

const ResultTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 10px;
`;

const Tag = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: ${(props) => (props.type === 'best' ? '#D84137' : '#67A53B')};
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  background-color: transparent;
  border: none;
  color: #d84137; /* 빨간색 */
  cursor: pointer;
`;
const EditsButton = styled.button`
  height: 30px;
  border-radius: 10px;
  margin: 5px;
  border: none;
  width: 50px;
`;
const EditcButton = styled.button`
  height: 30px;
  width: 50px;
  border-radius: 10px;
  margin: 5px;
  border: none;
`;
const Mypage = () => {
  return <div>Mypage</div>;
};

export default Mypage;
