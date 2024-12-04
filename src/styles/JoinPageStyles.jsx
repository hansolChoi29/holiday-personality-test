import styled from 'styled-components';
import background1 from '/background1.png';

export const WrappedBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

export const BackgroundSnow = styled.img`
  background-image: url(${background1});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

export const SignUpBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 300px;
  height: auto;
  border-radius: 20px;
  background-color: white;
  padding: 15px;
  margin: auto;
`;

export const SignUpTitle = styled.h1`
  font-size: 32px;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
  text-align: center;
`;

export const InputForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  padding: 10px;
  margin-top: 7px;
  margin-bottom: 0;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
  background-color: #f6f6f6;
  outline: none;
  &:focus {
    border-color: #ccc;
    background-color: #fff;
  }
`;

export const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

export const SignUpBtn = styled.button`
  width: 250px;
  padding: 10px;
  margin: 20px auto;
  background-color: #f9f468;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: black;
  &:hover {
    background-color: #67a53b;
    color: #000;
  }
`;

export const CharacterImage = styled.img`
  width: 100px;
  height: 100px;
  margin: auto;
`;
