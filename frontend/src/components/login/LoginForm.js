import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LoginForm.css"

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      password: password,
      password2: password2,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        // Redirect to the homepage
        navigate('/homepage',{state:{uname:username,pass:password,pass2:password2}});
      }
       // You can handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='login-form'>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br/>
      <label>
        Password2:
        <input type="password" value={password2} onChange={handlePasswordChange2} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
    <a href='/registerpage'>Register here?</a>
    </div>
  );
};

export default LoginForm;
