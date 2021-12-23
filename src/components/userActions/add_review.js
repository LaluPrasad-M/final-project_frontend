import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { add_review_ } from "../../redux/user";
import { InputGroup, FormControl, Button } from 'react-bootstrap';

const ProductsList = ({ product_id, add_review }) => {
    const token = useSelector((state) => state.authentication.token);
    const [review, setReview] = useState('');

    return (
        <InputGroup className="mb-3">
            <FormControl
                value={review}
                placeholder="comment me"
                onChange={(val) => { setReview(val.target.value) }}
            />
            <Button
                onClick={() => { add_review(product_id, token, review) || setReview("") }}>
                Add Review
            </Button>
        </InputGroup>

    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        add_review: (product_id, token, review) => dispatch(add_review_(product_id, token, review)),
    };
};


export default connect(null, mapDispatchToProps)(ProductsList);

