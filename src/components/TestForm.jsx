import React, { useState, Fragment } from 'react';
import styled from 'styled-components';
import { questions } from '../data/questions';

// 스타일드 컴포넌트 정의
const Form = styled.form`
  padding: 24px;
  background-color: white;
  border-radius: 8px;
  max-width: 600px;
  margin: 0 auto;
`;

const QuestionBlock = styled.div`
  margin-bottom: 32px;
`;

const QuestionText = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionLabel = styled.label`
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  border: 2px solid transparent;
  background-color: ${(props) => (props.$isFirstOption ? '#ffc107' : '#fd7e14')}; /* 노란색(위), 주황색(아래) */
  color: white;
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => (props.$isFirstOption ? '#ffca28' : '#ff9f43')}; /* 밝은 노란색과 주황색 */
  }
`;

const OptionInput = styled.input`
  display: none;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #28a745;
  color: white;
  padding: 16px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #218838;
  }

  &:active {
    background-color: #1e7e34;
  }
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  height: 8px;
  background-color: #ffc107;
  width: ${(props) => props.$progress || 0}%;
  transition: width 0.3s ease;
`;

const TestForm = ({ onSubmit }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 보고있는 질문의 번호
  const [answers, setAnswers] = useState([]); // 답변을 저장하는 배열

  const handleOptionSelect = (value) => {
    // 현재 질문에 답변을 추가
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = {
      type: questions[currentQuestionIndex].type,
      answer: value
    };
    setAnswers(updatedAnswers); // 업데이트된 답변을 저장
    // 다음 질문으로 이동
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1); // 상태 안전하게 업데이트 중복 방지
    }
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100; // 진행 상황 계산

  return (
    <Form>
      <ProgressBarContainer>
        <ProgressBar $progress={progress} />
      </ProgressBarContainer>
      <QuestionBlock>
        {/* 질문 번호와 내용 */}
        <QuestionText>{`질문 ${currentQuestionIndex + 1}/${questions.length}`}</QuestionText>
        <QuestionText>{questions[currentQuestionIndex].question}</QuestionText>
        <OptionWrapper>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <Fragment key={index}>
              <OptionLabel
                htmlFor={`question-${currentQuestionIndex}-${index}`}
                $isFirstOption={index === 0} // 첫 번째 옵션은 노란색
                onClick={() => handleOptionSelect(option)}
              >
                {option}
              </OptionLabel>
              <OptionInput
                id={`question-${currentQuestionIndex}-${index}`}
                type="radio"
                name={`question-${currentQuestionIndex}`}
                value={option}
              />
            </Fragment>
          ))}
        </OptionWrapper>
      </QuestionBlock>
      {currentQuestionIndex === questions.length - 1 && (
        <SubmitButton type="button" onClick={() => onSubmit(answers)}>
          제출하기
        </SubmitButton>
      )}
    </Form>
  );
};

export default TestForm;
