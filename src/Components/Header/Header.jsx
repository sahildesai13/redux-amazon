import { useState } from 'react';
import {Button,Container,Form,Nav,Navbar} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { filterData, showAll } from '../../ReduxApp/ProductSlice';

function Header() {
  let cart = useSelector((state)=> state.Data.cart.length);
  let dispatch = useDispatch();
  const [input,setInput] = useState('');
  return (
    <div className='pb-5 mb-3'>
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="fixed-top">
        <Container fluid>
            <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <Nav.Link to='/' as={Link}>Home</Nav.Link>
                <Nav.Link to='/Cart' as={Link}>Cart</Nav.Link>
                <Button variant='dark' className='p-0 m-0' style={{fontSize:'14px', color:'grey'}}>{cart}</Button>
            </Nav>
            <Form className="d-flex gap-2">
                <Form.Control type="search" className="me-2" onChange={(e)=>{setInput(e.target.value)}} />
                <Button variant="outline-success" onClick={()=>{dispatch(filterData(input))}}>Search</Button>
                <Button variant="outline-warning" onClick={()=>{dispatch(showAll())}}>ALL</Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
  );
}

export default Header;