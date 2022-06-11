import { Tag } from "@/types/issue";
import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import "echarts/theme/macarons";
import { Col, Row } from "antd";

const Chart = ({ tags }: { tags: Tag[] }) => {
  const genChartData = (key: string) => {
    const filterTags = tags.filter((tag) => tag.key === key);
    return filterTags.map((item) => {
      return {
        name: item.value,
        value: item.count,
      };
    });
  };
  console.log(genChartData("engine"));

  return (
    <>
      <Row>
        <Col span={6}>
          <BaseChart type="Browser" data={genChartData("browser")} />
        </Col>
        <Col span={6}>
          <BaseChart type="Engine" data={genChartData("engine")} />
        </Col>
        <Col span={6}>
          <BaseChart type="OS" data={genChartData("os")} />
        </Col>
        <Col span={6}>
          <BaseChart type="Type" data={genChartData("type")} />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <BaseChart type="Country" data={genChartData("country")} />
        </Col>
        <Col span={6}>
          <BaseChart type="Region" data={genChartData("region")} />
        </Col>
        <Col span={6}>
          <BaseChart type="City" data={genChartData("city")} />
        </Col>
      </Row>
    </>
  );
};

const BaseChart = ({
  type,
  data,
}: {
  type: string;
  data: { name: string; value: number }[];
}) => {
  const echartRef = useRef(null);

  useEffect(() => {
    const chart = initChart();
    return () => {
      chart?.dispose();
    };
  }, []);

  const initChart = () => {
    if (!echartRef.current || !data.length) return;
    const chart = echarts.init(echartRef.current, "macarons");

    chart.setOption({
      tooltip: {
        trigger: "item",
        formatter: "{a}: {b} <br/> count: {c} ({d}%)",
      },
      legend: {
        left: "center",
        bottom: "10",
        data: data.map((item) => item.name),
      },
      series: [
        {
          name: type,
          type: "pie",
          roseType: "radius",
          radius: [15, 95],
          center: ["50%", "38%"],
          data: data,
          animationEasing: "cubicInOut",
          animationDuration: 2600,
        },
      ],
    });

    return chart;
  };
  return <div ref={echartRef} style={{ width: "100%", height: "300px" }}></div>;
};

export default Chart;
