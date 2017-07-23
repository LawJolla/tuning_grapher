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
  makeWidthFlexible,
  Crosshair
} from "react-vis";
const FlexibleXYPlot = makeWidthFlexible(XYPlot);

class LineGraph extends Component {
  state = { crosshairValues: [] };
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
    const { crosshairValues } = this.state;
    if (data.length === 0) return <div>Open a CSV File</div>;
    const xTitle = Object.keys(data[0])[x];
    const yTitle = Object.keys(data[0])[y];
    const parsedData = this.parseLine(data, xTitle, yTitle);
    console.log(x, y);
    return (
        <div style={{ width: '100%', height: '50%', padding: '23px 30px'  }}>
          <FlexibleXYPlot
              height={500}
            onMouseLeave={() => console.log('left')}
          >
            <Crosshair values={crosshairValues} formatTitle={(v) => [{title: xTitle, value: v[0].x}]} formatItems={(v) => [{title: yTitle, value: v[0].y}]} />
            <HorizontalGridLines values="Seconds" />
            <VerticalGridLines />
            <LineSeries
              onNearestX={(value, {index}) => this.setState({ crosshairValues: [value] })}
              stroke="dodgerblue"
              fill="none"
              strokeWidth={2}
              data={parsedData}
            />
            <XAxis title={xTitle}/>
            <YAxis title={yTitle} />
          </FlexibleXYPlot>
        </div>
    );
  }
}

export default LineGraph;
