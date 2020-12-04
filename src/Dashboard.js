import React from "react";

import InfoPanel from "./panels/InfoPanel";
import AllocationPanel from "./panels/AllocationPanel";
import PerformancePanel from "./panels/PerformancePanel";
import PositionsPanel from "./panels/PositionsPanel";
import ProjectList from "./containers/ProjectList";
import CompletedProjectList from "./containers/CompletedProjectList";

export default function Dashboard() {
  return (
    <div className="panels">
      <div className="panel-info">
        <InfoPanel />
      </div>
      <div className="panel-allocation">
        <ProjectList/>
      </div>
      <div className="panel-balance">
        <CompletedProjectList />
      </div>
      <div className="panel-positions">
        <PositionsPanel />
      </div>
    </div>
  )
}
