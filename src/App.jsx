import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import OpenAI from 'openai';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faShare } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import { Link } from "react-router-dom";

function App() {
  const [qType, setqType] = useState("general");
  const [cbResponse, setcbResponse] = useState("");
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  
  const PARAMS = {
    max_tokens: 500
  };
  const apiKey = process.env.REACT_APP_OPEN_API_KEY;
  const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
    },
    heading: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    textarea: {
      width: '100%',
      minHeight: '150px',
      padding: '10px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      marginBottom: '20px',
      fontSize: '16px',
    },
    generateButton: {
      backgroundColor: '#007bff',
      color: 'white',
      padding: '10px 20px',
      fontSize: '18px',
      fontWeight: 'bold',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    cbResponseContainer: {
      backgroundColor: '#f7f7f7',
      padding: '20px',
      borderRadius: '5px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
    },
    likeButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      margin: '5px',
      cursor: 'pointer',
    },
    dislikeButton: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      margin: '5px',
      cursor: 'pointer',
    },
    saveButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      margin: '5px',
      cursor: 'pointer',
    },
    shareButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      margin: '5px',
      cursor: 'pointer',
    },
    continueButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      margin: '5px',
      cursor: 'pointer',
    },
    resetButton: {
      backgroundColor: '#f44336',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      margin: '5px',
      cursor: 'pointer',
    },
    goToStoryButton: {
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      margin: '5px',
      cursor: 'pointer',
    },
  };

  const handleContinue = () => {
    
    const continuedText = `${userInput}\n${cbResponse.generated_text}`;
    setUserInput(continuedText);
    
    setcbResponse("");
  };

  const handleReset = () => {
    
    setUserInput("");
    setcbResponse("");
  };

  const handleLike = () => {
    setLikes(likes + 1);
    setDislikes(0);
  };

  const handleDislike = () => {
    setDislikes(dislikes + 1);
    setLikes(0);
  };

  const getInstruction = async (ins) => {
    let prompt = ` ${ins}`;
    return prompt;
  }

  const handleEvent = async (e) => {
    e.preventDefault();
    const prompt = await getInstruction(userInput);
    console.log(userInput);
    setLikes(0);
    setDislikes(0);

    const body = { ...PARAMS, prompt };
    console.log(body)

    try {
      setIsLoading(true);
      const response = await fetch("/GPT", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data:prompt})
      });
      const data = await response.json();
      console.log(data[0])
      setcbResponse(data[0]);
     
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleSave = () => {
    
    const blob = new Blob([cbResponse.generated_text], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "generated_text.txt";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    
    if (navigator.share) {
      navigator.share({
        title: "Generated Text",
        text: cbResponse.generated_text,
      })
      .then(() => console.log("Shared successfully"))
      .catch((error) => console.error("Share failed:", error));
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <div
    className="container-fluid"
    style={{
      background: `url('https://images.unsplash.com/reserve/LJIZlzHgQ7WPSh5KVTCB_Typewriter.jpg?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1896&q=80') center/cover no-repeat fixed`,
      minHeight: "100vh",
      padding: "20px",
    }}
  >
    <h1 className="my-4" style={{ fontFamily: "'Roboto', sans-serif", textAlign: "center" }}>AI Story Generator</h1>
      <textarea
        style={styles.textarea}
        value={userInput}
        onChange={e => setUserInput(e.target.value)}
        placeholder="Enter your story prompt"
      />
      <button
        className="waves-effect waves-light btn-large"
        type="button"
        onClick={handleEvent}
        style={styles.generateButton}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate"}
      </button>
      {cbResponse && (
        <div style={styles.cbResponseContainer}>
          <p>{cbResponse.generated_text}</p>
          {/* <button
            onClick={handleLike}
            style={styles.likeButton}
          >
            Like ({likes})
          </button>
          <button
            onClick={handleDislike}
            style={styles.dislikeButton}
          >
           
          </button> */}
          <div>
            <FontAwesomeIcon
              icon={faSave}
              size="2x"
              style={{ cursor: "pointer", marginRight: "10px" }}
              onClick={handleSave}
            />
            <FontAwesomeIcon
              icon={faShare}
              size="2x"
              style={{ cursor: "pointer" }}
              onClick={handleShare}
            />
          </div>
          <button
            onClick={handleContinue}
            style={styles.continueButton}
          >
            Continue
          </button>
        </div>
      )}
      {userInput || cbResponse ? (
        <button
          onClick={handleReset}
          style={styles.resetButton}
        >
          Reset
        </button>
      ) : null}
      <Link to="/StoryList">
        <button style={styles.goToStoryButton}>Go to Story</button>
      </Link>
    </div>
  );
}

export default App;
