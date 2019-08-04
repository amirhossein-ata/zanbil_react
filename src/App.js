import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import Home from "./scripts/view/pages/home/Home";
import AllBusinessesPage from "./scripts/view/pages/business/AllBusinesses";
import ServicePage from "./scripts/view/pages/service/Service";
import Navbar from "./scripts/view/components/Navbar";
import Login from "./scripts/view/components/forms/LoginForm";
import Signup from "./scripts/view/components/forms/SignupForm";
import AddBusiness from "./scripts/view/pages/business/AddBusinessForm";
import BusinessDetailPage from "./scripts/view/pages/business/BusinessDetails";

export const PrivateRoute = ({ component: Component, auth, ...rest }) => (
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
class App extends React.Component {
  render() {
    const { dispatch, auth, history, match } = this.props;
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
            <Route
              path="/business"
              component={() => <AllBusinessesPage history={history} />}
              auth={auth}
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
              auth={auth}
            />
            <PrivateRoute
              path="/business_detail/:businessID"
              auth={auth}
              component={() => (
                <BusinessDetailPage dispatch={dispatch} auth={auth} />
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
