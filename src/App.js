import React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./scripts/view/pages/home/Home";
import BusinessPage from "./scripts/view/pages/business/Business";
import ServicePage from "./scripts/view/pages/service/Service";
import Navbar from "./scripts/view/components/Navbar";

class App extends React.Component {
  render() {
    const { dispatch } = this.props;
    return (
      <div>
        <Navbar />
        <div>
          <Switch>
            <Route
              exact
              path="/"
              component={() => <Home dispatch={dispatch} />}
            />
            <Route
              path="/business"
              component={() => <BusinessPage dispatch={dispatch} />}
            />
            <Route
              path="/service"
              component={() => <ServicePage dispatch={dispatch} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default connect()(App);
