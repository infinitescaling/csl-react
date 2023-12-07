import Form from "react-bootstrap/Form";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import React, { useState } from "react";
import constants from "./static/constants.json";

function App() {
  const [ username, setUsername ] = useState("");
  const [ isFetching, setIsFetching ] = useState(true);
  const [ streamInfo, setStreamInfo ] = useState(false);
  const baseUrl = constants.api_url;
  const checkUsername = (e) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      'Content-Type': 'application/x-www-form-urlencoded',
      "Accept": "application/json",
      "Access-Control-Allow-Credentials": "true",
    };
    if(e.key === "Enter") {
      setIsFetching(true);
      setUsername(e.target.value)
      const url = baseUrl + "/live?username=" + e.target.value;
      console.log(url)
      axios.get(url, {
        headers: headers
      })
      .then(response => {
        console.log(response);
        setStreamInfo(response["data"]);
        setIsFetching(false);
      })
      .catch((error) => console.log(error));
    }
  };
  return isFetching ? (
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
              onKeyDown={(e) => checkUsername(e)}/>
          </Form.Group>
        </Form>
      </header>
    </div>
  ): (
    <div className="App">
    <h1>IS MY FAVORITE STREAMER STREAMING</h1>
      <header className="App-header">
          {
            streamInfo ? 
            (<h2>{username.toUpperCase() + " IS STREAMING ON "} 
              <a href={"twitch.tv/"+username}>
                {streamInfo["platform"].toUpperCase()}
              </a>
            </h2>) : 
            <h2>{username.toUpperCase()} IS NOT STREAMING</h2>
          }
        <Form onSubmit={(e) => {
          e.preventDefault();
        }}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Control
              size="md" 
              type="username"
              placeholder="Enter username here"
              onKeyDown={(e) => checkUsername(e)}/>
          </Form.Group>
        </Form>
      </header>
    </div>
  )
}

export default App;
