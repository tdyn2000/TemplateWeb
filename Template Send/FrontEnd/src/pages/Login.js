import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../context/auth";
import { login } from "../api/UserApi";

import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CAlert,
} from "@coreui/react";

import { freeSet } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const Login = (props) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthTokens, authTokens } = useAuth();
  const referer = props.location.state ? props.location.state.referer : "/";

  function postLogin() {
    login({ username, password })
      .then((user) => {
        setAuthTokens(user.token);
        setLoggedIn(true);
      })
      .catch((e) => {
        setIsError(true);
      });
  }

  const onKeyPress = (target) => {
    if (target.charCode === 13) {
      postLogin();
    }
  };

  if (isLoggedIn) {
    return <Redirect to={referer} />;
  }
  if (authTokens) {
    return <Redirect to={referer} />;
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="5">
            <CCardGroup>
              <CCard className="text-center mx-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" content={freeSet.cilUser} />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={(e) => {
                          setUserName(e.target.value);
                        }}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon
                            name="cil-lock-locked"
                            content={freeSet.cilLockLocked}
                          />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onKeyPress={onKeyPress}
                        onChange={(e) => {
                          setPassword(e.target.value);
                        }}
                      />
                    </CInputGroup>
                    <CButton
                      color="primary"
                      size="lg"
                      block
                      onClick={postLogin}
                    >
                      Login
                    </CButton>
                    <p></p>
                    {isError && (
                      <CAlert color="danger">
                        The username or password provided were incorrect!&nbsp;
                      </CAlert>
                    )}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
