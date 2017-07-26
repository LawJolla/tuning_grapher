import React, { Component } from "react";
import ParseCSV from "../helpers/parseCSV";
import LineGraph from "../components/victoryLineGraph";
const electron = window.require("electron");
const { ipcRenderer } = electron;

class TempContainer extends Component {
  state = {
    parsedData: [],
    data: [],
    x: 0,
    y: 1,
    xAxis: "Time (sec)",
    yAxis: ["ECU: MAP (PSI)", "ECU: RPM (RPM)"]
  };

  getDomain(data, selector) {
    return [
      Math.min(...data.map(x => x[selector])),
      Math.max(...data.map(x => x[selector]))
    ];
  }
  componentWillMount() {
    this.ipc = ipcRenderer.on("csv:open", (e, d) => {
      const data = ParseCSV(d).data;
      const { x, y, xAxis } = this.defaultAxis(data);
      const parsedData = this.parseData(data, this.state.yAxis);
      this.setState({ data, x, y, xAxis, parsedData });
    });
    document.addEventListener("keydown", this.handleKeyDown);
  }
  parseData = (data, yAxis, xAxis = this.state.xAxis) =>
    yAxis.map(dependentAxis => ({
      xAxisName: xAxis,
      yAxisName: dependentAxis,
      xDomain: this.getDomain(data, xAxis),
      yDomain: this.getDomain(data, dependentAxis),
      graph: data.map(d => ({
        x: d[xAxis],
        y: d[dependentAxis]
      }))
    }));

  defaultAxis = data => {
    const xIndex = Object.keys(data[0]).findIndex(key =>
      key.toLowerCase().includes("sec")
    );
    const x = xIndex ? xIndex : 0;
    return {
      data,
      x,
      y: 1,
      xAxis: data[0][x]
    };
  };
  handleKeyDown = e => {
    const liveKeys = ['ArrowDown', 'ArrowUp'];

    if (e.key === "ArrowDown") {
      const { y, data, yAxis } = this.state;
      const newY = y + 1 >= data.length - 1 ? data.length - 1 : y + 1;
      const newYAxis = [Object.keys(data[0])[newY], yAxis[1]];
      const parsedData = this.parseData(data, newYAxis)
      this.setState({ y: newY, yAxis: newYAxis, parsedData });
    }
    if (e.key === "ArrowUp") {
      const { y, data, yAxis } = this.state;
      const newY = y === 0 ? 0 : y - 1;
      const newYAxis = [Object.keys(data[0])[newY], yAxis[1]];
      const parsedData = this.parseData(data, newYAxis)
      this.setState({ y: newY, yAxis: newYAxis, parsedData });
    }
  };
  componentWillUnmount() {
    delete this.ipc;
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  render() {
    const { data, x, y, xAxis, yAxis, parsedData } = this.state;
    return (
      <LineGraph
        parsedData={parsedData}
        data={data}
        x={x}
        y={y}
        xText={xAxis}
        yText={yAxis}
      />
    );
  }
}

export default TempContainer;
