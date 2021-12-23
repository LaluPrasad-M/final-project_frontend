import { useState } from "react";
import { Link } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { add_product_ } from "../../redux/admin";
import { Card, InputGroup, FormControl, Button, FloatingLabel } from 'react-bootstrap';


const ProductsList = ({ add_product }) => {
    const token = useSelector((state) => state.authentication.token);

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [productImage, setProductImage] = useState("");
    const [quantityAvailable, setQuantityAvailable] = useState("");
    const [description, setDescription] = useState("");

    const addItem = () => {
        add_product(token, {
            name: name,
            price: price,
            category: category,
            productImage: productImage,
            quantityAvailable: quantityAvailable,
            description: description,
        })
    }
    return (
        <div className="forms">

            <Card className='shadow' style={{ width: '35vw' }}>
                <Card.Body>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>Product Name:</InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="Product Name"
                            value={name}
                            onChange={(value) => setName(value.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>price:</InputGroup.Text>
                        <FormControl
                            type="email"
                            placeholder="price"
                            value={price}
                            onChange={(value) => setPrice(value.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>category:</InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="category"
                            value={category}
                            onChange={(value) => setCategory(value.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>productImage:</InputGroup.Text>
                        <FormControl
                            type="email"
                            placeholder="productImage"
                            value={productImage}
                            onChange={(value) => setProductImage(value.target.value)}
                        />
                    </InputGroup>

                    <InputGroup className="mb-3">
                        <InputGroup.Text>quantity Available:</InputGroup.Text>
                        <FormControl
                            type="text"
                            placeholder="quantityAvailable"
                            value={quantityAvailable}
                            onChange={(value) => setQuantityAvailable(value.target.value)}
                        />
                    </InputGroup>

                    <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
                        <FormControl
                            value={description}
                            onChange={(value) => setDescription(value.target.value)}
                        />
                    </FloatingLabel>

                    <Link to={"/admin/"}>
                        <Button
                            onClick={() => { addItem() }}
                            variant="primary"
                            disabled={!(name && price)}
                            style={{ width: "100%" }}
                            size="lg">
                            Add
                        </Button>
                    </Link>
                </Card.Body>
            </Card >
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        add_product: (token, body) => dispatch(add_product_(token, body)),
    };
};


export default connect(null, mapDispatchToProps)(ProductsList);

