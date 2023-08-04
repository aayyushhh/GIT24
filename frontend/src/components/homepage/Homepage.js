import React, { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Homepage.css"
import { About } from '../components/about';
import { Services } from '../components/services';
import { Team } from '../components/Team';
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";

const Homepage = () => {
    const location = useLocation();
    const uname=location.state.uname;
    const pass=location.state.pass;
    const pass2=location.state.pass2;
    const navigate = useNavigate();
    const [data,setData]=useState({});
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
      setLandingPageData(JsonData);
    }, []);



    useEffect(()=> {
      const fetchData = async() => {
        try{
          const response = await axios.get(`http://127.0.0.1:5000/home/${uname}/${pass}/${pass2}`);
          setData(response.data);
        }catch(error){
          console.error("Error")
        }
      };

      fetchData();
    },[]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        navigate('/amountpage',{state:{uname:uname,pass:pass,pass2:pass2}});
    
      
    };

    const handleClick = async (e) => {
      e.preventDefault();
      
      navigate('/tokenget',{state:{uname:uname,pass:pass,pass2:pass2,amount:data.money,api1:data.api_key,s_api:data.s_api_key}});
  
    
  };
  const handleClick2 = async (e) => {
    e.preventDefault();
    
    navigate('/tokenredeem',{state:{uname:uname,pass:pass,pass2:pass2,amount:data.money,api1:data.api_key,s_api:data.s_api_key}});

  
};
  return (
    <div>
    <div className='homepage'>
      <a className='logout' href='/login'>logout</a>
      <div className='payment-card'>
      {/* <h1>Hi,  {location.state.uname},{location.state.pass},{data.money} </h1> */}
      <h1>PAYMENT PORTAL</h1>
      <h1>Username : {location.state.uname}</h1>
      <h1>Total amount : ₹{data.money}</h1>
      {/* <form>
      <input type="text" value={username} onChange={handleUsernameChange} />
      <input type="password" value={password} onChange={handlePasswordChange} />
      </form> */}
      <form onSubmit={handleSubmit}>
    <button className='pay-bt' type="submit" >perform Payment process</button>
    </form>
    </div>
    <div className='btns'>
    <button className='btn1' onClick={handleClick}>Get Token</button>
    <button className='btn1' onClick={handleClick2}>Redeem Money</button>
    </div>

    
    </div>
    <About data={landingPageData.About} />
      <Services data={landingPageData.Services} />
      
      
      
    </div>
  );
};

export default Homepage;
