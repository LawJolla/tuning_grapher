import React, { Component } from 'react';
import ParseCSV from '../helpers/parseCSV';
import LineGraph from '../components/victoryLineGraph';
const electron = window.require('electron');
const { ipcRenderer }  = electron;

class TempContainer extends Component {
  state = { data: [], x: 0, y: 1, xLine: 'Time (sec)', yLines: ['ECU: MAP (PSI)'] };

  componentWillMount() {
    this.ipc = ipcRenderer.on('csv:open', (e, d) => {
      const data = ParseCSV(d).data;
      console.log(data);
      const { x, y } = this.defaultAxis(data);
      this.setState({ data, x, y });
    });
    document.addEventListener("keydown", this.handleKeyDown);
  }
  defaultAxis = (data) => {
    const x = Object.keys(data[0]).findIndex(key => key.toLowerCase().includes('sec'));
    return {
      data,
      x: x ? x : 0,
      y: 1
    };
  }
  handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      const { y, data } = this.state;
      const newY = (y + 1 >= data.length - 1) ? data.length - 1 : y + 1;
      this.setState({ y: newY })
    }
    if (e.key === 'ArrowUp') {
      const { y } = this.state;
      const newY = y === 0 ? 0 : y - 1;
      this.setState({ y: newY })
    }
  }
  componentWillUnmount() {
    delete this.ipc;
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { data, x, y, xLine, yLines } = this.state;
    return <LineGraph data={data} x={x} y={y} xLine={xLine} yLines={yLines} />
  }
}

export default TempContainer;