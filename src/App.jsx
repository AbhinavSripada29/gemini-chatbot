import { useState } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  async function generateAnswer(e) {
    setGeneratingAnswer(true);
    e.preventDefault();
    setAnswer("Loading your answer... \n It might take up to 10 seconds");
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyB-qSUg_j5TLtSQIXPjmKVZweODFruiGKw",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });
      setAnswer(
        response["data"]["candidates"][0]["content"]["parts"][0]["text"]
      );
    } catch (error) {
      console.log(error);
      setAnswer("Sorry - Something went wrong. Please try again!");
    }

    setGeneratingAnswer(false);
  }

  return (
    <>
      <div className="container">
        <form
          onSubmit={generateAnswer}
          className="form-container"
        >
          <a>
            <h1 className="header">GEMINI CHATBOT</h1>
          </a>
          <textarea
            required
            className="textarea"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask anything"
          ></textarea>
          <button
            type="submit"
            className={`button ${generatingAnswer ? 'disabled' : ''}`}
            disabled={generatingAnswer}
          >
            Generate answer
          </button>
        </form>
        <div className="answer-container">
          <ReactMarkdown className="answer">{answer}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default App;
