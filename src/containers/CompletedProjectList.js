import React, { Component } from 'react';
import {blindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {completedProjectData} from '../actions/CompletedProjectActions'
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartTitle,
  //ChartTooltip,
} from "@progress/kendo-react-charts";


class CompletedProjectList extends Component {
  componentDidMount() {
    this.props.completedProjectData();
  }
  render() {
    console.log("ProjectCompletionList | render | data ::",this.props);
    const {completedProject} = this.props;
    const data = completedProject.data
    console.log("data ::",data);
    return (
      <Chart>
        <ChartTitle text="Project Conversion" />
        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={["Jan", "Feb", "March", "April", "May", "June", "July","Aug","Sep","Oct","Nov","Dec"]} />
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem type="line" data={data} color="blue"/>
        </ChartSeries>
        <ChartSeries>
          <ChartSeriesItem type="line" data={data} color="red"/>
        </ChartSeries>
      </Chart>
    )
  }
}

function mapStateToProps(state){
return {
  completedProject: state.completedProject.completedProjectData
}
}

// connect HOC(higher order component) function
export default  connect(mapStateToProps, {completedProjectData})(CompletedProjectList);
