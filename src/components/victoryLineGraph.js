import React, { Component } from "react";
import { VictoryAxis, VictoryLine, VictoryChart, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from "victory";

function getDomain(data, selector) {
  return [Math.min(...data.map(x => x[selector])), Math.max(...data.map(y => y[selector]))];
}

const tickPadding = [ 0, 0, -15 ];
const anchors = ["end", "end", "start"];
const colors = ["black", "red", "blue"];

class LineGraph extends Component {
  state = { width: 800, height: 400, parsedData: [] };

  parseLine(data, x, y) {
    return data
      .map((sample, index) => {
        if (sample[x] === "" || sample[y] === "") return undefined;
        return {
          x: parseFloat(sample[x]),
          y: parseFloat(sample[y]),
        };
      })
      .filter(item => item);
  }
  parseLines(data, x, y) {
    return y.map(line => this.parseLine(data, x, line))
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
    console.log('updating data')
    const parsedData = this.parseLines(data, xText, yText);
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
            style={{parent: {padding: 40}}}
            padding={100}
            containerComponent={
              <VictoryVoronoiContainer
                  labels={(d) => `${yText[0]}: ${d.y}`}
              />
            }
          >
            <VictoryAxis
                label={xText}
                style={{
                  parent: {overflow: "visible"},
                  axis: {stroke: "#756f6a"},
                  axisLabel: {fontSize: 20, padding: 50},
                  ticks: {stroke: "grey", size: 5},
                  tickLabels: {fontSize: 15, padding: 5}
                }}
            />


            {
              parsedData.map((d, index) => {
                return (

                    <VictoryAxis dependentAxis
                        // Use normalized tickValues (0 - 1)
                        tickValues={[0.25, 0.5, 0.75, 1]}
                        // Re-scale ticks by multiplying by correct maxima
                        key={index}
                       tickFormat={(t) => Math.ceil(t * getDomain(d, 'y')[1])}
                       label={yText[index]}
                       orientation={index > 0 ? 'right' : 'left'}

                       style={{
                         axis: {stroke: "#756f6a"},
                         axisLabel: {fontSize: 20, padding: 80},
                         ticks: {stroke: "grey", size: 5},
                         tickLabels: {fontSize: 15, padding: 5},
                       }}
                    />
                )
              })
            }
            {
              parsedData.map((d, index) => {
                return (
                    <VictoryLine
                        key={index}
                        data={d}
                        labelComponent={<VictoryTooltip/>}
                        y={(datum) => datum.y/getDomain(d, 'y')[1]}
                    />
                )
              })
            }




          </VictoryChart>
        </div>
        <div style={{ flex: "0 0 50%" }}>Hi</div>
      </div>
    );
  }
}

export default LineGraph;
