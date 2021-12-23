import { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, InputGroup, FormControl, Button } from 'react-bootstrap';

import { update_user_details_ } from "../../redux/user";


const UpdateUserDetails = ({ user, update_user_details }) => {
    const token = useSelector((state) => state.authentication.token);

    const [profile, setProfile] = useState(user)
    const emailHandler = (email) => {
        setProfile({
            ...profile, email
        })
    }
    const nameHandler = (name) => {
        setProfile({
            ...profile, name
        })
    }
    useEffect(() => {
        if (user.name && !profile.name) {
            setProfile(user)
        }
    }, [])

    return (
        <Card className='shadow' >
            <Card.Body>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Name</InputGroup.Text>
                    <FormControl
                        value={profile.name}
                        onChange={(value) => nameHandler(value.target.value)}
                    />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Email</InputGroup.Text>
                    <FormControl
                        value={profile.email}
                        onChange={(value) => emailHandler(value.target.value)}
                    />
                </InputGroup>
                <div className="d-grid gap-2">
                    <Button
                        onClick={() => update_user_details(token, profile)}
                        variant="primary"
                        disabled={!(profile.email && profile.name)}
                        size="lg">
                        UPDATE
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
};

const mapStateToProps = (state) => {
    return {
        user: state.authentication.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        update_user_details: (token, body) => dispatch(update_user_details_(token, body)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserDetails);

