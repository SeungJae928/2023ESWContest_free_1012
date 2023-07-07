//https://itprogramming119.tistory.com/entry/React-MySQL-Nodejs-%EC%97%B0%EB%8F%99%ED%95%98%EC%97%AC-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A1%B0%ED%9A%8C%ED%95%98%EA%B3%A0-%EA%B0%80%EC%A0%B8%EC%98%A4%EA%B8%B0
const express = require("express"); // npm i express | yarn add express
const cors    = require("cors");    // npm i cors | yarn add cors
const mysql   = require("mysql");   // npm i mysql | yarn add mysql
const app     = express();
const PORT    = 3001; // 포트번호 설정

// MySQL 연결
const db = mysql.createPool({
    host: "127.0.0.1", // 호스트
    user: "root",      // 데이터베이스 계정
    password: "",      // 데이터베이스 비밀번호
    database: "sys",  // 사용할 데이터베이스
});

app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))

// post 요청 시 값을 객체로 바꿔줌
app.use(express.urlencoded({ extended: true }))

// 서버 연결 시 발생
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

app.get("/api/user", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const sqlQuery = "SELECT * FROM user";

    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});