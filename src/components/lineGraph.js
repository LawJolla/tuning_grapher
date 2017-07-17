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
    return data.map(sample => {
      return {
        x: parseFloat(sample[x]),
        y: parseFloat(sample[y])
      };
    });
  }
  render() {
    const { data } = this.props;
    console.log("v", this.parseLine(data));
    // <div>{this.props.data.map(x => <div>{this.parseLine(x)}</div>)}</div>
    console.log(this.props.data[0]);
    return (
      <FlexibleXYPlot height={400}>
        <HorizontalGridLines values="Seconds" />
        <VerticalGridLines />
        <LineSeries
          stroke="#11939a"
          fill="none"
          strokeWidth={2}
          data={this.parseLine(this.props.data, "Time (sec)", "ECU: MAP (PSI)")}
        />
        <XAxis title={"Time (sec)"}/>
        <YAxis title={"ECU: MAP (PSI)"} />
      </FlexibleXYPlot>
    );
  }
}

export default LineGraph;
