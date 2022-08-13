import { useRef, useEffect } from "react";
import { Tabs } from "antd";
import { useTranslation } from "react-i18next";
import { Average, PerformanceData } from "@/types/performance";
import initEcharts from "@/utils/echarts";
const { TabPane } = Tabs;

const Chart = ({ data }: { data: PerformanceData }) => {
  const { t } = useTranslation();
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab={t("average")} key="1">
        <BarChart data={data.average} />
      </TabPane>
      <TabPane tab={t("realTime")} key="2">
        <LineChart data={data} />
      </TabPane>
    </Tabs>
  );
};

const BarChart = ({ data }: { data: Average }) => {
  const echartRef = useRef(null);
  useEffect(() => {
    const chart = initChart();
    return () => {
      chart?.dispose();
    };
  }, []);

  const initChart = () => {
    if (!echartRef.current) return;
    const chart = initEcharts(echartRef.current, "macarons");

    chart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
        },
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "value",
      },
      yAxis: {
        type: "category",
        data: ["平均"],
      },
      series: [
        {
          name: "DNS",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [data.dns],
        },
        {
          name: "TCP",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [data.tcp],
        },
        {
          name: "Request",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [data.request],
        },
        {
          name: "Response",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [data.response],
        },
        {
          name: "Processing",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [data.processing],
        },
        {
          name: "Load",
          type: "bar",
          stack: "total",
          label: {
            show: true,
          },
          emphasis: {
            focus: "series",
          },
          data: [data.load],
        },
      ],
    });

    return chart;
  };
  return <div ref={echartRef} style={{ width: "100%", height: "100%" }}></div>;
};

const LineChart = ({ data }: { data: PerformanceData }) => {
  const echartRef = useRef(null);
  useEffect(() => {
    const chart = initChart();
    return () => {
      chart?.dispose();
    };
  }, []);

  const initChart = () => {
    if (!echartRef.current) return;
    const chart = initEcharts(echartRef.current, "macarons");

    chart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      legend: {
        data: ["DNS", "TCP", "Request", "Response", "Processing", "Load"],
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: false,
          data: data.axis,
        },
      ],
      yAxis: [
        {
          type: "value",
        },
      ],
      series: [
        {
          name: "DNS",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: data.dns,
        },
        {
          name: "TCP",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: data.tcp,
        },
        {
          name: "Request",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: data.request,
        },
        {
          name: "Response",
          type: "line",
          stack: "Total",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: data.response,
        },
        {
          name: "Processing",
          type: "line",
          stack: "Total",
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: data.processing,
        },
        {
          name: "Load",
          type: "line",
          stack: "Total",
          label: {
            show: true,
            position: "top",
          },
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
          data: data.load,
        },
      ],
    });

    return chart;
  };
  return (
    <div
      ref={echartRef}
      style={{ width: "100%", height: "calc(100vh - 250px)" }}
    ></div>
  );
};

export default Chart;
