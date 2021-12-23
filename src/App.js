import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { useState } from 'react';
import { Card } from 'react-bootstrap';

import UserLoginPage from "./components/userActions/login";
import UserRegisterPage from "./components/userActions/register"
import UserProductsPage from "./components/userActions/view_products";
import GetProductDetails from "./components/userActions/product_details";
import UpdateUserDetails from "./components/userActions/update_user_details";
import UserCartItems from "./components/userActions/cart_items";
import UserHeader from "./components/userActions/headers";
import UserFooter from "./components/userActions/footers";

import AdminLoginPage from "./components/adminActions/login";
import EditProductPage from "./components/adminActions/update_product_details";
import AdminProductPage from "./components/adminActions/view_products";
import AdminAddProduct from "./components/adminActions/add_product";
import GetUsersList from "./components/adminActions/users_list";
import AdminHeader from "./components/adminActions/headers";
import AdminFooter from "./components/adminActions/footers";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { userAutoLogin } from "./redux/authentication"
import cookie from 'js-cookie';


const LoadingScreen = () => (
  <div class='spinner'>
    <div class="cssload-loader">
      <div class="cssload-line"></div>
      <div class="cssload-line"></div>
      <div class="cssload-line"></div>
      <div class="cssload-line"></div>
      <div class="cssload-line"></div>
      <div class="cssload-line"></div>
      <div class="cssload-subline"></div>
      <div class="cssload-subline"></div>
      <div class="cssload-subline"></div>
      <div class="cssload-subline"></div>
      <div class="cssload-subline"></div>
      <div class="cssload-loader-circle-1"><div class="cssload-loader-circle-2"></div></div>
      <div class="cssload-needle"></div>
      <div class="cssload-loading">loading</div>
    </div>
  </div>
)

const AlertError = ({ alertError, setAlertError }) => (
  <div class='spinner' style={{ background: "#0009" }}>
    <Card style={{ width: "35vw", height: "30vh" }}>
      <Card.Body style={{ width: "100%" }}>
        <Card title style={{ border: "none" }}>Error!
          <button onClick={() => { setAlertError("") }} style={{ position: "absolute", right: "15px", fontWeight: "bold" }}>X</button>
        </Card>
        <hr />
        <Card.Text style={{ fontSize: '1.5rem', fontWeight: "500" }}>
          {alertError}
        </Card.Text>
      </Card.Body>
    </Card>
  </div>
)

function App({ loading, error, userAutoLogin }) {
  const [oldError, setOldError] = useState("");
  const [alertError, setAlertError] = useState("");
  if (oldError !== error) {
    setOldError(error)
    setAlertError(error)
    setTimeout(() => {
      setAlertError("")
    }, 3000)
  }
  userAutoLogin()
  return (
    <div className="App">
      {loading && <LoadingScreen />}
      {alertError && <AlertError alertError={alertError} setAlertError={setAlertError} />}
      <Router>
        {!cookie.get('x-access-token') ?
          <div className="forms">
            <Switch >
              <Route exact path="/" component={UserLoginPage} />
              <Route exact path="/register" component={UserRegisterPage} />

              <Route exact path="/admin" component={AdminLoginPage} />

              <Route path="*" component={() => <Redirect to="/" />} />
            </Switch>
          </div>
          :
          <div style={{ width: "100%" }}>
            <Switch>
              <Route path="/admin" component={AdminHeader} />
              <Route path="/" component={UserHeader} />
            </Switch>
            <Switch>
              <Route exact path="/" component={UserProductsPage} />
              <Route exact path="/update" component={UpdateUserDetails} />
              <Route exact path="/product/:id" component={GetProductDetails} />
              <Route exact path="/cart" component={UserCartItems} />

              <Route exact path="/admin" component={AdminProductPage} />
              <Route exact path="/admin/product/add" component={AdminAddProduct} />
              <Route exact path="/admin/product/:id/edit" component={EditProductPage} />
              <Route exact path="/admin/users" component={GetUsersList} />

              <Route path="*" component={() => <Redirect to="/" />} />
            </Switch>
          </div>
        }
        <Switch>
          <Route path="/admin" component={AdminFooter} />
          <Route path="/" component={UserFooter} />
        </Switch>
      </Router>
    </div >
  );
}

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading || state.admin.loading || state.authentication.loading,
    error: state.user.error || state.admin.error || state.authentication.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userAutoLogin: () => dispatch(userAutoLogin()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
