import React, { Component } from 'react';
import {blindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {projectData} from '../actions/ProjectActions'

class ProjectList extends Component {
  componentDidMount() {
    this.props.projectData();
  }
  render() {
    console.log("ProjectList | render | data ::",this.props.project);
    const {project} = this.props;
    return (
      <ul>
        <li>one</li>
        <li>two</li>
      </ul>
    )
  }
}

function mapStateToProps(state, ){
return {project: state.project}
}

export default  connect(mapStateToProps, {projectData})(ProjectList);