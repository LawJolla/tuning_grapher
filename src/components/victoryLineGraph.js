import React, { Component } from "react";
import { VictoryZoomContainer, VictoryAxis, VictoryLine, VictoryChart, VictoryTheme, VictoryTooltip, VictoryVoronoiContainer } from "victory";

function getDomain(data, selector) {
  return [Math.min(...data.map(x => x[selector])), Math.max(...data.map(y => y[selector]))];
}

const tickPadding = [ 0, 0, -15 ];
const anchors = ["end", "end", "start"];
const colors = ["dodgerblue", "lightcoral", "blue"];

class LineGraph extends Component {
  state = { width: 800, height: 400 };

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

  render() {
    const { width, height } = this.state;
    const { xText, yText, parsedData } = this.props;
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
              <VictoryZoomContainer />
            }
          >
            <VictoryAxis
                label={xText}
                style={{
                  parent: {overflow: "visible"},
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
                        tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
                        // Re-scale ticks by multiplying by correct maxima
                        key={index}
                       tickFormat={(t) => Math.ceil(t * d.yDomain[1])}
                       label={d.yAxisName}
                       orientation={index > 0 ? 'right' : 'left'}
                       style={{
                         axisLabel: {fontSize: 20, padding: 80},
                         ticks: {stroke: "grey", size: 5},
                         tickLabels: {fontSize: 15, padding: 5, fill: colors[index]},
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
                        data={d.graph}
                        labelComponent={<VictoryTooltip/>}
                        y={(datum) => datum.y/d.yDomain[1]}
                        style={{ data: { stroke: colors[index] } }}
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
