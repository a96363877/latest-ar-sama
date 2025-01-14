import { useState } from 'react';
import './main.css';
import { CartProvider } from './cartContext';
import Landing from './landing/landing';
import { Toaster } from 'react-hot-toast';

function App() {
  const [currantPage, setCurrantPage] = useState(1);

  return (
    <CartProvider>
      <div>
        <Toaster position="bottom-center" />
      </div>
      <Landing total={10} cart={['']} />
    </CartProvider>
  );
}

export default App;
