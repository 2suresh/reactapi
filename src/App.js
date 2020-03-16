import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeComponent from "./Home/Home";
import HeaderComponent from "./Header/HeaderComponent";
import "./App.css";

const Intro = () => { return <div className="container"><div className="row"><div class="intro">Intro</div> </div> </div> };
const Team = () => { return <div className="container"><div className="row"><div class="team">Team</div> </div> </div> };
const NotFoundComponent = () => { return <div className="container"><div className="row"><div class="notFound">404 - Sorry this page is not found </div> </div> </div> }

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <HeaderComponent />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/intro" component={Intro} />
            <Route exact path="/team" component={Team} />
            <Route component={NotFoundComponent} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
