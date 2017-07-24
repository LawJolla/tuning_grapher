import React, { Component } from 'react';
import ParseCSV from '../helpers/parseCSV';
import LineGraph from '../components/victoryLineGraph';
const electron = window.require('electron');
const { ipcRenderer }  = electron;

class TempContainer extends Component {
  state = { data: [], x: 0, y: 1, xText: 'Time (sec)', yText: ['ECU: MAP (PSI)', 'ECU: RPM (RPM)'] };

  componentWillMount() {
    this.ipc = ipcRenderer.on('csv:open', (e, d) => {
      const data = ParseCSV(d).data;
      const { x, y } = this.defaultAxis(data);
      this.setState({ data, x, y });
    });
    document.addEventListener("keydown", this.handleKeyDown);
  }
  defaultAxis = (data) => {
    const xIndex = Object.keys(data[0]).findIndex(key => key.toLowerCase().includes('sec'));
    const x = xIndex ? xIndex : 0;
    return {
      data,
      x,
      y: 1,
      xText: data[0][x]
    };
  }
  handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      const { y, data } = this.state;
      const newY = (y + 1 >= data.length - 1) ? data.length - 1 : y + 1;
      this.setState({ y: newY, yText: [Object.keys(data[0])[newY]] })
    }
    if (e.key === 'ArrowUp') {
      const { y, data } = this.state;
      const newY = y === 0 ? 0 : y - 1;
      this.setState({ y: newY,  yText: [Object.keys(data[0])[newY]] })
    }
  }
  componentWillUnmount() {
    delete this.ipc;
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { data, x, y, xText, yText } = this.state;
    return <LineGraph data={data} x={x} y={y} xText={xText} yText={yText} />
  }
}

export default TempContainer;