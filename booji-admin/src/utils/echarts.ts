import * as echarts from "echarts/core";
import { PieChart, LineChart } from "echarts/charts";
import {
  TooltipComponent,
  LegendComponent,
  ToolboxComponent,
  GridComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import "echarts/theme/macarons";
echarts.use([
  PieChart,
  LineChart,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
  ToolboxComponent,
  GridComponent,
]);

export default echarts.init;
