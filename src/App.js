import Form from "react-bootstrap/Form";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useState } from "react";
import constants from "./static/constants.json";

function App() {
  const [ username, setUsername ] = useState("");
  // const [ responseData, setResponseData] = useState(""); 
  const baseUrl = constants.api_url;
  const checkUsername = (e) => {
    if(e.key === "Enter") {
      const url = baseUrl + "/live?username=" + username;
      console.log(url)
      axios.get(url)
      .then(response => {
        console.log(response)
      })
      .catch((error) => console.log(error))
    }
  };
  return (
    <div className="App">
    <h1>IS MY FAVORITE STREAMER STREAMING</h1>
      <header className="App-header">
        <Form onSubmit={(e) => {
          e.preventDefault();
        }}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Control
              size="md" 
              type="username"
              placeholder="Enter username here"
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => checkUsername(e)}/>
          </Form.Group>
        </Form>
      </header>
    </div>
  );
}

export default App;
