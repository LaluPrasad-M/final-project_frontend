import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { fetch_products_list_, delete_product_ } from "../../redux/admin";
import { Card, Button, CardGroup } from 'react-bootstrap';
import { useHistory } from "react-router-dom";

const ProductsList = ({ products, delete_product, fetch_products_list }) => {
    const history = useHistory();
    const token = useSelector((state) => state.authentication.token);
    useEffect(() => {
        fetch_products_list();
    }, []);
    return (
        <CardGroup className="card-group">
            {
                products.map(product => (
                    <Card className="mx-3 my-3 card" style={{ border: "1px solid #0003", borderRadius: "8px", width: '18rem' }}>
                        <Card.Img variant="top" src={product.productImage} />
                        <Card.Body>
                            <Card.Title>{product.name}</Card.Title>
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
                            <hr />
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <Button
                                    onClick={() => history.push("admin/product/" + product._id + "/edit")}
                                    style={{ width: "35%", margin: "0 10px" }}
                                    variant="primary">EDIT</Button>
                                <Button
                                    style={{ width: "35%", margin: "0 10px" }}
                                    onClick={() => delete_product(product._id, token)}
                                    variant="primary">DELETE</Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))
            }
        </CardGroup>
    );
};

const mapStateToProps = (state) => {
    return {
        products: state.admin.products.length ? state.admin.products : [],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_products_list: (query) => dispatch(fetch_products_list_(query)),
        delete_product: (product_id, token) => dispatch(delete_product_(product_id, token))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);

