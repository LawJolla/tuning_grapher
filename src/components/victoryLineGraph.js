import React, { Component } from "react";
import { VictoryAxis, VictoryLine, VictoryChart, VictoryTheme, VictoryTooltip } from "victory";

class LineGraph extends Component {
  state = { width: 800, height: 400, parsedData: [] };

  parseLine(data, x, y) {
    console.log("parsing...");
    return data
      .map((sample, index) => {
        if (sample[x] === "" || sample[y[0]] === "") return undefined;
        return {
          x: parseFloat(sample[x]),
          y: parseFloat(sample[y[0]]),
          label: parseFloat(sample[y[0]])
        };
      })
      .filter(item => item);
  }
  componentWillReceiveProps(props) {
    this.updateData(props);
  }
  componentDidMount() {
    this.resizeGraph();
    window.addEventListener("resize", () => this.resizeGraph());
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeGraph());
  }
  resizeGraph = () => {
    const smallestHeight = 300;
    const smallestWidth = 400;
    const { offsetHeight, offsetWidth } = this.chart;
    const height =
      offsetHeight < smallestHeight ? smallestHeight : offsetHeight;
    const width = offsetWidth < smallestWidth ? smallestWidth : offsetWidth;
    this.setState({ height, width });
  };
  updateData = ({ data, xText, yText }) => {
    const parsedData = this.parseLine(data, xText, yText);
    this.setState({ parsedData });
  };
  render() {
    const { parsedData, width, height } = this.state;
    const { xText, yText } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh"
        }}
      >
        <div
          style={{ flex: "0 0 50%", overflow: "hidden" }}
          ref={ref => {
            this.chart = ref;
          }}
        >
          <VictoryChart
            width={width}
            height={height}
            theme={VictoryTheme.material}
            title="hi"
          >
            <VictoryAxis
                style={{ parent: { border: "1px solid #ccc" } }}
                label={xText}
            />
            <VictoryAxis dependentAxis
                style={{ parent: { border: "1px solid #ccc" } }}
                label={yText[0]}
            />

            <VictoryLine data={parsedData} labelComponent={<VictoryTooltip/>} />
          </VictoryChart>
        </div>
        <div style={{ flex: "0 0 50%" }}>Hi</div>
      </div>
    );
  }
}

export default LineGraph;
