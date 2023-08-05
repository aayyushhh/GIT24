import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Services } from '../components/services';
import JsonData from "../data/data.json";
import { useLocation, useNavigate } from 'react-router-dom';

function Contactpay() {
    const [amount, setamount] = useState('');
    const [contact, setContact] = useState('');
    const [pass,setPass] = useState('');
    const [pass2,setPass2]= useState('');
    const [data,setData]=useState({});

    const navigate = useNavigate();
    const location = useLocation();

    const uname=location.state.uname;
    // const pass=location.state.pass;
    // const pass2=location.state.pass2;
    


    const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  

  
      const HandleSubmit = async (e) =>{
        e.preventDefault();
        // useEffect(()=> {
        //     const fetchData = async() => {
        //       try{
        //         const response = await axios.get(`http://127.0.0.1:5000/homey/${contact}`);
        //         setData(response.data);
        //       }catch(error){
        //         console.error("Error")
        //       }
        //     };
        
        //     fetchData();
        //   },[]);

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/homey/${contact}`);
                setData(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();


        const userData = {
            contact:contact,
            amount:amount,
            M_name:uname,
            M_pass:pass,
            M_pass2:pass2,
          };
      
          try {
            const response = await fetch('http://127.0.0.1:5000/payto', {
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
    
          console.log(data.key1)
      }

  
  return (
    <div>
      <div className="Gettoken">
     <h2>Razorpay Payment Integration Using React</h2>
     <br/>
     <input type="text"placeholder='Enter Contact'value={contact}onChange={(e)=>setContact(e.target.value)} />
     <br/>
     <input type="text"placeholder='Enter Amount'value={amount}onChange={(e)=>setamount(e.target.value)} />
     <br/>
     
     <input type="text"placeholder='Enter password(String)'value={pass}onChange={(e)=>setPass(e.target.value)} />
     <br/>
     <input type="text"placeholder='Enter Pin'value={pass2}onChange={(e)=>setPass2(e.target.value)} />
     <br/><br/>
     <button className='token-sub' onClick={HandleSubmit}>submit</button>
     
    </div>
    <Services data={landingPageData.Services} />
    </div>
  )
}

export default Contactpay
