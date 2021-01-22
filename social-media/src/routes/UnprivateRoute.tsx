import React, { useContext } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

import { AuthContext } from '../context/AuthContext';

export const UnprivateRoute: React.FC<RouteProps> = ({
  component: Component,
  ...rest
}) => {
  const { user } = useContext(AuthContext);
  if (!Component) return null;
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};
