import axios from "axios";
import { useState } from "react";
import ClientPreference from "./ClientPreference";
import Question from "./Question";
import Score from "./Score";
import TryAgain from "./TryAgain";
const Quiz = () => {
  const [quizData, setQuizData] = useState([]);
  const [answers, setAnswers] = useState([]);

  const [difficulty, setDifficulty] = useState("medium");
  const [category, setCategory] = useState("9");
  const [questionNumber, setQuestionNumber] = useState(1);

  const [userAnswer, setUserAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const numberOfQuestions = questionNumber.toString();
  const API_URL = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${category}&difficulty=${difficulty}`;

  const getQuestions = async () => {
    setQuizStarted(true);
    const response = await axios.get(API_URL);
    setQuizData(response.data.results);

    shuffleAnswers([
      ...response.data.results[currentQuestionIndex].incorrect_answers,
      response.data.results[currentQuestionIndex].correct_answer,
    ]);
  };

  const shuffleAnswers = (answers) => {
    const shuffledAnswers = answers.sort(() => Math.random() - 0.5);
    setAnswers(shuffledAnswers);
  };

  const handleAnswer = (answer) => {
    
    setUserAnswer(answer);
    setShowAnswer(true);

    const isCorrect = answer === quizData[currentQuestionIndex].correct_answer;

    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < quizData.length) {
      setTimeout(() => {
        setUserAnswer(null);
        setShowAnswer(false);
        setCurrentQuestionIndex(nextQuestion);
        shuffleAnswers([
          ...quizData[currentQuestionIndex + 1].incorrect_answers,
          quizData[currentQuestionIndex + 1].correct_answer,
        ]);
      }, 1200);
    } else {
      setTimeout(() => {
        setUserAnswer(null);
        setShowAnswer(false);
        setShowScore(true);
      }, 1200);
    }
  };

  const handleTryAgain = () => {
    setCurrentQuestionIndex(0);
    setQuizData([]);
    setShowScore(false);
    setScore(0);
    setQuizStarted(false);
    setQuestionNumber(1);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Trivia Quiz</h1>
      {showScore ? (
        <TryAgain score={score} handleTryAgain={handleTryAgain} />
      ) : quizData.length > 0 ? (
        <div>
          <Question
            answers={answers}
            userAnswer={userAnswer}
            showAnswer={showAnswer}
            quizData={quizData}
            currentQuestionIndex={currentQuestionIndex}
            handleAnswer={handleAnswer}
          />
          <Score score={score} />
        </div>
      ) : quizStarted && quizData.length === 0 ? (
        <div className="loading">
          <p>Loading Quiz...</p>
        </div>
      ) : (
        <div>
          <ClientPreference
            questionNumber={questionNumber}
            setQuestionNumber={setQuestionNumber}
            category={category}
            setCategory={setCategory}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
          />
          <button className="startButton" onClick={getQuestions}>
            Start quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
