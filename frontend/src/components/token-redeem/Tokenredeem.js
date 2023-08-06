import React,{useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Tokenredeem.css"
import axios from 'axios';

function Tokenredeem() {
    const [amount, setamount] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const [data,setData]=useState({});


    const uname=location.state.uname;
    const pass=location.state.pass;
    const pass2=location.state.pass2;
    const amt=location.state.amount;
   

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

    


    // const amt=location.state.amount;
    const handleSubmit = (e)=>{
      
      
      
     


      const amt2=parseInt(amount)
      e.preventDefault();
      if(amount === ""){
      alert("please enter amount");
      }
      if(amt2 >= amt){
        alert("value is above expected")
      }else{
        var options = {
          key: data.key1,
          key_secret:data.s_key2,
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
                  const response = await fetch('http://127.0.0.1:5000/redeemtoken', {
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
      <div className="tokensold">
       <h2>Razorpay Payment Integration Using React  </h2>
       <br/>
       <input type="text"placeholder='Enter Amount'value={amount}onChange={(e)=>setamount(e.target.value)} />
       <br/><br/>
       <button onClick={handleSubmit}>submit</button>
      </div>
    );
  
}

export default Tokenredeem
