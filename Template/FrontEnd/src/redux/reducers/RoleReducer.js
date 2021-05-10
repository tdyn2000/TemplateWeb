export const Types = {
  CLEAR_ITEM: "ROLE/CLEAR_ITEM",
  CLEAR_MESSAGE: "ROLE/CLEAR_MESSAGE",

  CREATE_REQUEST: "ROLE/CREATE_REQUEST",
  CREATE_SUCCESS: "ROLE/CREATE_SUCCESS",
  CREATE_FAILURE: "ROLE/CREATE_FAILURE",

  GET_ALL_REQUEST: "ROLE/GET_ALL_REQUEST",
  GET_ALL_SUCCESS: "ROLE/GET_ALL_SUCCESS",
  GET_ALL_FAILURE: "ROLE/GET_ALL_FAILURE",

  UPDATE_REQUEST: "ROLE/UPDATE_REQUEST",
  UPDATE_REQUEST_SUCCESS: "ROLE/UPDATE_REQUEST_SUCCESS",
  UPDATE_REQUEST_FAILURE: "ROLE/UPDATE_REQUEST_FAILURE",

  DELETE_REQUEST: "ROLE/DELETE_REQUEST",
  DELETE_REQUEST_SUCCESS: "ROLE/DELETE_REQUEST_SUCCESS",
  DELET_REQUEST_FAILURE: "ROLE/DELET_REQUEST_FAILURE",

  GET_ITEM: "ROLE/GET_ITEM",
  GET_ITEM_SUCCESS: "ROLE/GET_ITEM_SUCCESS",
  GET_ITEM_FAILURE: "ROLE/GET_ITEM_FAILURE",
};

// Define your state here
const initialState = {
  message: null,
  error: null,
  data: [],
  selectedItem: null,
};

export const Actions = {
  clearItem: () => ({
    type: Types.CLEAR_ITEM,
  }),

  clearMessage: () => ({
    type: Types.CLEAR_MESSAGE,
  }),

  create: (item) => ({
    type: Types.CREATE_REQUEST,
    payload: item,
  }),

  createSuccess: (item) => ({
    type: Types.CREATE_SUCCESS,
    payload: { message: "Create Role successfully.", item },
  }),

  createFailure: (err) => ({
    type: Types.CREATE_FAILURE,
    payload: { message: err, error: err },
  }),

  getAll: () => ({
    type: Types.GET_ALL_REQUEST,
  }),

  getAllSuccess: (items) => ({
    type: Types.GET_ALL_SUCCESS,
    payload: { items },
  }),

  getAllFailure: (err) => ({
    type: Types.GET_ALL_FAILURE,
    payload: {
      message: err,
      error: err,
    },
  }),

  update: (item) => ({
    type: Types.UPDATE_REQUEST,
    payload: item,
  }),

  updateSuccess: (item) => ({
    type: Types.UPDATE_REQUEST_SUCCESS,
    payload: { message: "Update Role successfully.", item },
  }),

  updateFailure: (err) => ({
    type: Types.UPDATE_REQUEST_FAILURE,
    payload: { message: err, error: err },
  }),

  delete: (id) => ({
    type: Types.DELETE_REQUEST,
    payload: { id },
  }),

  deleteSuccess: (id) => ({
    type: Types.DELETE_REQUEST_SUCCESS,
    payload: { message: "Delete Role successfully.", id },
  }),

  deleteFailure: (err) => ({
    type: Types.DELET_REQUEST_FAILURE,
    payload: { message: err, error: err },
  }),

  get: (id) => ({
    type: Types.GET_ITEM,
    payload: { id },
  }),

  getSuccess: (item) => ({
    type: Types.GET_ITEM_SUCCESS,
    payload: { item },
  }),

  getFailure: (err) => ({
    type: Types.GET_ITEM_FAILURE,
    payload: { message: err, error: err },
  }),
};

export default (state = initialState, { payload, type }) => {
  switch (type) {
    case Types.CLEAR_ITEM:
      return {
        ...initialState,
      };

    case Types.CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.CREATE_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.CREATE_SUCCESS:
      return {
        ...state,
        message: payload.message,
        data: [payload.item, ...state.data],
        selectedItem: payload.item,
      };

    case Types.CREATE_FAILURE:
      return {
        ...state,
        error: payload.error,
        message: payload.message,
      };

    case Types.GET_ALL_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.GET_ALL_SUCCESS:
      return {
        ...state,
        data: [...payload.items],
      };

    case Types.GET_ALL_FAILURE:
      return {
        ...state,
        error: payload.error,
        message: payload.error,
      };

    case Types.UPDATE_REQUEST:
      return {
        ...state,
        message: null,
        error: null,
      };

    case Types.UPDATE_REQUEST_SUCCESS:
      return {
        ...state,
        message: payload.message,
        data: state.data.map((item) =>
          item.id === payload.item.id ? payload.item : item
        ),
        selectedItem: payload.item,
      };

    case Types.UPDATE_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
        message: payload.message,
      };

    case Types.DELETE_REQUEST:
      return {
        ...state,
        message: null,
        error: "warning",
      };

    case Types.DELETE_REQUEST_SUCCESS:
      return {
        ...state,
        message: payload.message,
        error: null,
        data: state.data.filter((item) => item.id !== payload.id),
      };

    case Types.DELET_REQUEST_FAILURE:
      return {
        ...state,
        error: payload.error,
        message: payload.message,
      };
    case Types.GET_ITEM:
      return {
        ...state,
        message: null,
        error: null,
        selectedItem: {},
      };

    case Types.GET_ITEM_SUCCESS:
      return {
        ...state,
        message: null,
        selectedItem: payload.item,
      };

    case Types.GET_ITEM_FAILURE:
      return {
        ...state,
        error: payload.error,
        message: payload.message,
      };
    default:
      return state;
  }
};
