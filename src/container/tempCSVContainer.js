import React, { Component } from 'react';
import ParseCSV from '../helpers/parseCSV';
import LineGraph from '../components/lineGraph';
const electron = window.require('electron');
const { ipcRenderer }  = electron;

class TempContainer extends Component {
  state = { data: [] };

  componentWillMount() {
    this.ipc = ipcRenderer.on('csv:open', (e, d) =>
        this.setState({ data: ParseCSV(d).data }));
  }

  componentWillUnmount() {
    delete this.ipc;
  }

  render() {
    const { data } = this.state;
    if (data.length === 0) return <div>Open a CSV File</div>;
    return <LineGraph data={this.state.data} />
  }
}

export default TempContainer;