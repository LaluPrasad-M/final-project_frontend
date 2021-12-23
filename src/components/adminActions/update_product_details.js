import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { connect, useSelector } from "react-redux";
import { Card, InputGroup, FormControl, Button, Figure, FloatingLabel } from 'react-bootstrap';

import { update_product_details_ } from "../../redux/admin";

const ProductsList = ({ update_product_details }) => {
    const token = useSelector((state) => state.authentication.token);
    let { id } = useParams();
    const [product, setProduct] = useState({})
    const setName = (name) => {
        setProduct({
            ...product,
            name
        })
    }
    const setPrice = (price) => {
        setProduct({
            ...product,
            price
        })
    }
    const setCategory = (category) => {
        setProduct({
            ...product,
            category
        })
    }
    const setProductImage = (productImage) => {
        setProduct({
            ...product,
            productImage
        })
    }
    const setQuantityAvailable = (quantityAvailable) => {
        setProduct({
            ...product,
            quantityAvailable
        })
    }
    const setDescription = (description) => {
        setProduct({
            ...product,
            description
        })
    }
    useEffect(() => {
        fetch("http://localhost:3030/product/" + id)
            .then((res) => res.json())
            .then((current_product) => { setProduct(current_product.data) }
            )
    }, [])
    return (
        <div className="forms">
            <Card className='shadow' style={{ width: '35vw' }}>
                <Figure.Image variant="top" src={product.productImage} />
                <hr />
                <Card.Body>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Product Name:</InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="Product Name"
                            value={product.name}
                            onChange={(value) => setName(value.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>price:</InputGroup.Text>
                        <FormControl
                            type="email"
                            placeholder="price"
                            value={product.price}
                            onChange={(value) => setPrice(value.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>category:</InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="category"
                            value={product.category}
                            onChange={(value) => setCategory(value.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>productImage:</InputGroup.Text>
                        <FormControl
                            type="email"
                            placeholder="productImage"
                            value={product.productImage}
                            onChange={(value) => setProductImage(value.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>quantity Available:</InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="quantityAvailable"
                            value={product.quantityAvailable}
                            onChange={(value) => setQuantityAvailable(value.target.value)}
                        />
                    </InputGroup>

                    <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
                        <FormControl
                            value={product.description}
                            onChange={(value) => setDescription(value.target.value)}
                        />
                    </FloatingLabel>
                </Card.Body>
                <Button
                    onClick={() => update_product_details(id, token, product)}
                    variant="primary"
                    size="lg">
                    UPDATE
                </Button>
            </Card >
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        update_product_details: (id, token, body) => dispatch(update_product_details_(id, token, body))
    };
};


export default connect(null, mapDispatchToProps)(ProductsList);

