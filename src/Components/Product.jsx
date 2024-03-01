import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";
import { Button } from 'react-bootstrap/esm';
import { useDispatch } from 'react-redux';
import { AddCart } from '../ReduxApp/ProductSlice';

function Product(props) {
    let [img, setImg] = useState(null);
    let { productData } = props;
    let navigate = useNavigate();
    let dispatch = useDispatch()
    useEffect(() => {
        if (!productData || !productData.images || productData.images.length === 0) {
          navigate('/');
        }
      }, [productData, navigate]);

    if (!productData) {
        return null;
    }

    const getStart = (r) => {
        let star = [];
        for (let i = 0; i < Math.floor(r); i++) {
          star.push(<FaStar key={i} />);
        }
        return star;
      }
    return (
        <div>
            <Container>
                <Row className='justify-content-center align-items-center vh-100'>
                    <Col md={2}>
                        {productData.images && productData.images.map((ele, ind) => (
                            <img key={ind} className='my-2' src={ele} width={'100%'} onClick={()=>{setImg(ele)}} style={{maxHeight:'100px',objectFit:'contain'}} />
                        ))}
                    </Col>
                    <Col md={5}>
                        <div className="ProductImgCover">
                            <img src={img ? img : productData.thumbnail} width={'100%'} alt="Product" style={{maxHeight:'400px'}} />
                        </div>
                    </Col>
                    <Col md={5}>
                    <div className="title">
                        <h4>{productData.brand}</h4>
                        <h2 className='fw-bolder'>{productData.title}</h2>
                    </div>
                    <div className="fs-5 ">
                        <span>{productData.description}</span>
                    </div>
                    <h5>${productData.price}</h5>
                    <p className='text-warning fs-4 mb-1'>{getStart(productData.rating)}</p>
                    <span className='text-success fw-bolder px-1 rounded-1 Off'>{productData.discountPercentage}% OFF</span>
                    <p className='fs-5 fw-bold '>{productData.stock} Items Left</p>
                    <div className="d-flex justify-content-evenly">
                        <Button variant='warning' className='fw-bolder' size='lg' onClick={()=>{dispatch(AddCart(productData))}}>ADD TO CART</Button>
                        <Button variant='warning' className='fw-bolder' size='lg' as={Link} to='/Cart'>GO TO CART</Button>
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
export default Product;