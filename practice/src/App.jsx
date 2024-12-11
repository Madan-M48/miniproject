import React, { useState } from "react";
import "./App.css"; // Ensure your styles are defined here
import logo from './sit.jpeg'; // Ensure you have the logo in the correct path
import personLogo from './abc.png'; // Person logo (Make sure you have the person logo in the correct path)

// Mock database of questions
const questionDatabase = {
  S5ISI01: [
    { question: "What is a linked list?", type: "Long Answer" },
    { question: "What is the time complexity of binary search?", type: "One Mark" },
  ],
  S5ISI02: [
    { question: "What is the Pythagorean theorem?", type: "Long Answer" },
    { question: "What is 2 + 2?", type: "One Mark" },
  ],
  SHS04: [
    { question: "What does the 'ls' command do?", type: "One Mark" },
    { question: "Explain file permissions in UNIX.", type: "Long Answer" },
  ],
  
  "SHS05": [
    { question: "What is the purpose of HTML?", type: "Long Answer" },
    { question: "What does CSS stand for?", type: "One Mark" },
  ],
  "S5ISPEC011": [
    { question: "What is the purpose of HTML?", type: "Long Answer" },
    { question: "What does CSS stand for?", type: "One Mark" },
  ],
};

function App() {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [answerTypes, setAnswerTypes] = useState([]); // Changed to an array
  const [difficulty, setDifficulty] = useState("");
  const [modules, setModules] = useState([]); // Changed to an array
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const subjectOptions = Object.keys(questionDatabase);
  const difficultyOptions = ["Easy", "Medium", "Hard"];
  const moduleOptions = [1, 2, 3, 4, 5];

  const handleAnswerTypeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setAnswerTypes((prev) => [...prev, value]);
    } else {
      setAnswerTypes((prev) => prev.filter((type) => type !== value));
    }
  };

  const handleModulesChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setModules((prev) => [...prev, parseInt(value)]);
    } else {
      setModules((prev) => prev.filter((module) => module !== parseInt(value)));
    }
  };

  const addSubject = () => {
    if (selectedSubject && answerTypes.length > 0 && difficulty && modules.length > 0) {
      const subjectCode = `${selectedSubject.slice(0, 3).toUpperCase()}${Math.floor(Math.random() * 100) + 1}`; // Generate a random subject code
      setSubjects([...subjects, { subject: selectedSubject, code: subjectCode, types: answerTypes, difficulty, modules }]);
      setSelectedSubject("");
      setAnswerTypes([]);
      setDifficulty("");
      setModules([]);
    } else {
      alert("Please select all fields: Subject, Answer Type(s), Difficulty, and Number of Modules.");
    }
  };

  const clearSubjects = () => {
    if (window.confirm("Are you sure you want to clear all subjects?")) {
      setSubjects([]);
    }
  };

  const generateQuestionPaper = () => {
    let questions = subjects.reduce((acc, item) => {
      item.types.forEach((type) => {
        const relevantQuestions = questionDatabase[item.subject].filter((q) => q.type === type);
        acc = acc.concat(relevantQuestions);
      });
      return acc;
    }, []);

    if (questions.length === 0) {
      alert("No questions available for the selected subjects and types.");
      return;
    }

    const questionPaper = questions.map((q, index) => `${index + 1}. ${q.question} (${q.type})`).join("\n");

    const printWindow = window.open('', '_blank');
    printWindow.document.write('<pre>' + questionPaper + '</pre>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleLogin = () => {
    // Hardcoded login validation (username: abc, password: 123)
    if (username === "abc" && password === "123") {
      setIsLoggedIn(true); // Set logged-in state to true
    } else {
      alert("Invalid credentials!");
    }
  };

  // Log out function
  const handleLogout = () => {
    setIsLoggedIn(false); // Set logged-in state to false (return to login screen)
  };

  if (!isLoggedIn) {
    // Return early if the user isn't logged in (i.e., show the login container)
    return (
      <div className="login-container">
        <h2>Welcome to QP GEN!</h2>
        <img src={personLogo} alt="Person Logo" className="person-logo" />
        
        <p ><mark>Enter correct username and password</mark></p>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="login-btn">Login</button>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1><em>Siddaganga Institute of Technology</em></h1>
      </header>

      <div className="container">
        <center><img src={logo} alt="Question Paper Logo" className="logo" /></center>
        <h2><center>QP GEN</center></h2><br/>

        <div className="input-section">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="">Select a subject code</option>
            {Object.keys(questionDatabase).map((subject, index) => (
              <option key={index} value={subject}>
                {subject}
              </option>
            ))}
          </select>
          <br />

          <div className="answer-type-section">
            <h3>Select Answer Type(s):</h3>
            <label>
              <input
                type="checkbox"
                value="Multiple Choice"
                checked={answerTypes.includes("Multiple Choice")}
                onChange={handleAnswerTypeChange}
              />
              Multiple Choice
            </label>
            <label>
              <input
                type="checkbox"
                value="Long Answer"
                checked={answerTypes.includes("Long Answer")}
                onChange={handleAnswerTypeChange}
              />
              Long Answer
            </label>
            <label>
              <input
                type="checkbox"
                value="One Mark"
                checked={answerTypes.includes("One Mark")}
                onChange={handleAnswerTypeChange}
              />
              One Mark
            </label>
          </div>
          <br />

          <div className="difficulty-section">
            <h3>Select Difficulty Level:</h3>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">Select Difficulty</option>
              {difficultyOptions.map((level, index) => (
                <option key={index} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>
          <br />

          <div className="modules-section">
            <h3>Select Number of Modules:</h3>
            {moduleOptions.map((module) => (
              <label key={module}>
                <input
                  type="checkbox"
                  value={module}
                  checked={modules.includes(module)}
                  onChange={handleModulesChange}
                />
                {module} Module{module > 1 ? "s" : ""}
              </label>
            ))}
          </div>
          <br />

          <button onClick={addSubject} className="add-btn">Add Subject</button>
        </div>
        <div className="list-container">
  <h3>SUBJECTS AND SUBJECT CODE:</h3>
  <ul>
    <li>Database Management System(S5ISI02)</li>
    <li>Artificial Intellegence and Machine Learning(S5ISI01)</li>
    <li>Research Methodology and IPR(SHS04)</li>
    <li>Environmental Studies(SHS05)</li>
    <li>Data communication(S5ISPEC011)</li>
  </ul>
</div>
        

        <div className="right-side-container">
        <div className="subject-list">
          <h2>Selected Subjects:</h2>
          {subjects.length === 0 ? (
            <p>No subjects added yet.</p>
          ) : (
            <ul>
              {subjects.map((item, index) => (
                <li key={index}>
                  {index + 1}. {item.subject} ({item.code}) - {item.types.join(", ")} - {item.difficulty} - {item.modules.join(", ")}
                </li>
              ))}
            </ul>
          )}
        </div>
          
        </div>
        <button onClick={clearSubjects} className="clear-btn">Clear All Subjects</button>
        <button onClick={generateQuestionPaper} className="generate-btn">Generate Question Paper</button>
      </div>
      <button onClick={handleLogout} className="logout-btn">Log Out</button>
      <footer className="footer">
  <p>&copy; 2024 Siddaganga Institute of Technology. All rights reserved.</p>
</footer>
    </div>
  );
}

export default App;
