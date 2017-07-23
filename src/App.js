import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import TempContainer from './container/tempCSVContainer';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;

  align-items: center;
`;

const SideBar = styled.div`
  flex: 0 0 71px;
  height: 100vh;
  background: dodgerblue;
`;

const MainScreen = styled.div`
  flex: 1 1 100%;
  height: 100vh;
`;
class App extends Component {
  render() {
    return (
      <Wrapper>
        <SideBar />
        <MainScreen>
          <TempContainer />
        </MainScreen>
      </Wrapper>
    );
  }
}

export default App;
