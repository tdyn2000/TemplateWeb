// Import the redux-saga/effects
import { put, call, takeLatest, takeEvery } from "redux-saga/effects";

import {
  Actions as RoleActions,
  Types as RoleTypes,
} from "../reducers/RoleReducer";
import * as RoleAPI from "../../api/RoleApi";

function* getAll() {
  try {
    const items = yield call(RoleAPI.getRoles);
    yield put(RoleActions.getAllSuccess(items));
  } catch (err) {
    yield put(RoleActions.getAllFailure(err.message));
  }
}

function* createItem({ payload }) {
  try {
    const role = yield call(RoleAPI.createRole, payload);
    yield put(RoleActions.createSuccess(role));
  } catch (err) {
    yield put(RoleActions.createFailure(err.message));
  }
}

function* updateItem({ payload }) {
  try {
    const user = yield call(RoleAPI.updateRole, payload);
    yield put(RoleActions.updateSuccess(user));
  } catch (err) {
    yield put(RoleActions.updateFailure(err.message));
  }
}

function* deleteItem({ payload }) {
  try {
    yield call(RoleAPI.deleteRole, payload.id);
    yield put(RoleActions.deleteSuccess(payload.id));
  } catch (err) {
    yield put(RoleActions.deleteFailure(err.message));
  }
}

function* getItem({ payload }) {
  try {
    var role = yield call(RoleAPI.getRoleById, payload.id);
    yield put(RoleActions.getSuccess(role));
  } catch (err) {
    yield put(RoleActions.getFailure(err.message));
  }
}

// Export the saga (todo-saga)
export default function* roleSaga() {
  yield takeLatest(RoleTypes.GET_ALL_REQUEST, getAll);
  yield takeLatest(RoleTypes.GET_ITEM, getItem);
  yield takeEvery(RoleTypes.UPDATE_REQUEST, updateItem);
  yield takeEvery(RoleTypes.CREATE_REQUEST, createItem);
  yield takeEvery(RoleTypes.DELETE_REQUEST, deleteItem);
}
