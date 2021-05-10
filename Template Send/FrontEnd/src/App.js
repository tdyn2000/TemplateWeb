import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "./context/auth";
import PrivateRoute from "./PrivateRoute";
import Home from "./containers/MainLayout";
import Login from "./pages/Login";
import { getToken } from "./api/Api";
import "./scss/style.scss";

function App(props) {
  const [authTokens, setAuthTokens] = useState();

  const setToken = (data) => {
    localStorage.setItem("token", JSON.stringify(data));
    setAuthTokens(data);
  };

  useEffect(() => {
    const token = getToken();
    if (token) {
      setToken(token);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setToken }}>
      <Router>
        <Switch>
          <Route path="/SignIn" component={Login} />
          <PrivateRoute path="/" component={Home} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
