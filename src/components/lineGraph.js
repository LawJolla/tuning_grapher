import React, { Component } from "react";
import {
  Hint,
  HorizontalGridLines,
  MarkSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
  LineSeries,
  LineMarkSeries,
  makeWidthFlexible
} from "react-vis";
const FlexibleXYPlot = makeWidthFlexible(XYPlot);

class LineGraph extends Component {
  parseLine(data, x, y) {
    return data.map((sample, index) => {
      return {
        x: parseFloat(sample[x]),
        y: parseFloat(sample[y])
      };
    });
  }
  render() {
    const { data, x, y } = this.props;
    if (data.length === 0) return <div>Open a CSV File</div>;
    const xTitle = Object.keys(data[0])[x];
    const yTitle = Object.keys(data[0])[y];
    return (
          <FlexibleXYPlot height={400}>
            <HorizontalGridLines values="Seconds" />
            <VerticalGridLines />
            <LineSeries
              stroke="#11939a"
              fill="none"
              strokeWidth={2}
              data={this.parseLine(data, xTitle, yTitle)}
            />
            <XAxis title={xTitle}/>
            <YAxis title={yTitle} />
          </FlexibleXYPlot>
    );
  }
}

export default LineGraph;
