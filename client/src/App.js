import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useParams
} from "react-router-dom";
import queryString from "query-string";
import Join from "./components/Join/Join";
import Chat from "./components/Chat/Chat";
import Home from "./components/Home";

const App = props => {
  const [auth, setAuth] = useState(false);

  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route
        path="/Join"
        exact
        render={props => <Join {...props} setAuth={setAuth} />}
      />
      <PrivateRoute
        path="/chat"
        auth={auth}
        component={Chat}
        setAuth={setAuth}
      />
    </Router>
  );
};

const PrivateRoute = props => {
  console.log(props);
  return (
    <Route
      path={props.path}
      render={renderProps =>
        props.auth ? (
          <props.component {...renderProps} setAuth={props.setAuth} />
        ) : (
          <Redirect
            to={{
              pathname: "/Join",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

export default App;
