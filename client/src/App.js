import React, { Component } from 'react';
import './assets/main.scss';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import OverviewPage from './components/pages/OverviewPage';
import DetailPage from './components/pages/DetailPage'

const DefaultRoute = ({component: Component, ...rest}) => {
  return(
    <Route {...rest} render = {props => (
      <div>  
        <Component {...props}/>
      </div>
    )} />
  )
}
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <DefaultRoute exact path="/"  component={OverviewPage}/>
          <DefaultRoute exact path="/company/:company" component={DetailPage}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
