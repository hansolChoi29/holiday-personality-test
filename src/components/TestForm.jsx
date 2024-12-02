import React, { useState } from 'react';
import styled from 'styled-components';
import { questions } from '../data/questions';

// 스타일드 컴포넌트 정의
const Form = styled.form`
  padding: 24px;
  background-color: white;
  border-radius: 8px;
`;

const QuestionBlock = styled.div`
  margin-bottom: 24px;
`;

const QuestionText = styled.p`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 12px;
`;

const OptionWrapper = styled.div`
  margin-bottom: 8px;
`;

const OptionLabel = styled.label`
  display: block;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: ${(props) => (props.selected ? '#f5f5f5' : 'transparent')};

  &:hover {
    background-color: #f5f5f5;
  }
`;

const OptionInput = styled.input`
  margin-right: 8px;
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #007bff;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:active {
    background-color: #004085;
  }
`;

const TestForm = ({ onSubmit }) => {
  const [answers, setAnswers] = useState(Array(questions.length).fill({ type: '', answer: '' }));

  const handleChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = { type: questions[index].type, answer: value };
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Answers:', answers);
    onSubmit(answers);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {questions.map((q, index) => (
        <QuestionBlock key={q.id}>
          <QuestionText>{q.question}</QuestionText>
          <div>
            {q.options.map((option, i) => (
              <OptionWrapper key={i}>
                <OptionLabel selected={answers[index]?.answer === q.type.split('/')[i]}>
                  <OptionInput
                    type="radio"
                    name={`question-${index}`}
                    value={q.type.split('/')[i]}
                    checked={answers[index]?.answer === q.type.split('/')[i]}
                    onChange={() => handleChange(index, q.type.split('/')[i])}
                  />
                  {option}
                </OptionLabel>
              </OptionWrapper>
            ))}
          </div>
        </QuestionBlock>
      ))}
      <SubmitButton type="submit">제출하기</SubmitButton>
    </Form>
  );
};

export default TestForm;
