// Cart.js

import React from 'react';
import { Container } from 'react-bootstrap/esm';
import { useDispatch, useSelector } from 'react-redux';
import { AddCart, deleteCart, deleteQty } from '../../ReduxApp/ProductSlice';
import { Button } from 'react-bootstrap';
import './Cart.css';

function Cart() {
  let cart = useSelector(state => state.Data.cart);
  let dispatch = useDispatch();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };


  const totalPrice = calculateTotal();

  return (
    <Container fluid className="cart-container">
      {cart.length > 0 ? (
        cart.map((ele, ind) => (
          <div key={ind} className='cart-item'>
            <div className='item-details fw-bold'>
                <img src={ele.thumbnail} className='mx-3' height={'60px'} width={'100px'} />
              <div className='item-title '>{ele.title}</div>
            </div>
            <div className='qtyBtns gap-3'>
              <div className='item-price fw-bold me-3'>Price: ${ele.price * ele.quantity} </div>
              <Button variant='danger' onClick={() => { dispatch(deleteCart(ele.id))}}>Remove</Button>
              <Button className='fw-bolder' variant='success' onClick={() => { dispatch(AddCart(ele))}}>+</Button>
              <Button className='fw-bolder' variant='light'>{ele.quantity}</Button>
              <Button className='fw-bolder' variant='danger' onClick={() => { dispatch(deleteQty(ele))}}>-</Button>
            </div>
          </div>
        ))
      ) : (
        <h2 className='text-center'>Add Items In Cart</h2>
      )}

      {cart.length > 0 && (
        <div className="cart-summary">
          <h4 classN    ame='fw-bolder'>Total Price: ${totalPrice.toFixed(2)}</h4>
        </div>
      )}
    </Container>
  );
}

export default Cart;
