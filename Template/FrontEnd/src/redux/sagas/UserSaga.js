// Import the redux-saga/effects
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";

import {
  Actions as UserActions,
  Types as UserTypes,
} from "../reducers/UserReducer";
import * as UserAPI from "../../api/UserApi";

function* getAll() {
  try {
    const items = yield call(UserAPI.getAllUsers);
    yield put(UserActions.getAllSuccess(items));
  } catch (err) {
    yield put(UserActions.getAllFailure(err.message));
  }
}

function* updateItem({ payload }) {
  try {
    const user = yield call(UserAPI.updateUser, payload);
    yield put(UserActions.updateSuccess(user));
  } catch (err) {
    yield put(UserActions.updateFailure(err.message));
  }
}

function* createItem({ payload }) {
  try {
    const user = yield call(UserAPI.createUser, payload);
    yield put(UserActions.createSuccess(user));
  } catch (err) {
    yield put(UserActions.createFailure(err.message));
  }
}

function* deleteItem({ payload }) {
  try {
    yield call(UserAPI.deleteUser, payload.id);
    yield put(UserActions.deleteSuccess(payload.id));
  } catch (err) {
    yield put(UserActions.deleteFailure(err.message));
  }
}

function* getItem({ payload }) {
  try {
    var user = yield call(UserAPI.getUserById, payload.id);
    yield put(UserActions.getSuccess(user));
  } catch (err) {
    yield put(UserActions.getFailure(err.message));
  }
}

// Export the saga (todo-saga)
export default function* userSaga() {
  yield takeLatest(UserTypes.GET_ALL_REQUEST, getAll);
  yield takeLatest(UserTypes.GET_ITEM, getItem);
  yield takeLatest(UserTypes.CREATE_REQUEST, createItem);
  yield takeEvery(UserTypes.UPDATE_REQUEST, updateItem);
  yield takeEvery(UserTypes.DELETE_REQUEST, deleteItem);
}
