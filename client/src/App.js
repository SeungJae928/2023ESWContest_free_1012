import './App.css';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import {useQuery} from "react-query";
import profile from './images/profile.png';
import { BrowserRouter, Route, Routes, Switch } from 'react-router-dom';
import Login from './login';

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
                <img className="profile" src = {profile}>
                </img>
                <a href="/login">로그인 필요</a>
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
                <div className = "test_data">
                    <button onClick={() => {axios.get("http://localhost:3001/api/user")
                    .then((res: any) => {
                        console.log(res);
                    }).catch((err: any) => {
                        console.log(err);
                    })
                    }}>데이터 가져오기</button>
                </div>
            </div>
        </div>
        <div className="bottom-nav">
       <h4 dangerouslySetInnerHTML={{__html:message}}></h4>
            <a href = "localhost:8080/login">로그인</a>
            <text>Copyrights reserved by HojunSeo</text>
        </div>
    </div>
    );
}

export default App;
