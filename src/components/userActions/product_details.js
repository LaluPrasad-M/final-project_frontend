import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { connect, useSelector } from "react-redux";
import { Button, Figure, Table } from 'react-bootstrap';

import { fetch_product_details_, like_unlike_a_product_, add_to_cart_ } from "../../redux/user";

import AddReview from "./add_review";

const ProductsList = ({ user_id, product, fetch_product_details, like_unlike_a_product, add_to_cart }) => {
    const token = useSelector((state) => state.authentication.token);
    let { id } = useParams();

    useEffect(() => {
        fetch_product_details(id);
    }, []);

    return (
        <div>

            <Figure.Image variant="top" src={product.productImage} />
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
                        <td><span className="text-title">{product.likes && product.likes.length}</span></td>
                    </tr>
                    <tr>
                        <td> Description: </td>
                        <td><span className="text-title">{product.description}</span></td>
                    </tr>
                </tbody>
            </Table>

            <Button
                style={{width:"200px", margin:"0 10px"}}
                onClick={() => { like_unlike_a_product(product._id, token) }}
                variant="primary"
            >{product.likes && product.likes.includes(user_id) ?
                "Unlike" : "Like"
                }
            </Button>
            <Button
                style={{width:"200px", margin:"0 10px"}}
                onClick={() => add_to_cart(product._id, token)}
                variant="primary">Add to Cart</Button>
            <br /><hr size="5" />

            <div className="comment-heading">
                Review section
            </div>
            <br />

            <AddReview product_id={product._id} />

            <div>
                {product.reviews && product.reviews.map(review => (
                    <div className="comment">
                        <span style={{ color: "darkblue", fontWeight: "bold" }}>{review.user.name}: </span>
                        {review.review}
                    </div>
                ))}
            </div>
        </div >
    );
};

const mapStateToProps = (state) => {
    return {
        user_id: state.authentication.user._id,
        product: state.user.current_product.data ? state.user.current_product.data : {},
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_product_details: (id) => dispatch(fetch_product_details_(id)),
        like_unlike_a_product: (id, token) => dispatch(like_unlike_a_product_(id, token)),
        add_to_cart: (product_id, token) => dispatch(add_to_cart_(product_id, token)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);

