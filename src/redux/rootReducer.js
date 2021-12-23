import { combineReducers } from "redux";

import { authenticationReducer } from "./authentication/authentication-reducer";
import userReducer from "./user/user-reducer";
import adminReducer from "./admin/admin-reducer";

const rootReducer = combineReducers({
  authentication: authenticationReducer,
  user: userReducer,
  admin: adminReducer
});

export default rootReducer;
