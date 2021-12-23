import { connect } from "react-redux";
import { Navbar, Nav, Container } from "react-bootstrap";
import { logout_ } from "../../redux/authentication";

const Header = ({ logout }) => {
    return (
        <Navbar bg="info" text="dark" sticky="top">
            <Container>
                {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                <Nav className="me-auto">
                    <Nav.Link href="/">View All Products</Nav.Link>
                    <Nav.Link href="/cart">Cart</Nav.Link>
                    <Nav.Link href="/update">Update Profile</Nav.Link>
                </Nav>
                <Nav className="my-auto">
                    <Nav.Link onClick={() => { logout() }}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar >
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout_()),
    };
};

export default connect(null, mapDispatchToProps)(Header);