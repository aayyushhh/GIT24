import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import "./Paymentport.css";
import Loader from '../loader/Loader';

const PaymentPort = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const uname=location.state.uname;
  const pass=location.state.pass;
  const pass2=location.state.pass2;
  const [amount, setAmount] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

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
    setLoading(true);

    const userData = {
      username: username,
      password: password,
      password2:password2,
      amount:amount,
      M_name:uname,
      M_pass:pass,
      M_pass2:pass2,
    };

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await fetch('http://127.0.0.1:5000/paytime', {
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
        navigate('/homepage',{state:{uname:uname,pass:pass,pass2:pass2}});
      }
       // You can handle the response as needed
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='payme-tab'>
    
      {loading ? <Loader /> :
    <form className='pay-form' onSubmit={handleSubmit}>
      <div>
    <label>
        Amount(₹):
        <input type="text" value={amount} onChange={handleAmountChange} className='amount-sec paybut'/>
      </label>
      <br />
      <label>
        Username:
        <input type="text" value={username} onChange={handleUsernameChange} className=' paybut'/>
      </label>
      <br />
      <label>
        Password(string-pass):
        <input type="password" value={password} onChange={handlePasswordChange} className='paybut2 paybut'/>
      </label>
      <br />
      <label>
        Password2(PIN):
        <input type="password" value={password2} onChange={handlePasswordChange2} className=' paybut'/>
      </label>
      <br/>
      </div>
      <div className='boton'>
      <button type="submit">Make Payment</button>
      </div>
    </form>
}
    
    </div>
    
  );
};

export default PaymentPort;
