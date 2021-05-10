import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Actions as UserActions } from "../../redux/reducers/UserReducer";
import { Actions as RoleActions } from "../../redux/reducers/RoleReducer";
import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";
import MessageAlert from "../views/MessageAlert";
import {
  CForm,
  CFormGroup,
  CLabel,
  CInput,
  CCardFooter,
  CButton,
  CSelect,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const User = ({ match }) => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.users.message);
  const currentUser = useSelector((state) => state.users.selectedItem);
  const roles = useSelector((state) => state.roles.data);
  const [itemID, setItemID] = useState(-1);
  const [user, setUser] = useState({ roleId: 2 });
  const [show, setShow] = useState(false);
  const error = useSelector((state) => state.users.error);
  const [cpassError, setCPassError] = useState(false);

  const status = [
    { id: 0, name: "Enable" },
    { id: 1, name: "Disable" },
  ];

  useEffect(() => {
    if (match.params.id === undefined) {
      setItemID(-1);
    } else {
      setItemID(match.params.id);
    }
  }, [match.params.id]);

  useEffect(() => {
    if (itemID > -1) {
      dispatch(UserActions.get(match.params.id));
    } else {
      dispatch(UserActions.clearItem());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemID]);

  useEffect(() => {
    if (message != null) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [message]);

  useEffect(() => {
    if (currentUser != null) {
      setUser(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    dispatch(RoleActions.getAll());
    return () => {
      dispatch(UserActions.clearItem());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (evt) => {
    const value = evt.target.value;
    const editUser = { ...user, [evt.target.name]: value };
    setUser(editUser);
  };

  const reset = (evt) => {
    setUser(currentUser);
  };

  const saveUser = (evt) => {
    if (user.password !== user.cpassword) {
      setCPassError(true);
      return;
    }
    const { cpassword, ..._user } = user;
    if (itemID > -1) {
      dispatch(UserActions.update({ user: _user }));
    } else {
      dispatch(UserActions.create({ user: _user }));
    }
  };

  const messageView = () => {
    return (
      <MessageAlert
        isShow={show}
        title="User"
        message={message}
        error={error}
        onCancel={() => {
          setShow(false);
          dispatch(RoleActions.clearMessage());
        }}
        onOk={() => {
          setShow(false);
          if (error == null || error === undefined) {
            dispatch(RoleActions.clearItem());
          }
        }}
      />
    );
  };

  return (
    <CRow>
      {messageView()}
      <CCol lg={8}>
        <CCard>
          <CCardHeader>User id {match.params.id}</CCardHeader>
          <CCardBody>
            <CForm
              action=""
              method="post"
              encType="multipart/form-data"
              className="form-horizontal"
            >
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Username</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    type="username"
                    id="username"
                    name="username"
                    autoComplete="username"
                    value={user.username}
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel
                    htmlFor="email-input"
                    color="red"
                    class={cpassError ? "text-danger" : ""}
                  >
                    Password
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    type="password"
                    id="password"
                    name="password"
                    autoComplete="password"
                    placeholder="leave blank if you don't want to change it"
                    value={user.password}
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel
                    htmlFor="email-input"
                    class={cpassError ? "text-danger" : ""}
                  >
                    Confirm password
                  </CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    autoComplete="password"
                    placeholder="leave blank if you don't want to change it"
                    value={user.cpassword}
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="email-input">Email</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    type="email"
                    id="email"
                    name="email"
                    autoComplete="email"
                    value={user.email}
                    onChange={handleChange}
                  />
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Status</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect
                    custom
                    name="status"
                    id="status"
                    value={user.status}
                    onChange={handleChange}
                  >
                    {status.map((st) => (
                      <option key={st.id} value={st.id}>
                        {st.name}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
              </CFormGroup>
              <CFormGroup row>
                <CCol md="3">
                  <CLabel htmlFor="select">Role</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect
                    custom
                    name="roleId"
                    id="roleId"
                    value={user.roleId}
                    onChange={handleChange}
                  >
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.name}
                      </option>
                    ))}
                  </CSelect>
                </CCol>
              </CFormGroup>
            </CForm>
          </CCardBody>
          <CCardFooter align="right">
            <CButton type="submit" size="sm" color="success" onClick={saveUser}>
              <CIcon name="cil-scrubber" /> Save
            </CButton>{" "}
            <CButton type="reset" size="sm" color="danger" onClick={reset}>
              <CIcon name="cil-ban" /> Reset
            </CButton>
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default User;
