import React from "react";
import {
  Chart,
  ChartLegend,
  ChartSeries,
  ChartSeriesItem,
  ChartSeriesLabels,
  ChartTitle,
  ChartTooltip
} from "@progress/kendo-react-charts";
import { getFundAllocation } from "../services/dataService";
import { Allocation } from "../data/models";

export default function AllocationPanel() {
  const [data, setData] = React.useState<Allocation[]>();
  React.useEffect(() => {
    getFundAllocation().then((data: Allocation[]) => {
      setData(data);
    })
  }, []);

  return (
    <Chart>
      <ChartTitle text={"Asset Allocation"}></ChartTitle>
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
