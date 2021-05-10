// combineReducers come from redux that used for combining reducers that we just made.
import { combineReducers } from "redux";

// Reducers
import users from "./UserReducer";
import roles from "./RoleReducer";
import slide from "./SlideReducers";

export default combineReducers({
  users,
  slide,
  roles
});
