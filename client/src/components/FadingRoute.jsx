import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const RouteWithProps = ({ component: Component, stateData: props }) => (
  <Route render={() => (
      <Component {...props}/>
  )}/>
)

export default RouteWithProps


// const PrivateRoute = ({ component, isAuthenticated, path, ...props
// }) => (
//   <Route {...props} exact path={path} render={() => (
//     isAuthenticated ? (
//       React.createElement(component, {...props})
//     ) : (
//       <Redirect to='/login'/>
//     )
//     )}
//   />
// )
