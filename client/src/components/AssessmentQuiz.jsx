import { useState } from "react";

const ASSESSMENT_QUESTIONS = [
  {
    id: 1,
    topic: "Data Structures",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(n log n)"],
    correct: 1,
    difficulty: "Easy",
  },
  {
    id: 2,
    topic: "Data Structures",
    question: "Which data structure is used to implement a undo feature?",
    options: ["Queue", "Stack", "Graph", "Heap"],
    correct: 1,
    difficulty: "Easy",
  },
  {
    id: 3,
    topic: "Algorithms",
    question: "What is the best case time complexity of quicksort?",
    options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"],
    correct: 1,
    difficulty: "Medium",
  },
  {
    id: 4,
    topic: "Algorithms",
    question: "Which algorithm uses a greedy approach?",
    options: ["Dijkstra", "Merge Sort", "Binary Search", "Quick Sort"],
    correct: 0,
    difficulty: "Medium",
  },
  {
    id: 5,
    topic: "DBMS",
    question: "Which ACID property ensures atomicity?",
    options: ["Consistency", "Isolation", "Atomicity", "Durability"],
    correct: 2,
    difficulty: "Medium",
  },
  {
    id: 6,
    topic: "DBMS",
    question: "What is the primary key in a database table?",
    options: [
      "A foreign key reference",
      "A unique identifier for each row",
      "An indexed column",
      "A column with NOT NULL constraint",
    ],
    correct: 1,
    difficulty: "Easy",
  },
  {
    id: 7,
    topic: "Operating Systems",
    question: "What is a deadlock in operating systems?",
    options: [
      "When a process is blocked waiting for resources",
      "When two or more processes are stuck waiting for each other's resources",
      "When a process terminates unexpectedly",
      "When memory is exhausted",
    ],
    correct: 1,
    difficulty: "Hard",
  },
  {
    id: 8,
    topic: "Operating Systems",
    question: "Which scheduling algorithm minimizes waiting time on average?",
    options: ["FIFO", "SJF", "Round Robin", "Priority Scheduling"],
    correct: 1,
    difficulty: "Medium",
  },
  {
    id: 9,
    topic: "System Design",
    question: "What is sharding in database design?",
    options: [
      "Backing up data",
      "Splitting data across multiple databases",
      "Encrypting data",
      "Compressing data",
    ],
    correct: 1,
    difficulty: "Hard",
  },
  {
    id: 10,
    topic: "System Design",
    question: "What is eventual consistency?",
    options: [
      "All nodes have consistent data at all times",
      "Data will eventually become consistent across all nodes",
      "Consistency is guaranteed eventually with compensation",
      "A consistency model that prioritizes availability",
    ],
    correct: 1,
    difficulty: "Hard",
  },
];

export default function AssessmentQuiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [difficulty, setDifficulty] = useState("adaptive");

  const question = ASSESSMENT_QUESTIONS[currentQuestion];
  const answeredCount = answers.length;
  const totalQuestions = ASSESSMENT_QUESTIONS.length;

  const handleSelectAnswer = (index) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === question.correct;
    
    // Adjust difficulty based on performance
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const correctPercentage = ((correctCount + (isCorrect ? 1 : 0)) / (answeredCount + 1)) * 100;
    
    if (correctPercentage > 75) {
      setDifficulty("Hard");
    } else if (correctPercentage > 50) {
      setDifficulty("Medium");
    } else {
      setDifficulty("Easy");
    }

    setAnswers([
      ...answers,
      {
        questionId: question.id,
        topic: question.topic,
        selectedAnswer,
        isCorrect,
        difficulty: question.difficulty,
      },
    ]);

    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      onComplete(answers);
    }
  };

  const progressPercent = ((answeredCount + (isAnswered ? 1 : 0)) / totalQuestions) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>📋 Assessment Quiz</h1>
        <div className="quiz-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p>
            Question {answeredCount + (isAnswered ? 1 : 0)} of {totalQuestions}
          </p>
        </div>
      </div>

      <div className="quiz-content">
        <div className="difficulty-badge">
          Difficulty: <span className={`badge-${difficulty.toLowerCase()}`}>{difficulty}</span>
        </div>

        <div className="question-box">
          <h2>{question.question}</h2>
        </div>

        <div className="options-container">
          {question.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                selectedAnswer === index ? "selected" : ""
              } ${
                isAnswered && index === question.correct ? "correct" : ""
              } ${
                isAnswered && selectedAnswer === index && !isAnswered
                  ? ""
                  : ""
              }`}
              onClick={() => handleSelectAnswer(index)}
              disabled={isAnswered}
            >
              <span className="option-letter">{String.fromCharCode(65 + index)}</span>
              <span className="option-text">{option}</span>
              {isAnswered && index === question.correct && (
                <span className="option-icon">✓</span>
              )}
              {isAnswered && selectedAnswer === index && index !== question.correct && (
                <span className="option-icon">✗</span>
              )}
            </button>
          ))}
        </div>

        {isAnswered && (
          <div className={`feedback-box ${answers[answers.length - 1]?.isCorrect ? "correct" : "incorrect"}`}>
            {answers[answers.length - 1]?.isCorrect ? (
              <p>✅ Correct! Well done!</p>
            ) : (
              <p>❌ Incorrect. The correct answer is: <strong>{question.options[question.correct]}</strong></p>
            )}
          </div>
        )}

        <div className="quiz-actions">
          {!isAnswered ? (
            <button
              className="submit-btn"
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
            >
              Submit Answer
            </button>
          ) : (
            <button className="next-btn" onClick={handleNextQuestion}>
              {currentQuestion === totalQuestions - 1 ? "View Results" : "Next Question"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
