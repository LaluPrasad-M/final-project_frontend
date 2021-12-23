import { useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { fetch_users_, block_unblock_user_ } from "../../redux/admin";
import { Table } from 'react-bootstrap';

const ProductsList = ({ users, block_unblock_user, fetch_users }) => {
    const token = useSelector((state) => state.authentication.token);
    useEffect(() => {
        fetch_users(token);
    }, []);
    return (
        <Table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>created</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {users.map(user =>
                    <tr>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.created).toLocaleString()}</td>
                        <td>
                            <button onClick={() => { block_unblock_user(user._id, token) }}>
                                {user.isBlocked ? "UnBlock" : "Block"}
                            </button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
};

const mapStateToProps = (state) => {
    return {
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_users: (token) => dispatch(fetch_users_(token)),
        block_unblock_user: (user_id, token) => dispatch(block_unblock_user_(user_id, token)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProductsList);

