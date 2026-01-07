import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AssessmentQuiz from "../components/AssessmentQuiz";
import StudyPlan from "../components/StudyPlan";

export default function LearningPathGenerator({ user, onLogout }) {
  const navigate = useNavigate();
  const [step, setStep] = useState("start"); // start, quiz, plan, results
  const [quizResults, setQuizResults] = useState(null);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleStartQuiz = () => {
    setStep("quiz");
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
    generateStudyPlan(results);
    setStep("results");
  };

  const generateStudyPlan = (results) => {
    // Calculate strong and weak areas
    const topicScores = {};
    
    results.forEach((answer) => {
      const score = answer.isCorrect ? 1 : 0;
      if (!topicScores[answer.topic]) {
        topicScores[answer.topic] = { correct: 0, total: 0 };
      }
      topicScores[answer.topic].correct += score;
      topicScores[answer.topic].total += 1;
    });

    // Calculate percentage for each topic
    const topicPercentages = Object.entries(topicScores).map(([topic, scores]) => ({
      topic,
      percentage: Math.round((scores.correct / scores.total) * 100),
      correct: scores.correct,
      total: scores.total,
    }));

    // Sort by percentage (weakest first)
    topicPercentages.sort((a, b) => a.percentage - b.percentage);

    const weakAreas = topicPercentages.filter((t) => t.percentage < 60);
    const mediumAreas = topicPercentages.filter((t) => t.percentage >= 60 && t.percentage < 80);
    const strongAreas = topicPercentages.filter((t) => t.percentage >= 80);

    const plan = {
      overallScore: Math.round(
        (results.filter((r) => r.isCorrect).length / results.length) * 100
      ),
      topicScores: topicPercentages,
      weakAreas,
      mediumAreas,
      strongAreas,
      recommendedTopics: [
        ...weakAreas.map((area) => ({
          topic: area.topic,
          priority: "High",
          difficulty: "Adaptive (Start Easy)",
          estimatedHours: 15,
          resources: getResourcesForTopic(area.topic),
        })),
        ...mediumAreas.map((area) => ({
          topic: area.topic,
          priority: "Medium",
          difficulty: "Adaptive (Medium)",
          estimatedHours: 10,
          resources: getResourcesForTopic(area.topic),
        })),
      ],
      totalEstimatedHours: (weakAreas.length * 15 + mediumAreas.length * 10),
    };

    setGeneratedPlan(plan);
  };

  const getResourcesForTopic = (topic) => {
    const resources = {
      "Data Structures": [
        { type: "Video", name: "DSA Complete Course - GeeksforGeeks", link: "#" },
        { type: "Practice", name: "LeetCode DSA Problems", link: "#" },
        { type: "Article", name: "Data Structures Explained", link: "#" },
      ],
      "Algorithms": [
        { type: "Video", name: "Algorithm Design Manual", link: "#" },
        { type: "Practice", name: "Codeforces Algorithm Problems", link: "#" },
        { type: "Article", name: "Algorithm Complexity Analysis", link: "#" },
      ],
      "DBMS": [
        { type: "Video", name: "Database Management Systems Course", link: "#" },
        { type: "Practice", name: "SQL Practice Problems", link: "#" },
        { type: "Article", name: "ACID Properties Explained", link: "#" },
      ],
      "Operating Systems": [
        { type: "Video", name: "OS Fundamentals Course", link: "#" },
        { type: "Practice", name: "OS Concepts Quiz", link: "#" },
        { type: "Article", name: "Process Scheduling Algorithms", link: "#" },
      ],
      "System Design": [
        { type: "Video", name: "System Design Interview Prep", link: "#" },
        { type: "Practice", name: "Design Problems", link: "#" },
        { type: "Article", name: "Scalability Patterns", link: "#" },
      ],
    };

    return resources[topic] || [
      { type: "Video", name: "Related Video Course", link: "#" },
      { type: "Practice", name: "Practice Problems", link: "#" },
      { type: "Article", name: "Related Articles", link: "#" },
    ];
  };

  const handleRetakeQuiz = () => {
    setStep("start");
    setQuizResults(null);
    setGeneratedPlan(null);
  };

  return (
    <>
      <Navbar user={user} onLogout={onLogout} />
      <div className="learning-path-container">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>

        {step === "start" && (
          <div className="learning-path-start">
            <h1>🎯 Personalized Learning Path Generator</h1>
            <div className="start-content">
              <div className="info-box">
                <h2>How it Works</h2>
                <ul>
                  <li>✅ Take an AI-based assessment quiz</li>
                  <li>📊 Identify your strengths and weaknesses</li>
                  <li>📈 Get a personalized study plan</li>
                  <li>🎓 Adaptive difficulty levels based on your performance</li>
                </ul>
              </div>
              <button className="start-btn" onClick={handleStartQuiz}>
                Start Assessment Quiz
              </button>
            </div>
          </div>
        )}

        {step === "quiz" && <AssessmentQuiz onComplete={handleQuizComplete} />}

        {step === "results" && (
          <StudyPlan
            plan={generatedPlan}
            quizResults={quizResults}
            onRetake={handleRetakeQuiz}
          />
        )}
      </div>
    </>
  );
}
