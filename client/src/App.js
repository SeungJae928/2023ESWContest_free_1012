import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import {useQuery} from "react-query";

function App() {

    const [message, setMessage] = useState("");
    const [getlamp, setlamp] = useState("");
    const Url = "http://localhost:8080";

    useEffect(() => {
              fetch('/login')
                  .then(response => response.text())
                  .then(message => {
                      setMessage(message);
                  });
    },[])

    return (
    <div className="App">
        <div className="top-nav">
            <div className="title">
                <h1>LH Project</h1>
            </div>
            <div className="login-profile">
                <img className="profile" src="/images/profile.PNG">
                </img>
                <h4>로그인해주세요.</h4>
            </div>
        </div>
        <div className="contentWrapper">
            <div className="set-bar">
                <div className = "set-temp">
                    <input type="text" size="10"></input>
                    <button>온도 입력</button>
                </div>
                <div className = "set-humid">
                    <input type="text" size="10"></input>
                    <button>습도 입력</button>
                </div>
                <div className = "set-water">
                    <input type="time" size="10"></input>
                    <button>분무 시간 입력</button>
                </div>
                <div className = "set-lamp">
                    <input type="time" size="10"></input>
                    <button>조명 시간 입력</button>
                </div>
            </div>
        </div>
        <div className="login">
            <h4>로그인 : </h4>
            <h4 dangerouslySetInnerHTML={{__html:message}}></h4>
        </div>
    </div>
    );

}

export default App;
