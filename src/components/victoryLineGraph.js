import React, { Component } from 'react';
import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';

class LineGraph extends Component {
  state = { width: 800 };
  parseLine(data, x, y) {
    return data.map((sample, index) => {
      if (sample[x] === '' || sample[y[0]] === '') return undefined;
      return {
        x: parseFloat(sample[x]),
        y: parseFloat(sample[y[0]])
      };
    }).filter(item => item);
  }
  componentDidMount() {
    const el = document.getElementById('hi');
    this.setState({ width: el.offsetWidth })
    window.addEventListener('resize', () => {
      const el = document.getElementById('hi');
      this.setState({ width: el.offsetWidth })
    })
  }
  render() {
    const { x, y, data, xLine, yLines } = this.props;
    const parsedData = this.parseLine(data, xLine, yLines);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100vh'}}>
          <div style={{ flex: '0 0 50%', overflow: 'hidden'}} id="hi">
            <VictoryChart width={this.state.width}>
              <VictoryLine data={parsedData}/>
            </VictoryChart>
          </div>
          <div  style={{ flex: '0 0 50%'}}>Hi</div>
        </div>
    )
  }
}

export default LineGraph;