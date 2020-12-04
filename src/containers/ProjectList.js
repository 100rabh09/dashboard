import React, { Component } from 'react';
import {blindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {projectData} from '../actions/ProjectActions'
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartTitle,
  ChartTooltip
} from "@progress/kendo-react-charts";


class ProjectList extends Component {
  componentDidMount() {
    this.props.projectData();
  }
  render() {
    console.log("ProjectList | render | data ::",this.props.project);
    const {project} = this.props;
    console.log("data ::",project.projectData.data);
    const data = project.projectData.data
    return (
      <Chart>
        <ChartTitle text={"BioIt Article Allocation"}></ChartTitle>
        <ChartSeries>
          <ChartSeriesItem type="donut" data={data}>
            <ChartSeriesLabels
              content={e => `${e.value}%`}
              background="none"
              color="#fff" />
          </ChartSeriesItem>
        </ChartSeries>
        <ChartLegend position={"bottom"} visible={true} />
        <ChartTooltip render={(e: any) => (
          <div>{e.point ? e.point.category : ""}</div>
        )} />
      </Chart>
    )
  }
}

function mapStateToProps(state){
return {
  project: state.project
}
}

// connect HOC(higher order component) function
export default  connect(mapStateToProps, {projectData})(ProjectList);
