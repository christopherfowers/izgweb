import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Layout from "./components/Layout";
import Home from "./components/Home";
import Callback from "./components/Callback";

export default class App extends Component {
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
          <Route exact path="/" component={Home} />
          <Route path="/callback" component={Callback} />
        </Layout>
      </BrowserRouter>
    );
  }
}
