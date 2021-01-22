import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation, Link } from 'react-router-dom';

import './NavBar.css';
import { AuthContext } from '../context/AuthContext';

const Header = styled.header``;

const Nav = styled.nav`
  position: relative;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: #dcdcdc;
    height: 3px;
    border-radius: 10px 10px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: auto;
`;

interface Props {
  name: string;
  path: string;
}

const Logo = styled(Link)<Props>`
  color: black;
  font-size: 2rem;
  padding-bottom: 5px;
`;

const Items = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li`
  margin-left: 5px;
  padding: 0 15px;
  position: relative;
`;

const Anchor = styled(Link)<Props>`
  color: black;
  &:hover::before {
    display: block;
  }
  &:hover {
    cursor: pointer;
  }
  &:before {
    z-index: 3;
    content: '';
    position: absolute;
    width: 100%;
    height: 3px;
    top: 149%;
    left: 0;
    background-color: green;
    border-radius: 10px 10px;
    display: ${(props) => (props.name === props.path ? 'block' : 'none')};
  }
`;

interface LocationState {
  from: { pathname: string };
}

export default function Navbar() {
  const context = useContext(AuthContext);
  const { pathname: path } = useLocation<LocationState>();

  return context.user ? (
    <Nav>
      <Logo name={context.user.username} path={path} to='/'>
        {context.user.username}
      </Logo>
      <Items>
        <Item>
          <Anchor name='logout' path={path} onClick={context.logout} to=''>
            Logout
          </Anchor>
        </Item>
      </Items>
    </Nav>
  ) : (
    <Nav>
      <Logo name='/home' path={path} to='/'>
        Home
      </Logo>
      <Items>
        <Item>
          <Anchor name='/register' path={path} to='/register'>
            Register
          </Anchor>
        </Item>
        <Item>
          <Anchor name='/login' path={path} to='/login'>
            {console.log({ path })}
            Login
          </Anchor>
        </Item>
      </Items>
    </Nav>
  );
}
