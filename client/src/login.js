import React, {useState, useEffect} from 'react';

const Login = ()=>{
  const [message, setMessage] = useState("");
useEffect(() => {
fetch('/login')
.then(response => response.text())
.then(message => {
setMessage(message);
});
},[])

  return (
    <div>
      login page
      <div>{message}</div>
    </div>
  );
}

export default Login;