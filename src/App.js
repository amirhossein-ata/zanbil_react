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
import ProfilePage from "./scripts/view/pages/profile/Profile";

export const PrivateRoute = ({
  component: Component,
  dispatch,
  history,
  auth,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      auth && auth.isAuthenticated === true ? (
        <div>
          <Navbar dispatch={dispatch} history={history} auth={auth} />
          <Component {...props} />
        </div>
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
class App extends React.Component {
  render() {
    const { dispatch, auth, history } = this.props;
    return (
      <div>
        <div>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Home dispatch={dispatch} />}
            />
            <PrivateRoute
              path="/business"
              component={() => <AllBusinessesPage history={history} />}
              auth={auth}
              dispatch={dispatch}
              history={history}
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
              dispatch={dispatch}
              history={history}
            />
            <PrivateRoute
              path="/business_detail/:businessID"
              component={() => (
                <BusinessDetailPage dispatch={dispatch} auth={auth} />
              )}
              auth={auth}
              dispatch={dispatch}
              history={history}
            />
            <PrivateRoute
              path="/service/:serviceID"
              component={() => <ServicePage dispatch={dispatch} auth={auth} />}
              auth={auth}
              dispatch={dispatch}
              history={history}
            />
            <PrivateRoute
              path="/profile"
              component={() => <ProfilePage dispatch={dispatch} auth={auth} />}
              auth={auth}
              dispatch={dispatch}
              history={history}
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
