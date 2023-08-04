// import './App.css';
import React,{useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Tokenbuy.css"
import { Services } from '../components/services';
import { Team } from '../components/Team';
import JsonData from "../data/data.json";
import SmoothScroll from "smooth-scroll";

function Tokenbuy() {
  const [amount, setamount] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const handleSubmit = (e)=>{
    
    const uname=location.state.uname;
    const pass=location.state.pass;
    const pass2=location.state.pass2;

    e.preventDefault();
    if(amount === ""){
    alert("please enter amount");
    }else{
      var options = {
        key: "rzp_test_3c0rgFHcYyF1no",
        key_secret:"1k7W0AYA2KfLrs368KEeyMXk",
        amount: amount *100,
        currency:"INR",
        name:"STARTUP_PROJECTS",
        description:"for testing purpose",
        handler: async function(response){
            const userData = {
                username: uname,
                password: pass,
                password2:pass2,
                amount:amount,
              };
          
              try {
                const response = await fetch('http://127.0.0.1:5000/gettoken', {
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
                } // You can handle the response as needed
              } catch (error) {
                console.log(error);
              }


          alert(response.razorpay_payment_id);
          alert("yo")
        },
        prefill: {
          name:"harry",
          email:"kolih453@gmail.com",
          contact:"9326580920"
        },
        notes:{
          address:"Razorpay Corporate office"
        },
        theme: {
          color:"#3399cc"
        }
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  }
  return (
    <div>
    <div className="Gettoken">
     <h2>Razorpay Payment Integration Using React</h2>
     <br/>
     <input type="text"placeholder='Enter Amount'value={amount}onChange={(e)=>setamount(e.target.value)} />
     <br/><br/>
     <button onClick={handleSubmit}>submit</button>
     
    </div>
    <Services data={landingPageData.Services} />
    </div>
  );
}

export default Tokenbuy;