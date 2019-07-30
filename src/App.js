import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import Home from "./scripts/view/pages/home/Home";
import BusinessPage from "./scripts/view/pages/business/Business";
import ServicePage from "./scripts/view/pages/service/Service";
import Navbar from "./scripts/view/components/Navbar";
import Login from "./scripts/view/components/forms/LoginForm";
import Signup from "./scripts/view/components/forms/SignupForm";
import AddBusiness from "./scripts/view/pages/business/AddBusinessForm";

class App extends React.Component {
  render() {
    const { dispatch, auth, history } = this.props;

    const PrivateRoute = ({ component: Component, ...rest }) => (
      <Route
        {...rest}
        render={props =>
          auth && auth.isAuthenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
    return (
      <div>
        <Navbar dispatch={dispatch} history={history} auth={auth} />
        <div>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Home dispatch={dispatch} />}
            />
            <Route
              path="/login"
              component={() => (
                <Login dispatch={dispatch} history={history} auth={auth} />
              )}
            />
            <Route
              path="/signup"
              component={() => (
                <Signup dispatch={dispatch} history={history} auth={auth} />
              )}
            />
            <PrivateRoute
              path="/business"
              component={() => <BusinessPage history={history} />}
            />
            <PrivateRoute
              path="/service"
              component={() => <ServicePage dispatch={dispatch} />}
            />
            <PrivateRoute
              path="/add_business"
              component={() => (
                <AddBusiness
                  dispatch={dispatch}
                  history={history}
                  auth={auth}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapDispatchToProps)(withRouter(App));
