import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled from 'styled-components';
import { AuthProvider } from './context/AuthContext';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import { UnprivateRoute } from './routes/UnprivateRoute';

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  height: 100%;
`;

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainContainer className='mainContainer'>
          <Navbar />
          <Route exact path='/' component={Home} />
          <UnprivateRoute exact path='/login' component={Login} />
          <UnprivateRoute exact path='/register' component={Register} />
        </MainContainer>
      </Router>
    </AuthProvider>
  );
}

export default App;
