import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import '../node_modules/react-vis/dist/style.css';
import TempContainer from './container/tempCSVContainer';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

class App extends Component {
  render() {
    return (
      <Wrapper>
        <TempContainer />
      </Wrapper>
    );
  }
}

export default App;
