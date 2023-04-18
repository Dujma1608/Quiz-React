const ClientPreference = ({setCategory, category, setDifficulty, difficulty, setQuestionNumber, questionNumber}) => {
  return (
    <div className="clientPreference">
      <div>
        <label htmlFor="questionNumber">Number of questions: </label>
        <input
          type="number"
          id="questionNumber"
          min={1}
          value={questionNumber}
          onChange={(e) => setQuestionNumber(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty: </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div>
        <label htmlFor="category">Category: </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="9">General Knowledge</option>
          <option value="15">Entertainment: Video Games</option>
          <option value="16">Entertainment: Board Games</option>
          <option value="17">Science & Nature</option>
          <option value="18">Science: Computers</option>
          <option value="19">Science: Mathematics</option>
          <option value="20">Mythology</option>
          <option value="21">Sports</option>
          <option value="23">History</option>
          <option value="27">Animals</option>
        </select>
      </div>
    </div>
  );
};

export default ClientPreference;
