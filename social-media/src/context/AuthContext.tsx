import React, { createContext, useReducer } from 'react';
import jwtDecode from 'jwt-decode';

interface User {
  id: string;
  username: string;
  email: string;
  exp: number;
  token: string;
}

interface State {
  user: User | null;
}

interface Context {
  user: User | null;
  login(data: User): void;
  logout(): void;
}

const AuthContext = createContext<Context>({
  user: null,
  login(data: User) {},
  logout() {},
});

const initialState: State = { user: null };

const storageItem = localStorage.getItem('token');

if (storageItem) {
  const decodedToken = jwtDecode<User>(storageItem);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('token');
  } else {
    initialState.user = decodedToken;
  }
}

type Actions =
  | {
      type: 'LOGIN';
      data: User;
    }
  | { type: 'LOGOUT' };

const authReducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.data };
    case 'LOGOUT':
      return { ...state, user: null };
  }
};

const AuthProvider = <T,>(props: T) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (data: User) => {
    localStorage.setItem('token', data.token);
    dispatch({ type: 'LOGIN', data });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};

export { AuthContext, AuthProvider };
