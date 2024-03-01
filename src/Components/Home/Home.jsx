import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddCart, GetCate, GetData, SetData } from '../../ReduxApp/ProductSlice';
import { Col, Container, ListGroup, Row,Button } from 'react-bootstrap';
import { FaStar } from "react-icons/fa";
import './Home.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

function Home(props) {
  let dispatch = useDispatch();
  let data = useSelector(state => state.Data.value);
  let cateArr = useSelector(state => state.Data.cateArr);

  useEffect(() => {
    dispatch(GetData());
    dispatch(GetCate());
  }, []);

  const getStart = (r) => {
    let star = [];
    for (let i = 0; i < Math.floor(r); i++) {
      star.push(<FaStar key={i} />);
    }
    return star;
  }

  return (
    <div>
      <Container fluid>
       {data.length > 0 ?  <Row>
          <Col sm={3} className='position-relative'>
            <ListGroup variant='flush' className='d-sm-block d-none position-fixed'>
              {cateArr.map((ele, ind) => (
                <ListGroup.Item key={ind} variant='info' action>
                  {ele}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <Col sm={8}>
            {data.map((ele, ind) => (
              <Link to='/Product' key={ind} onClick={()=>{props.setData(ele)}} className='text-dark text-decoration-none'>
                <Row className='d-block d-sm-flex my-4 boxShadow'>
                  <Col md={4} className='ImgCover'>
                    <img src={ele.thumbnail} alt="Amazon.in" width={'100%'} height={'250px'} className='object-fit-contain ListImg' />
                  </Col>
                  <Col md={8} className='py-3'>
                    <h5>{ele.brand}</h5>
                    <h4 className='fw-bold'>{ele.title}</h4>
                    <p className='mb-0'>{ele.description}</p>
                    <p className='text-warning mb-1'>{getStart(ele.rating)}</p>
                    <p className='mb-0'> $<span className='fw-bold fs-4'>{ele.price}</span></p>
                    <div className="d-flex align-items-center  justify-content-between">
                    <span className='fw-bolder text-success Off px-1 rounded-1'>{ele.discountPercentage}% OFF</span>
                    <Button variant='warning' className='fw-bolder' onClick={()=>{dispatch(AddCart(ele))}}>ADD TO CART</Button>
                    </div>
                  </Col>
                </Row>
              </Link>
            ))}
          </Col>
        </Row> : <Loader/>}
      </Container>
    </div>
  );
}

export default Home;
