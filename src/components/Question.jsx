import styled from "styled-components";

const Button = styled.button`
  background-color: ${(props) =>
    props.isCorrect ? "green" : props.isIncorrect ? "red" : "pink"};
  border: 3px solid
    ${(props) =>
      props.isCorrect ? "green" : props.isIncorrect ? "red" : "pink"};
  font-weight: bold;
  border-radius: 10px;
  padding: 8px;
  margin: 5px 0;
  cursor: pointer;

  &:hover {
    background-color: #fff;
    color: pink;
    border: 3px solid pink;
  }
`;

const Question = ({
  quizData,
  answers,
  handleAnswer,
  currentQuestionIndex,
  userAnswer,
  showAnswer,
}) => {
  const currentQuestion = quizData[currentQuestionIndex];
  return (
    <div>
      <h3>
        Question {currentQuestionIndex + 1}/{quizData.length}
      </h3>
      <h3>{quizData[currentQuestionIndex].question}</h3>
      <div className="answers">
        <ul>
          {answers.map((answer, index) => (
            <li key={index}>
              <Button
                onClick={() => handleAnswer(answer)}
                isCorrect={
                  showAnswer &&
                  userAnswer === answer &&
                  answer === currentQuestion.correct_answer
                }
                isIncorrect={
                  showAnswer &&
                  userAnswer === answer &&
                  answer !== currentQuestion.correct_answer
                }
              >
                {answer}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Question;
