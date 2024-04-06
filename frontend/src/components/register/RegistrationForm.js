import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./RegistrationForm.css";


const RegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [key, setKey] = useState('');
  const [seckey, setSeckey] = useState('');
  const [contact, setContact] = useState('');
  const navigate = useNavigate();
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordChange2 = (e) => {
    setPassword2(e.target.value);
  };

  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };

  const handleSeckeyChange = (e) => {
    setSeckey(e.target.value);
  };
  const handleContactChange = (e) => {
    setContact(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username: username,
      email: email,
      password: password,
      password2:password2,
      key:key,
      s_key:seckey,
      contact:contact,
    };

    try {
      const response = await fetch('http://192.168.11.247:5000/register', {
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
        navigate('/');
      } // You can handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='main-register'>
    <div className='register-body'>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <label>
        Email:
        <br></br>
        <input type="email" value={email} className='embut' onChange={handleEmailChange} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <br />
      <label>
        Password2:
        <input type="password" value={password2} onChange={handlePasswordChange2} />
      </label>

      <label>
        Razorpay Key:
        <input type="password" value={key} onChange={handleKeyChange} />
      </label>
      <label>
        Razorpay Secret Key:
        <input type="password" value={seckey} onChange={handleSeckeyChange} />
      </label>
      <label>
        Contact:
        <input type="text" value={contact} onChange={handleContactChange} />
      </label>
      <button type="submit">Register</button>
    </form>
    </div>
    </div>
  );
};

export default RegistrationForm;
