"use client";

import React, { useState, useEffect } from "react";
import { Button, Card, Flex, Layout } from "antd";
import {
  AlignLeftOutlined,
  DownloadOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
  WifiOutlined,
} from "@ant-design/icons";

import { Content, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
// Could not find the module "E:\projects\test\bi_custom\node_modules\antd\es\index.js

import BarChart from "./components/BarChart";
import DonutChart from "./components/DonutChart";

import { covidDataService } from "./services/covidDataService";

const headerStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  display: "flex",
  alignItems: "center",
};

const contentStyle: React.CSSProperties = {
  padding: "0 64px 0 64px",
};

const footerStyle: React.CSSProperties = {
  padding: "24px",
  justifyContent: "space-between",
};

const buttonGroupStyle: React.CSSProperties = {
  margin: "24px 0",
};

const cardWrapperStyle: React.CSSProperties = {
  gap: "24px",
};

const cardStyle: React.CSSProperties = {
  flex: "1",
};

export default function Home() {
  const [chartData, setChartData] = useState([]);
  const [isBarChartLiked, setIsBarChartLiked] = useState(false);
  const [isDonutChartLiked, setIsDonutChartLiked] = useState(false);
  // railway integration can be added

  useEffect(() => {
    const fetchChartData = async () => {
      const data = await covidDataService();
      setChartData(data.data);
    };

    fetchChartData();
  }, []);

  if (!chartData) {
    return <div>Data not found</div>;
  }

  return (
    <Layout>
      <Header style={headerStyle}>
        <Title level={3}>COVID Report</Title>
      </Header>
      <Content style={contentStyle}>
        <Flex justify="space-between" align="center">
          <Title level={4}>Dashboard</Title>
          <Flex gap="middle" style={buttonGroupStyle}>
            <Button icon={<DownloadOutlined />}>Export to PDF</Button>
            <Button icon={<AlignLeftOutlined />}>Notes (3)</Button>
            <Button icon={<WifiOutlined />}>Filter 9+</Button>
          </Flex>
        </Flex>
        <Flex style={cardWrapperStyle}>
          <Card
            title="Bar Chart"
            style={cardStyle}
            actions={[
              <Flex key="left-card" style={footerStyle}>
                {isBarChartLiked ? (
                  <HeartFilled onClick={() => setIsBarChartLiked(false)} />
                ) : (
                  <HeartOutlined onClick={() => setIsBarChartLiked(true)} />
                )}
                <MessageOutlined />
              </Flex>,
            ]}
          >
            <BarChart covidStats={chartData} />
          </Card>
          <Card
            title="Doughnut Chart"
            style={cardStyle}
            actions={[
              <Flex key="right-card" style={footerStyle}>
                {isDonutChartLiked ? (
                  <HeartFilled onClick={() => setIsDonutChartLiked(false)} />
                ) : (
                  <HeartOutlined onClick={() => setIsDonutChartLiked(true)} />
                )}
                <MessageOutlined />
              </Flex>,
            ]}
          >
            <DonutChart covidStats={chartData} />
          </Card>
        </Flex>
      </Content>
    </Layout>
  );
}
