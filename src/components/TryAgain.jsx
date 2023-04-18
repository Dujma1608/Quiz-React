const TryAgain = ({score, handleTryAgain}) => {
  return (
    <div className="end-score">
      <p>Your score: {score}</p>
      <h2>Thanks for playing!</h2>
      <button onClick={handleTryAgain}>Try Again</button>
    </div>
  );
};
export default TryAgain;
