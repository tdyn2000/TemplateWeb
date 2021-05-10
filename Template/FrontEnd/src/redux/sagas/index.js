import { spawn } from "redux-saga/effects";

// Sagas
import userSaga from "./UserSaga";
import roleSaga from "./RoleSaga";

// Export the root saga
export default function* rootSaga() {
  yield spawn(userSaga);
  yield spawn(roleSaga);
}
