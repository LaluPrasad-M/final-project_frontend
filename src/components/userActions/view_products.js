import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetch_products_, add_to_cart_ } from "../../redux/user";
import { Card, Button, CardGroup } from 'react-bootstrap';

const ProductsList = ({ products, fetch_products_list, add_to_cart }) => {
    const token = useSelector((state) => state.authentication.token);
    useEffect(() => {
        fetch_products_list();
    }, []);
    return (
        <CardGroup className="card-group">
            {
                products.map(product => (
                    <Card className="mx-3 my-3 card" style={{ border: "1px solid #0003",borderRadius:"8px", width: '18rem' }}>
                        <Link to={"/product/" + product._id}>
                            <Card.Img variant="top" src={product.productImage} />
                        </Link>
                        <Card.Body>
                            <Link to={"/product/" + product._id} style={{ textDecoration: "none",color:"#000" }}>
                                <Card.Title style={{ backgroundColor: "#4aa3" }}>{product.name}</Card.Title>
                                <hr />
                                <Card.Text className="plain-text-url">
                                    Price: {product.price}
                                </Card.Text>
                                <Card.Text>
                                    Category: {product.category}
                                </Card.Text>
                                <Card.Text>
                                    Quantity Available: {product.quantityAvailable}
                                </Card.Text>
                            </Link>
                            <hr />
                            <Button
                                onClick={() => add_to_cart(product._id, token)}
                                variant="primary">Add to Cart</Button>
                        </Card.Body>
                    </Card>
                ))
            }
        </CardGroup>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.user.products.length ? state.user.products : [],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_products_list: (query) => dispatch(fetch_products_(query)),
        add_to_cart: (product_id, token) => dispatch(add_to_cart_(product_id, token)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);

