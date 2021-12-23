import { connect } from "react-redux";
import { Navbar, Nav, Container } from "react-bootstrap";
import { logout_ } from "../../redux/authentication";

const Header = ({ logout }) => {
    return (
        <Navbar bg="info" text="dark" sticky="top">
            <Container>
                {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
                <Nav className="me-auto">
                    <Nav.Link href="/admin">View All Products</Nav.Link>
                    <Nav.Link href="/admin/product/add">Add new Product</Nav.Link>
                    <Nav.Link href="/admin/users">View All Users</Nav.Link>
                </Nav>
                <Nav className="my-auto">
                    <Nav.Link onClick={() => { logout() }}>Logout</Nav.Link>
                </Nav>
            </Container>
        </Navbar >
        // <div>
        //     <Link to={"/admin"}>
        //         <h2>View All Products</h2>
        //     </Link>

        //     <Link to={"/admin/product/add"}>
        //         <h2>Add new Product</h2>
        //     </Link>

        //     <Link to={"/admin/users"}>
        //         <h2>View All Users</h2>
        //     </Link>

        //     <Link to="/admin" onClick={() => { window.location.reload() }}>
        //         <h2>Logout</h2>
        //     </Link>
        //     <hr />
        // </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout_()),
    };
};

export default connect(null, mapDispatchToProps)(Header);