import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import Callback from "./components/Callback";
import NotLoggedIn from "./components/NotLoggedIn";
import ProtectedRoute from "./components/ProtectedRoute";
import UserDashboard from "./components/UserManagement/UserDashboard";
import {connect} from "react-redux";
import Login from "./components/Login";
import SpellCardList from "./components/DnD/SpellCardList";
import UserDetail from "./components/UserManagement/UserDetail";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }

  componentDidMount() {
    window.addEventListener("beforeinstallprompt", e => {
      // For older browsers
      e.preventDefault();
      console.log("Install Prompt fired");
      this.installPrompt = e;
      // See if the app is already installed, in that case, do nothing
      if (
        (window.matchMedia &&
          window.matchMedia("(display-mode: standalone)").matches) ||
        window.navigator.standalone === true
      ) {
        return false;
      }
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} failurePath={"/login"} />
            <ProtectedRoute exact path="/manage-users" acceptedPermissions={['read:users']} component={UserDashboard} />
            <ProtectedRoute exact path="/manage-users/user/:userId" acceptedPermissions={['edit:users']} component={UserDetail} />
            
            <ProtectedRoute exact path="/dnd/spells" acceptedPermissions={['read:gamedata']} component={SpellCardList} failurePath={"/login"} />
            
            <Route exact path="/login" component={Login}/>
            <Route path="/not-logged-in" component={NotLoggedIn} />
            <Route path="/callback" component={Callback} />
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.oidc.user,
    routing: state.routing
  }
};

export default connect(mapStateToProps)(App);