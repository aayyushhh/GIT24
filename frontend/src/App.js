import logo from './logo.svg';
import './App.css';
import RegistrationForm from './components/register/RegistrationForm';
import LoginForm from './components/login/LoginForm';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';  
import Homepage from './components/homepage/Homepage';
import PaymentPort from './components/payment/Paymentport';
import Tokenbuy from './components/token-buy/Tokenbuy';
import Tokenredeem from './components/token-redeem/Tokenredeem';
// import Header from './components/header/Header';
import Land from './components/Land';
import { Navigation } from './components/header/navigation';
import Contactpay from './components/contactpay/Contactpay';


function App() {
  return (
    <div className="App">
      <Router>
      <Navigation/>
      <Routes>
      
      {/* <RegistrationForm /> */}
      <Route path="/" element={< Land/>} />
      <Route path="/login" element={< LoginForm />} />
      <Route path="/homepage" element={< Homepage />} />
      <Route path="/registerpage" element={[< RegistrationForm />]} />
      <Route path="/amountpage" element={< PaymentPort />} />
      <Route path="/tokenget" element={< Tokenbuy />} />
      <Route path="/tokenredeem" element={< Tokenredeem />} />
      <Route path="/contact" element={< Contactpay />} />
      {/* <LoginForm/> */}
      </Routes>
      </Router>
    </div>
  );
}

export default App;
