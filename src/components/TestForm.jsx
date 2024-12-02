import React, { useState } from 'react';
import styled from 'styled-components';
import { questions } from '../data/questions';

const Form = styled.form`
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
`;

const QuestionContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const QuestionText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333333;
`;

const OptionLabel = styled.label`
  display: block;
  padding: 0.8rem;
  border: 1px solid #dcdcdc;
  border-radius: 8px;
  margin-bottom: 0.8rem;
  cursor: pointer;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  background-color: ${(props) => (props.isSelected ? '#f5f5f5' : '#ffffff')};
  border-color: ${(props) => (props.isSelected ? '#5d5dff' : '#dcdcdc')};

  &:hover {
    background-color: #f5f5f5;
  }
`;

const OptionInput = styled.input`
  margin-right: 1rem;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: #ffffff;
  background-color: #5d5dff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #4a4aff;
  }

  &:active {
    background-color: #3a3abf;
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
        <QuestionContainer key={q.id}>
          <QuestionText>{q.question}</QuestionText>
          {q.options.map((option, i) => (
            <OptionLabel key={i} isSelected={answers[index]?.answer === q.type.split('/')[i]}>
              <OptionInput
                type="radio"
                name={`question-${index}`}
                value={q.type.split('/')[i]}
                checked={answers[index]?.answer === q.type.split('/')[i]}
                onChange={() => handleChange(index, q.type.split('/')[i])}
              />
              {option}
            </OptionLabel>
          ))}
        </QuestionContainer>
      ))}
      <SubmitButton type="submit">제출하기</SubmitButton>
    </Form>
  );
};

export default TestForm;
