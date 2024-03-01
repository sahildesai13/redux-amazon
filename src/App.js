import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home/Home';
import Product from './Components/Product';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Header from './Components/Header/Header';
import Cart from './Components/Cart/Cart';

function App() {
  let [productData,setProductData] = useState([]);
  return (
    <div>
    <Header></Header>
      <Routes>
        <Route path='/' element={<Home setData={setProductData} />} />
        <Route path='/Product' element={<Product productData={productData} />} />
        <Route path='/Cart' element={<Cart/>} />
      </Routes>
    </div>
  );
}

export default App;
