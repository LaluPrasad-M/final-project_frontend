import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetch_cart_items_, remove_from_cart_ } from "../../redux/user";
import { Card, Button, Table } from 'react-bootstrap';

const ProductsList = ({ products, fetch_cart_items, remove_from_cart }) => {
    const history = useHistory();
    const token = useSelector((state) => state.authentication.token);

    useEffect(() => {
        fetch_cart_items(token);
    }, []);
    return (
        <div>
            {
                products.map(product => (
                    <div>
                        <Card className="mx-3 my-3" style={{ width: '100%' }}>
                            <div style={{ display: "flex", flexDirection: "row" }}>
                                <Card.Img variant="top" style={{ width: "40%", maxWidth: "600px" }} src={product.productImage} />
                                <Card.Body>
                                    <hr />
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Name: </th>
                                                <th>{product.name}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td> Price: </td>
                                                <td><span className="text-title">Rs. {product.price}</span></td>
                                            </tr>
                                            <tr>
                                                <td> Category: </td>
                                                <td><span className="text-title">{product.category}</span></td>
                                            </tr>
                                            <tr>
                                                <td>Quantity Available: </td>
                                                <td><span className="text-title">{product.quantityAvailable}</span></td>
                                            </tr>
                                            <tr>
                                                <td>Likes: </td>
                                                <td><span className="text-title">{product.likes.length}</span></td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                        <Button
                                            style={{ width: "35%", margin: "0 10px" }}
                                            onClick={() => history.push("/product/" + product._id)}
                                            variant="primary">View More Details</Button>
                                        <Button variant="outline-danger" style={{ width: "40%" }} onClick={() => { remove_from_cart(product._id, token) }}>Remove from Cart</Button>
                                    </div>
                                </Card.Body>
                            </div>
                        </Card>
                        <hr size="6" />
                    </div>
                ))
            }
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.user.cart_items,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_cart_items: (token) => dispatch(fetch_cart_items_(token)),
        remove_from_cart: (product_id, token) => dispatch(remove_from_cart_(product_id, token))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);

